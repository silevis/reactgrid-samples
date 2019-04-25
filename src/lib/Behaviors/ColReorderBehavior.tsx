import * as React from 'react';
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { BasicGridBehavior } from './BasicGridBehavior';
import { CellMatrix } from '..';
import { Utilities } from '../Common/Utilities';
import { Column, GridContext } from '../Common';
import { Grid } from '../Components/Grid';
import { getColumnFromClientX, resetToDefaultBehavior } from '../Functions';

export let columnIsMoving: boolean = false;
export class ColReorderBehavior extends DelegateBehavior {
    private moveHandler = this.handleMove.bind(this);
    private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this);
    private scrollHandler = this.handleScroll.bind(this);
    private colOnScreen: Column;
    private mouseOffset: number;
    private target: Column[];
    private positionX: number;

    constructor(gridContext: GridContext, event: any, grid: Grid) {
        super(new AutoScrollBehavior(new BasicGridBehavior(gridContext), 'horizontal'));
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );
        this.target = this.gridContext.cellMatrix.cols.filter(
            (c: Column) =>
                c.idx < activeSelectedRange.cols[0].idx ||
                c.idx > activeSelectedRange.cols[activeSelectedRange.cols.length - 1].idx
        );

        const colUnderCursor = activeSelectedRange.first.col;
        const positionX =
            event.type === 'mousedown'
                ? event.clientX
                : event.type === 'touchstart'
                    ? event.changedTouches[0].clientX
                    : null;

        this.positionX = positionX;

        if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0
        ) {
            if (colUnderCursor.idx >= this.gridContext.cellMatrix.frozenRightStart) {
                this.mouseOffset =
                    positionX -
                    activeSelectedRange.first.col.left -
                    this.gridContext.cellMatrix.frozenLeftRange.width -
                    this.gridContext.state.scrollAreaWidth;
            } else if (colUnderCursor.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                this.mouseOffset =
                    positionX -
                    activeSelectedRange.first.col.left -
                    this.gridContext.cellMatrix.frozenLeftRange.width +
                    this.gridContext.state.gridElement.scrollLeft;
            } else {
                this.mouseOffset = positionX - activeSelectedRange.first.col.left;
            }
        } else if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            !(this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0)
        ) {
            if (colUnderCursor.idx >= this.gridContext.cellMatrix.frozenRightStart) {
                this.mouseOffset =
                    positionX -
                    activeSelectedRange.first.col.left -
                    this.gridContext.cellMatrix.frozenLeftRange.width -
                    this.gridContext.state.scrollAreaWidth;
            } else {
                this.mouseOffset =
                    positionX -
                    activeSelectedRange.first.col.left -
                    this.gridContext.cellMatrix.frozenLeftRange.width +
                    this.gridContext.state.gridElement.scrollLeft;
            }
        } else if (this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0) {
            if (colUnderCursor.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                this.mouseOffset =
                    positionX -
                    activeSelectedRange.first.col.left -
                    this.gridContext.cellMatrix.frozenLeftRange.width +
                    this.gridContext.state.gridElement.scrollLeft;
            } else {
                this.mouseOffset = positionX - activeSelectedRange.first.col.left;
            }
        } else {
            this.mouseOffset = positionX - activeSelectedRange.first.col.left + this.gridContext.state.gridElement.scrollLeft;
        }

        if (event.type === 'mousedown') {
            window.addEventListener('mousemove', this.moveHandler);
            window.addEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        } else if (event.type === 'touchstart') {
            window.addEventListener('touchmove', this.moveHandler);
            window.addEventListener('touchend', this.mouseUpAndTouchEndHandler);
            columnIsMoving = true;
        }
        grid.state.gridElement.addEventListener('scroll', this.scrollHandler);
    }

    dispose = () => {
        this.innerBehavior.dispose();
        window.removeEventListener('mousemove', this.moveHandler);
        window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        window.removeEventListener('touchmove', this.moveHandler);
        window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler);
        this.gridContext.state.gridElement.removeEventListener('scroll', this.scrollHandler);
        columnIsMoving = false;
    };

    private handleScroll() {
        this.changeShadowPosition();
    }

    private changeShadowPosition() {
        const gridElement = this.gridContext.state.gridElement;
        const cellMatrix = this.gridContext.cellMatrix;
        const mousePosition = this.positionX + gridElement.scrollLeft;
        const lastColLeft = cellMatrix.last.col.left;
        const leftBorder = cellMatrix.frozenLeftRange.width;
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );

        let colUnderCursor = getColumnFromClientX(this.gridContext, this.positionX);

        if (colUnderCursor) {
            if (colUnderCursor.idx === 0) {
                colUnderCursor = cellMatrix.cols[cellMatrix.frozenLeftRange.cols.length];
            }

            if (colUnderCursor.idx === cellMatrix.cols[cellMatrix.last.col.idx].idx) {
                colUnderCursor = cellMatrix.cols[cellMatrix.last.col.idx - 1];
            }

            if (colUnderCursor !== this.colOnScreen) {
                this.handleMouseEnterOnCol(colUnderCursor);
            }
        }

        let shadowPosition;

        if (this.positionX - this.mouseOffset <= leftBorder && gridElement.scrollLeft === 0) {
            shadowPosition = cellMatrix.frozenLeftRange.width;
        } else if (
            this.positionX - this.mouseOffset + activeSelectedRange.cols[0].width + gridElement.scrollLeft >=
            lastColLeft + cellMatrix.frozenLeftRange.width
        ) {
            shadowPosition = lastColLeft - activeSelectedRange.cols[0].width + cellMatrix.last.col.width;
        } else {
            if (
                this.positionX - this.mouseOffset + gridElement.scrollLeft <=
                gridElement.scrollLeft + cellMatrix.frozenLeftRange.width
            ) {
                shadowPosition = gridElement.scrollLeft + cellMatrix.frozenLeftRange.width;
            } else {
                shadowPosition = mousePosition - this.mouseOffset;
            }
        }

        this.gridContext.setState({ shadowPosition, shadowOrientation: 'vertical' });
    }

    private handleMove(event: any) {
        this.positionX =
            event.type === 'mousemove'
                ? event.clientX
                : event.type === 'touchmove'
                    ? event.changedTouches[0].clientX
                    : null;

        this.changeShadowPosition();
    }

    private handleMouseUpAndTouchEnd(e: any) {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );
        const selectedCols = activeSelectedRange.cols;
        const cellMatrix: CellMatrix = this.gridContext.cellMatrix;

        if (!this.colOnScreen) {
            this.gridContext.setState({ linePosition: undefined, shadowPosition: undefined });
        } else {
            const isOnRightSideDrop = activeSelectedRange.first.col.idx < this.colOnScreen.idx;
            const positionChange =
                this.colOnScreen.idx > selectedCols[0].idx
                    ? this.colOnScreen.idx - selectedCols[selectedCols.length - 1].idx
                    : this.colOnScreen.idx - selectedCols[0].idx;
            if (isOnRightSideDrop) {
                if (this.colOnScreen.onDropRight || this.colOnScreen.idx === cellMatrix.last.col.idx) {
                    this.colOnScreen.onDropRight(activeSelectedRange.cols, this.colOnScreen);
                }
            } else {
                if (this.colOnScreen.onDropLeft) {
                    this.colOnScreen.onDropLeft(activeSelectedRange.cols, this.colOnScreen);
                }
            }

            const selectedColsIdx = [selectedCols[0].idx + positionChange];

            const startColIdx = selectedCols[0].idx + positionChange;
            const endColIdx = selectedCols[selectedCols.length - 1].idx + positionChange;
            const cell = cellMatrix.getLocation(
                this.gridContext.state.focusedLocation!.row.idx,
                activeSelectedRange.first.col.idx + positionChange
            );

            const selectedRanges = [
                cellMatrix.getRange(
                    cellMatrix.getLocation(0, startColIdx),
                    cellMatrix.getLocation(cellMatrix.rows.length - 1, endColIdx)
                )
            ];

            this.gridContext.setState({
                focusedLocation: cell,
                isFocusedCellInEditMode: false,
                linePosition: undefined,
                shadowPosition: undefined,
                selectedColsIdx,
                selectedRanges
            });
        }

        this.gridContext.commitChanges();
        resetToDefaultBehavior(this.gridContext);
    }

    private handleMouseEnterOnCol(col: Column) {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.gridContext.state.selectedRanges,
            this.gridContext.state.focusedLocation
        );
        const isTargetCol = (col: Column) => {
            return this.target.some(c => c === col);
        };
        const isSelectedCol = (col: Column) => {
            return activeSelectedRange.cols.some((c: Column) => c === col);
        };

        const areColumnsMovingRight = () => {
            return activeSelectedRange.first.col.idx < this.colOnScreen.idx;
        };

        this.colOnScreen = isTargetCol(col) ? col : isSelectedCol(col) ? activeSelectedRange.cols[0] : this.colOnScreen;
        let colLeft = col.left;
        const cellMatrix: CellMatrix = this.gridContext.cellMatrix;
        let linePosition;

        if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0
        ) {
            if (col.idx >= this.gridContext.cellMatrix.frozenRightStart) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? (colLeft += cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width + col.width)
                        : this.colOnScreen.left +
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        cellMatrix.scrollableRange.width
                    : undefined;
            } else if (col.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left +
                        this.colOnScreen.width +
                        this.gridContext.cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                    : undefined;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width
                        : this.colOnScreen.left
                    : undefined;
            }
        } else if (this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0) {
            if (col.idx >= this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width + cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + cellMatrix.frozenLeftRange.width
                    : undefined;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width
                        : this.colOnScreen.left
                    : undefined;
            }
        } else if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            !(this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0)
        ) {
            if (col.idx >= this.gridContext.cellMatrix.frozenRightStart) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? (colLeft += cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width + col.width)
                        : this.colOnScreen.left +
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        cellMatrix.scrollableRange.width
                    : undefined;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left +
                        this.colOnScreen.width +
                        this.gridContext.cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                    : undefined;
            }
        } else {
            linePosition = this.colOnScreen
                ? areColumnsMovingRight()
                    ? this.colOnScreen.left + this.colOnScreen.width + this.gridContext.cellMatrix.frozenLeftRange.width
                    : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                : undefined;
        }

        this.gridContext.setState({ linePosition, lineOrientation: 'vertical' });
    }
}
