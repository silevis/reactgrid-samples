import { State, KeyboardEvent, keyCodes, Row, Location, Range } from "../../Common";
import { focusLocation, trySetDataAndAppendChange, getActiveSelectedRange } from "../../Functions";

export function handleKeyDown(state: State, event: KeyboardEvent): State {
    const location = state.focusedLocation;
    if (!location)
        return state


    const cellTemplate = state.cellTemplates[location.cell.type];
    if (cellTemplate.handleKeyDown) {
        const { cellData, enableEditMode } = cellTemplate.handleKeyDown(location.cell.data, event.keyCode, event.ctrlKey, event.shiftKey, event.altKey);
        if (location.cell.data !== cellData) { // any change => end here
            const newCell = { type: location.cell.type, data: cellData };
            if (enableEditMode) {
                return { ...state, currentlyEditedCell: newCell }
            } else {
                return trySetDataAndAppendChange(state, location, newCell);
            }
        }
    }

    if (event.altKey)
        return state;

    const asr = getActiveSelectedRange(state);
    const isSingleCellSelected = state.selectedRanges.length === 1 && asr.first.equals(asr.last);

    if (event.ctrlKey && event.shiftKey) {

        switch (event.keyCode) {
            case keyCodes.HOME:
                return resizeSelection(state, asr.first.col.idx, asr.last.col.idx, 0, asr.last.row.idx);
            case keyCodes.END:
                return resizeSelection(state, asr.first.col.idx, asr.last.col.idx, asr.first.row.idx, state.cellMatrix.last.row.idx)
        }


    } else if (event.ctrlKey) {

        switch (event.keyCode) {

            case keyCodes.A:
                const cm = state.cellMatrix;
                return { ...state, selectedRanges: [cm.getRange(cm.first, cm.last)], selectionMode: 'range', activeSelectedRangeIdx: 0 }
            case keyCodes.HOME:
                return focusCell(0, 0, state);
            case keyCodes.END:
                return focusLocation(state, state.cellMatrix.last);
            case keyCodes.SPACE:
                return resizeSelection(state, asr.first.col.idx, asr.last.col.idx, 0, state.cellMatrix.last.row.idx);
        }


    } else if (event.shiftKey) {

        switch (event.keyCode) {
            case keyCodes.UP_ARROW:
                return resizeSelectionUp(state, asr, location);
            case keyCodes.DOWN_ARROW:
                return resizeSelectionDown(state, asr, location);
            case keyCodes.LEFT_ARROW:
                return resizeSelectionLeft(state, asr, location);
            case keyCodes.RIGHT_ARROW:
                return resizeSelectionRight(state, asr, location);
            case keyCodes.TAB:
                return isSingleCellSelected ? moveFocusLeft(state) : moveFocusInsideSelectedRange(state, 'left', asr, location);
            case keyCodes.ENTER:
                return isSingleCellSelected ?
                    state.currentlyEditedCell ?
                        moveFocusUp(state) :
                        enableEditMode(state) :
                    moveFocusInsideSelectedRange(state, 'up', asr, location);
            case keyCodes.SPACE:
                return resizeSelection(state, 0, state.cellMatrix.last.col.idx, asr.first.row.idx, asr.last.row.idx);
            case keyCodes.HOME:
                return resizeSelection(state, 0, asr.last.col.idx, asr.first.row.idx, asr.last.row.idx);
            case keyCodes.END:
                return resizeSelection(state, asr.first.col.idx, state.cellMatrix.last.col.idx, asr.first.row.idx, asr.last.row.idx);

            case keyCodes.PAGE_UP:
            case keyCodes.PAGE_DOWN:
                // TODO resizeSelection
                return state;

        }

    } else {
        // === NO SHIFT OR CONTROL ===

        switch (event.keyCode) {
            case keyCodes.DELETE:
            case keyCodes.BACKSPACE:
                return wipeSelectedRanges(state);
            case keyCodes.UP_ARROW:
                return moveFocusUp(state);
            case keyCodes.DOWN_ARROW:
                return moveFocusDown(state);
            case keyCodes.LEFT_ARROW:
                return moveFocusLeft(state);
            case keyCodes.RIGHT_ARROW:
                return moveFocusRight(state);
            case keyCodes.TAB:
                return isSingleCellSelected ? moveFocusRight(state) : moveFocusInsideSelectedRange(state, 'right', asr, location);
            case keyCodes.HOME:
                return (state.focusedLocation) ? focusCell(0, state.focusedLocation.row.idx, state) : state;
            case keyCodes.END:
                return (state.focusedLocation) ? focusCell(state.cellMatrix.cols.length - 1, state.focusedLocation.row.idx, state) : state;
            case keyCodes.PAGE_UP:
                return moveFocusPageUp(state);
            case keyCodes.PAGE_DOWN:
                return moveFocusPageDown(state);
            case keyCodes.ENTER:
                return isSingleCellSelected ?
                    state.currentlyEditedCell ?
                        moveFocusDown(state) :
                        enableEditMode(state) :
                    moveFocusInsideSelectedRange(state, 'down', asr, location);
            case keyCodes.SPACE:
                return enableEditMode(state);

        }
    }

    return state;

}
// state.hiddenFocusElement.focus();


