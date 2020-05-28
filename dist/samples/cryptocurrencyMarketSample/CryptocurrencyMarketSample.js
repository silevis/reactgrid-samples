var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useEffect, useRef, useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import styled from 'styled-components';
import { CssClassCellTemplate } from '../../cell-templates/cssClassCellTemplate/CssClassTemplate';
import { columns } from '../../data/cryptocurrencyMarket/columns';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
var fetchCryptocurrencyMarketData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var promise, currenciesAsJson, newRows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")];
            case 1:
                promise = _a.sent();
                return [4, promise.json()];
            case 2:
                currenciesAsJson = _a.sent();
                newRows = __spreadArrays([
                    {
                        rowId: 'header',
                        reorderable: false,
                        height: 25,
                        cells: __spreadArrays(columns.map(function (c) { return ({ type: 'header', text: c.columnId }); })),
                    }
                ], currenciesAsJson.map(function (item) {
                    return {
                        rowId: item.id,
                        reorderable: false,
                        height: 25,
                        cells: [
                            { type: 'number', value: item.market_cap_rank },
                            { type: 'text', text: item.name },
                            { type: 'text', text: item.symbol },
                            { type: 'cssClass', value: item.current_price },
                            { type: 'number', value: item.low_24h },
                            { type: 'number', value: item.high_24h },
                            { type: 'number', value: item.total_volume },
                        ]
                    };
                }));
                return [2, newRows];
        }
    });
}); };
export var CryptocurrencyMarketSample = function () {
    var _a = useState(function () { return ({
        columns: __spreadArrays(columns),
        rows: []
    }); }), state = _a[0], setState = _a[1];
    var returnRandomWith = function (numberOfRows) { return Math.floor(Math.random() * numberOfRows + 1); };
    var currentValueRandom = function (apiRows, numberOfRows) {
        var row = apiRows.find(function (_, idx) { return idx === numberOfRows; });
        if (!row)
            return 0;
        var min = row.cells[4].value;
        var max = row.cells[5].value;
        var randomValue = (Math.random() * (+max - +min) + +min);
        return parseFloat(randomValue.toFixed(6));
    };
    var findIdsChanged = function (itemID, dataApi) {
        var changedRowIds = [];
        dataApi.forEach(function (item, idx) {
            if (item.rowId === itemID) {
                changedRowIds = __spreadArrays(changedRowIds, [idx]);
            }
        });
        return changedRowIds;
    };
    var findChangedRows = function (dataState, dataApi) {
        if (!dataState)
            return [];
        return dataState.filter(function (data, idx) { return idx != 0 && data.cells[3].value !== dataApi[idx].cells[3].value; });
    };
    var useInterval = function (callback, delay) {
        var savedCallback = useRef();
        useEffect(function () {
            savedCallback.current = callback;
        }, [callback]);
        useEffect(function () {
            var tick = function () { return savedCallback.current(); };
            if (delay !== null) {
                var id_1 = setInterval(tick, delay);
                return function () { return clearInterval(id_1); };
            }
        }, [delay]);
    };
    useInterval(function () { return renderValue(); }, 3000);
    var renderValue = function () {
        fetchCryptocurrencyMarketData().then(function (res) {
            var dataApi = res;
            var dataState = __spreadArrays(state.rows);
            for (var i = 0; i < Math.floor(dataApi.length / 6); i++) {
                var changedIdx = returnRandomWith(dataApi.length);
                dataApi[changedIdx].cells[3].value = currentValueRandom(dataApi, changedIdx);
            }
            var cheangeRows = findChangedRows(dataState, dataApi);
            if (cheangeRows.length !== 0) {
                cheangeRows.forEach(function (row) {
                    var idsToChange = findIdsChanged(row.rowId, dataApi);
                    idsToChange.forEach(function (id) {
                        var valueFromApi = dataApi[id].cells[3].value;
                        var valueFromState = dataState[id].cells[3].value;
                        if (valueFromApi !== valueFromState) {
                            dataApi[id].cells[3].className = valueFromApi > valueFromState ? 'growth' : 'decrease';
                        }
                    });
                    idsToChange.length = 0;
                });
            }
            setState({ columns: __spreadArrays(state.columns), rows: dataApi });
        })
            .catch(console.error);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ReactGridContainer, { id: "cryptocurrency-market-sample" }, state.rows.length !== 0 ?
            React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                    'cssClass': new CssClassCellTemplate
                }, stickyTopRows: 1, disableFillHandle: true, enableRowSelection: true, enableColumnSelection: true })
            : React.createElement("span", { className: 'cryptocurrency-market-sample-loader' }, "Loading..."))));
};
var templateObject_1;
