import * as React from 'react';
import { GridContext, Behavior, PointerEvent, PointerLocation, Id } from '../Common';
import { resetToDefaultBehavior } from '../Functions';
import { Line } from '../Components/Line';
import { Shadow } from '../Components/Shadow';

export class RowReorderBehavior extends Behavior {
    private initialRowIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private shadowWidth!: number;
    private pointerOffset!: number;
    private selectedIds!: Id[];

    private setLinePosition: (position: number) => void = _ => { };
    private setShadowPosition: (position: number) => void = _ => { };

    constructor(private gridContext: GridContext) { super(); }

    handlePointerDown(event: PointerEvent, location: PointerLocation) {
        this.initialRowIdx = location.row.idx;
        this.lastPossibleDropLocation = location;

        const indexes = this.gridContext.state.selectedIndexes.sort();
        const rows = indexes.map(i => this.gridContext.cellMatrix.rows[i]);
        this.shadowWidth = rows.reduce((sum, row) => sum + row.height, 0);
        const upperIndexes = indexes.filter(i => i < location.row.idx);
        const upperRows = upperIndexes.map(i => this.gridContext.cellMatrix.rows[i]);
        const upperRowsWidth = upperRows.reduce((sum, row) => sum + row.height, 0);
        this.pointerOffset = upperRowsWidth + location.cellY;
        this.selectedIds = rows.map(r => r.id);
    }

    handlePointerMove(event: PointerEvent, location: PointerLocation) {
        this.setShadowPosition(this.getShadowPosition(location))
    }

    getShadowPosition(location: PointerLocation): number {
        const y = location.viewportY - this.pointerOffset;
        const max = Math.min(this.gridContext.viewportElement.clientHeight, this.gridContext.cellMatrix.height) - this.shadowWidth;
        if (y < 0) {
            return 0;
        } else if (y > max) {
            return max;
        }
        return y;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation) {
        const dropLocation = this.getLastPossibleDropLocation(location)
        if (!dropLocation) return;
        const drawRight = dropLocation.row.idx > this.initialRowIdx;
        this.setLinePosition(dropLocation.viewportY - dropLocation.cellY + (drawRight ? dropLocation.row.height : 0))
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
        const position = currentLocation.row.idx <= this.initialRowIdx ? 'before' : 'after'
        if (!currentLocation.row.canDrop || currentLocation.row.canDrop(this.selectedIds, position)) {
            return this.lastPossibleDropLocation = currentLocation;
        }
        return this.lastPossibleDropLocation;
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation) {
        if (this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.onDrop) {
            const isBefore = this.lastPossibleDropLocation.row.idx <= this.initialRowIdx;
            this.lastPossibleDropLocation.row.onDrop(this.selectedIds, isBefore ? 'before' : 'after');
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
                    isVertical={false}
                    cellMatrix={this.gridContext.cellMatrix}
                />
                <Shadow
                    onInitialized={(shadowPostionSetter) => {
                        this.setShadowPosition = shadowPostionSetter;
                    }}
                    isVertical={false}
                    cellMatrix={this.gridContext.cellMatrix}
                    shadowSize={this.shadowWidth}
                />
            </>
        )
    }
}
