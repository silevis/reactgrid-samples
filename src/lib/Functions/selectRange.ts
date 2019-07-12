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
        // selectedRanges: (incremental && state.selectionMode === 'row' ? state.selectedRanges : []).concat(range),
        selectedIndexes: (incremental && state.selectionMode === 'row' ? state.selectedIndexes : []).concat(row.idx),
        selectedIds: (incremental && state.selectionMode === 'row' ? state.selectedIds : []).concat(row.id as number),
    };
}

export function updateSelectedRows(state: State, incremental?: boolean): State {
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const updatedRows = state.cellMatrix.rows.filter(r => state.selectedIds.includes(r.id)).sort((a, b) => a.idx - b.idx);

    const groupedRows: Row[][] = [];
    let sortedRowsIndex = 0;

    console.log(updatedRows)

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
            sortedRowsIndex += 1
        }
    })

    const ranges = groupedRows.map(arr => state.cellMatrix.getRange(new Location(arr[0], firstCol), new Location(arr[arr.length - 1], lastCol)))

    return {
        ...state,
        selectionMode: 'row',
        selectedRanges: [...ranges],
        selectedIndexes: updatedRows.map(row => row.idx),
        selectedIds: updatedRows.map(row => row.id)
    }
}

export function selectRows(state: State, firstRow: Row, lastRow: Row, incremental?: boolean): State {
    // TODO THIS! 
    const firstCol = state.cellMatrix.first.col;
    const lastCol = state.cellMatrix.last.col;
    const range = state.cellMatrix.getRange(new Location(firstRow, firstCol), new Location(lastRow, lastCol));

    return {
        ...state,
        selectionMode: 'row',
        selectedIds: range.rows.map(row => row.id)
    }
}
