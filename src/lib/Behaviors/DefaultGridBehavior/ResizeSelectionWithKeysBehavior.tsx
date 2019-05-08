import { GridContext, KeyboardEvent, keyCodes } from "../../Common";
import { scrollIntoView } from "../../Functions";

export function ResizeSelectionWithKeysBehavior(gridContext: GridContext, event: KeyboardEvent) {
    const activeSelectedRange = gridContext.state.selectedRanges[gridContext.state.focusedSelectedRangeIdx]
    const focusedCell = gridContext.state.focusedLocation!;
    if (event.keyCode === keyCodes.UP_ARROW && event.shiftKey && activeSelectedRange.first.row.idx > 0) {
        if (activeSelectedRange.last.row.idx > focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx - 1,
                true,
                gridContext,
                event
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx - 1,
                true,
                gridContext,
                event
            );
        }
    } else if (
        event.keyCode === keyCodes.DOWN_ARROW &&
        event.shiftKey &&
        activeSelectedRange.last.row.idx < gridContext.cellMatrix.last.row.idx
    ) {
        if (activeSelectedRange.first.row.idx < focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx + 1,
                true,
                gridContext,
                event
            );
        } else {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx + 1,
                true,
                gridContext,
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
                gridContext
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx - 1,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx,
                true,
                gridContext
            );
        }
    } else if (
        event.keyCode === keyCodes.RIGHT_ARROW &&
        event.shiftKey &&
        activeSelectedRange.last.col.idx < gridContext.cellMatrix.last.col.idx
    ) {
        if (activeSelectedRange.first.col.idx < focusedCell.col.idx) {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx + 1,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx,
                true,
                gridContext
            );
        } else {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx + 1,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx,
                true,
                gridContext
            );
        }
    } else if (event.ctrlKey && event.keyCode === keyCodes.A) {
        resizeSelection(
            0,
            gridContext.cellMatrix.last.col.idx,
            0,
            gridContext.cellMatrix.last.row.idx,
            false,
            gridContext
        );
    } else if (event.ctrlKey && event.keyCode === keyCodes.SPACE) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            0,
            gridContext.cellMatrix.last.row.idx,
            false,
            gridContext
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.SPACE) {
        resizeSelection(
            0,
            gridContext.cellMatrix.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            false,
            gridContext
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_UP && !gridContext.state.isFocusedCellInEditMode) {
        const rowsOnScreen = gridContext.cellMatrix.rows.filter(
            r => r.top < gridContext.viewportElement.clientHeight
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
                gridContext
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
                gridContext
            );
        }
    } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
        const rowsOnScreen = gridContext.cellMatrix.rows.filter(
            r => r.top < gridContext.viewportElement.clientHeight
        );
        if (activeSelectedRange.first.row.idx >= focusedCell.row.idx) {
            resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx + rowsOnScreen.length < gridContext.cellMatrix.rows.length
                    ? activeSelectedRange.last.row.idx + rowsOnScreen.length
                    : gridContext.cellMatrix.rows.length - 1,
                true,
                gridContext
            );
        } else {
            resizeSelection(
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.row.idx,
                activeSelectedRange.first.row.idx + rowsOnScreen.length < gridContext.cellMatrix.rows.length
                    ? activeSelectedRange.first.row.idx + rowsOnScreen.length
                    : gridContext.cellMatrix.rows.length - 1,
                true,
                gridContext
            );
        }
    } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.HOME) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            0,
            activeSelectedRange.last.row.idx,
            true,
            gridContext
        );
    } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.END) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            activeSelectedRange.last.col.idx,
            activeSelectedRange.first.row.idx,
            gridContext.cellMatrix.last.row.idx,
            false,
            gridContext
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.HOME) {
        resizeSelection(
            0,
            activeSelectedRange.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            true,
            gridContext
        );
    } else if (event.shiftKey && event.keyCode === keyCodes.END) {
        resizeSelection(
            activeSelectedRange.first.col.idx,
            gridContext.cellMatrix.last.col.idx,
            activeSelectedRange.first.row.idx,
            activeSelectedRange.last.row.idx,
            true,
            gridContext
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
    gridContext: GridContext,
    event?: React.KeyboardEvent<HTMLDivElement>,
) => {
    const start = gridContext.cellMatrix.getLocation(firstRowIdx, firstColIdx);
    const end = gridContext.cellMatrix.getLocation(lastRowIdx, lastColIdx);
    let selectedRanges = gridContext.state.selectedRanges.slice();
    selectedRanges[gridContext.state.focusedSelectedRangeIdx] = gridContext.cellMatrix.getRange(start, end);
    gridContext.setState({
        selectedRanges: selectedRanges
    });
    if (scroll) {
        scrollIntoView(gridContext, end);
    }
}
