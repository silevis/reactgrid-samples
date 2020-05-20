import * as React from "react";
import { ReactGrid, Id } from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnResizingSample: React.FunctionComponent = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", resizable: true, width: 100 },
            { columnId: "Surname", resizable: true, width: 100 }
        ],
        rows: [
            {
                rowId: 0,
                cells: [
                    { type: "header", text: "Name" },
                    { type: "header", text: "Surname" }
                ]
            },
            {
                rowId: 1,
                cells: [
                    { type: "text", text: "Thomas" },
                    { type: "text", text: "Goldman" }
                ]
            },
            {
                rowId: 2,
                cells: [
                    { type: "text", text: "Susie" },
                    { type: "text", text: "Spencer" }
                ]
            },
            {
                rowId: 3,
                cells: [{ type: "text", text: "" }, { type: "text", text: "" }]
            }
        ]
    }));

    const handleColumnResize = (ci: Id, width: number) => {
        let newState = { ...state };
        const columnIndex = newState.columns.findIndex(el => el.columnId === ci);
        const resizedColumn: any = newState.columns[columnIndex];
        const updateColumn: any = { ...resizedColumn, width };
        newState.columns[columnIndex] = updateColumn;
        setState(newState);
    };

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onColumnResized={handleColumnResize}
        />
    );
}