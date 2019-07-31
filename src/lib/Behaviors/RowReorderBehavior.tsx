import { State, Behavior, PointerEvent, PointerLocation, Direction } from '../Common';

export class RowReorderBehavior extends Behavior {
    private initialRowIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private pointerOffset!: number;
    private selectedIdxs!: number[];
    autoScrollDirection: Direction = 'vertical';

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
        const y = location.viewportY - this.pointerOffset;
        const max = Math.min(state.viewportElement.clientHeight, state.cellMatrix.height) - state.shadowSize;
        if (y < 0) {
            return 0;
        } else if (y > max) {
            return max;
        }
        return y;
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State {
        const dropLocation = this.getLastPossibleDropLocation(location)
        if (!dropLocation) return state;
        const drawRight = dropLocation.row.idx > this.initialRowIdx;
        return {
            ...state,
            linePosition: dropLocation.viewportY - dropLocation.cellY + (drawRight ? dropLocation.row.height : 0)
        }
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
        const position = currentLocation.row.idx <= this.initialRowIdx ? 'before' : 'after'
        if (!currentLocation.row.canDrop || currentLocation.row.canDrop(this.selectedIdxs, position)) {
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