import { keyCodes } from '../../Common/Constants';
import { focusLocation } from '../../Functions';
import { State, KeyboardEvent, Location } from '../../Common';
import { getActiveSelectedRange } from '../../Functions/getActiveSelectedRange';

export function handleKeyNavigationInsideSelection(state: State, event: KeyboardEvent): State {
    event.preventDefault();
    if (event.keyCode === keyCodes.TAB && !event.shiftKey) {
        return moveFocusInsideSelectedRange('right', state);
    } else if (event.keyCode === keyCodes.TAB && event.shiftKey) {
        return moveFocusInsideSelectedRange('left', state);
    } else if (event.keyCode === keyCodes.ENTER && !event.shiftKey) {
        return moveFocusInsideSelectedRange('down', state);
    } else if (event.keyCode === keyCodes.ENTER && event.shiftKey) {
        return moveFocusInsideSelectedRange('up', state);
    }
    return state;
}

export function moveFocusInsideSelectedRange(direction: 'left' | 'right' | 'up' | 'down', state: State): State {
    const activeSelectedRange = getActiveSelectedRange(state)
    const focusedCell = state.focusedLocation!
    const selectedRangeIdx = state.activeSelectedRangeIdx
    const colCount = activeSelectedRange.cols.length;
    const rowCount = activeSelectedRange.rows.length;
    const delta = direction === 'up' || direction === 'left' ? -1 : 1;

    const currentPosInRange =
        direction === 'up' || direction === 'down'
            ? (focusedCell.row.idx - activeSelectedRange.first.row.idx) +
            (focusedCell.col.idx - activeSelectedRange.first.col.idx) * rowCount
            : (focusedCell.row.idx - activeSelectedRange.first.row.idx) * colCount +
            (focusedCell.col.idx - activeSelectedRange.first.col.idx);

    const newPosInRange = (currentPosInRange + delta) % (activeSelectedRange.rows.length * activeSelectedRange.cols.length);

    if ((newPosInRange < 0 && currentPosInRange === 0)) { // shift + tab/enter and first cell focused in active range
        const nextSelectionRangeIdx = selectedRangeIdx === 0 ? state.selectedRanges.length - 1 : (selectedRangeIdx - 1) % state.selectedRanges.length;
        const nextSelection = state.selectedRanges[nextSelectionRangeIdx];
        state = focusLocation(state, new Location(nextSelection.last.row, nextSelection.last.col), false);
        return { ...state, activeSelectedRangeIdx: nextSelectionRangeIdx }
    } else if (newPosInRange === 0 && currentPosInRange === (activeSelectedRange.rows.length * activeSelectedRange.cols.length) - 1) { // tab/enter and last cell focused in active range
        const nextSelectionRangeIdx = (selectedRangeIdx + 1) % state.selectedRanges.length;
        const nextSelection = state.selectedRanges[nextSelectionRangeIdx];
        state = focusLocation(state, new Location(nextSelection.first.row, nextSelection.first.col), false);
        return { ...state, activeSelectedRangeIdx: nextSelectionRangeIdx }
    } else { // tab/enter and all cells inside active range except last cell && shift + tab/enter and all cells inside active range except first cell
        const focusedCellColIdxInRange = direction === 'up' || direction === 'down' ? Math.floor(newPosInRange / rowCount) : newPosInRange % colCount;
        const focusedCellRowIdxInRange = direction === 'up' || direction === 'down' ? newPosInRange % rowCount : Math.floor(newPosInRange / colCount)
        const focusedCellColIdx = activeSelectedRange.first.col.idx + focusedCellColIdxInRange;
        const focusedCellRowIdx = activeSelectedRange.first.row.idx + focusedCellRowIdxInRange;
        state = focusLocation(
            state,
            state.cellMatrix.getLocation(focusedCellRowIdx, focusedCellColIdx),
            activeSelectedRange ? (activeSelectedRange.cols.length > 1 || activeSelectedRange.rows.length > 1 ? false : true) : true
        );
        return state;
    }
}

