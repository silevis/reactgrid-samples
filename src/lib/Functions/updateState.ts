import { State, Range, Column, Row, Location } from "../Common";

export function updateFocusedLocation(state: State): State {
    if (state.focusedLocation) {
        const newFocusedCol = state.cellMatrix.cols.find(c => c.id === state.focusedLocation!.col.id)
        const newFocusedRow = state.cellMatrix.rows.find(r => r.id === state.focusedLocation!.row.id)
        if (newFocusedCol && newFocusedRow) {
            const selectedRanges = state.selectedRanges;
            let focusedLocation = state.cellMatrix.getLocation(newFocusedRow.idx, newFocusedCol.idx);
            if (selectedRanges.length > 0 && !selectedRanges.some(range => range.contains(focusedLocation))) { // change focus position after unselection Row or Column which contains focus
                focusedLocation = state.cellMatrix.getLocation(selectedRanges[selectedRanges.length - 1].first.row.idx, selectedRanges[selectedRanges.length - 1].first.col.idx);
            }
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
    const rows = groupedRows(updatedRows);
    const ranges = rows.map(arr => state.cellMatrix.getRange(new Location(arr[0], firstCol), new Location(arr[arr.length - 1], lastCol)));
    let activeSelectedRangeIdx = state.selectedRanges.length - 1;

    if (state.focusedLocation) {
        ranges.forEach((range, idx) => {
            range.rows.forEach(row => {
                if (state.focusedLocation!.row.id === row.id) {
                    activeSelectedRangeIdx = idx;
                }
            })
        });
    }

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
    const columns = groupedColumns(updatedColumns)
    const ranges = columns.map(arr => state.cellMatrix.getRange(new Location(firstRow, arr[0]), new Location(lastRow, arr[arr.length - 1])));
    let activeSelectedRangeIdx = state.selectedRanges.length - 1;

    if (state.focusedLocation) {
        ranges.forEach((range, idx) => {
            range.cols.forEach(col => {
                if (state.focusedLocation!.col.id === col.id) {
                    activeSelectedRangeIdx = idx;
                }
            })
        });
    }

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
    const newSelectedRanges: Range[] = [];

    state.selectedRanges.forEach(range => {
        const rowIds = range.rows.map(row => row.id)
        const colIds = range.cols.map(col => col.id)
        const updatedRows = state.cellMatrix.rows.filter(r => rowIds.includes(r.id)).sort((a, b) => a.idx - b.idx);
        const updatedColumns = state.cellMatrix.cols.filter(c => colIds.includes(c.id)).sort((a, b) => a.idx - b.idx);
        const rows = groupedRows(updatedRows)
        const columns = groupedColumns(updatedColumns)

        columns.forEach(c => {
            rows.forEach(r => {
                newSelectedRanges.push(state.cellMatrix.getRange(new Location(r[0], c[0]), new Location(r[r.length - 1], c[c.length - 1])))
            })
        })
    })

    let activeSelectedRangeIdx = 0;

    if (state.focusedLocation && newSelectedRanges.length == 0) {
        const location = new Location(state.focusedLocation.row, state.focusedLocation.col)
        newSelectedRanges.push(state.cellMatrix.getRange(location, location))
    } else if (state.focusedLocation) {
        const location = new Location(state.focusedLocation.row, state.focusedLocation.col)
        const index = newSelectedRanges.findIndex(r => r.contains(location))
        if (index !== -1) {
            activeSelectedRangeIdx = index
        }
    }

    return {
        ...state,
        activeSelectedRangeIdx,
        selectedRanges: newSelectedRanges,
        selectionMode: 'range',
    }
}

const groupedRows = (array: Row[]) => {
    const grouped: Row[][] = [];
    let sortIndex = 0;
    array.forEach((current: Row, index) => {
        if (!array[index - 1]) {
            grouped.push([current])
            return
        }
        const prev: Row = array[index - 1]
        if (current.idx - prev.idx == 1) {
            if (!grouped[sortIndex]) {
                grouped.push([prev, current])
            } else {
                grouped[sortIndex].push(current)
            }
        } else {
            grouped.push([current])
            sortIndex += 1
        }
    })
    return grouped
}

const groupedColumns = (array: Column[]) => {
    const grouped: Column[][] = [];
    let sortIndex = 0;
    array.forEach((current: Column, index) => {
        if (!array[index - 1]) {
            grouped.push([current])
            return
        }
        const prev: Column = array[index - 1]
        if (current.idx - prev.idx == 1) {
            if (!grouped[sortIndex]) {
                grouped.push([prev, current])
            } else {
                grouped[sortIndex].push(current)
            }
        } else {
            grouped.push([current])
            sortIndex += 1
        }
    })
    return grouped
}