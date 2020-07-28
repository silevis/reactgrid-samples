import * as React from "react";
import { ReactGrid, Row, CellChange, DefaultCellTypes, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import { getDataFromRows, createIndents, getExpandedRows, getDataFromColumns, fillCellMatrixHorizontally } from "./helpersFunctions";
import { dataRows, topHeaderRow } from "./rows";
import { dataColumns, BPColumn } from "./columns";
import { HorizontalGroupCell, HorizontalGroupCellTemplate } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';


export type RowCells = DefaultCellTypes | HorizontalGroupCell;
export type BPRow = Row<RowCells>;

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
                newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
            }
        });
        const rows = fillCellMatrixHorizontally(newState.rows);
        setState({ ...state, rows: createIndents(rows) });
        setRowsToRender([...getExpandedRows(rows)]);
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