import * as React from 'react';
import { Grid } from '../Components/Gridonents/Grid';
import { Location, Range, Direction } from '../Model';
import { DelegateBehavior } from "./DelegateBehavior";
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { BasicGridBehavior } from './BasicGridBehavior';
import { Utilities } from '../Common/Utilities';

export class FillHandleBehavior extends DelegateBehavior {
    private currentLocation: Location = null;
    private moveHandler = this.handleMove.bind(this);
    private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this);
    private fillDirection: Direction;
    private fillRange: Range;

    constructor(grid: Grid, event: any) {
        super(new AutoScrollBehavior(new BasicGridBehavior(grid)));
        if (event.type === 'mousedown') {
            window.addEventListener('mousemove', this.moveHandler);
            window.addEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        } else if (event.type === 'touchstart') {
            window.addEventListener('touchmove', this.moveHandler);
            window.addEventListener('touchend', this.mouseUpAndTouchEndHandler);
        }
    }

    handleMove(event: any) {
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
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.grid.state.selectedRanges,
            this.grid.state.focusedLocation
        );
        const cellMatrix = this.grid.props.cellMatrix;
        const location = this.grid.getLocationFromClient(positionX, positionY);
        if (this.currentLocation === location || !activeSelectedRange || !location.col || !location.row) {
            return;
        }
        this.currentLocation = location;
        // active selection
        let diffrences: { direction: Direction; value: number }[] = [];
        diffrences.push({ direction: undefined, value: 0 });
        diffrences.push({
            direction: 'up',
            value:
                location.row.idx < activeSelectedRange.first.row.idx
                    ? activeSelectedRange.first.row.idx - location.row.idx
                    : 0
        });
        diffrences.push({
            direction: 'down',
            value:
                location.row.idx > activeSelectedRange.last.row.idx
                    ? location.row.idx - activeSelectedRange.last.row.idx
                    : 0
        });
        diffrences.push({
            direction: 'left',
            value:
                location.col.idx < activeSelectedRange.first.col.idx
                    ? activeSelectedRange.first.col.idx - location.col.idx
                    : 0
        });
        diffrences.push({
            direction: 'right',
            value:
                location.col.idx > activeSelectedRange.last.col.idx
                    ? location.col.idx - activeSelectedRange.last.col.idx
                    : 0
        });
        this.fillDirection = diffrences.reduce((prev, current) =>
            prev.value >= current.value ? prev : current
        ).direction;
        switch (this.fillDirection) {
            case 'right':
                this.fillRange = cellMatrix.getRange(
                    cellMatrix.getLocation(
                        activeSelectedRange.first.row.idx,
                        cellMatrix.last.col.idx < activeSelectedRange.last.col.idx + 1
                            ? cellMatrix.last.col.idx
                            : activeSelectedRange.last.col.idx + 1
                    ),
                    cellMatrix.getLocation(activeSelectedRange.last.row.idx, this.currentLocation.col.idx)
                );
                break;
            case 'left':
                this.fillRange = cellMatrix.getRange(
                    cellMatrix.getLocation(activeSelectedRange.first.row.idx, this.currentLocation.col.idx),
                    cellMatrix.getLocation(
                        activeSelectedRange.last.row.idx,
                        cellMatrix.first.col.idx > activeSelectedRange.first.col.idx - 1
                            ? cellMatrix.first.col.idx
                            : activeSelectedRange.first.col.idx - 1
                    )
                );
                break;

            case 'up':
                this.fillRange = cellMatrix.getRange(
                    cellMatrix.getLocation(this.currentLocation.row.idx, activeSelectedRange.first.col.idx),
                    cellMatrix.getLocation(
                        cellMatrix.first.row.idx > activeSelectedRange.first.row.idx - 1
                            ? cellMatrix.first.row.idx
                            : activeSelectedRange.first.row.idx - 1,
                        activeSelectedRange.last.col.idx
                    )
                );
                break;

            case 'down':
                this.fillRange = cellMatrix.getRange(
                    cellMatrix.getLocation(
                        cellMatrix.last.row.idx < activeSelectedRange.last.row.idx + 1
                            ? cellMatrix.last.row.idx
                            : activeSelectedRange.last.row.idx + 1,
                        activeSelectedRange.first.col.idx
                    ),
                    cellMatrix.getLocation(this.currentLocation.row.idx, activeSelectedRange.last.col.idx)
                );
                break;
        }
        this.grid.forceUpdate();
    }

    handleMouseUpAndTouchEnd(event: any) {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.grid.state.selectedRanges,
            this.grid.state.focusedLocation
        );
        const cellMatrix = this.grid.props.cellMatrix;
        let values: any[];
        if (!activeSelectedRange) {
            this.grid.commitChanges();
            if (event.type === 'mouseup') {
                window.removeEventListener('mousemove', this.moveHandler);
                window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler);
            } else if (event.type === 'touchend') {
                window.removeEventListener('touchmove', this.moveHandler);
                window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler);
            }
            this.grid.resetToDefaultBehavior();
            return;
        }

        switch (this.fillDirection) {
            case 'right':
                values = activeSelectedRange.rows.map(row =>
                    this.grid.props.cellMatrix.getCell({ row, col: activeSelectedRange.last.col })
                );
                this.fillRange.rows.forEach((row, i) =>
                    this.fillRange.cols.forEach(col => {
                        cellMatrix.getCell({ row, col }) &&
                            cellMatrix.getCell({ row, col }).trySetValue(values[i].value);
                    })
                );
                this.grid.setState({
                    selectedRanges: [
                        cellMatrix.getRange(activeSelectedRange.first, {
                            row: activeSelectedRange.last.row,
                            col: this.currentLocation.col
                        })
                    ]
                });
                break;
            case 'left':
                values = activeSelectedRange.rows.map(row =>
                    this.grid.props.cellMatrix.getCell({ row, col: activeSelectedRange.first.col })
                );
                this.fillRange.rows.forEach((row, i) =>
                    this.fillRange.cols.forEach(
                        col =>
                            cellMatrix.getCell({ row, col }) &&
                            cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
                    )
                );
                this.grid.setState({
                    selectedRanges: [
                        cellMatrix.getRange(activeSelectedRange.last, {
                            row: activeSelectedRange.first.row,
                            col: this.currentLocation.col
                        })
                    ]
                });
                break;
            case 'up':
                values = activeSelectedRange.cols.map(col =>
                    this.grid.props.cellMatrix.getCell({ row: activeSelectedRange.first.row, col })
                );
                this.fillRange.rows.forEach(row =>
                    this.fillRange.cols.forEach(
                        (col, i) =>
                            cellMatrix.getCell({ row, col }) &&
                            cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
                    )
                );
                this.grid.setState({
                    selectedRanges: [
                        cellMatrix.getRange(activeSelectedRange.last, {
                            row: this.currentLocation.row,
                            col: activeSelectedRange.first.col
                        })
                    ]
                });
                break;
            case 'down':
                values = activeSelectedRange.cols.map(col =>
                    this.grid.props.cellMatrix.getCell({ row: activeSelectedRange.last.row, col })
                );
                this.fillRange.rows.forEach(row =>
                    this.fillRange.cols.forEach(
                        (col, i) =>
                            cellMatrix.getCell({ row, col }) &&
                            cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
                    )
                );
                this.grid.setState({
                    selectedRanges: [
                        cellMatrix.getRange(activeSelectedRange.first, {
                            row: this.currentLocation.row,
                            col: activeSelectedRange.last.col
                        })
                    ]
                });
                break;
        }
        this.grid.commitChanges();
        if (event.type === 'mouseup') {
            window.removeEventListener('mousemove', this.moveHandler);
            window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler);
        } else if (event.type === 'touchend') {
            window.removeEventListener('touchmove', this.moveHandler);
            window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler);
        }
        this.grid.resetToDefaultBehavior();
    }

    renderPanePart = (pane: Range): React.ReactNode => {
        return (
            <>
                {this.innerBehavior.renderPanePart(pane)}
                {this.fillDirection &&
                    this.grid.renderPartialAreaForPane(this.fillRange, pane, {
                        backgroundColor: '',
                        borderTop: this.fillDirection === 'down' ? '0px' : '1px dashed #616161',
                        borderBottom: this.fillDirection === 'up' ? '0px' : '1px dashed #616161',
                        borderLeft: this.fillDirection === 'right' ? '0px' : '1px dashed #616161',
                        borderRight: this.fillDirection === 'left' ? '0px' : '1px dashed #616161'
                    })}
            </>
        );
    };
}