// const possibleCharactersToEnter = (event: KeyboardEvent) =>
//     (event.keyCode >= keyCodes.ZERO && event.keyCode <= keyCodes.Z) ||
//     (event.keyCode >= keyCodes.NUM_PAD_0 && event.keyCode <= keyCodes.DIVIDE) ||
//     (event.keyCode >= keyCodes.SEMI_COLON && event.keyCode <= keyCodes.SINGLE_QUOTE);

function enableEditMode(state: State): State {
    return state.focusedLocation ? ({ ...state, currentlyEditedCell: { ...state.focusedLocation.cell } }) : state;
}


function focusCell(colIdx: number, rowIdx: number, state: State): State {
    const location = state.cellMatrix.getLocation(rowIdx, colIdx);
    return focusLocation(state, location);
}

function moveFocusLeft(state: State): State {
    return (state.focusedLocation && state.focusedLocation.col.idx > 0) ?
        focusCell(state.focusedLocation.col.idx - 1, state.focusedLocation.row.idx, state) : state;
}

function moveFocusRight(state: State): State {
    return (state.focusedLocation && state.focusedLocation.col.idx < state.cellMatrix.last.col.idx) ?
        focusCell(state.focusedLocation.col.idx + 1, state.focusedLocation.row.idx, state) : state;
}

function moveFocusUp(state: State): State {
    return (state.focusedLocation && state.focusedLocation.row.idx > 0) ?
        focusCell(state.focusedLocation.col.idx, state.focusedLocation.row.idx - 1, state) : state;
}

function moveFocusDown(state: State): State {
    return (state.focusedLocation && state.focusedLocation.row.idx < state.cellMatrix.last.row.idx) ?
        focusCell(state.focusedLocation.col.idx, state.focusedLocation.row.idx + 1, state) : state;
}

// TODO this should be rewritten
function moveFocusPageUp(state: State): State {
    if (!state.focusedLocation)
        return state;
    const rowsOnScreen = state.cellMatrix.rows.filter(
        (r: Row) => r.top < state.viewportElement.clientHeight
    );
    return focusCell(
        state.focusedLocation.col.idx,
        state.focusedLocation.row.idx - rowsOnScreen.length > 0
            ? state.focusedLocation.row.idx - rowsOnScreen.length
            : 0, state
    );
}


// TODO this should be rewritten
function moveFocusPageDown(state: State): State {
    if (!state.focusedLocation)
        return state;

    const rowsOnScreen = state.cellMatrix.rows
        .slice(
            state.cellMatrix.frozenTopRange.rows.length,
            state.cellMatrix.rows.length -
            state.cellMatrix.frozenBottomRange.rows.length -
            1
        )
        .filter((r: Row) => r.top + r.height < state.viewportElement.clientHeight);
    return focusCell(
        state.focusedLocation.col.idx,
        state.focusedLocation.row.idx + rowsOnScreen.length < state.cellMatrix.rows.length
            ? state.focusedLocation.row.idx +
            rowsOnScreen.length -
            state.cellMatrix.frozenBottomRange.rows.length
            : state.cellMatrix.rows.length - 1, state
    );
}

function wipeSelectedRanges(state: State): State {
    state.selectedRanges.forEach(range =>
        range.rows.forEach(row =>
            range.cols.forEach(col =>
                state = trySetDataAndAppendChange(state, new Location(row, col), { type: 'text', data: '' })
            )
        )
    )
    return state;
}

