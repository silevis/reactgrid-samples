import { State, Range, Column, Row, Location, Id } from "../Common";

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

export function selectColumn(state: State, column: Column, incremental: boolean): State {
    const firstRow = state.cellMatrix.first.row;
    const lastRow = state.cellMatrix.last.row;
    const range = state.cellMatrix.getRange(new Location(firstRow, column), new Location(lastRow, column))
    return {
        ...state,
        selectionMode: 'column',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: (incremental && state.selectionMode === 'column' ? state.selectedRanges : []).concat(range),
        selectedIndexes: (incremental && state.selectionMode === 'column' ? state.selectedIndexes : []).concat(column.idx),
        selectedIds: (incremental && state.selectionMode === 'column' ? state.selectedIndexes : []).concat(column.id as number),
    };
}

export function updateActiveSelectedColumns(state: State, firstColumn: Column, lastColumn: Column, incremental: boolean): State {
    // TODO THIS! 

    const firstRow = state.cellMatrix.first.row;
    const lastRow = state.cellMatrix.last.row;
    const range = state.cellMatrix.getRange(new Location(firstRow, firstColumn), new Location(lastRow, lastColumn))
    return {
        ...state,
        selectionMode: 'column',
        // TODO Ranges have to be re-calculated during render
        selectedRanges: [range],
        selectedIndexes: range.cols.map(col => col.idx),
        selectedIds: range.cols.map(row => row.id),
    };
}

export function selectRow(state: State, row: Row, incremental: boolean): State {
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const range = state.cellMatrix.getRange(new Location(row, firstCol), new Location(row, lastCol))
    return {
        ...state,
        selectionMode: 'row',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: (incremental && state.selectionMode === 'row' ? state.selectedRanges : []).concat(range),
        selectedIndexes: (incremental && state.selectionMode === 'row' ? state.selectedIndexes : []).concat(row.idx),
        selectedIds: (incremental && state.selectionMode === 'column' ? state.selectedIndexes : []).concat(row.id as number),
    };
}

export function updateSelectedRows(state: State, ids: Id[], incremental?: boolean): State {
    // TODO THIS! 
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const newRows = state.cellMatrix.rows.filter(r => ids.includes(r.id));

    const firstRow = state.cellMatrix.rows.find(row => row.id === ids[0])!;
    const lastRow = state.cellMatrix.rows.find(row => row.id === ids[ids.length - 1])!;

    // const ranges = newRows.map(r => state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol)));
    const range = state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol));

    return {
        ...state,
        selectionMode: 'row',
        selectedRanges: [range],
        selectedIndexes: newRows.map(row => row.idx),
        selectedIds: newRows.map(row => row.id)
    }
}

export function updateActiveSelectedRows(state: State, firstRowId: Id, lastRowId: Id, incremental?: boolean): State {
    // TODO THIS! 
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;

    const firstRow = state.cellMatrix.rows.find(row => row.id === firstRowId)!;
    const lastRow = state.cellMatrix.rows.find(row => row.id === lastRowId)!;

    const range = state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol));

    return {
        ...state,
        selectionMode: 'row',
        selectedIds: range.rows.map(row => row.id)
    }
}
