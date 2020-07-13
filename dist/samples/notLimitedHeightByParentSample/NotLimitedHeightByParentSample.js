import * as React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
export var NotLimitedHeightByParentSample = function () {
    var _a = React.useState(function () { return ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }); }), state = _a[0], setState = _a[1];
    return (React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
            'rate': new RateCellTemplate,
            'flag': new FlagCellTemplate
        }, stickyTopRows: 1, enableFillHandle: true, enableRangeSelection: true }));
};
