import { State, Behavior, PointerEvent, PointerLocation, Direction, Row } from '../Common';

export class RowReorderBehavior extends Behavior {
    private initialRowIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private pointerOffset!: number;
    private selectedIdxs!: number[];
    autoScrollDirection: Direction = 'vertical';

    private isTheSameRange = (location: PointerLocation, state: State): boolean => {
        if (this.initialRowIdx < state.cellMatrix.frozenTopRange.rows.length)
            return location.row.idx < state.cellMatrix.frozenTopRange.rows.length
        if (this.initialRowIdx > state.cellMatrix.frozenTopRange.rows.length + state.cellMatrix.scrollableRange.rows.length - 1)
            return location.row.idx > state.cellMatrix.frozenTopRange.rows.length + state.cellMatrix.scrollableRange.rows.length - 1;
        if (this.initialRowIdx > state.cellMatrix.frozenTopRange.rows.length - 1)
            return location.row.idx > state.cellMatrix.frozenTopRange.rows.length - 1 &&
                location.row.idx < state.cellMatrix.frozenTopRange.rows.length + state.cellMatrix.scrollableRange.rows.length;
        return false
    }

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        this.initialRowIdx = location.row.idx;
        this.lastPossibleDropLocation = location;
        const indexes = state.selectedIndexes.sort();
        const rows = indexes.map(i => state.cellMatrix.rows[i]);
        const upperIndexes = indexes.filter(i => i < location.row.idx);
        const upperRows = upperIndexes.map(i => state.cellMatrix.rows[i]);
        const upperRowsWidth = upperRows.reduce((sum, row) => sum + row.height, 0);
        this.pointerOffset = upperRowsWidth + location.cellY;
        this.selectedIdxs = rows.map(r => r.idx);
        return {
            ...state,
            lineOrientation: 'horizontal',
            shadowSize: rows.reduce((sum, col) => sum + col.height, 0),
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
        const y = location.viewportY + state.viewportElement.scrollTop - this.pointerOffset;
        let min = 0;
        let max = state.cellMatrix.frozenTopRange.height - state.shadowSize;
        if (this.initialRowIdx > state.cellMatrix.frozenTopRange.rows.length + state.cellMatrix.scrollableRange.rows.length - 1) {
            // column is in the right frozen range
            min = state.cellMatrix.height - state.cellMatrix.frozenBottomRange.height;
            max = state.cellMatrix.height - state.shadowSize;
        } else if (this.initialRowIdx > state.cellMatrix.frozenTopRange.rows.length - 1) {
            // column is in the scrollable range
            min = state.cellMatrix.frozenTopRange.height;
            max = state.cellMatrix.height - state.cellMatrix.frozenBottomRange.height - state.shadowSize;
        }

        if (y < min) {
            return min;
        } else if (y > max) {
            return max;
        }
        return y;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State {
        const dropLocation = this.getLastPossibleDropLocation(location, state)
        if (!dropLocation) return state;
        const drawRight = dropLocation.row.idx > this.initialRowIdx;
        const linePosition = Math.min(dropLocation.viewportY - dropLocation.cellY + (drawRight ? dropLocation.row.height : 0) + state.viewportElement.scrollTop,
            state.visibleRange.height + state.cellMatrix.frozenTopRange.height + state.cellMatrix.frozenBottomRange.height + state.viewportElement.scrollTop
        )
        return {
            ...state,
            linePosition
        }
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation, state: State): PointerLocation | undefined {
        const position = currentLocation.row.idx <= this.initialRowIdx ? 'before' : 'after'
        if (this.isTheSameRange(currentLocation, state) && (!currentLocation.row.canDrop || currentLocation.row.canDrop(this.selectedIdxs, position))) {
            return this.lastPossibleDropLocation = currentLocation;
        }
        return this.lastPossibleDropLocation;
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
        if (this.initialRowIdx !== location.row.idx && this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.onDrop) {
            const isBefore = this.lastPossibleDropLocation.row.idx <= this.initialRowIdx;
            this.lastPossibleDropLocation.row.onDrop(this.selectedIdxs, isBefore ? 'before' : 'after');
        }
        return {
            ...state,
            linePosition: -1,
            shadowPosition: -1
        };
    }
}