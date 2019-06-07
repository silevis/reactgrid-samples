// import { DrawExternalFocusedLocationsBehavior } from './DefaultGridBehavior/DrawExternalFocusedLocationsBehavior';
import { Column, Behavior, GridContext } from '../Common';
import { resetToDefaultBehavior, getLocationFromClient, focusLocation } from '../Functions';
import { Grid } from "../Components/Grid";
import { LineAndShadow } from "../Components/LineAndShadow";
import * as React from 'react';

export class ResizeColumnBehavior extends Behavior {
    private moveHandler = this.handleMove.bind(this);
    private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this);
    private minColumnWidth: number = 40;
    private frozenColumnsWidth: number;
    private setLinePosition: (position: number) => void = _ => { };

    constructor(private gridContext: GridContext, private resizedColumn: Column, event: PointerEvent) {
        super(/* new DrawExternalFocusedLocationsBehavior(new BasicGridBehavior(grid)) */)
        // doesn't seem like a best way to do that...
        this.frozenColumnsWidth = gridContext.cellMatrix.frozenLeftRange.width;

        // this.gridContext.setState({ linePosition: resizedColumn.left + resizedColumn.width + this.frozenColumnsWidth, lineOrientation: 'vertical' })
        console.log(event.type)
        window.addEventListener('pointermove', this.moveHandler);
        window.addEventListener('pointerup', this.mouseUpAndTouchEndHandler);
    }

    handleMove(event: PointerEvent) {
        const positionX = event.clientX;
        if ((positionX) >= this.gridContext.viewportElement!.clientWidth - this.gridContext.cellMatrix.frozenRightRange.width) {
            this.setLinePosition(positionX);
        } else {
            const mousePosition = (positionX + this.gridContext.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
                positionX + this.gridContext.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
            this.setLinePosition(mousePosition);
        }
    }

    private handleMouseUpAndTouchEnd(event: PointerEvent) {
        const positionX = event.clientX
        const mousePosition = (positionX + this.gridContext.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
            positionX + this.gridContext.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
        const newWidth = mousePosition - this.resizedColumn.left - this.frozenColumnsWidth;
        resetToDefaultBehavior(this.gridContext);
        this.setLinePosition(-1);
        if (this.resizedColumn.onResize) {
            this.resizedColumn.onResize(this.resizedColumn, newWidth);
            // let location = Object.assign([], this.gridContext.state.focusedLocation, {
            //     col: { ...this.gridContext.state.focusedLocation!.col, width: newWidth }
            // })
            // console.log(location)
            // focusLocation(this.gridContext, location!, true);
        }
        this.gridContext.commitChanges()

        //location.col.width = newWidth;

        window.removeEventListener('pointermove', this.moveHandler);
        window.removeEventListener('pointerup', this.mouseUpAndTouchEndHandler);
    }

    renderGlobalPart = () => {
        return (
            <LineAndShadow
                onInitialized={linePostion => {
                    this.setLinePosition = linePostion;
                }}
                isVertical={true}
                cellMatrix={this.gridContext.cellMatrix}
            />
        );
    }
}