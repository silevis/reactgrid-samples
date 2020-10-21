var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import { DisabledCellTemplate } from '../../cell-templates/disabledCellTemplate/DisabledCellTemplate';
import { initialAthletes, initialExcercises, initialResults, parameters } from '../../data/excercisesData/initialValues';
import { getAthletesRow } from './getAthletesRow';
import { getExcerciseRows } from './getExcerciseRows';
import { addColorToEvenColumns } from './utils';
import './styling.scss';
export var ExcercisesDataSample = function () {
    var _a = __read(useState(initialAthletes), 1), athletes = _a[0];
    var _b = __read(useState(initialExcercises), 2), excercises = _b[0], setExcercises = _b[1];
    var _c = __read(useState(initialResults), 2), results = _c[0], setResults = _c[1];
    var columns = __spread([
        { columnId: 'excercise', width: 240 }
    ], athletes.map(function (athlete) { return ({ columnId: athlete.id, width: 150 }); }));
    var athletesRow = getAthletesRow(athletes);
    var rows = excercises.flatMap(function (excercise) {
        return getExcerciseRows(excercise, athletes, results.filter(function (result) { return result.excerciseId === excercise.id; }));
    });
    var cellChangesHandler = function (changes) {
        changes.forEach(function (change) {
            if (change.columnId === 'excercise') {
                setExcercises(function (excercises) {
                    return excercises.map(function (excercise) { return excercise.id === change.rowId
                        ? __assign(__assign({}, excercise), { hidden: !change.newCell.isExpanded }) : excercise; });
                });
                return;
            }
            var param = parameters.find(function (param) { return param.id === change.rowId; });
            if (!param)
                return;
            var athleteId = change.columnId.toString();
            setResults(function (oldResults) {
                var resultIdx = oldResults.findIndex(function (oldResult) {
                    return oldResult.parameterId === param.id && oldResult.athleteId === athleteId;
                });
                var value = change.newCell.value;
                if (resultIdx > -1) {
                    oldResults[resultIdx] = __assign(__assign({}, oldResults[resultIdx]), { value: value });
                    return __spread(oldResults);
                }
                return __spread(oldResults, [{ athleteId: athleteId, excerciseId: param.excerciseId, parameterId: param.id, value: value }]);
            });
        });
    };
    return React.createElement("div", { className: "excercises-data-sample" },
        React.createElement(ReactGrid, { customCellTemplates: {
                'disabled': DisabledCellTemplate,
            }, columns: columns, stickyTopRows: 1, stickyLeftColumns: 1, onCellsChanged: cellChangesHandler, rows: __spread([athletesRow], rows).map(addColorToEvenColumns), enableRangeSelection: true }));
};
