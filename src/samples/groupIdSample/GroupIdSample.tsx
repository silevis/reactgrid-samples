import * as React from "react";
import { ReactGrid, Column, Row, CellChange } from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/styles.css";

interface IApp {
    columns: Column[];
    rows: Row[];
}

export const GroupIdSample: React.FC = () => {
    const [state, setState] = React.useState<IApp>(() => ({
        columns: [
            { columnId: "Name", width: 200 },
            { columnId: "Surname" },
            { columnId: "Birth Data", width: 100 },
            { columnId: "Phone", width: 100 },
        ],
        rows: [
            {
                rowId: 0,
                cells: [
                    { type: "header", text: 'Name' },
                    { type: "header", text: "Surname" },
                    { type: "header", text: "Birth Data" },
                    { type: "header", text: "Phone" },
                ]
            },
            {
                rowId: 1,
                cells: [
                    { type: "text", text: "Thomas Anthony", groupId: 'group: A' },
                    { type: "text", text: "Goldman", groupId: 'group: B' },
                    { type: "date", date: new Date("1989-04-01") },
                    { type: "number", value: 293827394 },
                ]
            },
            {
                rowId: 2,
                cells: [
                    { type: "text", text: "Susie Evelyn", groupId: 'group: A' },
                    { type: "text", text: "Spencer", groupId: 'group: B' },
                    { type: "date", date: new Date("1967-12-02") },
                    { type: "number", value: 684739283 },
                ]
            },
            {
                rowId: 3,
                cells: [
                    { type: "text", text: "Mathew Lawrence" },
                    { type: "text", text: "Joshua", groupId: 'group: B' },
                    { type: "date", date: new Date("1976-12-02") },
                    { type: "number", value: 684739283 },
                ]
            },
            {
                rowId: 4,
                cells: [
                    { type: "text", text: "" },
                    { type: "text", text: "" },
                    { type: "date", date: undefined },
                    { type: "number", value: NaN },
                ]
            }
        ]
    }));

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach((change) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        })
        setState(newState);
    }

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onCellsChanged={handleChanges}
            enableFillHandle
            enableRangeSelection
            enableGroupIdRender
        />
    );
}


