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
import React, { useState, useEffect, useMemo } from "react";
import { WorkhoursGrid } from "./WorkhoursGrid";
import './styling.scss';
import { HuePicker } from 'react-color';
var fontSizes = ['xx-small', 'x-small', 'small', 'smaller', 'medium', 'large', 'larger', 'x-large', 'xx-large'];
export var WorkhoursSample = function () {
    var _a = __read(useState(30), 2), rowHeight = _a[0], setRowHeight = _a[1];
    var _b = __read(useState({ h: 209, s: 1, l: 0.5 }), 2), color = _b[0], setColor = _b[1];
    var _c = __read(useState('Helvetica'), 2), fontFamily = _c[0], setFontFamily = _c[1];
    var _d = __read(useState(4), 2), fontSizeIdx = _d[0], setFontSizeIdx = _d[1];
    var hslColor = useMemo(function () { return Math.floor(color.h) + "," + Math.floor(color.s * 100) + "%," + (Math.floor(color.l * 100) + 25) + "%"; }, [color]);
    useEffect(function () {
        var root = document.documentElement;
        root.style.setProperty('--primary', hslColor);
        root.style.setProperty('--font', fontFamily);
    }, [hslColor, fontFamily]);
    return (React.createElement("div", null,
        React.createElement("div", { style: { fontFamily: fontFamily, fontSize: fontSizes[fontSizeIdx], display: 'inline-block' } },
            React.createElement(WorkhoursGrid, { rowHeight: rowHeight, color: "hsla(" + hslColor + ", 0.75)" })),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2", style: { padding: ' 0 2em' } },
                React.createElement("p", null,
                    "Row height: ",
                    rowHeight,
                    "px"),
                React.createElement("input", { type: 'range', min: 20, max: 100, value: rowHeight, onChange: function (e) { return setRowHeight(parseInt(e.target.value)); } })),
            React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2", style: { padding: ' 0 2em' } },
                React.createElement("p", null, "Color:"),
                React.createElement(HuePicker, { color: color, onChange: function (e) { return setColor(e.hsl); } })),
            React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2", style: { padding: ' 0 2em' } },
                React.createElement("p", null,
                    "Font size: ",
                    fontSizes[fontSizeIdx]),
                React.createElement("input", { type: 'range', min: 0, max: 8, value: fontSizeIdx, onChange: function (e) { return setFontSizeIdx(parseInt(e.target.value)); } })),
            React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2", style: { padding: ' 0 2em' } },
                React.createElement("p", null, "Font: "),
                React.createElement("select", { value: fontFamily, onChange: function (e) { return setFontFamily(e.target.value); } }, ['Helvetica', 'Trebuchet MS', 'Comic Sans MS', 'Courier New', 'Lucida Console'].map(function (value, idx) { return React.createElement("option", { key: idx, value: value }, value); }))))));
};
