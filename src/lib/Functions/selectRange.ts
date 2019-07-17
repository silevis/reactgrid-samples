import { State, Range, Column, Row, Location } from "../Common";

export function selectRange(state: State, range: Range, incremental: boolean): State {
    return {
        ...state,
        selectionMode: 'range',
        selectedRanges: (incremental && state.selectionMode === 'range' ? state.selectedRanges : []).concat([range]),
        selectedIndexes: [],
        selectedIds: [],
        activeSelectedRangeIdx: incremental && state.selectionMode === 'range' ? state.selectedRanges.length : 0
    };
}

export function updateActiveSelectedRange(state: State, range: Range): State {
    return {
        ...state,
        selectionMode: 'range',
        // replace active selected range in selectedRanges
        selectedRanges: Object.assign([], state.selectedRanges, { [state.activeSelectedRangeIdx]: range }),
        selectedIndexes: [],
        selectedIds: []
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
