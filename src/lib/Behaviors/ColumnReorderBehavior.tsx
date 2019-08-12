import { State, Behavior, PointerEvent, PointerLocation, Direction, Column } from '../Common';

export class ColumnReorderBehavior extends Behavior {
    private initialColumnIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private pointerOffset!: number;
    private selectedIdxs!: number[];
    autoScrollDirection: Direction = 'horizontal';

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
        const cellMatrixX =
            state.cellMatrix.cols
                .filter(col => col.idx < location.col.idx)
                .reduce((prev: number, curr: Column) => prev + curr.width, 0);
        const x = cellMatrixX + location.cellX - this.pointerOffset;
        const max = state.cellMatrix.width - state.shadowSize;
        if (x < 0) {
            return 0;
        } else if (x > max) {
            return max;
        }
        return x;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State {
        const dropLocation = this.getLastPossibleDropLocation(location)
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

    getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
        const position = currentLocation.col.idx <= this.initialColumnIdx ? 'before' : 'after';
        if (!currentLocation.col.canDrop || currentLocation.col.canDrop(this.selectedIdxs, position)) {
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
