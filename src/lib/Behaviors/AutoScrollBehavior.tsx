import * as React from 'react';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { Orientation } from '../Model';
import { DrawExternalFocusedLocationsBehavior } from './DrawExternalFocusedLocationsBehavior';
import { Utilities } from '../Common/Utilities';

export class AutoScrollBehavior extends DelegateBehavior {
    private mouseMoveHandler = this.handleMouseMove.bind(this);
    private scrollByTop = 0;
    private scrollByLeft = 0;
    private timer = 0;

    constructor(inner: Behavior, private direction: Orientation | 'both' = 'both') {
        super(new DrawExternalFocusedLocationsBehavior(inner));
        window.addEventListener('mousemove', this.mouseMoveHandler);
        window.addEventListener('touchmove', this.mouseMoveHandler);
    }

    dispose = () => {
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('touchmove', this.mouseMoveHandler);
        window.clearInterval(this.timer);
    };

    private handleMouseMove(event: any) {
        const positionX =
            event.type === 'mousemove'
                ? event.clientX
                : event.type === 'touchmove'
                    ? event.changedTouches[0].clientX
                    : null;
        const positionY =
            event.type === 'mousemove'
                ? event.clientY
                : event.type === 'touchmove'
                    ? event.changedTouches[0].clientY
                    : null;
        const scrollMargin = [25, 25, 50, 25]; // top right bottom left
        const gridElement = this.grid.gridElement;
        const gridRect = gridElement.getBoundingClientRect();
        const cellMatrix = this.grid.props.cellMatrix;
        const leftScrollBorder = gridRect.left + cellMatrix.frozenLeftRange.width + scrollMargin[3];
        const rightScrollBorder = gridElement.clientWidth - cellMatrix.frozenRightRange.width - scrollMargin[1];
        const topScrollBorder = gridRect.top + cellMatrix.frozenTopRange.height + scrollMargin[0];
        const bottomScrollBorder = gridRect.bottom - cellMatrix.frozenBottomRange.height - scrollMargin[2];
        const secondRow = cellMatrix.rows[1];
        const lastRow = cellMatrix.last.row;

        this.scrollByLeft =
            this.direction === 'vertical'
                ? 0
                : positionX < leftScrollBorder
                    ? positionX - leftScrollBorder
                    : positionX > rightScrollBorder
                        ? positionX - rightScrollBorder
                        : 0;
        this.scrollByTop =
            this.direction === 'horizontal'
                ? 0
                : positionY < topScrollBorder
                    ? positionY - topScrollBorder
                    : positionY > bottomScrollBorder
                        ? positionY - bottomScrollBorder
                        : 0;
        if (this.direction === 'both') {
            if (this.isSelectionFixedVertically()) {
                this.scrollByTop = 0;
            }
            if (this.isSelectionFixedHorizontally()) {
                this.scrollByLeft = 0;
            }
        }

        if ((this.timer === 0 && this.scrollByLeft !== 0) || this.scrollByTop !== 0) {
            window.clearInterval(this.timer);
            this.timer = window.setInterval(() => {
                let nextCol = undefined;
                if (this.scrollByLeft !== 0) {
                    const isLeftGreaterThanLastCol =
                        rightScrollBorder + this.scrollByLeft + gridElement.scrollLeft >
                        cellMatrix.scrollableRange.last.col.left;
                    if (this.scrollByLeft > 0 && isLeftGreaterThanLastCol) {
                        nextCol = cellMatrix.scrollableRange.last.col;
                    } else {
                        nextCol = cellMatrix.scrollableRange.cols.find(
                            c =>
                                c.left >=
                                (this.scrollByLeft > 0
                                    ? rightScrollBorder
                                    : leftScrollBorder >= c.width
                                        ? -leftScrollBorder
                                        : -c.width) +
                                this.scrollByLeft +
                                gridElement.scrollLeft
                        );
                    }
                }

                const hiddenHeight = gridElement.scrollHeight - gridElement.clientHeight;
                const topLastVisibleRow = gridElement.scrollHeight - hiddenHeight + gridElement.scrollTop;
                const searchedNextRow = cellMatrix.scrollableRange.rows.find(r => r.top >= topLastVisibleRow);

                const nextRowTop =
                    this.scrollByTop !== 0
                        ? this.scrollByTop < 0
                            ? gridElement.scrollTop - -this.scrollByTop
                            : (searchedNextRow ? searchedNextRow.top : topLastVisibleRow) + this.scrollByTop
                        : undefined;

                const nextRow =
                    this.scrollByTop !== 0
                        ? this.scrollByTop < 0
                            ? nextRowTop > 0
                                ? cellMatrix.scrollableRange.rows
                                    .slice()
                                    .reverse()
                                    .find(r => r.top < nextRowTop)
                                : secondRow
                            : nextRowTop < lastRow.top
                                ? cellMatrix.scrollableRange.rows.find(r => r.top >= nextRowTop)
                                : lastRow
                        : undefined;

                const scrollToCol = nextCol || (nextRow ? this.grid.getColumnFromClientX(positionX) : undefined);
                const scrollToRow = nextRow || (nextCol ? this.grid.getRowOnScreen(positionY) : undefined);

                if (scrollToCol && scrollToRow) {
                    this.grid.scrollIntoView(cellMatrix.getLocation(scrollToRow.idx, scrollToCol.idx), 'smooth');
                }
            }, 300);
        } else if (this.timer !== 0 && this.scrollByLeft === 0 && this.scrollByTop === 0) {
            window.clearInterval(this.timer);
            this.timer = 0;
        }
    }

    private isSelectionFixedVertically() {
        const matrix = this.grid.props.cellMatrix;
        return (
            (matrix.frozenTopRange.rows.length &&
                matrix.frozenTopRange.containsRange(
                    Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
                )) ||
            (matrix.frozenBottomRange.rows.length > 0 &&
                matrix.frozenBottomRange.containsRange(
                    Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
                ))
        );
    }

    private isSelectionFixedHorizontally() {
        const matrix = this.grid.props.cellMatrix;
        return (
            (matrix.frozenLeftRange.cols.length > 0 &&
                matrix.frozenLeftRange.containsRange(
                    Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
                )) ||
            (matrix.frozenRightRange.cols.length > 0 &&
                matrix.frozenRightRange.containsRange(
                    Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
                ))
        );
    }
}
