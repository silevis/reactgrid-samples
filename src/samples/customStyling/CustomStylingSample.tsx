import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "./styling.scss";

export const CustomStylingSample: React.FunctionComponent = () => {
    const [state] = React.useState(() => ({
        columns: [
            { columnId: "Name", width: 180 },
            { columnId: "Surname", width: 130 },
            { columnId: "Birth Data", width: 130 },
            { columnId: "Phone", width: 130 },
            { columnId: "Company", width: 180 },
            { columnId: "Occupation", width: 300 }
        ],
        rows: [
            {
                rowId: 0,
                height: 40,
                cells: [
                    { type: "header", text: "Name" },
                    { type: "header", text: "Surname" },
                    { type: "header", text: "Birth Data" },
                    { type: "header", text: "Phone" },
                    { type: "header", text: "Company" },
                    { type: "header", text: "Occupation" }
                ]
            },
            {
                rowId: 1,
                height: 40,
                cells: [
                    { type: "text", text: "Thomas Anthony" },
                    { type: "text", text: "Goldman" },
                    { type: "date", date: new Date("1989-04-01") },
                    { type: "number", value: 293827394 },
                    { type: "text", text: "Electronic Geek" },
                    { type: "text", text: "Textile and furnishings occupation" }
                ]
            },
            {
                rowId: 2,
                height: 40,
                cells: [
                    { type: "text", text: "Susie Evelyn" },
                    { type: "text", text: "Spencer" },
                    { type: "date", date: new Date("1970-12-02") },
                    { type: "number", value: 684739283 },
                    { type: "text", text: "Harold Powell" },
                    { type: "text", text: "Concrete paving machine operator" }
                ]
            },
            {
                rowId: 3,
                height: 40,
                cells: [
                    { type: "text", text: "Mathew Lawrence" },
                    { type: "text", text: "Joshua" },
                    { type: "date", date: new Date("1970-12-02") },
                    { type: "number", value: 684739283 },
                    { type: "text", text: "De-Jaiz Mens Clothing" },
                    { type: "text", text: "Technical recruiter" }
                ]
            },
            {
                rowId: 4,
                height: 40,
                cells: [
                    { type: "text", text: "" },
                    { type: "text", text: "" },
                    { type: "date", date: NaN },
                    { type: "number", value: NaN },
                    { type: "text", text: "" },
                    { type: "text", text: "" }
                ]
            }
        ]
    }));

    return (
        <>
            <div style={{ position: "relative", height: 250 }}>
                <ReactGrid
                    rows={state.rows}
                    columns={state.columns}
                    enableFillHandle
                    enableRangeSelection
                />
            </div>
            <div
                style={{ position: "relative", height: 250 }}
                id="reactgrid-red"
            >
                <ReactGrid
                    rows={state.rows}
                    columns={state.columns}
                    enableFillHandle
                    enableRangeSelection
                />
            </div>
            <div
                style={{ position: "relative", height: 250 }}
                id="reactgrid-gold"
            >
                <ReactGrid rows={state.rows}
                    columns={state.columns}
                    enableFillHandle
                    enableRangeSelection
                />
            </div>
        </>
    );
}