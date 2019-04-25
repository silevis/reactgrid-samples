import * as React from 'react';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { CellSelectionBehavior, userIsMarkingGrid } from './CellSelectionBehavior';
import { ResizeColumnBehavior } from './ResizeColumnBehavior';
import { DrawFillHandleBehavior } from './DrawFillHandleBehavior';
import { headerCellTouchStartTime } from '../Cells/HeaderCell';
import { columnIsMoving } from './ColReorderBehavior';
import { FieldTypes } from 'FlexBase/Model';
import { Location } from '../Common';
import { getLocationFromClient } from '../Functions/getLocationFromClient';
import { changeBehavior } from '../Functions/changeBehavior';

export class PointerHandlerBehavior extends DelegateBehavior {
    private touchStartTime: number = 0;
    private touchEndTime: number = 0;
    private mouseEvent: boolean = true;

    constructor(inner: Behavior) {
        super(inner);
    }

    handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.mouseEvent) {
            const location: Location = getLocationFromClient(this.gridContext, e.clientX, e.clientY);
            if (
                this.gridContext.state.isFocusedCellInEditMode &&
                (this.gridContext.state.focusedLocation.row.idx === location.row.idx &&
                    this.gridContext.state.focusedLocation.col.idx === location.col.idx)
            ) {
                return;
            }
            changeBehavior(this.gridContext, new CellSelectionBehavior(this.grid, e, 'cell'));
        }
    };

    handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const location: Location = getLocationFromClient(this.gridContext, e.clientX, e.clientY);
        if (this.gridContext.state.isFocusedCellInEditMode || this.gridContext.state.isFocusedCellReadOnly) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (
                this.gridContext.state.focusedLocation &&
                this.gridContext.state.focusedLocation.col.idx === location.col.idx &&
                this.gridContext.state.focusedLocation.row.idx === location.row.idx
            ) {
                this.gridContext.setState({ isFocusedCellInEditMode: true });
            }
        }
    };

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!this.mouseEvent) {
            if (this.gridContext.state.isFocusedCellInEditMode) {
                return;
            }
            changeBehavior(this.gridContext, new CellSelectionBehavior(this.grid, e, 'cell', true));
        }
        this.mouseEvent = true;
    };

    handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {

        /*this.state.focusedLocation &&*/

        const location: Location = getLocationFromClient(
            this.gridContext,
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
        );
        const isItTheSameCell = this.gridContext.state.focusedLocation
            ? this.gridContext.state.focusedLocation.row.idx === location.row.idx &&
            this.gridContext.state.focusedLocation.col.idx === location.col.idx
            : null;
        if (this.gridContext.state.isFocusedCellInEditMode) {
            return;
        }

        if (isItTheSameCell) {
            changeBehavior(this.gridContext, new CellSelectionBehavior(this.grid, e, 'cell', true));
        }

        this.touchStartTime = new Date().getTime();
    };

    handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        this.touchEndTime = new Date().getTime();

        if (
            headerCellTouchStartTime &&
            this.gridContext.cellMatrix.getCell(
                getLocationFromClient(this.gridContext, e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            ).type === FieldTypes.header
        ) {
            this.touchStartTime = headerCellTouchStartTime;
        }

        if (
            !this.gridContext.state.isFocusedCellInEditMode &&
            this.gridContext.state.focusedLocation &&
            !(this.gridContext.state.currentBehavior instanceof ResizeColumnBehavior) &&
            !(this.gridContext.state.currentBehavior instanceof DrawFillHandleBehavior) &&
            !userIsMarkingGrid &&
            !columnIsMoving &&
            !this.gridContext.state.isFocusedCellReadOnly &&
            this.touchEndTime - this.touchStartTime > 500
        ) {
            this.gridContext.handleContextMenu(e);
            e.persist();
        }

        this.mouseEvent = false;
    };
}
