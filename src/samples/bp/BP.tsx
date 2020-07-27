import * as React from "react";
import { ReactGrid, Column, Row, CellChange, DefaultCellTypes, TextCell, } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import { getDataFromRows, createIndents, getExpandedRows } from "./helpersFunctions";
import { dataRows } from "./rows";
import { dataColumns } from "./columns";
import { HorizontalGroupCell, HorizontalGroupCellTemplate } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';


export type RowCells = DefaultCellTypes | HorizontalGroupCell;
export type BPRow = Row<RowCells>;

interface BPState {
    columns: Column[];
    rows: BPRow[];
}

export const BPSample: React.FC = () => {
    const [state, setState] = React.useState<BPState>(() => {
        let rows = [...dataRows];
        const columns = [...dataColumns];
        rows = getDataFromRows(rows);
        rows = createIndents(rows);

        // TODO
        // const z = getHorizontalGroupCell(dataRows[0].cells);
        // const g = hasHorizontalChildren(columns, dataRows[0].cells, z);
        // console.log({ dr: dataRows[0], z, g, rows });

        return {
            columns,
            rows: [dataRows[0], ...rows]
        }
    });

    const [rowsToRender, setRowsToRender] = React.useState<BPRow[]>([...getExpandedRows(state.rows)]);

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
        setState({ ...state, rows: createIndents(newState.rows) });
        setRowsToRender([...getExpandedRows(newState.rows)]);
    };

    return (
        <ReactGrid
            rows={rowsToRender}
            columns={state.columns}
            onCellsChanged={handleChanges}
            stickyTopRows={1}
            stickyLeftColumns={1}
            customCellTemplates={{
                horizontalGroup: new HorizontalGroupCellTemplate()
            }}
        />
    );
}