import { State, KeyboardEvent, keyCodes } from "../../Common";
import { scrollIntoView } from "../../Functions";

export function handleResizeSelectionWithKeys(state: State, event: KeyboardEvent) {
    const activeSelectedRange = state.selectedRanges[state.activeSelectedRangeIdx]
    const focusedCell = state.focusedLocation!;
    if (event.keyCode === keyCodes.UP_ARROW && event.shiftKey && activeSelectedRange.first.row.idx > 0) {
        if (activeSelectedRange.last.row.idx > focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx - 1,
                true,
                state,
                event
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx - 1,
                true,
                state,
                event
            );
        }
    } else if (
        event.keyCode === keyCodes.DOWN_ARROW &&
        event.shiftKey &&
        activeSelectedRange.last.row.idx < state.cellMatrix.last.row.idx
    ) {
        if (activeSelectedRange.first.row.idx < focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx + 1,
                true,
                state,
                event
            );
        } else {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx + 1,
                true,
                state,
                event
            );
        }
    } else if (event.keyCode === keyCodes.LEFT_ARROW && event.shiftKey && activeSelectedRange.first.col.idx > 0) {
        if (activeSelectedRange.last.col.idx > focusedCell.col.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx - 1,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx,
                true,
                state
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx - 1,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx,
                true,
                state
            );
        }
    } else if (
        event.keyCode === keyCodes.RIGHT_ARROW &&
        event.shiftKey &&
        activeSelectedRange.last.col.idx < state.cellMatrix.last.col.idx
    ) {
        if (activeSelectedRange.first.col.idx < focusedCell.col.idx) {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx + 1,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx,
                true,
                state
            );
        } else {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx + 1,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx,
                true,
                state
            );
        }
    } else if (event.ctrlKey && event.keyCode === keyCodes.A) {
        resizeSelection(
            0,
            state.cellMatrix.last.col.idx,
            0,
            state.cellMatrix.last.row.idx,
            false,
            state
        );
    } else if (event.ctrlKey && event.keyCode === keyCodes.SPACE) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            0,
            state.cellMatrix.last.row.idx,
            false,
            state
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.SPACE) {
        resizeSelection(
            0,
            state.cellMatrix.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            false,
            state
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_UP && !state.isFocusedCellInEditMode) {
        const rowsOnScreen = state.cellMatrix.rows.filter(
            r => r.top < state.viewportElement.clientHeight
        );
        if (activeSelectedRange.first.row.idx >= focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx - rowsOnScreen.length > 0
                    ? activeSelectedRange.last.row.idx - rowsOnScreen.length
                    : 0,
                true,
                state
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx - rowsOnScreen.length > 0
                    ? activeSelectedRange.first.row.idx - rowsOnScreen.length
                    : 0,
                true,
                state
            );
        }
    } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
        const rowsOnScreen = state.cellMatrix.rows.filter(
            r => r.top < state.viewportElement.clientHeight
        );
        if (activeSelectedRange.first.row.idx >= focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx + rowsOnScreen.length < state.cellMatrix.rows.length
                    ? activeSelectedRange.last.row.idx + rowsOnScreen.length
                    : State.cellMatrix.rows.length - 1,
                true,
                state
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx + rowsOnScreen.length < state.cellMatrix.rows.length
                    ? activeSelectedRange.first.row.idx + rowsOnScreen.length
                    : State.cellMatrix.rows.length - 1,
                true,
                state
            );
        }
    } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.HOME) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            0,
            activeSelectedRange.last.row.idx,
            true,
            state
        );
    } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.END) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            activeSelectedRange.first.row.idx,
            state.cellMatrix.last.row.idx,
            false,
            state
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.HOME) {
        resizeSelection(
            0,
            activeSelectedRange.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            true,
            state
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.END) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            state.cellMatrix.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            true,
            state
        );
    } else {
        // TODO 
        // return this.inner.handleKeyDown(event);
    }

    // event.stopPropagation();
    // event.preventDefault();
    // return;
};

const resizeSelection = (
    firstColIdx: number,
    lastColIdx: number,
    firstRowIdx: number,
    lastRowIdx: number,
    scroll = true,
    state: State,
    event?: React.KeyboardEvent<HTMLDivElement>,
) => {
    const start = state.cellMatrix.getLocation(firstRowIdx, firstColIdx);
    const end = state.cellMatrix.getLocation(lastRowIdx, lastColIdx);
    let selectedRanges = state.selectedRanges.slice();
    selectedRanges[state.activeSelectedRangeIdx] = state.cellMatrix.getRange(start, end);
    return {
        selectedRanges: selectedRanges
    });
    if (scroll) {
        scrollIntoView(state, end);
    }
}
