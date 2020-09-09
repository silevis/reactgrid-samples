import React, { useState } from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/chevron/columns';
import { rows as dataRows, headerRow } from '../../data/chevron/rows';
import { CellChange, Column, ChevronCell, ReactGrid, Row, Id, DropPosition } from '@silevis/reactgrid';
import './styling.scss';

const ReactGridContainer = styled.div`
  min-height: 400px;
`;

interface ChevronTestGridStateData {
    columns: Column[]
    rows: Row[]
}

const findParentRow = (rows: Row[], row: Row) => rows.find(r => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
});

const findChevronCell = (row: Row) => row.cells.find(cell => cell.type === 'chevron') as ChevronCell | undefined;

const hasChildren = (rows: Row[], row: Row): boolean => rows.some(r => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
});

const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
    const parentRow = findParentRow(rows, row);
    if (parentRow) {
        const foundChevronCell = findChevronCell(parentRow);
        if (foundChevronCell && !foundChevronCell.isExpanded) return false;
        return isRowFullyExpanded(rows, parentRow);
    }
    return true;
};

const getExpandedRows = (rows: Row[]): Row[] => rows.filter(row => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
});

const getDirectChildRows = (rows: Row[], parentRow: Row): Row[] => rows.filter(row => !!row.cells.find(cell => cell.type === 'chevron' && cell.parentId === parentRow.rowId));

const assignIndentAndHasChildren = (rows: Row[], parentRow: Row, indent: number = 0) => {
    ++indent;
    getDirectChildRows(rows, parentRow).forEach(row => {
        const foundChevronCell = findChevronCell(row);
        const hasRowChildrens = hasChildren(rows, row);
        if (foundChevronCell) {
            foundChevronCell.indent = indent;
            foundChevronCell.hasChildren = hasRowChildrens;
        }
        if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
    });
};

const buildTree = (rows: Row[]): Row[] => rows.map(row => {
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
        const hasRowChildrens = hasChildren(rows, row);
        foundChevronCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens) assignIndentAndHasChildren(rows, row);
    }
    return row;
});

export const ChevronCellSample: React.FunctionComponent = () => {

    const [state, setState] = useState<ChevronTestGridStateData>(() => {
        const columns = [...dataColumns(true, false)];
        return { columns, rows: buildTree([...dataRows(true)]) }
    });

    const [rowsToRender, setRowsToRender] = useState<Row[]>([headerRow, ...getExpandedRows(state.rows)]);

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState({ ...state, rows: buildTree(newState.rows) });
        setRowsToRender([headerRow, ...getExpandedRows(newState.rows)]);
    };

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
        to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
        const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...state };
        let to = newState.rows.findIndex(row => row.rowId === targetRowId);
        let rowIdxs = rowIds.map(id => state.rows.findIndex(r => r.rowId === id));

        if (rowIdxs.length === 1) {
            const row = newState.rows[rowIdxs[0]];
            rowIdxs = [row, ...new Set(getRowChildren(newState.rows, [], row))].map(item => newState.rows.findIndex(r => r.rowId === item.rowId));

            const onRow = newState.rows.find(row => row.rowId === targetRowId);
            if (onRow) {
                const movingRowRoot = findChevronCell(row);
                if (movingRowRoot) {
                    if (dropPosition === 'on') {
                        movingRowRoot.parentId = onRow.rowId;
                        const onRowIndex = newState.rows.indexOf(onRow);
                        const rowIndex = newState.rows.indexOf(row);
                        if (rowIndex >= onRowIndex) {
                            to += 1;
                        }
                    } else {
                        const parentRow = findParentRow(newState.rows, onRow);
                        if (dropPosition === 'after') {
                            movingRowRoot.parentId = onRow.rowId;
                            console.log('after')
                        }
                        if (parentRow) {
                            movingRowRoot.parentId = parentRow.rowId;
                            console.log('parentRow')
                            if (dropPosition === 'after') {
                                movingRowRoot.parentId = onRow.rowId;
                            }
                        } else {
                            if (dropPosition === 'before') {
                                console.log('before')
                                movingRowRoot.parentId = undefined;
                                movingRowRoot.indent = undefined;
                            }
                        }
                    }
                }
            }
        }

        const reorderedRows = reorderArray(newState.rows, rowIdxs, to);

        setState({ ...newState, rows: buildTree(reorderedRows) });
        setRowsToRender([headerRow, ...getExpandedRows(reorderedRows)]);
    }

    const getRowChildren = (rows: Row[], acc: Row[], row: Row) => {
        const rowsChildren = getDirectChildRows(rows, row);
        if (!rowsChildren) return [];

        rowsChildren.forEach(childRow => {
            acc = [...acc, ...getRowChildren(rows, rowsChildren, childRow)];
        });
        return acc;
    }

    const handleCanReorderRows = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
        const newState = { ...state };
        let rowIdxs = rowIds.map(id => newState.rows.findIndex(row => row.rowId === id));
        if (rowIdxs.length === 1 && targetRowId !== headerRow.rowId) {
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

    return (
        <ReactGridContainer id="chevron-cell-sample">
            <ReactGrid
                rows={rowsToRender}
                columns={state.columns}
                onCellsChanged={handleChanges}
                onRowsReordered={handleRowsReorder}
                canReorderRows={handleCanReorderRows}
                stickyLeftColumns={1}
                stickyTopRows={1}
                enableRowSelection
                enableColumnSelection
                enableFillHandle
                enableRangeSelection
            />
        </ReactGridContainer>
    )
}