function moveFocusInsideSelectedRange(state: State, direction: 'left' | 'right' | 'up' | 'down', asr: Range, location: Location): State {
    const selectedRangeIdx = state.activeSelectedRangeIdx
    const colCount = asr ? asr.cols.length : 0;
    const rowCount = asr ? asr.rows.length : 0;
    const delta = direction === 'up' || direction === 'left' ? -1 : 1;

    const currentPosInRange =
        direction === 'up' || direction === 'down'
            ? (location.row.idx - asr.first.row.idx) +
            (location.col.idx - asr.first.col.idx) * rowCount
            : (location.row.idx - asr.first.row.idx) * colCount +
            (location.col.idx - asr.first.col.idx);

    const newPosInRange = (currentPosInRange + delta) % (asr.rows.length * asr.cols.length);

    if ((newPosInRange < 0 && currentPosInRange === 0)) { // shift + tab/enter and first cell focused in active range
        const nextSelectionRangeIdx = selectedRangeIdx === 0 ? state.selectedRanges.length - 1 : (selectedRangeIdx - 1) % state.selectedRanges.length;
        const nextSelection = state.selectedRanges[nextSelectionRangeIdx];
        state = focusLocation(state, new Location(nextSelection.last.row, nextSelection.last.col), false);
        return { ...state, activeSelectedRangeIdx: nextSelectionRangeIdx }
    } else if (newPosInRange === 0 && currentPosInRange === (asr.rows.length * asr.cols.length) - 1) { // tab/enter and last cell focused in active range
        const nextSelectionRangeIdx = (selectedRangeIdx + 1) % state.selectedRanges.length;
        const nextSelection = state.selectedRanges[nextSelectionRangeIdx];
        state = focusLocation(state, new Location(nextSelection.first.row, nextSelection.first.col), false);
        return { ...state, activeSelectedRangeIdx: nextSelectionRangeIdx }
    } else { // tab/enter and all cells inside active range except last cell && shift + tab/enter and all cells inside active range except first cell
        const focusedCellColIdxInRange = direction === 'up' || direction === 'down' ? Math.floor(newPosInRange / rowCount) : newPosInRange % colCount;
        const focusedCellRowIdxInRange = direction === 'up' || direction === 'down' ? newPosInRange % rowCount : Math.floor(newPosInRange / colCount)
        const focusedCellColIdx = asr.first.col.idx + focusedCellColIdxInRange;
        const focusedCellRowIdx = asr.first.row.idx + focusedCellRowIdxInRange;
        state = focusLocation(
            state,
            state.cellMatrix.getLocation(focusedCellRowIdx, focusedCellColIdx),
            asr ? (asr.cols.length > 1 || asr.rows.length > 1 ? false : true) : true
        );
        return state;
    }
}

function resizeSelectionUp(state: State, asr: Range, location: Location): State {
    return (asr.first.row.idx > 0) ?
        (asr.last.row.idx > location.row.idx) ?
            resizeSelection(state, asr.first.col.idx, asr.last.col.idx, asr.first.row.idx, asr.last.row.idx - 1) :
            resizeSelection(state, asr.last.col.idx, asr.first.col.idx, asr.last.row.idx, asr.first.row.idx - 1) :
        state;
}

function resizeSelectionDown(state: State, asr: Range, location: Location): State {
    return (asr.last.row.idx < state.cellMatrix.last.row.idx) ?
        (asr.first.row.idx < location.row.idx) ?
            resizeSelection(state, asr.last.col.idx, asr.first.col.idx, asr.last.row.idx, asr.first.row.idx + 1) :
            resizeSelection(state, asr.first.col.idx, asr.last.col.idx, asr.first.row.idx, asr.last.row.idx + 1) :
        state;
}

function resizeSelectionLeft(state: State, asr: Range, location: Location): State {
    return (asr.first.col.idx > 0) ?
        (asr.last.col.idx > location.col.idx) ?
            resizeSelection(state, asr.first.col.idx, asr.last.col.idx - 1, asr.first.row.idx, asr.last.row.idx) :
            resizeSelection(state, asr.last.col.idx, asr.first.col.idx - 1, asr.last.row.idx, asr.first.row.idx) :
        state;
}

function resizeSelectionRight(state: State, asr: Range, location: Location): State {
    return (asr.last.col.idx < state.cellMatrix.last.col.idx) ?
        (asr.first.col.idx < location.col.idx) ?
            resizeSelection(state, asr.last.col.idx, asr.first.col.idx + 1, asr.last.row.idx, asr.first.row.idx) :
            resizeSelection(state, asr.first.col.idx, asr.last.col.idx + 1, asr.first.row.idx, asr.last.row.idx) :
        state;
}

function resizeSelection(state: State, firstColIdx: number, lastColIdx: number, firstRowIdx: number, lastRowIdx: number): State {
    if (state.disableRangeSelection)
        return state;

    const start = state.cellMatrix.getLocation(firstRowIdx, firstColIdx);
    const end = state.cellMatrix.getLocation(lastRowIdx, lastColIdx);
    let selectedRanges = state.selectedRanges.slice();
    selectedRanges[state.activeSelectedRangeIdx] = state.cellMatrix.getRange(start, end);
    // TODO implement scrolling
    // if (scroll)
    //     scrollIntoView(state, end);

    return { ...state, selectedRanges };
}

