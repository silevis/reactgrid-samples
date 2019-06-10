import { keyCodes } from '../../Common/Constants';
import { focusLocation } from '../../Functions';
import { GridContext, KeyboardEvent, Location } from '../../Common';
import { getActiveSelectedRange } from '../../Functions/getActiveSelectedRange';

export function handleKeyNavigationInsideSelection(gridContext: GridContext, event: KeyboardEvent) {
    const focusedCell = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    const activeSelectedRange = getActiveSelectedRange(gridContext)
    if (event.keyCode === keyCodes.TAB && !event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange(1, gridContext);
        event.preventDefault();
    } else if (event.keyCode === keyCodes.TAB && event.shiftKey) {
        if (
            focusedCell.col.idx === 0 &&
            focusedCell.row.idx === activeSelectedRange.first.row.idx
        ) {
            focusLocation(gridContext, new Location(activeSelectedRange.last.row, activeSelectedRange.last.col), false);
        } else {
            // TODO WHAT WITH THAT?
            moveFocusInsideSelectedRange(-1, gridContext);
        }

        if (
            focusedCell.col.idx === activeSelectedRange.first.col.idx &&
            focusedCell.row.idx === activeSelectedRange.first.row.idx
        ) {
            focusLocation(gridContext, new Location(activeSelectedRange.last.row, activeSelectedRange.last.col), false);
        }
        event.preventDefault();
    } else if (event.keyCode === keyCodes.ENTER && !event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange('down', gridContext);
        event.preventDefault();
    } else if (event.keyCode === keyCodes.ENTER && event.shiftKey) {
        // TODO WHAT WITH THAT?
        moveFocusInsideSelectedRange('up', gridContext);
        if (focusedCell.row.idx === activeSelectedRange.first.row.idx) {
            focusLocation(gridContext, new Location(activeSelectedRange.last.row, focusedCell.col), false);
        }
    } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedCell.col.idx > 0) {
        focusLocation(gridContext, cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx - 1));
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.RIGHT_ARROW &&
        focusedCell.col.idx < cellMatrix.last.col.idx
    ) {
        focusLocation(gridContext, cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx + 1));
    } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedCell.row.idx > 0) {
        focusLocation(gridContext, cellMatrix.getLocation(focusedCell.row.idx - 1, focusedCell.col.idx));
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.DOWN_ARROW &&
        focusedCell.row.idx < cellMatrix.last.row.idx
    ) {
        focusLocation(gridContext, cellMatrix.getLocation(focusedCell.row.idx + 1, focusedCell.col.idx));
    } else {
        // TODO 
        // return this.innerBehavior.handleKeyDown(event);
    }
    event.stopPropagation();
    return;
}

const moveFocusInsideSelectedRange = (direction: -1 | 1 | 'up' | 'down', gridContext: GridContext) => {
    const selectedRange = getActiveSelectedRange(gridContext)
    const focusedCell = gridContext.state.focusedLocation!
    const selectedRangeIdx = gridContext.state.activeSelectedRangeIdx
    const colCount = selectedRange.cols.length;
    const delta = direction === 'up' ? -colCount : direction === 'down' ? colCount : direction;

    const currentPosInRange =
        (focusedCell.row.idx - selectedRange.first.row.idx) * colCount +
        (focusedCell.col.idx - selectedRange.first.col.idx);
    const newPosInRange = (currentPosInRange + delta) % (selectedRange.rows.length * selectedRange.cols.length);
    if (newPosInRange === 0) {
        const nextSelectionRangeIdx = (selectedRangeIdx + 1) % gridContext.state.selectedRanges.length;
        const nextSelection = gridContext.state.selectedRanges[nextSelectionRangeIdx];
        focusLocation(gridContext, new Location(nextSelection.first.row, nextSelection.first.col), false);
        gridContext.setState({ activeSelectedRangeIdx: nextSelectionRangeIdx })
    } else {
        const newColIdx = selectedRange.first.col.idx + (newPosInRange % colCount);
        const newRowIdx = selectedRange.first.row.idx + Math.floor(newPosInRange / colCount);
        focusLocation(
            gridContext,
            gridContext.cellMatrix.getLocation(newRowIdx, newColIdx),
            selectedRange ? (selectedRange.cols.length > 1 || selectedRange.rows.length > 1 ? false : true) : true
        );
    }
}

