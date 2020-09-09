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
export var getChevronCell = function (row) { return row.cells.find(function (cell) { return cell.type === 'chevron'; }); };
var hasChildren = function (rows, row) { return rows.some(function (r) { var _a; return ((_a = getChevronCell(r)) === null || _a === void 0 ? void 0 : _a.parentId) === row.rowId; }); };
var isRowFullyExpanded = function (rows, row) {
    var parentRow = getParentRow(rows, row);
    if (parentRow) {
        if (!getChevronCell(parentRow).isExpanded)
            return false;
        return isRowFullyExpanded(rows, parentRow);
    }
    return true;
};
export var getExpandedRows = function (rows) { return rows.filter(function (row) {
    var areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
}); };
export var fillCellMatrixHorizontally = function (rows) { return rows.map(function (row) {
    var mappedCells = row.cells.map(function (cell, idx) { return ({ className: cell.className, idx: idx }); });
    mappedCells
        .filter(function (mappedCell) { var _a; return (_a = mappedCell.className) === null || _a === void 0 ? void 0 : _a.includes('quarter'); })
        .forEach(function (mappedCell) {
        var cells = row.cells;
        cells[mappedCell.idx].value = cells[mappedCell.idx + 1].value + cells[mappedCell.idx + 2].value + cells[mappedCell.idx + 3].value;
    });
    mappedCells
        .filter(function (mappedCell) { var _a; return (_a = mappedCell.className) === null || _a === void 0 ? void 0 : _a.includes('year'); })
        .forEach(function (mappedCell) {
        var cells = row.cells;
        cells[mappedCell.idx].value = cells[mappedCell.idx + 1].value + cells[mappedCell.idx + 5].value
            + cells[mappedCell.idx + 9].value + cells[mappedCell.idx + 13].value;
    });
    return row;
}); };
export var resetAggregatedMonthFields = function (row) {
    row.cells.forEach(function (cell) {
        if ((cell.type === 'number' || cell.type === 'nonEditableNumber') && cell.className === 'month') {
            cell.value = 0;
        }
    });
};
export var fillCellMatrixVertically = function (rows) {
    collectRowPairs(rows).forEach(function (rowPair) {
        rowPair.from.cells.forEach(function (_, idx) {
            var fromCell = rowPair.from.cells[idx];
            var toCell = rowPair.to.cells[idx];
            if (fromCell.type === 'number' || fromCell.type === 'nonEditableNumber') {
                var from = isNaN(fromCell.value) ? 0 : fromCell.value;
                var to = isNaN(toCell.value) ? 0 : toCell.value;
                toCell.value = from + to;
            }
        });
    });
};
export var collectRowPairs = function (rows) {
    var acc = [];
    rows.forEach(function (row) {
        var chevronCell = getChevronCell(row);
        if (chevronCell && chevronCell.parentId === undefined) {
            var hasRowChildrens = hasChildren(rows, row);
            if (hasRowChildrens) {
                collectRowPairsOnChildren(rows, row, acc);
                resetAggregatedMonthFields(row);
            }
            ;
        }
    });
    return acc;
};
var collectRowPairsOnChildren = function (allRows, parentRow, acc) {
    getDirectChildrenRows(allRows, parentRow).forEach(function (row) {
        var hasRowChildrens = hasChildren(allRows, row);
        if (hasRowChildrens) {
            collectRowPairsOnChildren(allRows, row, acc);
            resetAggregatedMonthFields(row);
        }
        acc.push({ from: row, to: parentRow });
    });
};
export var getDirectChildrenRows = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'chevron' && cell.parentId === parentRow.rowId; }); }); };
export var getParentRow = function (rows, row) { return rows.find(function (r) { var _a; return r.rowId === ((_a = getChevronCell(row)) === null || _a === void 0 ? void 0 : _a.parentId); }); };
var assignIndentAndHasChildrens = function (allRows, parentRow, indent) {
    ++indent;
    getDirectChildrenRows(allRows, parentRow).forEach(function (row) {
        var chevronCell = getChevronCell(row);
        chevronCell.indent = indent;
        var hasRowChildrens = hasChildren(allRows, row);
        chevronCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens)
            assignIndentAndHasChildrens(allRows, row, indent);
    });
};
export var getDataFromRows = function (rows) { return rows.filter(function (row) { return row.cells.find(function (cell) { return cell.type === 'chevron'; }) !== undefined; }); };
export var createIndents = function (rows) { return rows.map(function (row) {
    var chevronCell = getChevronCell(row);
    if (chevronCell && chevronCell.parentId === undefined) {
        var hasRowChildrens = hasChildren(rows, row);
        chevronCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens)
            assignIndentAndHasChildrens(rows, row, 0);
    }
    return row;
}); };
export var isHorizontalChevronCell = function (cell) { return cell.type === 'horizontalChevron'; };
export var extendWithColIds = function (row, columns) {
    row.cells.forEach(function (cell, idx) { var _a; return cell.columnId = (_a = columns[idx]) === null || _a === void 0 ? void 0 : _a.columnId; });
    return row;
};
export var getDataFromColumns = function (columns) { return columns.slice(1, columns.length); };
export var getHorizontalChevronCell = function (cells, columnId) { return cells.find(function (cell) { return cell.type === 'horizontalChevron' && cell.parentId === columnId; }); };
export var getParentCell = function (cells, cell) { return cells.find(function (c) { return c.columnId === cell.parentId; }); };
export var getDirectChildrenColumns = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'horizontalChevron' && cell.parentId === parentRow.rowId; }); }); };
export var isCellFullyExpanded = function (cells, cell) {
    var parentCell = getParentCell(cells, cell);
    if (parentCell) {
        if (!parentCell.isExpanded)
            return false;
        return isCellFullyExpanded(cells, parentCell);
    }
    return true;
};
export var getExpandedCells = function (cells) { return cells.filter(function (cell) {
    var areAllParentsExpanded = isCellFullyExpanded(cells, cell);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
}); };
export var getColumnsIdsxToRender = function (cells, columnsToRender) {
    return cells.map(function (thrCell, idx) {
        return columnsToRender.find(function (colToRender) { return colToRender.columnId === thrCell.columnId; }) ? idx : NaN;
    })
        .filter(function (idx) { return !isNaN(idx); });
};
export var filterCellsOnRows = function (rows, visibleColsIdxs) { return rows.map(function (row) {
    var cells = row.cells.filter(function (_, idx) { return visibleColsIdxs.includes(idx); });
    return __assign(__assign({}, row), { cells: cells });
}); };
