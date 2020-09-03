import * as React from "react";
import { ReactGrid, Id, Column, Row } from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnResizingSample: React.FunctionComponent = () => {
    const [columns, setColumns] = React.useState<Column[]>(() => [
        { columnId: "Name", width: 100, resizable: true },
        { columnId: "Surname", width: 100, resizable: true }
    ]);
    const [rows] = React.useState<Row[]>(() => [
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
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]);

    const handleColumnResize = (ci: Id, width: number) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = { ...resizedColumn, width };
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            onColumnResized={handleColumnResize}
        />
    );
}