import * as React from 'react';
import { DelegateBehavior } from "./DelegateBehavior";
import { keyCodes } from '../Common/Constants';
import { Row, Column } from '../Common';
import { focusLocation } from '../Functions/focusLocation';

export class DefaultKeyNavigationBehavior extends DelegateBehavior {
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const focusedLocation = this.gridContext.state.focusedLocation;
        const cellMatrix = this.gridContext.cellMatrix;

        if (!focusedLocation) { return }

        if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
        }
        if (
            event.keyCode === keyCodes.TAB &&
            !event.shiftKey &&
            focusedLocation.col.idx < cellMatrix.last.col.idx
        ) {
            this.gridContext.setState({ isFocusedCellInEditMode: false });
            focusLocation(
                this.gridContext,
                cellMatrix.getLocation(
                    focusedLocation.row.idx,
                    focusedLocation.col.idx + 1
                ),
                true
            );
        } else if (
            event.keyCode === keyCodes.TAB &&
            event.shiftKey &&
            focusedLocation.col.idx > 0
        ) {
            this.gridContext.setState({ isFocusedCellInEditMode: false });
            focusLocation(
                this.gridContext,
                cellMatrix.getLocation(
                    focusedLocation.row.idx,
                    focusedLocation.col.idx - 1
                ),
                true
            );
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.ENTER &&
            this.gridContext.state.isFocusedCellInEditMode &&
            focusedLocation.row.idx < cellMatrix.last.row.idx
        ) {
            this.gridContext.setState({ isFocusedCellInEditMode: false });
            focusLocation(
                this.gridContext,
                cellMatrix.getLocation(
                    focusedLocation.row.idx + 1,
                    focusedLocation.col.idx
                ),
                true
            );
        } else if (
            event.shiftKey &&
            event.keyCode === keyCodes.ENTER &&
            this.gridContext.state.isFocusedCellInEditMode &&
            focusedLocation.row.idx > 0
        ) {
            this.gridContext.setState({ isFocusedCellInEditMode: false });
            focusLocation(
                this.gridContext,
                cellMatrix.getLocation(
                    focusedLocation.row.idx - 1,
                    focusedLocation.col.idx
                ),
                true
            );
        } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedLocation.col.idx > 0) {
            this.focusCell(focusedLocation.col.idx - 1, focusedLocation.row.idx);
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.RIGHT_ARROW &&
            focusedLocation.col.idx < cellMatrix.last.col.idx
        ) {
            this.focusCell(focusedLocation.col.idx + 1, focusedLocation.row.idx);
        } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedLocation.row.idx > 0) {
            this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1);
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.DOWN_ARROW &&
            focusedLocation.row.idx < cellMatrix.last.row.idx
        ) {
            this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx + 1);
        } else if (event.ctrlKey && event.keyCode === keyCodes.HOME) {
            this.focusCell(0, 0);
        } else if (event.keyCode === keyCodes.HOME) {
            this.focusCell(0, focusedLocation.row.idx);
        } else if (event.ctrlKey && event.keyCode === keyCodes.END) {
            focusLocation(this.gridContext, cellMatrix.last);
        } else if (event.keyCode === keyCodes.END) {
            this.focusCell(cellMatrix.cols.length - 1, focusedLocation.row.idx);
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.PAGE_UP &&
            !this.gridContext.state.isFocusedCellInEditMode
        ) {
            const rowsOnScreen = cellMatrix.rows.filter(
                (r: Row) => r.top < this.gridContext.state.gridElement.clientHeight
            );
            this.focusCell(
                focusedLocation.col.idx,
                focusedLocation.row.idx - rowsOnScreen.length > 0
                    ? focusedLocation.row.idx - rowsOnScreen.length
                    : 0
            );
        } else if (!event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
            const rowsOnScreen = cellMatrix.rows
                .slice(
                    cellMatrix.frozenTopRange.rows.length,
                    cellMatrix.rows.length -
                    cellMatrix.frozenBottomRange.rows.length -
                    1
                )
                .filter((r: Row) => r.top + r.height < this.gridContext.state.gridElement.clientHeight);
            this.focusCell(
                focusedLocation.col.idx,
                focusedLocation.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                    ? focusedLocation.row.idx +
                    rowsOnScreen.length -
                    cellMatrix.frozenBottomRange.rows.length
                    : cellMatrix.rows.length - 1
            );
        } else if (event.keyCode === keyCodes.BACKSPACE) {
            cellMatrix.getCell(focusedLocation).trySetValue(undefined, true);
            this.gridContext.commitChanges();
        } else if (event.keyCode === keyCodes.DELETE) {
            this.gridContext.state.selectedRanges.forEach(range => {
                range.rows.forEach((row: Row) =>
                    range.cols.forEach((col: Column) =>
                        cellMatrix.getCell({ row, col }).trySetValue(undefined, true)
                    )
                );
            });
            this.gridContext.commitChanges();
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.ENTER &&
            !this.gridContext.state.isFocusedCellInEditMode &&
            !this.gridContext.state.isFocusedCellReadOnly
        ) {
            this.gridContext.setState({ isFocusedCellInEditMode: true });
        } else if (event.shiftKey && event.keyCode === keyCodes.ENTER && focusedLocation.row.idx > 0) {
            this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1);
        } else {
            return this.innerBehavior.handleKeyDown(event);
        }
        event.stopPropagation();
        event.preventDefault();
        return;
    };

    private focusCell(colIdx: number, rowIdx: number) {
        const location = this.gridContext.cellMatrix.getLocation(rowIdx, colIdx);
        focusLocation(this.gridContext, location);
    }
}
