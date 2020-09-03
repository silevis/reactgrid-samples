import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/styles.css";

export const StickyPanesSample: React.FunctionComponent = () => {
    const [columns] = React.useState<Column[]>(() => [
        { columnId: "Name", width: 150 },
        { columnId: "Surname", width: 100 },
        { columnId: "Birth Data", width: 100 },
        { columnId: "Phone", width: 100 },
        { columnId: "Company", width: 150 },
        { columnId: "Occupation", width: 250 }
    ]);
    const [rows] = React.useState<Row[]>(() => [
        {
            rowId: 0,
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
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "date", date: undefined },
                { type: "number", value: NaN },
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]);

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            stickyLeftColumns={1}
            stickyRightColumns={1}
            stickyTopRows={1}
            stickyBottomRows={1}
            enableFillHandle
            enableRangeSelection
        />
    );
}