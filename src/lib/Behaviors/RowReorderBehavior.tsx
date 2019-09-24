import { State, Behavior, PointerEvent, PointerLocation, Direction, DropPosition, Id } from '../Common';

export class RowReorderBehavior extends Behavior {
    private initialRowIdx!: number;
    private lastPossibleDropLocation?: PointerLocation;
    private pointerOffset!: number;
    private selectedIds!: Id[];
    private position!: DropPosition;
    autoScrollDirection: Direction = 'vertical';

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        this.initialRowIdx = location.row.idx;
        this.lastPossibleDropLocation = location;
        const indexes = state.selectedIndexes.sort();
        const rows = indexes.map(i => state.cellMatrix.rows[i]);
        const upperIndexes = indexes.filter(i => i < location.row.idx);
        const upperRows = upperIndexes.map(i => state.cellMatrix.rows[i]);
        const upperRowsHeight = upperRows.reduce((sum, row) => sum + row.height, 0);
        this.pointerOffset = upperRowsHeight + location.cellY;
        this.selectedIds = rows.map(r => r.id);
        return {
            ...state,
            lineOrientation: 'horizontal',
            shadowSize: rows.reduce((sum, col) => sum + col.height, 0),
            shadowPosition: this.getShadowPosition(location, state)
        }
    }

    handlePointerMove(event: PointerEvent, location: PointerLocation, state: State): State {
        const shadowPosition = this.getShadowPosition(location, state);
        let cursor = '-webkit-grabbing';
        let linePosition = state.linePosition;
        const pointerLocation = location.viewportY + state.viewportElement.scrollTop;
        if (this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.idx !== this.initialRowIdx) {
            const drawDown = this.lastPossibleDropLocation.row.idx > this.initialRowIdx;
            linePosition = Math.min(this.lastPossibleDropLocation.viewportY - this.lastPossibleDropLocation.cellY + (drawDown ? this.lastPossibleDropLocation.row.height : 0) + state.viewportElement.scrollTop,
                state.visibleRange.height + state.cellMatrix.frozenTopRange.height + state.cellMatrix.frozenBottomRange.height + state.viewportElement.scrollTop
            );
            if (!location.row.canDrop) {
                this.position = drawDown ? 'after' : 'before';
            } else {
                if (location.row.canDrop && location.row.canDrop(this.selectedIds, this.position)) {
                    if (drawDown) {
                        if (pointerLocation > location.row.top && pointerLocation < location.row.top + location.row.height / 2) {
                            this.position = 'on';
                            cursor = 'move';
                            linePosition = -1;
                        } else {
                            this.position = 'after';
                        }
                    } else {
                        if (pointerLocation > location.row.top + location.row.height / 2 && pointerLocation < location.row.top + location.row.height) {
                            this.position = 'on';
                            cursor = 'move';
                            linePosition = -1;
                        } else {
                            this.position = 'before';
                        }
                    }
                } else {
                    linePosition = -1;
                }
            }
        }

        return {
            ...state,
            shadowPosition,
            linePosition,
            cursor
        }
    }

    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State {
        this.lastPossibleDropLocation = this.getLastPossibleDropLocation(location);
        return state;
    }

    getShadowPosition(location: PointerLocation, state: State): number {
        const y = location.viewportY + state.viewportElement.scrollTop - this.pointerOffset;
        const max = state.cellMatrix.height - state.shadowSize;
        if (y < 0) {
            return 0;
        } else if (y > max) {
            return max;
        }
        return y;
    }

    getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
        if (!currentLocation.row.canDrop || currentLocation.row.canDrop(this.selectedIds, this.position)) {
            return this.lastPossibleDropLocation = currentLocation;
        }
        return this.lastPossibleDropLocation;
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
        if (location.row.idx !== this.initialRowIdx && this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.onDrop && (!this.lastPossibleDropLocation.row.canDrop || this.lastPossibleDropLocation.row.canDrop(this.selectedIds, this.position))) {
            this.lastPossibleDropLocation.row.onDrop(this.selectedIds, this.position);
        }
        return {
            ...state,
            linePosition: -1,
            shadowPosition: -1,
            cursor: 'default'
        };
    }
}