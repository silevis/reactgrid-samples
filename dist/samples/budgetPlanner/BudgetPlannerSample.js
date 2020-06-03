var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect, useCallback } from 'react';
import BudgetPlannerDisplay from './BudgetPlannerDisplay';
import DataFilterOptions from './DataFilterOptions';
import { getDates } from './dates';
import "./budget-planner.scss";
import "./budget-planner.scss";
export var BudgetPlannerSample = function () {
    var span = useState('month')[0];
    var _a = useState([]), values = _a[0], setValues = _a[1];
    var _b = useState([]), variables = _b[0], setVariables = _b[1];
    var _c = useState([]), dates = _c[0], setDates = _c[1];
    var fetchBudgetPlannerData = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var budgetPlannerVariable, dates;
        return __generator(this, function (_a) {
            budgetPlannerVariable = [{
                    "_id": "5ece7cd19542be0001b1044h",
                    "project": "Teamspot",
                    "job position": "Programmer",
                    "name": "Krzysztof"
                },
                {
                    "_id": "5ece7cd19542be0001b104yy",
                    "project": "Teamspot",
                    "job position": "Programmer",
                    "name": "Adrian"
                },
                {
                    "_id": "5ece7cd19542be0001b104nn",
                    "project": "Teamspot",
                    "job position": "Project manager",
                    "name": "Arek"
                },
                {
                    "_id": "5ece7cd19542be0001b104rr",
                    "project": "ReactGrid",
                    "job position": "Programmer",
                    "name": "Kamil"
                },
                {
                    "_id": "5ece7cd42542be0001b104rr",
                    "project": "ReactGrid",
                    "job position": "Programmer",
                    "name": "Patryk"
                },
                {
                    "_id": "5ece7cd19542be0001b10ww",
                    "project": "ReactGrid",
                    "job position": "Project manager",
                    "name": "Arek"
                },
                {
                    "_id": "5ece7cd19542be0dcv1b10ww",
                    "project": "CallCenter",
                    "job position": "Project manager",
                    "name": "Arek"
                },];
            setVariables(budgetPlannerVariable);
            dates = getDates(null, 'month');
            setDates(dates);
            setValues(values);
            return [2];
        });
    }); }, []);
    useEffect(function () {
        fetchBudgetPlannerData();
    }, [fetchBudgetPlannerData]);
    var onGetValuesFilterOptions = function (valuesFilterOptions) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setValues(values);
            setDates(getDates(valuesFilterOptions, 'month'));
            return [2];
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { id: "variable-views-budget-planner" },
            React.createElement("div", { id: "budget-planning-container" },
                React.createElement("h3", { className: "w100" }, "Values Options")),
            React.createElement("div", { id: "budget-planning-container" },
                React.createElement(DataFilterOptions, { onGetValuesFilterOptions: onGetValuesFilterOptions })),
            React.createElement(BudgetPlannerDisplay, { values: values, variables: variables, dates: dates, span: span }))));
};
export default BudgetPlannerSample;
