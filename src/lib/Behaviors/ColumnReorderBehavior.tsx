import { State, Behavior, PointerEvent, PointerLocation, Direction, Column } from '../Common';

export class ColumnReorderBehavior extends Behavior {
    private initialColumnIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private pointerOffset!: number;
    private selectedIdxs!: number[];
    autoScrollDirection: Direction = 'horizontal';

    private isTheSameRange = (location: PointerLocation, state: State): boolean => {
        if (this.initialColumnIdx < state.cellMatrix.frozenLeftRange.cols.length)
            return location.col.idx < state.cellMatrix.frozenLeftRange.cols.length
        if (this.initialColumnIdx > state.cellMatrix.frozenLeftRange.cols.length + state.cellMatrix.scrollableRange.cols.length - 1)
            return location.col.idx > state.cellMatrix.frozenLeftRange.cols.length + state.cellMatrix.scrollableRange.cols.length - 1;
        if (this.initialColumnIdx > state.cellMatrix.frozenLeftRange.cols.length - 1)
            return location.col.idx > state.cellMatrix.frozenLeftRange.cols.length - 1 &&
                location.col.idx < state.cellMatrix.frozenLeftRange.cols.length + state.cellMatrix.scrollableRange.cols.length;
        return false
    }

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        this.initialColumnIdx = location.col.idx;
        this.lastPossibleDropLocation = location;
        this.selectedIdxs = state.selectedIndexes.sort();
        const columns = this.selectedIdxs.map(i => state.cellMatrix.cols[i]);
        const leftIndexes = this.selectedIdxs.filter(i => i < location.col.idx);
        const leftColumns = leftIndexes.map(i => state.cellMatrix.cols[i]);
        const leftColumnsWidth = leftColumns.reduce((sum, col) => sum + col.width, 0);
        this.pointerOffset = leftColumnsWidth + location.cellX;
        return {
            ...state,
            lineOrientation: 'vertical',
            shadowSize: columns.reduce((sum, col) => sum + col.width, 0),
            shadowPosition: this.getShadowPosition(location, state)
        }
    }

    handlePointerMove(event: PointerEvent, location: PointerLocation, state: State): State {
        return {
            ...state,
            shadowPosition: this.getShadowPosition(location, state)
        }
    }

    getShadowPosition(location: PointerLocation, state: State): number {
        const x = location.viewportX + state.viewportElement.scrollLeft - this.pointerOffset;
        // column is in the left frozen range
        let min = 0;
        let max = state.cellMatrix.frozenLeftRange.width - state.shadowSize;
        if (this.initialColumnIdx > state.cellMatrix.frozenLeftRange.cols.length + state.cellMatrix.scrollableRange.cols.length - 1) {
            // column is in the right frozen range
            min = state.cellMatrix.width - state.cellMatrix.frozenRightRange.width;
            max = state.cellMatrix.width - state.shadowSize;
        } else if (this.initialColumnIdx > state.cellMatrix.frozenLeftRange.cols.length - 1) {
            // column is in the scrollable range
            min = state.cellMatrix.frozenLeftRange.width;
            max = state.cellMatrix.width - state.cellMatrix.frozenRightRange.width - state.shadowSize;
        }

        if (x < min) {
            return min;
        } else if (x > max) {
            return max;
        }
        return x;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State {
        const dropLocation = this.getLastPossibleDropLocation(location, state)
        if (!dropLocation) return state;
        const drawRight = dropLocation.col.idx > this.initialColumnIdx;
        const linePosition = Math.min(dropLocation.viewportX - dropLocation.cellX + (drawRight ? dropLocation.col.width : 0) + state.viewportElement.scrollLeft,
            state.visibleRange.width + state.cellMatrix.frozenLeftRange.width + state.cellMatrix.frozenRightRange.width + state.viewportElement.scrollLeft
        )
        return {
            ...state,
            linePosition
        }
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation, state: State): PointerLocation | undefined {
        const position = currentLocation.col.idx <= this.initialColumnIdx ? 'before' : 'after';
        if (this.isTheSameRange(currentLocation, state) && (!currentLocation.col.canDrop || currentLocation.col.canDrop(this.selectedIdxs, position))) {
            return this.lastPossibleDropLocation = currentLocation;
        }
        return this.lastPossibleDropLocation;
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
        if (this.initialColumnIdx !== location.col.idx && this.lastPossibleDropLocation && this.lastPossibleDropLocation.col.onDrop) {
            const isBefore = this.lastPossibleDropLocation.col.idx <= this.initialColumnIdx;
            this.lastPossibleDropLocation.col.onDrop(this.selectedIdxs, isBefore ? 'before' : 'after');
        }
        return {
            ...state,
            linePosition: -1,
            shadowPosition: -1
        };
    }
}
