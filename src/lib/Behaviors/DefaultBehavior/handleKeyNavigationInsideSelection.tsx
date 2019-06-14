import { keyCodes } from '../../Common/Constants';
import { focusLocation } from '../../Functions';
import { State, KeyboardEvent, Location } from '../../Common';
import { getActiveSelectedRange } from '../../Functions/getActiveSelectedRange';

export function handleKeyNavigationInsideSelection(state: State, event: KeyboardEvent): State {
    const focusedCell = state.focusedLocation!;
    const cellMatrix = state.cellMatrix;
    const activeSelectedRange = getActiveSelectedRange(state)
    if (event.keyCode === keyCodes.TAB && !event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange(1, state);
        event.preventDefault();
    } else if (event.keyCode === keyCodes.TAB && event.shiftKey) {
        if (
            focusedCell.col.idx === 0 &&
            focusedCell.row.idx === activeSelectedRange.first.row.idx
        ) {
            focusLocation(state, new Location(activeSelectedRange.last.row, activeSelectedRange.last.col), false);
        } else {
            // TODO WHAT WITH THAT?
            moveFocusInsideSelectedRange(-1, state);
        }

        if (
            focusedCell.col.idx === activeSelectedRange.first.col.idx &&
            focusedCell.row.idx === activeSelectedRange.first.row.idx
        ) {
            focusLocation(state, new Location(activeSelectedRange.last.row, activeSelectedRange.last.col), false);
        }
        event.preventDefault();
    } else if (event.keyCode === keyCodes.ENTER && !event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange('down', state);
        event.preventDefault();
    } else if (event.keyCode === keyCodes.ENTER && event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange('up', state);
        if (focusedCell.row.idx === activeSelectedRange.first.row.idx) {
            focusLocation(state, new Location(activeSelectedRange.last.row, focusedCell.col), false);
        }
    } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedCell.col.idx > 0) {
        focusLocation(state, cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx - 1));
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.RIGHT_ARROW &&
        focusedCell.col.idx < cellMatrix.last.col.idx
    ) {
        focusLocation(state, cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx + 1));
    } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedCell.row.idx > 0) {
        focusLocation(state, cellMatrix.getLocation(focusedCell.row.idx - 1, focusedCell.col.idx));
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.DOWN_ARROW &&
        focusedCell.row.idx < cellMatrix.last.row.idx
    ) {
        focusLocation(state, cellMatrix.getLocation(focusedCell.row.idx + 1, focusedCell.col.idx));
    } else {
        // TODO 
        // return this.innerBehavior.handleKeyDown(event);
    }
    event.stopPropagation();
    return state;
}

const moveFocusInsideSelectedRange = (direction: -1 | 1 | 'up' | 'down', state: State) => {
    const selectedRange = getActiveSelectedRange(state)
    const focusedCell = state.focusedLocation!
    const selectedRangeIdx = state.activeSelectedRangeIdx
    const colCount = selectedRange.cols.length;
    const delta = direction === 'up' ? -colCount : direction === 'down' ? colCount : direction;

    const currentPosInRange =
        (focusedCell.row.idx - selectedRange.first.row.idx) * colCount +
        (focusedCell.col.idx - selectedRange.first.col.idx);
    const newPosInRange = (currentPosInRange + delta) % (selectedRange.rows.length * selectedRange.cols.length);
    if (newPosInRange === 0) {
        const nextSelectionRangeIdx = (selectedRangeIdx + 1) % state.selectedRanges.length;
        const nextSelection = state.selectedRanges[nextSelectionRangeIdx];
        state = focusLocation(state, new Location(nextSelection.first.row, nextSelection.first.col), false);
        return { activeSelectedRangeIdx: nextSelectionRangeIdx })
    } else {
        const newColIdx = selectedRange.first.col.idx + (newPosInRange % colCount);
        const newRowIdx = selectedRange.first.row.idx + Math.floor(newPosInRange / colCount);
        state = focusLocation(
            state,
            state.cellMatrix.getLocation(newRowIdx, newColIdx),
            selectedRange ? (selectedRange.cols.length > 1 || selectedRange.rows.length > 1 ? false : true) : true
        );
    }
}

