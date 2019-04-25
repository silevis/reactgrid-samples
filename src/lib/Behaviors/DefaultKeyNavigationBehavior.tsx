import * as React from 'react';
import { DelegateBehavior } from "./DelegateBehavior";
import { keyCodes } from '../Common/Constants';
import { Row, Column } from '../Common';

export class DefaultKeyNavigationBehavior extends DelegateBehavior {
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const focusedLocation = this.grid.state.focusedLocation;
        if (focusedLocation) {
            if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
                event.preventDefault();
            }
            if (
                event.keyCode === keyCodes.TAB &&
                !event.shiftKey &&
                this.grid.state.focusedLocation.col.idx < this.grid.props.cellMatrix.last.col.idx
            ) {
                this.grid.setState({ isFocusedCellInEditMode: false });
                this.grid.focusLocation(
                    this.grid.props.cellMatrix.getLocation(
                        this.grid.state.focusedLocation.row.idx,
                        this.grid.state.focusedLocation.col.idx + 1
                    ),
                    true
                );
            } else if (
                event.keyCode === keyCodes.TAB &&
                event.shiftKey &&
                this.grid.state.focusedLocation.col.idx > 0
            ) {
                this.grid.setState({ isFocusedCellInEditMode: false });
                this.grid.focusLocation(
                    this.grid.props.cellMatrix.getLocation(
                        this.grid.state.focusedLocation.row.idx,
                        this.grid.state.focusedLocation.col.idx - 1
                    ),
                    true
                );
            } else if (
                !event.shiftKey &&
                event.keyCode === keyCodes.ENTER &&
                this.grid.state.isFocusedCellInEditMode &&
                this.grid.state.focusedLocation.row.idx < this.grid.props.cellMatrix.last.row.idx
            ) {
                this.grid.setState({ isFocusedCellInEditMode: false });
                this.grid.focusLocation(
                    this.grid.props.cellMatrix.getLocation(
                        this.grid.state.focusedLocation.row.idx + 1,
                        this.grid.state.focusedLocation.col.idx
                    ),
                    true
                );
            } else if (
                event.shiftKey &&
                event.keyCode === keyCodes.ENTER &&
                this.grid.state.isFocusedCellInEditMode &&
                this.grid.state.focusedLocation.row.idx > 0
            ) {
                this.grid.setState({ isFocusedCellInEditMode: false });
                this.grid.focusLocation(
                    this.grid.props.cellMatrix.getLocation(
                        this.grid.state.focusedLocation.row.idx - 1,
                        this.grid.state.focusedLocation.col.idx
                    ),
                    true
                );
            } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedLocation.col.idx > 0) {
                this.focusCell(focusedLocation.col.idx - 1, focusedLocation.row.idx);
            } else if (
                !event.shiftKey &&
                event.keyCode === keyCodes.RIGHT_ARROW &&
                focusedLocation.col.idx < this.grid.props.cellMatrix.last.col.idx
            ) {
                this.focusCell(focusedLocation.col.idx + 1, focusedLocation.row.idx);
            } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedLocation.row.idx > 0) {
                this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1);
            } else if (
                !event.shiftKey &&
                event.keyCode === keyCodes.DOWN_ARROW &&
                focusedLocation.row.idx < this.grid.props.cellMatrix.last.row.idx
            ) {
                this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx + 1);
            } else if (event.ctrlKey && event.keyCode === keyCodes.HOME) {
                this.focusCell(0, 0);
            } else if (event.keyCode === keyCodes.HOME) {
                this.focusCell(0, focusedLocation.row.idx);
            } else if (event.ctrlKey && event.keyCode === keyCodes.END) {
                this.grid.focusLocation(this.grid.props.cellMatrix.last);
            } else if (event.keyCode === keyCodes.END) {
                this.focusCell(this.grid.props.cellMatrix.cols.length - 1, focusedLocation.row.idx);
            } else if (
                !event.shiftKey &&
                event.keyCode === keyCodes.PAGE_UP &&
                !this.grid.state.isFocusedCellInEditMode
            ) {
                const rowsOnScreen = this.grid.props.cellMatrix.rows.filter(
                    (r: Row) => r.top < this.grid.gridElement.clientHeight
                );
                this.focusCell(
                    focusedLocation.col.idx,
                    focusedLocation.row.idx - rowsOnScreen.length > 0
                        ? focusedLocation.row.idx - rowsOnScreen.length
                        : 0
                );
            } else if (!event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
                const rowsOnScreen = this.grid.props.cellMatrix.rows
                    .slice(
                        this.grid.props.cellMatrix.frozenTopRange.rows.length,
                        this.grid.props.cellMatrix.rows.length -
                        this.grid.props.cellMatrix.frozenBottomRange.rows.length -
                        1
                    )
                    .filter((r: Row) => r.top + r.height < this.grid.gridElement.clientHeight);
                this.focusCell(
                    focusedLocation.col.idx,
                    focusedLocation.row.idx + rowsOnScreen.length < this.grid.props.cellMatrix.rows.length
                        ? focusedLocation.row.idx +
                        rowsOnScreen.length -
                        this.grid.props.cellMatrix.frozenBottomRange.rows.length
                        : this.grid.props.cellMatrix.rows.length - 1
                );
            } else if (event.keyCode === keyCodes.BACKSPACE) {
                this.grid.props.cellMatrix.getCell(focusedLocation).trySetValue(undefined, true);
                this.grid.commitChanges();
            } else if (event.keyCode === keyCodes.DELETE) {
                this.grid.state.selectedRanges.forEach(range => {
                    range.rows.forEach((row: Row) =>
                        range.cols.forEach((col: Column) =>
                            this.grid.props.cellMatrix.getCell({ row, col }).trySetValue(undefined, true)
                        )
                    );
                });
                this.grid.commitChanges();
            } else if (
                !event.shiftKey &&
                event.keyCode === keyCodes.ENTER &&
                !this.grid.state.isFocusedCellInEditMode &&
                !this.grid.state.isFocusedCellReadOnly
            ) {
                this.grid.setState({ isFocusedCellInEditMode: true });
            } else if (event.shiftKey && event.keyCode === keyCodes.ENTER && focusedLocation.row.idx > 0) {
                this.focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1);
            } else {
                return this.innerBehavior.handleKeyDown(event);
            }
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };

    private focusCell(colIdx: number, rowIdx: number) {
        const location = this.grid.props.cellMatrix.getLocation(rowIdx, colIdx);
        this.grid.focusLocation(location);
    }
}
