import * as React from 'react';
import { Grid } from '../Components/Gridonents/Grid';
import { Location } from '../Model';
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { BasicGridBehavior } from './BasicGridBehavior';
import { Utilities } from '../Common/Utilities';
import { CellMatrix } from '../CellMatrix';

// export let userIsMarkingGrid: boolean = false;

export class CellSelectionBehavior extends DelegateBehavior {
    private clientX = 0; // for gridScrollHandler!
    private clientY = 0;
    private touch: boolean = false;

    private moveHandler = this.handleMove.bind(this);

    constructor(grid: Grid, event: any, private selectionType: 'cell' | 'row' | 'column', touch?: boolean) {
        super(
            new AutoScrollBehavior(
                new BasicGridBehavior(grid),
                selectionType === 'row' ? 'vertical' : selectionType === 'column' ? 'horizontal' : 'both'
            )
        );

        const positionX =
            event.type === 'mousedown' || event.type === 'click'
                ? event.clientX
                : event.type === 'touchstart'
                    ? event.changedTouches[0].clientX
                    : null;
        const positionY =
            event.type === 'mousedown' || event.type === 'click'
                ? event.clientY
                : event.type === 'touchstart'
                    ? event.changedTouches[0].clientY
                    : null;

        this.clientX = positionX;
        this.clientY = positionY;

        if (touch) {
            this.touch = touch;
            if (event.type === 'click') {
                this.handleMouseDownAndClick(event);
            } else if (event.type === 'touchstart') {
                window.addEventListener('touchmove', this.moveHandler);
                window.addEventListener('touchend', this.touchEndHandler);
                this.grid.gridElement.addEventListener('scroll', this.gridScrollHandler);
            }
        } else {
            this.handleMouseDownAndClick(event);

            if (event.shiftKey && this.grid.state.focusedLocation) {
                this.updateCellSelection();
            }

            this.grid.gridElement.addEventListener('scroll', this.gridScrollHandler);
        }
    }

    dispose = () => {
        this.innerBehavior.dispose();
        window.removeEventListener('mousemove', this.moveHandler);
        window.removeEventListener('mouseup', this.mouseUpHandler);
        window.removeEventListener('touchmove', this.moveHandler);
        window.removeEventListener('touchend', this.touchEndHandler);
        this.grid.gridElement.removeEventListener('scroll', this.gridScrollHandler);
    };

    handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const location: Location = this.grid.getLocationFromClient(e.clientX, e.clientY);
        if (this.grid.state.isFocusedCellInEditMode || this.grid.state.isFocusedCellReadOnly) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (
                this.grid.state.focusedLocation &&
                this.grid.state.focusedLocation.col.idx === location.col.idx &&
                this.grid.state.focusedLocation.row.idx === location.row.idx
            ) {
                setTimeout(() => this.grid.setState({ isFocusedCellInEditMode: true }));
            }
        }
    };

    private handleMouseDownAndClick = (event: any) => {
        const locationOfCell = this.grid.getLocationFromClient(this.clientX, this.clientY);
        const cellMatrix = this.grid.props.cellMatrix;

        if (event.type === 'mousedown') {
            if (event.button === 2) {
                // right button of mouse
                if (this.grid.isClickInsideSelectedRange(event)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.grid.focusLocation(locationOfCell, false);
                    return;
                } else if (!event.shiftKey) {
                    if (this.grid.isClickOutOfGrid(this.clientX, this.clientY)) {
                    } else {
                        this.setFocusLocation(this.grid, this.clientX, this.clientY);
                    }
                }
            } else {
                event.preventDefault();
                event.stopPropagation();
                if (!event.shiftKey) {
                    this.selectCellOrRowOrColumn(event, locationOfCell, cellMatrix);
                }
            }

            window.addEventListener('mousemove', this.moveHandler);
            window.addEventListener('mouseup', this.mouseUpHandler);
        } else if (event.type === 'click') {
            this.selectCellOrRowOrColumn(event, locationOfCell, cellMatrix);
        }
    };

    private selectCellOrRowOrColumn(event: any, locationOfCell: Location, cellMatrix: CellMatrix) {
        if (this.selectionType === 'cell') {
            this.setFocusLocation(this.grid, this.clientX, this.clientY, event.ctrlKey);
        } else if (this.selectionType === 'row') {
            const range = this.grid.props.cellMatrix.getRange(locationOfCell, {
                row: locationOfCell.row,
                col: cellMatrix.cols[cellMatrix.cols.length - 1]
            });
            let selectedRowsIdx: number[] = this.grid.state.selectedRowsIdx;
            if (event.type === 'mousedown') {
                if (event.ctrlKey) {
                    this.toggleRow(event, selectedRowsIdx, locationOfCell, cellMatrix, range);
                } else {
                    selectedRowsIdx = [];
                    selectedRowsIdx.push(locationOfCell.row.idx);
                    this.grid.setState({
                        selectedRowsIdx,
                        focusedLocation: locationOfCell,
                        selectedRanges: [range]
                    });
                }
            } else if (event.type === 'click') {
                this.toggleRow(event, selectedRowsIdx, locationOfCell, cellMatrix, range);
            }
        } else if (this.selectionType === 'column') {
            const range = cellMatrix.getRange(locationOfCell, {
                row: cellMatrix.rows[cellMatrix.rows.length - 1],
                col: locationOfCell.col
            });
            let selectedColsIdx: number[] = this.grid.state.selectedColsIdx;
            if (event.type === 'mousedown') {
                if (event.ctrlKey) {
                    this.toggleColumn(event, selectedColsIdx, locationOfCell, cellMatrix, range);
                } else {
                    selectedColsIdx = [];
                    selectedColsIdx.push(locationOfCell.col.idx);
                    this.grid.setState({
                        selectedColsIdx,
                        focusedLocation: locationOfCell,
                        selectedRanges: [range]
                    });
                }
            } else if (event.type === 'click') {
                this.toggleColumn(event, selectedColsIdx, locationOfCell, cellMatrix, range);
            }
        }
        if (event.type === 'click') {
            setTimeout(() => this.grid.resetToDefaultBehavior());
        }
    }

    private toggleRow(
        event: any,
        selectedRowsIdx: number[],
        locationOfCell: Location,
        cellMatrix: CellMatrix,
        range: any
    ) {
        if (selectedRowsIdx.some(idx => idx === locationOfCell.row.idx)) {
            if (selectedRowsIdx.length > 1) {
                selectedRowsIdx = selectedRowsIdx.filter(r => r !== locationOfCell.row.idx);
                this.grid.setState({
                    selectedRowsIdx,
                    focusedLocation: cellMatrix.getLocation(selectedRowsIdx[selectedRowsIdx.length - 1], 0),
                    selectedRanges: this.grid.state.selectedRanges.filter(
                        r => r.first.row.idx !== locationOfCell.row.idx
                    )
                });
            }
        } else {
            selectedRowsIdx.push(locationOfCell.row.idx);
            const selectedRanges =
                event.type === 'click'
                    ? selectedRowsIdx.length === 1
                        ? [].concat(range)
                        : this.grid.state.selectedRanges.concat(range)
                    : this.grid.state.selectedRanges.concat(range);
            this.grid.setState({
                selectedRowsIdx,
                focusedLocation: locationOfCell,
                selectedRanges
            });
        }
    }

    private toggleColumn(
        event: any,
        selectedColsIdx: number[],
        locationOfCell: Location,
        cellMatrix: CellMatrix,
        range: any
    ) {
        if (selectedColsIdx.some(idx => idx === locationOfCell.col.idx)) {
            if (selectedColsIdx.length > 1) {
                selectedColsIdx = selectedColsIdx.filter(r => r !== locationOfCell.col.idx);
                this.grid.setState({
                    selectedColsIdx,
                    focusedLocation: cellMatrix.getLocation(0, selectedColsIdx[selectedColsIdx.length - 1]),
                    selectedRanges: this.grid.state.selectedRanges.filter(
                        r => r.first.col.idx !== locationOfCell.col.idx
                    )
                });
            }
        } else {
            selectedColsIdx.push(locationOfCell.col.idx);
            const selectedRanges =
                event.type === 'click'
                    ? selectedColsIdx.length === 1
                        ? [].concat(range)
                        : this.grid.state.selectedRanges.concat(range)
                    : this.grid.state.selectedRanges.concat(range);
            this.grid.setState({
                selectedColsIdx,
                focusedLocation: locationOfCell,
                selectedRanges
            });
        }
    }

    private mouseUpHandler = () => {
        this.grid.resetToDefaultBehavior();
    };
    private touchEndHandler = () => {
        const activeSelectedRange = Utilities.getActiveSelectionRange(
            this.grid.state.selectedRanges,
            this.grid.state.focusedLocation
        );
        if (activeSelectedRange.rows.length > 1 || activeSelectedRange.cols.length > 1) {
            // userIsMarkingGrid = false;
        }
        this.grid.resetToDefaultBehavior();
    };
    private gridScrollHandler = () => this.updateCellSelection();

    private handleMove(event: any) {
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
        const location = this.grid.getLocationFromClient(positionX, positionY);

        this.clientX = positionX;
        this.clientY = positionY;

        if (location.col === undefined || location.row === undefined) {
            return;
        }

        if (this.selectionType === 'cell') {
            this.updateCellSelection();
        }
    }

    private setFocusLocation(grid: Grid, positionX: number, positionY: number, ctrlKeyPressed: boolean = false) {
        let focusedLocation = grid.getLocationFromClient(positionX, positionY);

        if (
            grid.state.focusedLocation &&
            grid.state.focusedLocation.col.idx === focusedLocation.col.idx &&
            grid.state.focusedLocation.row.idx === focusedLocation.row.idx
        ) {
            if (grid.state.isFocusedCellInEditMode) {
                return;
            }
        } else {
            grid.focusLocation(focusedLocation, !ctrlKeyPressed);
            if (ctrlKeyPressed) {
                if (!Utilities.isFocusedLocationInsideSelectedRanges(grid.state.selectedRanges, focusedLocation)) {
                    this.grid.setState({
                        selectedRowsIdx: [],
                        selectedColsIdx: [],
                        selectedRanges: this.grid.state.selectedRanges.concat([
                            this.grid.props.cellMatrix.getRange(focusedLocation, focusedLocation)
                        ])
                    });
                }
            } else {
                this.grid.setState({
                    selectedRowsIdx: [],
                    selectedColsIdx: [],
                    selectedRanges: [this.grid.props.cellMatrix.getRange(focusedLocation, focusedLocation)]
                });
            }
        }
    }

    private updateCellSelection() {
        const cellMatrix = this.grid.props.cellMatrix;
        const cellUnderCursor = this.grid.getLocationFromClient(this.clientX, this.clientY, true);
        if (this.touch) {
            // userIsMarkingGrid = true;
        }
        if (this.grid.state.focusedLocation && !this.grid.isClickOutOfGrid(this.clientX, this.clientY)) {
            const activeSelectedRange = cellMatrix.getRange(cellUnderCursor, this.grid.state.focusedLocation);
            const selectedRanges = this.grid.state.selectedRanges.map(range =>
                range.contains(this.grid.state.focusedLocation) ? activeSelectedRange : range
            );
            this.grid.setState({ selectedRanges: selectedRanges });
        }
    }
}
