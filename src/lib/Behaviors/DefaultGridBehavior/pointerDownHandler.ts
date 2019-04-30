import { GridContext, PointerEvent, CellMatrix, Location, Range } from "../../Common";
import { getLocationFromClient } from "../../Functions";
import { Utilities } from "../../Common/Utilities";

export function pointerDownHandler(gridContext: GridContext, event: PointerEvent, selectionMode: string) {
    const focusedLocation = getLocationFromClient(gridContext, event.clientX, event.clientY);
    const cellMatrix = gridContext.cellMatrix;

    if (gridContext.state.focusedLocation &&
        gridContext.state.focusedLocation.col.idx === focusedLocation.col.idx && 
        gridContext.state.focusedLocation.row.idx === focusedLocation.row.idx && selectionMode === 'range') {
        if (gridContext.state.isFocusedCellInEditMode) { 
            return;
        }
    } else {
        if (selectionMode === 'column') {
            const range = cellMatrix.getRange(focusedLocation, {
                row: cellMatrix.rows[cellMatrix.rows.length - 1],
                col: focusedLocation.col
            });
            let selectedIndexes: number[] = gridContext.state.selectionMode !== selectionMode ? [] : gridContext.state.selectedIndexes;
            // if (event.type === 'mousedown') {
                if (event.ctrlKey) {
                    toggleColumn(gridContext, event, selectedIndexes, focusedLocation, range);
                } else {
                    selectedIndexes = [];
                    selectedIndexes.push(focusedLocation.col.idx);
                    gridContext.setState({
                        selectedIndexes,
                        selectionMode,
                        focusedLocation,
                        selectedRanges: [range]
                    });
                }
            // } else if (event.type === 'click') {
                // this.toggleColumn(event, selectedColsIdx, focusedLocation, cellMatrix, range);
            // }
        }  else if (selectionMode === 'row') {
            const range = cellMatrix.getRange(focusedLocation, {
                row: focusedLocation.row,
                col: cellMatrix.cols[cellMatrix.cols.length - 1]
            });
            let selectedIndexes: number[] = gridContext.state.selectionMode !== selectionMode ? [] : gridContext.state.selectedIndexes;
            // if (event.type === 'mousedown') {
                if (event.ctrlKey) {
                    toggleRow(gridContext, event, selectedIndexes, focusedLocation, range);
                } else {
                    selectedIndexes = [];
                    selectedIndexes.push(focusedLocation.row.idx);
                    gridContext.setState({
                        selectedIndexes,
                        selectionMode,
                        focusedLocation,
                        selectedRanges: [range]
                    });
                }
            // } else if (event.type === 'click') {
                // this.toggleRow(event, selectedRowsIdx, focusedLocation, cellMatrix, range);
            // }
        } else if (selectionMode === 'range') {
            // focusLocation(gridContext, focusedLocation, !event.ctrlKey); 
            if (event.ctrlKey) {
                if (!Utilities.isFocusedLocationInsideSelectedRanges(gridContext.state.selectedRanges, focusedLocation)) {
                    console.log(gridContext.state.selectionMode)
                    console.log(selectionMode)
                    gridContext.setState({
                        selectedIndexes: [],
                        focusedLocation,
                        selectionMode,
                        selectedRanges:
                            gridContext.state.selectionMode !== selectionMode
                                ? (<Range[]>[]).concat([gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)])          
                                : gridContext.state.selectedRanges.concat([gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)]) 
                    });
                }
            } else {
                gridContext.setState({
                    selectedIndexes: [],
                    focusedLocation,
                    selectionMode,
                    selectedRanges: [gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)]
                });
            }
        }
    }
}

export function toggleRow(gridContext: GridContext, event: any, selectedRowsIdx: number[], focusedLocation: Location, range: any) {
    if (selectedRowsIdx.some(idx => idx === focusedLocation.row.idx)) {
        if (selectedRowsIdx.length > 1) {
            selectedRowsIdx = selectedRowsIdx.filter(r => r !== focusedLocation.row.idx);
            gridContext.setState({
                selectedIndexes: selectedRowsIdx,
                selectionMode: 'row',
                focusedLocation: gridContext.cellMatrix.getLocation(selectedRowsIdx[selectedRowsIdx.length - 1], 0),
                selectedRanges: gridContext.state.selectedRanges.filter(
                    r => r.first.row.idx !== focusedLocation.row.idx
                )
            });
        }
    } else {
        selectedRowsIdx.push(focusedLocation.row.idx);
        const selectedRanges =
            gridContext.state.selectionMode === 'row' ?
                event.type === 'click'
                    ? selectedRowsIdx.length === 1
                        ? [].concat(range)
                        : gridContext.state.selectedRanges.concat(range)
                    : gridContext.state.selectedRanges.concat(range)
                : [].concat(range);
        gridContext.setState({
            selectedIndexes: selectedRowsIdx,
            selectionMode: 'row',
            focusedLocation: focusedLocation,
            selectedRanges
        });
    }
}

export function toggleColumn(gridContext: GridContext, event: any, selectedColsIdx: number[], focusedLocation: Location, range: any ) {
    if (selectedColsIdx.some(idx => idx === focusedLocation.col.idx)) {
        if (selectedColsIdx.length > 1) {
            selectedColsIdx = selectedColsIdx.filter(r => r !== focusedLocation.col.idx);
            gridContext.setState({
                selectedIndexes: selectedColsIdx,
                selectionMode: 'column',
                focusedLocation: gridContext.cellMatrix.getLocation(0, selectedColsIdx[selectedColsIdx.length - 1]),
                selectedRanges: gridContext.state.selectedRanges.filter(
                    r => r.first.col.idx !== focusedLocation.col.idx
                )
            });
        }
    } else {
        selectedColsIdx.push(focusedLocation.col.idx);
        const selectedRanges =
            gridContext.state.selectionMode === 'column' ?
                event.type === 'click'
                    ? selectedColsIdx.length === 1
                        ? [].concat(range)
                        : gridContext.state.selectedRanges.concat(range)
                    : gridContext.state.selectedRanges.concat(range)
                : [].concat(range);
        gridContext.setState({
            selectedIndexes: selectedColsIdx,
            selectionMode: 'column',
            focusedLocation: focusedLocation,
            selectedRanges
        });
    }
}