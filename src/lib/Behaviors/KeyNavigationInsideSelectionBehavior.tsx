import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { DelegateBehavior } from "./DelegateBehavior";

export class KeyNavigationInsideSelectionBehavior extends DelegateBehavior {
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.grid.state.selectedRanges,
            this.grid.state.focusedLocation
        );
        if (
            this.grid.state.selectedRanges.length <= 1 &&
            this.grid.state.selectedRanges.length > 0 &&
            activeSelectedRange.cols.length <= 1 &&
            activeSelectedRange.rows.length <= 1
        ) {
            return this.innerBehavior.handleKeyDown(event);
        }
        const focusedCell = this.grid.state.focusedLocation;
        if (event.keyCode === keyCodes.TAB && !event.shiftKey) {
            this.grid.moveFocusInsideSelectedRange(1);
            event.preventDefault();
        } else if (event.keyCode === keyCodes.TAB && event.shiftKey) {
            if (
                this.grid.state.focusedLocation.col.idx === 0 &&
                this.grid.state.focusedLocation.row.idx === activeSelectedRange.first.row.idx
            ) {
                const cell = this.grid.props.cellMatrix.getLocation(
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.last.col.idx
                );
                this.grid.focusLocation(cell, false);
            } else {
                this.grid.moveFocusInsideSelectedRange(-1);
            }

            if (
                this.grid.state.focusedLocation.col.idx === activeSelectedRange.first.col.idx &&
                this.grid.state.focusedLocation.row.idx === activeSelectedRange.first.row.idx
            ) {
                const cell = this.grid.props.cellMatrix.getLocation(
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.last.col.idx
                );
                this.grid.focusLocation(cell, false);
            }
            event.preventDefault();
        } else if (event.keyCode === keyCodes.ENTER && !event.shiftKey) {
            this.grid.moveFocusInsideSelectedRange('down');
            event.preventDefault();
        } else if (event.keyCode === keyCodes.ENTER && event.shiftKey) {
            this.grid.moveFocusInsideSelectedRange('up');
            if (this.grid.state.focusedLocation.row.idx === activeSelectedRange.first.row.idx) {
                const cell = this.grid.props.cellMatrix.getLocation(
                    activeSelectedRange.last.row.idx,
                    this.grid.state.focusedLocation.col.idx
                );
                this.grid.focusLocation(cell, false);
            }
        } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedCell.col.idx > 0) {
            const cell = this.grid.props.cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx - 1);
            this.grid.focusLocation(cell);
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.RIGHT_ARROW &&
            focusedCell.col.idx < this.grid.props.cellMatrix.last.col.idx
        ) {
            const cell = this.grid.props.cellMatrix.getLocation(focusedCell.row.idx, focusedCell.col.idx + 1);
            this.grid.focusLocation(cell);
        } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedCell.row.idx > 0) {
            const cell = this.grid.props.cellMatrix.getLocation(focusedCell.row.idx - 1, focusedCell.col.idx);
            this.grid.focusLocation(cell);
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.DOWN_ARROW &&
            focusedCell.row.idx < this.grid.props.cellMatrix.last.row.idx
        ) {
            const cell = this.grid.props.cellMatrix.getLocation(focusedCell.row.idx + 1, focusedCell.col.idx);
            this.grid.focusLocation(cell);
        } else {
            return this.innerBehavior.handleKeyDown(event);
        }
        event.stopPropagation();
        return;
    };

    handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.grid.state.selectedRanges,
            this.grid.state.focusedLocation
        );
        if (
            activeSelectedRange === undefined ||
            !(activeSelectedRange.cols.length > 1 || activeSelectedRange.rows.length > 1)
        ) {
            this.innerBehavior.handleKeyUp(event);
            return;
        }
        if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
    };

    moveFocusInsideSelectedRange(direction: -1 | 1 | 'up' | 'down') {
        const selectedRange = Utilities.getActiveSelectionRange(this.state.selectedRanges, this.state.focusedLocation);
        const selectedRangeIdx = Utilities.getActiveSelectionIdx(this.state.selectedRanges, this.state.focusedLocation);
        const colCount = selectedRange.cols.length;
        const delta = direction === 'up' ? -colCount : direction === 'down' ? colCount : direction;
        const focusedCell = this.state.focusedLocation;
        const currentPosInRange =
            (focusedCell.row.idx - selectedRange.first.row.idx) * colCount +
            (focusedCell.col.idx - selectedRange.first.col.idx);
        const newPosInRange = (currentPosInRange + delta) % (selectedRange.rows.length * selectedRange.cols.length);
        if (newPosInRange === 0) {
            const nextSelectionRangeIdx = (selectedRangeIdx + 1) % this.state.selectedRanges.length;
            const nextSelection = this.state.selectedRanges[nextSelectionRangeIdx];
            this.focusLocation({ col: nextSelection.first.col, row: nextSelection.first.row }, false);
        } else {
            const newColIdx = selectedRange.first.col.idx + (newPosInRange % colCount);
            const newRowIdx = selectedRange.first.row.idx + Math.floor(newPosInRange / colCount);
            const location = this.props.cellMatrix.getLocation(newRowIdx, newColIdx);
            this.focusLocation(
                location,
                selectedRange ? (selectedRange.cols.length > 1 || selectedRange.rows.length > 1 ? false : true) : true
            );
        }
    }
}
