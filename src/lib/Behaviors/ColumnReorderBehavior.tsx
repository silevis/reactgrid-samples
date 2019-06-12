import * as React from 'react';
import { GridContext, Behavior, PointerEvent, PointerLocation, Id } from '../Common';
import { resetToDefaultBehavior } from '../Functions';
import { Line } from '../Components/Line';
import { Shadow } from '../Components/Shadow';

export class ColumnReorderBehavior extends Behavior {
    private initialColumnIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private shadowWidth!: number;
    private pointerOffset!: number;
    private selectedIds!: Id[];

    private setLinePosition: (position: number) => void = _ => { };
    private setShadowPosition: (position: number) => void = _ => { };

    constructor(private gridContext: GridContext) { super(); }

    handlePointerDown(event: PointerEvent, location: PointerLocation) {
        this.initialColumnIdx = location.col.idx;
        this.lastPossibleDropLocation = location;

        const indexes = this.gridContext.state.selectedIndexes.sort();
        const columns = indexes.map(i => this.gridContext.cellMatrix.cols[i]);
        this.shadowWidth = columns.reduce((sum, col) => sum + col.width, 0);
        const leftIndexes = indexes.filter(i => i < location.col.idx);
        const leftColumns = leftIndexes.map(i => this.gridContext.cellMatrix.cols[i]);
        const leftColumnsWidth = leftColumns.reduce((sum, col) => sum + col.width, 0);
        this.pointerOffset = leftColumnsWidth + location.cellX;
        this.selectedIds = columns.map(c => c.id);
    }

    handlePointerMove(event: PointerEvent, location: PointerLocation) {
        this.setShadowPosition(this.getShadowPosition(location))
    }

    getShadowPosition(location: PointerLocation): number {
        console.log(location)
        const x = location.viewportX - this.pointerOffset;
        if (x < 0) {
            return 0;
        } else if (x + this.shadowWidth > this.gridContext.cellMatrix.width) {
            return this.gridContext.cellMatrix.width - this.shadowWidth;
        }
        return x;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation) {
        const dropLocation = this.getLastPossibleDropLocation(location)
        if (!dropLocation) return;
        const drawRight = dropLocation.col.idx > this.initialColumnIdx;
        this.setLinePosition(dropLocation.viewportX - dropLocation.cellX + (drawRight ? dropLocation.col.width : 0))
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
        const position = currentLocation.col.idx <= this.initialColumnIdx ? 'before' : 'after'
        if (!currentLocation.col.canDrop || currentLocation.col.canDrop(this.selectedIds, position)) {
            return this.lastPossibleDropLocation = currentLocation;
        }
        return this.lastPossibleDropLocation;
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation) {
        if (this.lastPossibleDropLocation && this.lastPossibleDropLocation.col.onDrop) {
            const isBefore = this.lastPossibleDropLocation.col.idx <= this.initialColumnIdx;
            this.lastPossibleDropLocation.col.onDrop(this.selectedIds, isBefore ? 'before' : 'after');
            this.gridContext.setState({
                //focusedLocation: cell,
                //isFocusedCellInEditMode: false,
                selectedRanges: [],
                selectedIndexes: [] // TODO this.gridContext.cellMatrix.cols.map(col => col.idx)
            });
        }
        resetToDefaultBehavior(this.gridContext);
    }

    renderGlobalPart() {
        return (
            <>
                <Line
                    onInitialized={(linePostionSetter) => {
                        this.setLinePosition = linePostionSetter;
                    }}
                    isVertical={true}
                    cellMatrix={this.gridContext.cellMatrix}
                />
                <Shadow
                    onInitialized={(shadowPostionSetter) => {
                        this.setShadowPosition = shadowPostionSetter;
                    }}
                    isVertical={true}
                    cellMatrix={this.gridContext.cellMatrix}
                    shadowSize={this.shadowWidth}
                />
            </>
        )
    }
}
