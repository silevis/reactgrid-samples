import * as React from "react";
import { ReactGrid, Row, CellChange, DefaultCellTypes, TextCell, NumberCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import {
    getDataFromRows, createIndents, getExpandedRows, getDataFromColumns, fillCellMatrixHorizontally,
    collectRowPairs,
    fillCellMatrixVertically,
    getGroupCell
} from "./helpersFunctions";
import { dataRows, topHeaderRow } from "./rows";
import { dataColumns, BPColumn } from "./columns";
import { HorizontalGroupCell, HorizontalGroupCellTemplate } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';


export type RowCells = DefaultCellTypes | HorizontalGroupCell;
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

    const [rowsToRender, setRowsToRender] = React.useState<BPRow[]>(() => {

        return getExpandedRows(state.rows).map((row, idx) => {
            return row;
        })

    });

    const [colsToRender, setColsToRender] = React.useState<BPColumn[]>(() => {
        return state.columns.filter((col, idx) => {
            return col;
        })
    });

    const handleChanges = (changes: CellChange<RowCells>[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            if (changeRowIdx === 0 || changeColumnIdx === 0) {
                newState.rows[changeRowIdx].cells[changeColumnIdx] = { ...change.newCell, text: (change.initialCell as TextCell).text } as TextCell;
            } else {
                if (change.newCell.type === 'number' && (change.newCell.className === 'green' || change.newCell.className === 'blue')) {
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
        setState({ ...state, rows: createIndents(rows) });
        setRowsToRender([...getExpandedRows(rows)]);
    };

    const updateNodeQuarter = (state: BPState, valueToDivide: number, changeRowIdx: number, changeColumnIdx: number) => {
        const partialValue = valueToDivide / 3;
        for (let i = 1; i < 4; i++) {
            (state.rows[changeRowIdx].cells[changeColumnIdx + i] as NumberCell).value = partialValue;
        }
    };

    return (
        <ReactGrid
            rows={rowsToRender}
            columns={colsToRender}
            onCellsChanged={handleChanges}
            stickyTopRows={1}
            stickyLeftColumns={1}
            customCellTemplates={{
                horizontalGroup: new HorizontalGroupCellTemplate()
            }}
            enableRangeSelection
            enableFillHandle
            enableRowSelection
        />
    );
}