import * as React from "react";
import { ReactGrid, CellChange } from "@silevis/reactgrid";
import './styling.scss';
import { FlagCellTemplate } from "./FlagCellTemplate";

export const FlagCellTemplateSample: React.FunctionComponent = () => {
    const [state, setState] = React.useState(() => ({
        columns: [{ columnId: 0, width: 100 }],
        rows: [
            {
                rowId: 0,
                height: 40,
                cells: [{ type: "header", text: "Flag" }]
            },
            {
                rowId: 1,
                height: 40,
                cells: [{ type: "flag", text: "rus" }]
            },
            {
                rowId: 2,
                height: 40,
                cells: [{ type: "flag", text: "usa" }]
            },
            {
                rowId: 3,
                height: 40,
                cells: [{ type: "flag", text: "pl" }]
            }
        ]
    }));

    const handleChanges = (changes: CellChange[]) => {
        let newState = { ...state };
        changes.forEach((change: any) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        })
        setState(newState);
        return true;
    }
    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onCellsChanged={handleChanges}
            customCellTemplates={{ flag: new FlagCellTemplate() }}
        />
    );
}