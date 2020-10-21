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
export var noBorder = {
    color: 'rgba(0,0,0,0)'
};
export var noBorderCellStyle = {
    border: {
        left: noBorder,
        top: noBorder,
        right: noBorder,
    }
};
export var addColorToEvenColumns = function (row) { return (__assign(__assign({}, row), { cells: row.cells.map(function (cell, idx) { return idx % 2 === 0 && idx > 1
        ? __assign(__assign({}, cell), { style: __assign(__assign({}, cell.style), { background: 'rgba(0,0,0,0.05)' }) }) : cell; }) })); };
