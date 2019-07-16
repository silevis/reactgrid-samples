import { State, Range, Column, Row, Location } from "../Common";

export function updateFocusedLocation(state: State): State {
    if (state.focusedLocation) {
        const newFocusedCol = state.cellMatrix.cols.find(c => c.id === state.focusedLocation!.col.id)
        const newFocusedRow = state.cellMatrix.rows.find(r => r.id === state.focusedLocation!.row.id)
        if (newFocusedCol && newFocusedRow) {
            const focusedLocation = state.cellMatrix.getLocation(newFocusedRow.idx, newFocusedCol.idx)
            if (focusedLocation)
                return {
                    ...state,
                    focusedLocation
                }
        } else {
            return {
                ...state,
                focusedLocation: undefined
            }
        }
    }
    return state
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

export function updateSelectedRanges(state: State): State {
    const newSelectedRanges = [];
    state.selectedRanges.forEach(range => {
        const rowIds = range.rows.map(row => row.id)
        const colIds = range.cols.map(col => col.id)
        const updatedRows = state.cellMatrix.rows.filter(r => rowIds.includes(r.id)).sort((a, b) => a.idx - b.idx);
        const updatedColumns = state.cellMatrix.cols.filter(c => colIds.includes(c.id)).sort((a, b) => a.idx - b.idx);

        const groupedRows: Row[][] = [];
        const groupedColumns: Column[][] = [];

        let sortedColumnsIndex = 0;
        let sortedRowsIndex = 0;

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

        console.log(groupedColumns)

    })
    return state
}