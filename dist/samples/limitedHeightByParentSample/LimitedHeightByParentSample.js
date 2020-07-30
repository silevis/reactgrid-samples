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
import * as React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
export var LimitedHeightByParentSample = function () {
    var _a = __read(React.useState(function () { return ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }); }), 1), state = _a[0];
    return (React.createElement("div", { className: "test-grid-container", style: {
            height: 150,
            overflow: 'auto'
        } },
        React.createElement("h1", null, "Content inside"),
        " Example Content",
        React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                'rate': new RateCellTemplate(),
                'flag': new FlagCellTemplate(),
            }, stickyTopRows: 1, enableFillHandle: true, enableRangeSelection: true })));
};
