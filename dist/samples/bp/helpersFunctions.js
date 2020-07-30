export var getGroupCell = function (row) { return row.cells.find(function (cell) { return cell.type === 'group'; }); };
var hasChildren = function (rows, row) { return rows.some(function (r) { var _a; return ((_a = getGroupCell(r)) === null || _a === void 0 ? void 0 : _a.parentId) === row.rowId; }); };
var isRowFullyExpanded = function (rows, row) {
    var parentRow = getParentRow(rows, row);
    if (parentRow) {
        if (!getGroupCell(parentRow).isExpanded)
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
var resetAggregatedMonthFields = function (row) {
    row.cells.forEach(function (cell) {
        if (cell.type === 'number' || cell.type === 'nonEditableNumber') {
            cell.value = NaN;
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
        var groupCell = getGroupCell(row);
        if (groupCell && groupCell.parentId === undefined) {
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
export var getDirectChildrenRows = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'group' && cell.parentId === parentRow.rowId; }); }); };
export var getParentRow = function (rows, row) { return rows.find(function (r) { var _a; return r.rowId === ((_a = getGroupCell(row)) === null || _a === void 0 ? void 0 : _a.parentId); }); };
var assignIndentAndHasChildrens = function (allRows, parentRow, indent) {
    ++indent;
    getDirectChildrenRows(allRows, parentRow).forEach(function (row) {
        var groupCell = getGroupCell(row);
        groupCell.indent = indent;
        var hasRowChildrens = hasChildren(allRows, row);
        groupCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens)
            assignIndentAndHasChildrens(allRows, row, indent);
    });
};
export var getDataFromRows = function (rows) { return rows.filter(function (row) { return row.cells.find(function (cell) { return cell.type === 'group'; }) !== undefined; }); };
export var createIndents = function (rows) { return rows.map(function (row) {
    var groupCell = getGroupCell(row);
    if (groupCell && groupCell.parentId === undefined) {
        var hasRowChildrens = hasChildren(rows, row);
        groupCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens)
            assignIndentAndHasChildrens(rows, row, 0);
    }
    return row;
}); };
export var getDataFromColumns = function (columns) { return columns.slice(1, columns.length); };
export var getHorizontalGroupCell = function (cells, columnId) { return cells.find(function (cell) { return cell.type === 'horizontalGroup' && cell.parentId === columnId; }); };
export var getDirectChildrenColumns = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'horizontalGroup' && cell.parentId === parentRow.rowId; }); }); };
export var isColumnFullyExpanded = function (rows, row) {
    return true;
};
export var getExpandedColumns = function (rows) { return rows.filter(function (row) {
    var areAllParentsExpanded = isColumnFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
}); };
