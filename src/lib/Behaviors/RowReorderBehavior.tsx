import * as React from 'react';
import { DelegateBehavior } from "./DelegateBehavior";
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { BasicGridBehavior } from './BasicGridBehavior';
import { CellMatrix } from '..';
import { Utilities } from '../Common/Utilities';
import { GridContext, Row } from '../Common';
import { getRowFromClientY, getLocationFromClient, resetToDefaultBehavior } from '../Functions';

export let rowIsMoving: boolean = false;

export class RowReorderBehavior extends DelegateBehavior {
    private moveHandler = this.handleMove.bind(this);
    private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this);
    private scrollHandler = this.handleScroll.bind(this);
    private rowOnScreen: Row;
    private mouseOffset: number;
    private target: Row[];
    private mouseOffsetYRelativeToCell: number;
    private firstVisibleRowTop;
    private positionY: number;

    constructor(event: any, gridContext: GridContext) {
        super(new AutoScrollBehavior(new BasicGridBehavior(gridContext), 'vertical'));
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            gridContext.state.selectedRanges,
            gridContext.state.focusedLocation
        );
        this.target = gridContext.cellMatrix.rows.filter(
            (r: Row) =>
                r.idx < activeSelectedRange.rows[0].idx ||
                r.idx > activeSelectedRange.rows[activeSelectedRange.rows.length - 1].idx
        );
        const rowUnderCursor = activeSelectedRange.first.row;
        this.positionY =
            event.type === 'mousedown'
                ? event.clientY
                : event.type === 'touchstart'
                    ? event.changedTouches[0].clientY
                    : null;

        this.mouseOffsetYRelativeToCell =
            this.positionY - document.elementFromPoint(0, this.positionY)!.getBoundingClientRect().top;

        if (
            gridContext.cellMatrix.frozenBottomRange.rows.length > 0 &&
            gridContext.cellMatrix.frozenTopRange.rows.length > 0
        ) {
            if (rowUnderCursor.idx >= gridContext.cellMatrix.frozenBottomStart) {
                this.mouseOffset =
                    this.positionY -
                    activeSelectedRange.first.row.top -
                    gridContext.cellMatrix.frozenTopRange.height -
                    gridContext.state.scrollAreaHeight;
            } else if (rowUnderCursor.idx > gridContext.cellMatrix.frozenTopRange.last.row.idx) {
                this.mouseOffset =
                    this.positionY -
                    activeSelectedRange.first.row.top -
                    gridContext.cellMatrix.frozenTopRange.height +
                    gridContext.state.gridElement.scrollTop;
            } else {
                this.mouseOffset = this.positionY - activeSelectedRange.first.row.top;
            }
        } else if (
            gridContext.cellMatrix.frozenBottomRange.rows.length > 0 &&
            !(gridContext.cellMatrix.frozenTopRange.rows.length > 0)
        ) {
            if (rowUnderCursor.idx >= gridContext.cellMatrix.frozenBottomStart) {
                this.mouseOffset =
                    this.positionY -
                    activeSelectedRange.first.row.top -
                    gridContext.cellMatrix.frozenTopRange.height -
                    gridContext.state.scrollAreaHeight;
            } else {
                this.mouseOffset =
                    this.positionY -
                    activeSelectedRange.first.row.top -
                    gridContext.cellMatrix.frozenTopRange.height +
                    gridContext.state.gridElement.scrollTop;
            }
        } else if (gridContext.cellMatrix.frozenTopRange.rows.length > 0) {
            if (rowUnderCursor.idx > gridContext.cellMatrix.frozenTopRange.last.row.idx) {
                this.mouseOffset =
                    this.positionY -
                    activeSelectedRange.first.row.top -
                    gridContext.cellMatrix.frozenTopRange.height +
                    gridContext.state.gridElement.scrollTop;
            } else {
                this.mouseOffset = this.positionY - activeSelectedRange.first.row.top;
            }
        } else {
            this.mouseOffset = this.positionY - activeSelectedRange.first.row.top + gridContext.state.gridElement.scrollTop;
        }

        if (event.type === 'mousedown') {
            window.addEventListener('mousemove', this.moveHandler);
            window.addEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        } else if (event.type === 'touchstart') {
            window.addEventListener('touchmove', this.moveHandler);
            window.addEventListener('touchend', this.mouseUpAndTouchEndHandler);
            rowIsMoving = true;
        }
        gridContext.state.gridElement.addEventListener('scroll', this.scrollHandler);
    }

    dispose = () => {
        this.innerBehavior.dispose();
        window.removeEventListener('mousemove', this.moveHandler);
        window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        window.removeEventListener('touchmove', this.moveHandler);
        window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler);
        this.gridContext.state.gridElement.removeEventListener('scroll', this.scrollHandler);
        rowIsMoving = false;
    };

    private handleScroll() {
        this.changeShadowPosition();
    }

    private changeShadowPosition() {
        const gridElement = this.gridContext.state.gridElement;
        const cellMatrix = this.gridContext.cellMatrix;
        const mousePosition = this.positionY + gridElement.scrollTop;
        const topBorder = gridElement.offsetTop + cellMatrix.frozenTopRange.first.row.height;
        const hiddenScrollableRangeHeight = gridElement.scrollHeight - gridElement.clientHeight;
        const lastRowTop = cellMatrix.last.row.top;

        let rowUnderCursor = getRowFromClientY(this.gridContext, this.positionY);

        if (rowUnderCursor) {
            if (rowUnderCursor.idx === 0) {
                rowUnderCursor = cellMatrix.rows[cellMatrix.frozenTopRange.rows.length];
            }

            if (rowUnderCursor.idx === cellMatrix.rows[cellMatrix.last.row.idx].idx) {
                rowUnderCursor = cellMatrix.rows[cellMatrix.last.row.idx - 1];
            }

            if (rowUnderCursor !== this.rowOnScreen) {
                this.handleMouseEnterOnRow(rowUnderCursor);
            }
        }

        this.firstVisibleRowTop = getLocationFromClient(
            this.gridContext,
            0,
            gridElement.offsetTop + cellMatrix.frozenTopRange.height + 25
        ).row.top;
        let shadowPosition;

        if (this.positionY - this.mouseOffsetYRelativeToCell <= topBorder && gridElement.scrollTop === 0) {
            shadowPosition = this.firstVisibleRowTop + cellMatrix.frozenTopRange.height;
        } else if (
            this.positionY -
            this.mouseOffsetYRelativeToCell +
            gridElement.scrollTop +
            cellMatrix.frozenTopRange.height -
            gridElement.offsetTop >
            lastRowTop &&
            this.positionY -
            this.mouseOffsetYRelativeToCell +
            hiddenScrollableRangeHeight +
            cellMatrix.frozenTopRange.height -
            gridElement.offsetTop >=
            this.gridContext.state.linePosition
        ) {
            shadowPosition = lastRowTop;
        } else {
            shadowPosition = mousePosition - this.mouseOffset;
        }

        this.gridContext.setState({ shadowPosition, shadowOrientation: 'horizontal' });
    }

    private handleMove(event: any) {
        this.positionY =
            event.type === 'mousemove'
                ? event.clientY
                : event.type === 'touchmove'
                    ? event.changedTouches[0].clientY
                    : null;

        this.changeShadowPosition();
    }

    private handleMouseUpAndTouchEnd() {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );
        const cellMatrix = this.gridContext.cellMatrix;
        const selectedRows = activeSelectedRange.rows;

        if (!this.rowOnScreen) {
            this.gridContext.setState({ linePosition: undefined, shadowPosition: undefined });
        } else {
            const positionChange =
                this.rowOnScreen.idx > selectedRows[0].idx
                    ? this.rowOnScreen.idx - selectedRows[selectedRows.length - 1].idx
                    : this.rowOnScreen.idx - selectedRows[0].idx;
            const isOnBelowSideDrop = activeSelectedRange.first.row.idx < this.rowOnScreen.idx;
            if (isOnBelowSideDrop) {
                if (this.rowOnScreen.onDropBelow) {
                    this.rowOnScreen.onDropBelow(activeSelectedRange.rows, this.rowOnScreen);
                }
            } else {
                if (this.rowOnScreen.onDropAbove) {
                    this.rowOnScreen.onDropAbove(activeSelectedRange.rows, this.rowOnScreen);
                }
            }

            const selectedRowsIdx = [selectedRows[0].idx + positionChange];

            const startRowIdx = selectedRows[0].idx + positionChange;
            const endRowIdx = selectedRows[selectedRows.length - 1].idx + positionChange;
            const cell = cellMatrix.getLocation(
                activeSelectedRange.first.row.idx + positionChange,
                this.gridContext.state.focusedLocation!.col.idx
            );

            const selectedRanges = [
                cellMatrix.getRange(
                    cellMatrix.getLocation(startRowIdx, 0),
                    cellMatrix.getLocation(endRowIdx, cellMatrix.cols.length - 1)
                )
            ];

            this.gridContext.setState({
                focusedLocation: cell,
                isFocusedCellInEditMode: false,
                linePosition: undefined,
                shadowPosition: undefined,
                selectedRowsIdx,
                selectedRanges
            });
        }
        this.gridContext.commitChanges();

        if (event!.type === 'mouseup') {
            resetToDefaultBehavior(this.gridContext);
        }
    }

    private handleMouseEnterOnRow(row: Row) {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );
        const isTargetRow = (row: Row) => {
            return this.target.some(r => r === row);
        };
        const isSelectedRow = (row: Row) => {
            return activeSelectedRange.rows.some((r: Row) => r === row);
        };
        const areRowsMovingDown = () => {
            return activeSelectedRange.first.row.idx < this.rowOnScreen.idx;
        };
        this.rowOnScreen = isTargetRow(row) ? row : isSelectedRow(row) ? activeSelectedRange.rows[0] : this.rowOnScreen;
        let rowTop = row.top;
        const cellMatrix: CellMatrix = this.gridContext.cellMatrix;
        let linePosition;
        if (
            this.gridContext.cellMatrix.frozenBottomRange.rows.length > 0 &&
            this.gridContext.cellMatrix.frozenTopRange.rows.length > 0
        ) {
            if (row.idx >= this.gridContext.cellMatrix.frozenBottomStart) {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? (rowTop += cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height + row.height)
                        : this.rowOnScreen.top + cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height
                    : undefined;
            } else if (row.idx > cellMatrix.frozenTopRange.last.row.idx) {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? this.rowOnScreen.top + this.rowOnScreen.height + cellMatrix.frozenTopRange.height
                        : this.rowOnScreen.top + cellMatrix.frozenTopRange.height
                    : undefined;
            } else {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? this.rowOnScreen.top + this.rowOnScreen.height
                        : this.rowOnScreen.top
                    : undefined;
            }
        } else if (cellMatrix.frozenTopRange.rows.length > 0) {
            if (row.idx >= cellMatrix.frozenTopRange.last.row.idx) {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? row.idx === cellMatrix.last.row.idx
                            ? this.rowOnScreen.top + this.rowOnScreen.height
                            : this.rowOnScreen.top + this.rowOnScreen.height + cellMatrix.frozenTopRange.height
                        : row.idx === 0
                            ? this.firstVisibleRowTop + cellMatrix.frozenTopRange.height
                            : this.rowOnScreen.top + cellMatrix.frozenTopRange.height
                    : undefined;
            }
        } else if (cellMatrix.frozenBottomRange.rows.length > 0 && !(cellMatrix.frozenTopRange.rows.length > 0)) {
            if (row.idx >= cellMatrix.frozenBottomStart) {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? (rowTop += cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height + row.height)
                        : this.rowOnScreen.top + cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height
                    : undefined;
            } else {
                linePosition = this.rowOnScreen
                    ? areRowsMovingDown()
                        ? this.rowOnScreen.top + this.rowOnScreen.height + cellMatrix.frozenTopRange.height
                        : this.rowOnScreen.top + cellMatrix.frozenTopRange.height
                    : undefined;
            }
        } else {
            linePosition = this.rowOnScreen
                ? areRowsMovingDown()
                    ? this.rowOnScreen.top + this.rowOnScreen.height + cellMatrix.frozenTopRange.height
                    : this.rowOnScreen.top + cellMatrix.frozenTopRange.height
                : undefined;
        }

        this.gridContext.setState({ linePosition, lineOrientation: 'horizontal' });
    }
}
