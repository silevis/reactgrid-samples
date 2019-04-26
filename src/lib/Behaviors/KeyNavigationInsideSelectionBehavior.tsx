import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { DelegateBehavior } from "./DelegateBehavior";
import { focusLocation } from '../Functions';

export class KeyNavigationInsideSelectionBehavior extends DelegateBehavior {
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const focusedCell = this.gridContext.state.focusedLocation!;
        const cellMatrix = this.gridContext.cellMatrix;
        // const activeSelectedRange = Utilities.getActiveSelectionRange(
        //     this.gridContext.state.selectedRanges,
        //     focusedCell
        // );
        // if (
        //     this.gridContext.state.selectedRanges.length <= 1 &&
        //     this.gridContext.state.selectedRanges.length > 0 &&
        //     activeSelectedRange.cols.length <= 1 &&
        //     activeSelectedRange.rows.length <= 1
        // ) {
        //     return this.innerBehavior.handleKeyDown(event);
        // }
        // if (event.keyCode === keyCodes.TAB && !event.shiftKey) {
        //     this.gridContext.moveFocusInsideSelectedRange(1);
        //     event.preventDefault();
        // } else if (event.keyCode === keyCodes.TAB && event.shiftKey) {
        //     if (
        //         focusedCell.col.idx === 0 &&
        //         focusedCell.row.idx === activeSelectedRange.first.row.idx
        //     ) {
        //         const cell = cellMatrix.getLocation(
        //             activeSelectedRange.last.row.idx,
        //             activeSelectedRange.last.col.idx
        //         );
        //         focusLocation(this.gridContext, cell, false);
        //     } else {
        //         this.gridContext.moveFocusInsideSelectedRange(-1);
        //     }

        //     if (
        //         focusedCell.col.idx === activeSelectedRange.first.col.idx &&
        //         focusedCell.row.idx === activeSelectedRange.first.row.idx
        //     ) {
        //         const cell = cellMatrix.getLocation(
        //             activeSelectedRange.last.row.idx,
        //             activeSelectedRange.last.col.idx
        //         );
        //         focusLocation(this.gridContext, cell, false);
        //     }
        //     event.preventDefault();
        // } else if (event.keyCode === keyCodes.ENTER && !event.shiftKey) {
        //     this.gridContext.moveFocusInsideSelectedRange('down');
        //     event.preventDefault();
        // } else if (event.keyCode === keyCodes.ENTER && event.shiftKey) {
        //     this.gridContext.moveFocusInsideSelectedRange('up');
        //     if (focusedCell.row.idx === activeSelectedRange.first.row.idx) {
        //         const cell = cellMatrix.getLocation(
        //             activeSelectedRange.last.row.idx,
        //             focusedCell.col.idx
        //         );
        //         focusLocation(this.gridContext, cell, false);
        //     }
        // } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedCell.col.idx > 0) {
        //     const cell = cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx - 1);
        //     focusLocation(this.gridContext, cell);
        // } else if (
        //     !event.shiftKey &&
        //     event.keyCode === keyCodes.RIGHT_ARROW &&
        //     focusedCell.col.idx < cellMatrix.last.col.idx
        // ) {
        //     const cell = cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx + 1);
        //     focusLocation(this.gridContext, cell);
        // } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedCell.row.idx > 0) {
        //     const cell = cellMatrix.getLocation(focusedCell.row.idx - 1, focusedCell.col.idx);
        //     focusLocation(this.gridContext, cell);
        // } else if (
        //     !event.shiftKey &&
        //     event.keyCode === keyCodes.DOWN_ARROW &&
        //     focusedCell.row.idx < cellMatrix.last.row.idx
        // ) {
        //     const cell = cellMatrix.getLocation(focusedCell.row.idx + 1, focusedCell.col.idx);
        //     focusLocation(this.gridContext, cell);
        // } else {
        //     return this.innerBehavior.handleKeyDown(event);
        // }
        // event.stopPropagation();
        // return;
    };

    handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // const activeSelectedRange = Utilities.getActiveSelectionRange(
        //     this.gridContext.state.selectedRanges,
        //     this.gridContext.state.focusedLocation
        // );
        // if (
        //     activeSelectedRange === undefined ||
        //     !(activeSelectedRange.cols.length > 1 || activeSelectedRange.rows.length > 1)
        // ) {
        //     this.innerBehavior.handleKeyUp(event);
        //     return;
        // }
        // if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return;
        // }
    };

    moveFocusInsideSelectedRange(direction: -1 | 1 | 'up' | 'down') {
        // const focusedCell = this.gridContext.state.focusedLocation!;
        // const selectedRange = Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, focusedCell);
        // const selectedRangeIdx = Utilities.getActiveSelectionIdx(this.gridContext.state.selectedRanges, focusedCell);
        // const colCount = selectedRange.cols.length;
        // const delta = direction === 'up' ? -colCount : direction === 'down' ? colCount : direction;
        // const currentPosInRange =
        //     (focusedCell.row.idx - selectedRange.first.row.idx) * colCount +
        //     (focusedCell.col.idx - selectedRange.first.col.idx);
        // const newPosInRange = (currentPosInRange + delta) % (selectedRange.rows.length * selectedRange.cols.length);
        // if (newPosInRange === 0) {
        //     const nextSelectionRangeIdx = (selectedRangeIdx + 1) % this.gridContext.state.selectedRanges.length;
        //     const nextSelection = this.gridContext.state.selectedRanges[nextSelectionRangeIdx];
        //     focusLocation(this.gridContext, { col: nextSelection.first.col, row: nextSelection.first.row }, false);
        // } else {
        //     const newColIdx = selectedRange.first.col.idx + (newPosInRange % colCount);
        //     const newRowIdx = selectedRange.first.row.idx + Math.floor(newPosInRange / colCount);
        //     const location = this.gridContext.cellMatrix.getLocation(newRowIdx, newColIdx);
        //     focusLocation(
        //         this.gridContext,
        //         location,
        //         selectedRange ? (selectedRange.cols.length > 1 || selectedRange.rows.length > 1 ? false : true) : true
        //     );
        // }
    }
}
