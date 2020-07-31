import * as React from "react";
import { ReactGrid, Row, CellChange, DefaultCellTypes, TextCell, NumberCell, Id, DropPosition } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import {
    getDataFromRows, createIndents, getExpandedRows, getDataFromColumns, fillCellMatrixHorizontally,
    fillCellMatrixVertically, getGroupCell, getDirectChildrenRows, getParentRow, extendWithColIds, getExpandedCells, getColumnsIdsxToRender, filterCellsOnRows,
} from "./helpersFunctions";
import { dataRows, topHeaderRow } from "./rows";
import { dataColumns, BPColumn } from "./columns";
import { HorizontalGroupCell, HorizontalGroupCellTemplate } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';
import { reorderArray } from './reorderArray';
import { nonEditableNumberCellTemplate, NonEditableNumberCell } from './CellTemplates';


export type RowCells = DefaultCellTypes | HorizontalGroupCell | NonEditableNumberCell;
export type BPRow = Row<RowCells>;

export type RowPair = { from: BPRow, to: BPRow };

interface BPState {
    columns: BPColumn[];
    rows: BPRow[];
}

export const BPSample: React.FC = () => {
    const [state, setState] = React.useState<BPState>(() => {
        let rows = [...dataRows];
        let columns = [...dataColumns];
        columns = getDataFromColumns(columns);
        rows = getDataFromRows(rows);
        rows = fillCellMatrixHorizontally(rows);
        fillCellMatrixVertically(rows);
        rows = createIndents(rows);
        return {
            columns: [dataColumns[0], ...columns],
            rows: [topHeaderRow, ...rows]
        }
    });

    const [columnsToRender, setColumnsToRender] = React.useState<BPColumn[]>(() => {
        const extendedTopHeaderRow = extendWithColIds(topHeaderRow, [...dataColumns]);
        const expandedCells = getExpandedCells(extendedTopHeaderRow.cells);
        return state.columns.filter(col => expandedCells.find(expCell => (expCell as HorizontalGroupCell).columnId === col.columnId));
    });

    const [rowsToRender, setRowsToRender] = React.useState<BPRow[]>(() => {
        const topHeaderRowWithColumnIds = extendWithColIds(topHeaderRow, [...dataColumns]);
        const expandedRows = getExpandedRows(state.rows);
        const idxs = getColumnsIdsxToRender(topHeaderRowWithColumnIds.cells, columnsToRender);
        return filterCellsOnRows(expandedRows, idxs);
    });

    const handleChanges = (changes: CellChange<RowCells>[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            if (changeRowIdx === 0 || changeColumnIdx === 0) { // TODO change go && 
                newState.rows[changeRowIdx].cells[changeColumnIdx] = { ...change.newCell, text: (change.initialCell as TextCell).text } as TextCell;
            } else {
                if ((change.newCell.type === 'number' || change.newCell.type === 'nonEditableNumber')
                    && (change.newCell.className?.includes('quarter') || change.newCell.className?.includes('year'))) {
                    const groupCell = getGroupCell(newState.rows[changeRowIdx]);
                    if (!groupCell.hasChildren) {
                        updateNodeQuarter(newState, change.newCell.value, changeRowIdx, changeColumnIdx);
                    }
                } else {
                    newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
                }
            }
        });
        const rows = fillCellMatrixHorizontally(newState.rows);
        fillCellMatrixVertically(rows);
        const expandedCells = getExpandedCells(topHeaderRow.cells);
        const columnsToRender = newState.columns.filter(col => expandedCells.find(expandedCell => (expandedCell as HorizontalGroupCell).columnId === col.columnId));
        const idxs = getColumnsIdsxToRender(topHeaderRow.cells, columnsToRender);
        const expandedRows = getExpandedRows(rows);
        setColumnsToRender([...columnsToRender])
        setState({ ...state, rows: createIndents(rows) });
        setRowsToRender([...filterCellsOnRows(expandedRows, idxs)]);
    };

    const updateNodeQuarter = (state: BPState, valueToDivide: number, changeRowIdx: number, changeColumnIdx: number) => {
        const partialValue = valueToDivide / 3;
        for (let i = 1; i < 4; i++) {
            (state.rows[changeRowIdx].cells[changeColumnIdx + i] as NumberCell).value = partialValue;
        }
    };

    const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...state };
        let to = newState.rows.findIndex(row => row.rowId === targetRowId);
        let rowIdxs = rowIds.map(id => state.rows.findIndex(r => r.rowId === id));

        if (rowIdxs.length === 1) {
            const row = newState.rows[rowIdxs[0]];
            rowIdxs = [row, ...new Set(getRowChildren(newState.rows, [], row))].map(item => newState.rows.findIndex(r => r.rowId === item.rowId));

            const onRow = newState.rows.find(row => row.rowId === targetRowId);
            if (onRow) {
                const movingRowRoot = getGroupCell(row);
                if (dropPosition === 'on') {
                    movingRowRoot.parentId = onRow.rowId;
                    const onRowIndex = newState.rows.indexOf(onRow);
                    const rowIndex = newState.rows.indexOf(row);
                    if (rowIndex >= onRowIndex) {
                        to += 1;
                    }
                } else {
                    const parentRow = getParentRow(newState.rows, onRow);
                    if (dropPosition === 'after') {
                        movingRowRoot.parentId = onRow.rowId;
                    }
                    if (parentRow) {
                        movingRowRoot.parentId = parentRow.rowId;
                        if (dropPosition === 'after') {
                            movingRowRoot.parentId = onRow.rowId;
                        }
                    } else {
                        if (dropPosition === 'before') {
                            movingRowRoot.parentId = undefined;
                            movingRowRoot.indent = undefined;
                        }
                    }
                }
            }
        }

        const reorderedRows = reorderArray(newState.rows, rowIdxs, to);

        setState({ ...newState, rows: createIndents(reorderedRows) });
        setRowsToRender([...getExpandedRows(reorderedRows)]);
    }

    const handleCanReorderRows = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
        const newState = { ...state };
        const rowIdxs = rowIds.map(id => newState.rows.findIndex(row => row.rowId === id));
        if (rowIdxs.length === 1 && targetRowId !== topHeaderRow.rowId) {
            const row = newState.rows[rowIdxs[0]];
            const rowChildren = [...new Set(getRowChildren(newState.rows, [], row))];
            if (rowChildren.some(item => item.rowId === targetRowId)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    const getRowChildren = (rows: BPRow[], acc: BPRow[], row: BPRow) => {
        const rowsChildren = getDirectChildrenRows(rows, row);
        if (!rowsChildren) return [];

        rowsChildren.forEach(childRow => {
            acc.push(...getRowChildren(rows, rowsChildren, childRow));
        });
        return acc;
    }

    return (
        <div className="bp-sample">
            <ReactGrid
                rows={rowsToRender}
                columns={columnsToRender}
                onCellsChanged={handleChanges}
                stickyTopRows={1}
                stickyLeftColumns={1}
                customCellTemplates={{
                    horizontalGroup: new HorizontalGroupCellTemplate(),
                    nonEditableNumber: nonEditableNumberCellTemplate,
                }}
                onRowsReordered={handleRowsReorder}
                canReorderRows={handleCanReorderRows}
                enableRangeSelection
                enableFillHandle
                enableRowSelection
            />
        </div>
    );
}