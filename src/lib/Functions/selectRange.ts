import { State, Range, Column, Row, Location } from "../Common";

export function selectRange(state: State, range: Range, incremental: boolean): State {
    return {
        ...state,
        selectionMode: 'range',
        selectedRanges: (incremental ? state.selectedRanges : []).concat([range]),
        selectedIndexes: [],
        activeSelectedRangeIdx: incremental ? state.selectedRanges.length : 0
    };
}

export function updateActiveSelectedRange(state: State, range: Range): State {
    return {
        ...state,
        // replace active selected range in selectedRanges
        selectedRanges: Object.assign([], state.selectedRanges, { [state.activeSelectedRangeIdx]: range })
    }
}

export function selectOneColumn(state: State, col: Column, incremental: boolean): State {
    return {
        ...state,
        selectionMode: 'column',
        selectedIndexes: (incremental && state.selectionMode === 'column' ? state.selectedIndexes : []).concat(col.idx),
        selectedIds: (incremental && state.selectionMode === 'column' ? state.selectedIds : []).concat(col.id)
    };
}

export function unSelectOneColumn(state: State, col: Column): State {
    const updatedIndexes = state.selectedIndexes.filter(idx => idx !== col.idx);
    const updatedIds = state.selectedIds.filter(id => id !== col.id);

    return {
        ...state,
        selectionMode: 'column',
        selectedIndexes: updatedIndexes,
        selectedIds: updatedIds
    };
}

export function selectMultipleColumns(state: State, firstCol: Column, lastCol: Column, incremental?: boolean): State {
    const firstRow = state.cellMatrix.first.row;
    const lastRow = state.cellMatrix.last.row;
    const range = state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol));

    return {
        ...state,
        selectionMode: 'column',
        selectedIndexes: incremental ? state.selectedIndexes.concat(range.cols.map(col => col.idx)) : range.cols.map(col => col.idx),
        selectedIds: incremental ? state.selectedIds.concat(range.cols.map(col => col.id)) : range.cols.map(col => col.id)
    }
}

export function updateSelectedColumns(state: State): State {
    const firstRow = state.cellMatrix.first.row;
    const lastRow = state.cellMatrix.last.row;
    const updatedColumns = state.cellMatrix.cols.filter(r => state.selectedIds.includes(r.id)).sort((a, b) => a.idx - b.idx);

    const groupedColumns: Column[][] = [];
    let sortedColumnsIndex = 0;

    updatedColumns.forEach((current, index) => {
        if (!updatedColumns[index - 1]) {
            groupedColumns.push([current])
            return
        }
        const prev = updatedColumns[index - 1]
        if (current.idx - prev.idx == 1) {
            if (!groupedColumns[sortedColumnsIndex]) {
                groupedColumns.push([prev, current])
            } else {
                groupedColumns[sortedColumnsIndex].push(current)
            }
        } else {
            groupedColumns.push([current])
            sortedColumnsIndex += 1
        }
    })

    const ranges = groupedColumns.map(arr => state.cellMatrix.getRange(new Location(firstRow, arr[0]), new Location(lastRow, arr[arr.length - 1])));

    let activeSelectedRangeIdx!: number;

    ranges.forEach((range, idx) => {
        range.cols.forEach(col => {
            if (state.focusedLocation!.col.id === col.id) {
                activeSelectedRangeIdx = idx;
            }
        })
    });

    return {
        ...state,
        selectionMode: 'column',
        activeSelectedRangeIdx,
        selectedRanges: [...ranges],
        selectedIndexes: updatedColumns.map(col => col.idx),
        selectedIds: updatedColumns.map(col => col.id)
    }
}

export function selectOneRow(state: State, row: Row, incremental: boolean): State {
    return {
        ...state,
        selectionMode: 'row',
        selectedIndexes: (incremental && state.selectionMode === 'row' ? state.selectedIndexes : []).concat(row.idx),
        selectedIds: (incremental && state.selectionMode === 'row' ? state.selectedIds : []).concat(row.id)
    };
}

export function unSelectOneRow(state: State, row: Row): State {
    const updatedIndexes = state.selectedIndexes.filter(idx => idx !== row.idx);
    const updatedIds = state.selectedIds.filter(id => id !== row.id);

    return {
        ...state,
        selectionMode: 'row',
        selectedIndexes: updatedIndexes,
        selectedIds: updatedIds
    };
}

export function selectMultipleRows(state: State, firstRow: Row, lastRow: Row, incremental?: boolean): State {
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const range = state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol));

    return {
        ...state,
        selectionMode: 'row',
        selectedIndexes: incremental ? state.selectedIndexes.concat(range.rows.map(row => row.idx)) : range.rows.map(row => row.idx),
        selectedIds: incremental ? state.selectedIds.concat(range.rows.map(row => row.id)) : range.rows.map(row => row.id)
    }
}

export function updateSelectedRows(state: State): State {
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const updatedRows = state.cellMatrix.rows.filter(r => state.selectedIds.includes(r.id)).sort((a, b) => a.idx - b.idx);

    const groupedRows: Row[][] = [];
    let sortedRowsIndex = 0;

    updatedRows.forEach((current, index) => {
        if (!updatedRows[index - 1]) {
            groupedRows.push([current])
            return
        }
        const prev = updatedRows[index - 1]
        if (current.idx - prev.idx == 1) {
            if (!groupedRows[sortedRowsIndex]) {
                groupedRows.push([prev, current])
            } else {
                groupedRows[sortedRowsIndex].push(current)
            }
        } else {
            groupedRows.push([current])
            sortedRowsIndex += 1
        }
    })

    const ranges = groupedRows.map(arr => state.cellMatrix.getRange(new Location(arr[0], firstCol), new Location(arr[arr.length - 1], lastCol)));

    let activeSelectedRangeIdx!: number;

    ranges.forEach((range, idx) => {
        range.rows.forEach(row => {
            if (state.focusedLocation!.row.id === row.id) {
                activeSelectedRangeIdx = idx;
            }
        })
    });

    return {
        ...state,
        selectionMode: 'row',
        activeSelectedRangeIdx,
        selectedRanges: [...ranges],
        selectedIndexes: updatedRows.map(row => row.idx),
        selectedIds: updatedRows.map(row => row.id)
    }
}
