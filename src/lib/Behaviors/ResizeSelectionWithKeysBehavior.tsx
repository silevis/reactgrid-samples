import * as React from 'react';
import { DelegateBehavior } from "./DelegateBehavior";
import { keyCodes } from '../Common/Constants';
import { Utilities } from '../Common/Utilities';
import { Row } from '../Common';
import { scrollIntoView } from '../Functions';

export class ResizeSelectionWithKeysBehavior extends DelegateBehavior {
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const focusedCell = this.gridContext.state.focusedLocation!;
        const cellMatrix = this.gridContext.cellMatrix;
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            focusedCell
        );
        if (event.keyCode === keyCodes.UP_ARROW && event.shiftKey && activeSelectedRange.first.row.idx > 0) {
            if (activeSelectedRange.last.row.idx > focusedCell.row.idx) {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx - 1,
                    true,
                    event
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx - 1,
                    true,
                    event
                );
            }
        } else if (
            event.keyCode === keyCodes.DOWN_ARROW &&
            event.shiftKey &&
            activeSelectedRange.last.row.idx < this.gridContext.cellMatrix.last.row.idx
        ) {
            if (activeSelectedRange.first.row.idx < focusedCell.row.idx) {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx + 1,
                    true,
                    event
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx + 1,
                    true,
                    event
                );
            }
        } else if (event.keyCode === keyCodes.LEFT_ARROW && event.shiftKey && activeSelectedRange.first.col.idx > 0) {
            if (activeSelectedRange.last.col.idx > focusedCell.col.idx) {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx - 1,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx - 1,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx
                );
            }
        } else if (
            event.keyCode === keyCodes.RIGHT_ARROW &&
            event.shiftKey &&
            activeSelectedRange.last.col.idx < cellMatrix.last.col.idx
        ) {
            if (activeSelectedRange.first.col.idx < focusedCell.col.idx) {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx + 1,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx + 1,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx
                );
            }
        } else if (event.ctrlKey && event.keyCode === keyCodes.A) {
            this.resizeSelection(
                0,
                cellMatrix.last.col.idx,
                0,
                cellMatrix.last.row.idx,
                false
            );
        } else if (event.ctrlKey && event.keyCode === keyCodes.SPACE) {
            this.resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                0,
                cellMatrix.last.row.idx,
                false
            );
        } else if (event.shiftKey && event.keyCode === keyCodes.SPACE) {
            this.resizeSelection(
                0,
                cellMatrix.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx,
                false
            );
        } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_UP && !this.gridContext.state.isFocusedCellInEditMode) {
            const rowsOnScreen = cellMatrix.rows.filter(
                (r: Row) => r.top < this.gridContext.state.gridElement.clientHeight
            );
            if (activeSelectedRange.first.row.idx >= focusedCell.row.idx) {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx - rowsOnScreen.length > 0
                        ? activeSelectedRange.last.row.idx - rowsOnScreen.length
                        : 0
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx - rowsOnScreen.length > 0
                        ? activeSelectedRange.first.row.idx - rowsOnScreen.length
                        : 0
                );
            }
        } else if (event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
            const rowsOnScreen = cellMatrix.rows.filter(
                (r: Row) => r.top < this.gridContext.state.gridElement.clientHeight
            );
            if (activeSelectedRange.first.row.idx >= focusedCell.row.idx) {
                this.resizeSelection(
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.row.idx,
                    activeSelectedRange.last.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                        ? activeSelectedRange.last.row.idx + rowsOnScreen.length
                        : cellMatrix.rows.length - 1
                );
            } else {
                this.resizeSelection(
                    activeSelectedRange.last.col.idx,
                    activeSelectedRange.first.col.idx,
                    activeSelectedRange.last.row.idx,
                    activeSelectedRange.first.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                        ? activeSelectedRange.first.row.idx + rowsOnScreen.length
                        : cellMatrix.rows.length - 1
                );
            }
        } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.HOME) {
            this.resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                0,
                activeSelectedRange.last.row.idx
            );
        } else if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.END) {
            this.resizeSelection(
                activeSelectedRange.first.col.idx,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                cellMatrix.last.row.idx,
                false
            );
        } else if (event.shiftKey && event.keyCode === keyCodes.HOME) {
            this.resizeSelection(
                0,
                activeSelectedRange.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx
            );
        } else if (event.shiftKey && event.keyCode === keyCodes.END) {
            this.resizeSelection(
                activeSelectedRange.first.col.idx,
                cellMatrix.last.col.idx,
                activeSelectedRange.first.row.idx,
                activeSelectedRange.last.row.idx
            );
        } else {
            return this.innerBehavior.handleKeyDown(event);
        }
        event.stopPropagation();
        event.preventDefault();
        return;
    };

    private resizeSelection(
        firstColIdx: number,
        lastColIdx: number,
        firstRowIdx: number,
        lastRowIdx: number,
        scroll = true,
        event?
    ) {
        const cellMatrix = this.gridContext.cellMatrix;
        const start = cellMatrix.getLocation(firstRowIdx, firstColIdx);
        const end = cellMatrix.getLocation(lastRowIdx, lastColIdx);
        const range = cellMatrix.getRange(start, end);

        let selectedRanges = this.gridContext.state.selectedRanges.slice();
        selectedRanges[
            Utilities.getActiveSelectionIdx(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation)
        ] = cellMatrix.getRange(start, end);
        this.gridContext.setState({
            selectedRanges: selectedRanges
        });
        if (scroll) {
            scrollIntoView(this.gridContext, end);
        }
    }
}
