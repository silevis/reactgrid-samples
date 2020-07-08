import * as React from "react";
import { ReactGrid, Id, Column, Row } from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnResizingSample: React.FunctionComponent = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", resizable: true, width: 100 },
            { columnId: "Surname", resizable: true, width: 100 }
        ] as Column[],
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
        ] as Row[]
    }));

    const handleColumnResize = (ci: Id, width: number) => {
        const newState = { ...state };
        const columnIndex = newState.columns.findIndex(el => el.columnId === ci);
        const resizedColumn = newState.columns[columnIndex];
        const updatedColumn = { ...resizedColumn, width };
        newState.columns[columnIndex] = updatedColumn;
        setState(newState);
    }

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onColumnResized={handleColumnResize}
            enableFillHandle
        />
    );
}