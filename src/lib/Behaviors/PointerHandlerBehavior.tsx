import * as React from 'react';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { Location } from '../Model';
import { CellSelectionBehavior, userIsMarkingGrid } from './CellSelectionBehavior';
import { ResizeColumnBehavior } from './ResizeColumnBehavior';
import { DrawFillHandleBehavior } from './DrawFillHandleBehavior';
import { headerCellTouchStartTime } from '../Cells/HeaderCell';
import { columnIsMoving } from './ColReorderBehavior';
import { FieldTypes } from 'FlexBase/Model';

export class PointerHandlerBehavior extends DelegateBehavior {
    private touchStartTime: number = 0;
    private touchEndTime: number = 0;
    private mouseEvent: boolean = true;

    constructor(inner: Behavior) {
        super(inner);
    }

    handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.mouseEvent) {
            const location: Location = this.grid.getLocationFromClient(e.clientX, e.clientY);
            if (
                this.grid.state.isFocusedCellInEditMode &&
                (this.grid.state.focusedLocation.row.idx === location.row.idx &&
                    this.grid.state.focusedLocation.col.idx === location.col.idx)
            ) {
                return;
            }
            this.grid.changeBehavior(new CellSelectionBehavior(this.grid, e, 'cell'));
        }
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
                this.grid.setState({ isFocusedCellInEditMode: true });
            }
        }
    };

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!this.mouseEvent) {
            if (this.grid.state.isFocusedCellInEditMode) {
                return;
            }
            this.grid.changeBehavior(new CellSelectionBehavior(this.grid, e, 'cell', true));
        }
        this.mouseEvent = true;
    };

    handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {

        /*this.state.focusedLocation &&*/

        const location: Location = this.grid.getLocationFromClient(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
        );
        const isItTheSameCell = this.grid.state.focusedLocation
            ? this.grid.state.focusedLocation.row.idx === location.row.idx &&
            this.grid.state.focusedLocation.col.idx === location.col.idx
            : null;
        if (this.grid.state.isFocusedCellInEditMode) {
            return;
        }

        if (isItTheSameCell) {
            this.grid.changeBehavior(new CellSelectionBehavior(this.grid, e, 'cell', true));
        }

        this.touchStartTime = new Date().getTime();
    };

    handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        this.touchEndTime = new Date().getTime();

        if (
            headerCellTouchStartTime &&
            this.grid.props.cellMatrix.getCell(
                this.grid.getLocationFromClient(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            ).type === FieldTypes.header
        ) {
            this.touchStartTime = headerCellTouchStartTime;
        }

        if (
            !this.grid.state.isFocusedCellInEditMode &&
            this.grid.state.focusedLocation &&
            !(this.grid.state.currentBehavior instanceof ResizeColumnBehavior) &&
            !(this.grid.state.currentBehavior instanceof DrawFillHandleBehavior) &&
            !userIsMarkingGrid &&
            !columnIsMoving &&
            !this.grid.state.isFocusedCellReadOnly &&
            this.touchEndTime - this.touchStartTime > 500
        ) {
            this.grid.handleContextMenu(e);
            e.persist();
        }

        this.mouseEvent = false;
    };
}
