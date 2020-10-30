var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/styles.css";
var getPeople = function () { return [
    {
        name: "Thomas",
        surname: "Goldman",
        birth: new Date("1970-12-02"),
        mobile: 574839457,
        company: "Snatia Ebereum",
        occupation: "CEO"
    },
    {
        name: "Mathew Lawrence",
        surname: "Joshua",
        birth: new Date("1943-12-02"),
        mobile: 684739283,
        company: "De-Jaiz Mens Clothing",
        occupation: "Technical recruiter"
    },
    {
        name: "Susie Evelyn",
        surname: "Spencer",
        birth: new Date("1976-01-23"),
        mobile: 684739283,
        company: "Harold Powell",
        occupation: "Concrete paving machine operator"
    },
    {
        name: "",
        surname: "",
        birth: undefined,
        mobile: NaN,
        company: "",
        occupation: ""
    }
]; };
var getColumns = function () { return [
    { columnId: "Name", width: 150 },
    { columnId: "Surname", width: 100 },
    { columnId: "Birth Data", width: 100 },
    { columnId: "Phone", width: 100 },
    { columnId: "Company", width: 150 },
    { columnId: "Occupation", width: 230 }
]; };
var headerRow = {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" },
        { type: "header", text: "Birth Data" },
        { type: "header", text: "Phone" },
        { type: "header", text: "Company" },
        { type: "header", text: "Occupation" }
    ]
};
var getRows = function (people) { return __spread([
    headerRow
], people.map(function (person, idx) { return ({
    rowId: idx,
    cells: [
        { type: "text", text: person.name },
        { type: "text", text: person.surname },
        { type: "date", date: person.birth },
        { type: "number", value: person.mobile },
        { type: "text", text: person.company },
        { type: "text", text: person.occupation }
    ]
}); })); };
export function StickyPanesSample() {
    var _a = __read(React.useState(getPeople()), 1), people = _a[0];
    var rows = getRows(people);
    var columns = getColumns();
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, stickyLeftColumns: 1, stickyRightColumns: 1, stickyTopRows: 1, stickyBottomRows: 1, enableFillHandle: true, enableRangeSelection: true }));
}
