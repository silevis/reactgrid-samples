import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "./styling.scss";
import '@silevis/reactgrid/styles.css';
export var HighlightsSample = function () {
    var _a = React.useState(function () { return ({
        columns: [
            { columnId: "Name", width: 100 },
            { columnId: "Surname", width: 100 }
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
    }); }), state = _a[0], setState = _a[1];
    var highlights = [
        { columnId: "Name", rowId: 1, borderColor: "#00ff00" },
        { columnId: "Surname", rowId: 2, borderColor: "#0000ff" },
        { columnId: "Name", rowId: 3, borderColor: "#ff0000" }
    ];
    return (React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, highlights: highlights }));
};
