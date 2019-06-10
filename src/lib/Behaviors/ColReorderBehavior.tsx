import * as React from 'react';
import { Column, GridContext, Behavior, CellMatrix, Location, Range } from '../Common';
import { resetToDefaultBehavior } from '../Functions';
import { LineAndShadow } from '../Components/LineAndShadow';
import { getActiveSelectedRange } from '../Functions/getActiveSelectedRange';

export let columnIsMoving: boolean = false;
export class ColReorderBehavior extends Behavior {
    private colOnScreen!: Column;
    private mouseOffset: number;
    private target: Column[];
    private positionX: number;
    private lastAssignableColumn: Column | undefined;
    private sortedSelectedRanges = this.gridContext.state.selectedRanges.sort((a, b): number => {
        if (a.first.col.idx < b.first.col.idx) {
            return -1
        } else if (a.first.col.idx > b.first.col.idx) {
            return 1
        } else {
            return 0
        }
    })
    private setLinePosition: (position: number) => void = _ => { };
    private setShadowPosition: (position: number) => void = _ => { };

    constructor(private gridContext: GridContext, event: any) {
        super();
        console.log(event.type)
        const activeSelectedRange = getActiveSelectedRange(gridContext);
        // TODO pass the target location to this constructor
        this.target = this.gridContext.cellMatrix.cols.filter(
            (c: Column) =>
                c.idx < activeSelectedRange.cols[0].idx ||
                c.idx > activeSelectedRange.cols[activeSelectedRange.cols.length - 1].idx
        );

        const colUnderCursor = activeSelectedRange.first.col;
        const positionX =
            event.type === 'pointerdown'
                ? event.clientX
                : event.type === 'touchstart'
                    ? event.changedTouches[0].clientX
                    : null;

        this.mouseOffset = 0;
        this.positionX = positionX;
        this.lastAssignableColumn = undefined;

        const chosenRange = this.sortedSelectedRanges.find(r =>
            r.first.col.left + this.gridContext.cellMatrix.frozenRightRange.width < this.positionX
            && this.positionX < r.last.col.right + this.gridContext.cellMatrix.frozenRightRange.width)

        if (chosenRange) {
            if (
                this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
                this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0
            ) {
                if (colUnderCursor.idx >= this.gridContext.cellMatrix.frozenRightRange.first.col.idx) {
                    this.mouseOffset = this.gridContext.cellMatrix.frozenRightRange.width / 2
                    // - this.gridContext.state.scrollAreaWidth;
                } else if (colUnderCursor.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                    this.mouseOffset =
                        positionX -
                        chosenRange.first.col.left -
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        this.gridContext.viewportElement.scrollLeft;
                } else {
                    this.mouseOffset = positionX - chosenRange.first.col.left;
                }
            } else if (
                this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
                !(this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0)
            ) {
                if (colUnderCursor.idx >= this.gridContext.cellMatrix.frozenRightRange.first.col.idx) {
                    this.mouseOffset =
                        positionX -
                        chosenRange.first.col.left -
                        this.gridContext.cellMatrix.frozenLeftRange.width
                    // - this.gridContext.state.scrollAreaWidth;
                } else {
                    this.mouseOffset =
                        positionX -
                        chosenRange.first.col.left -
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        this.gridContext.viewportElement.scrollLeft;
                }
            } else if (this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0) {
                if (colUnderCursor.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                    this.mouseOffset =
                        positionX -
                        chosenRange.first.col.left -
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        this.gridContext.viewportElement.scrollLeft;
                } else {
                    this.mouseOffset = positionX - chosenRange.first.col.left;
                }
            } else {
                this.mouseOffset = positionX - chosenRange.first.col.left + this.gridContext.viewportElement.scrollLeft;
            }

            this.sortedSelectedRanges.forEach(r => {
                if (r == chosenRange) {
                    return
                }
                if (r.first.col.left < chosenRange.first.col.left) {
                    this.mouseOffset += r.width
                }
            })
        } else {
            resetToDefaultBehavior(this.gridContext);
        }

    }

    dispose = () => {
        columnIsMoving = false;
    };

    private changeShadowPosition(location: Location) {
        const cellMatrix = this.gridContext.cellMatrix;
        let colUnderCursor = location.col
        if (colUnderCursor) {
            if (colUnderCursor !== this.colOnScreen) {
                this.handleMouseEnterOnCol(colUnderCursor);
            }
        }
        this.setShadowPosition(this.calculateShadowPosition(cellMatrix));
    }

    private calculateShadowPosition(cellMatrix: CellMatrix) {
        const viewportElement = this.gridContext.viewportElement;
        const mousePosition = this.positionX + viewportElement.scrollLeft;
        const activeSelectedRange = getActiveSelectedRange(this.gridContext);

        if (this.positionX - this.mouseOffset <= cellMatrix.first.col.left && viewportElement.scrollLeft === 0) {
            return cellMatrix.first.col.left;
        } else if (
            this.positionX - this.mouseOffset + activeSelectedRange.width + viewportElement.scrollLeft >=
            cellMatrix.width
        ) {
            return cellMatrix.width - activeSelectedRange.width
        } else {
            return mousePosition - this.mouseOffset;
        }
    }

