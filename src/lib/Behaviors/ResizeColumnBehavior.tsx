// import { DrawExternalFocusedLocationsBehavior } from './DefaultGridBehavior/DrawExternalFocusedLocationsBehavior';
import { Column, Behavior, GridContext } from '../Common';
import { resetToDefaultBehavior, getLocationFromClient, focusLocation } from '../Functions';
import { Grid } from "../Components/Grid";
import { LineAndShadow } from "../Components/LineAndShadow";
import * as React from 'react';

export class ResizeColumnBehavior extends Behavior {
    private minColumnWidth: number = 40;
    private frozenColumnsWidth: number;
    private setLinePosition: (position: number) => void = _ => { };

    constructor(private gridContext: GridContext, private resizedColumn: Column, event: PointerEvent) {
        super(/* new DrawExternalFocusedLocationsBehavior(new BasicGridBehavior(grid)) */)
        // doesn't seem like a best way to do that...
        this.frozenColumnsWidth = gridContext.cellMatrix.frozenLeftRange.width;

        // this.gridContext.setState({ linePosition: resizedColumn.left + resizedColumn.width + this.frozenColumnsWidth, lineOrientation: 'vertical' })
    }

    handlePointerMove = (event: any) => {
        const positionX = event.clientX;
        if ((positionX) >= this.gridContext.viewportElement!.clientWidth - this.gridContext.cellMatrix.frozenRightRange.width) {
            this.setLinePosition(positionX);
        } else {
            const mousePosition = (positionX + this.gridContext.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
                positionX + this.gridContext.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
            this.setLinePosition(mousePosition);
        }
    }

    handlePointerUp = (event: any) => {
        const positionX = event.clientX
        const mousePosition = (positionX + this.gridContext.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
            positionX + this.gridContext.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
        const newWidth = mousePosition - this.resizedColumn.left - this.frozenColumnsWidth;
        resetToDefaultBehavior(this.gridContext);
        this.setLinePosition(-1);
        if (this.resizedColumn.onResize) {
            this.resizedColumn.onResize(this.resizedColumn, newWidth);
        }
        this.gridContext.commitChanges()
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