    handlePointerUp = (e: any) => {
        const activeSelectedRange = getActiveSelectedRange(this.gridContext);
        const selectedCols = activeSelectedRange.cols;
        const cellMatrix: CellMatrix = this.gridContext.cellMatrix;

        if (!this.colOnScreen) {
            this.setLinePosition(-1);
            this.setShadowPosition(-1);
        } else {
            const isOnRightSideDrop = activeSelectedRange.first.col.idx < this.colOnScreen.idx;

            // checking if the column is enabled to drop on certain side
            if (this.colOnScreen.canDropRight && (isOnRightSideDrop && !this.colOnScreen.canDropRight(this.gridContext.state.selectedIndexes)) ||
                this.colOnScreen.canDropLeft && (!isOnRightSideDrop && !this.colOnScreen.canDropLeft(this.gridContext.state.selectedIndexes))) {

                if (this.lastAssignableColumn) {
                    this.colOnScreen = this.lastAssignableColumn;
                    this.lastAssignableColumn = undefined;
                } else {
                    resetToDefaultBehavior(this.gridContext);
                    return;
                }
            }

            const positionChange =
                this.colOnScreen.idx > selectedCols[0].idx
                    ? this.colOnScreen.idx - selectedCols[selectedCols.length - 1].idx
                    : this.colOnScreen.idx - selectedCols[0].idx;
            if (isOnRightSideDrop) {
                if (this.colOnScreen.onDropRight || this.colOnScreen.idx === cellMatrix.last.col.idx) {
                    this.colOnScreen.onDropRight!(this.gridContext.state.selectedIndexes.sort());
                }
            } else {
                if (this.colOnScreen.onDropLeft) {
                    this.colOnScreen.onDropLeft(this.gridContext.state.selectedIndexes.sort());
                }
            }

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
                // selectedColsIdx,
                selectedRanges
            });
        }

        resetToDefaultBehavior(this.gridContext);
    }

    private handleMouseEnterOnCol(col: Column) {
        const activeSelectedRange = getActiveSelectedRange(this.gridContext);
        const isTargetCol = (col: Column) => {
            return this.target.some(c => c === col);
        };
        const isSelectedCol = (col: Column) => {
            return activeSelectedRange.cols.some((c: Column) => c.idx === col.idx);
        };

        const areColumnsMovingRight = () => {
            return activeSelectedRange.first.col.idx < this.colOnScreen.idx;
        };

        this.colOnScreen =
            isTargetCol(col)
                ? col
                : isSelectedCol(col)
                    ? activeSelectedRange.cols[0]
                    : this.colOnScreen;

        // checking if the position line should be updated
        if (col.canDropRight && (!col.canDropRight(this.gridContext.state.selectedIndexes) && areColumnsMovingRight()) ||
            col.canDropLeft && (!col.canDropLeft(this.gridContext.state.selectedIndexes) && !areColumnsMovingRight()))
            return

        let colLeft = col.left;
        const cellMatrix: CellMatrix = this.gridContext.cellMatrix;
        let linePosition;
        if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0
        ) {
            if (col.idx >= this.gridContext.cellMatrix.frozenRightRange.first.col.idx) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? (colLeft += cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width + col.width)
                        : this.colOnScreen.left +
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        cellMatrix.scrollableRange.width
                    : -1;
            } else if (col.idx > this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                // TODO floating position line
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left +
                        this.colOnScreen.width +
                        this.gridContext.cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                    : -1;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width
                        : this.colOnScreen.left
                    : -1;
            }
        } else if (this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0) {
            if (col.idx >= this.gridContext.cellMatrix.frozenLeftRange.last.col.idx) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width + cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + cellMatrix.frozenLeftRange.width
                    : -1;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left + this.colOnScreen.width
                        : this.colOnScreen.left
                    : -1;
            }
        } else if (
            this.gridContext.cellMatrix.frozenRightRange.cols.length > 0 &&
            !(this.gridContext.cellMatrix.frozenLeftRange.cols.length > 0)
        ) {
            if (col.idx >= this.gridContext.cellMatrix.frozenRightRange.first.col.idx) {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? (colLeft += cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width + col.width)
                        : this.colOnScreen.left +
                        this.gridContext.cellMatrix.frozenLeftRange.width +
                        cellMatrix.scrollableRange.width
                    : -1;
            } else {
                linePosition = this.colOnScreen
                    ? areColumnsMovingRight()
                        ? this.colOnScreen.left +
                        this.colOnScreen.width +
                        this.gridContext.cellMatrix.frozenLeftRange.width
                        : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                    : -1;
            }
        } else {
            linePosition = this.colOnScreen
                ? areColumnsMovingRight()
                    ? this.colOnScreen.left + this.colOnScreen.width + this.gridContext.cellMatrix.frozenLeftRange.width
                    : this.colOnScreen.left + this.gridContext.cellMatrix.frozenLeftRange.width
                : -1;
        }

        this.lastAssignableColumn = this.colOnScreen;
        this.setLinePosition(linePosition);
    }

    renderGlobalPart = () => {
        const ranges: Range[] = this.sortedSelectedRanges;
        const shadowWidth = ranges.map(r => r.width).reduce((a, b) => a + b, 0)
        return (
            <LineAndShadow
                onInitialized={(linePostionSetter, shadowPositionSetter) => {
                    this.setLinePosition = linePostionSetter;
                    this.setShadowPosition = shadowPositionSetter
                }}
                isVertical={true}
                cellMatrix={this.gridContext.cellMatrix}
                shadowSize={shadowWidth}
            />
        )
    }
    handlePointerMove(event: any, location: any) {
        if (event.type === 'pointermove') {
            this.positionX = event.clientX;
        } else if (event.type === 'touchmove') {
            this.positionX = event.changedTouches[0].clientX;
        }

        this.changeShadowPosition(location);
    }

}
