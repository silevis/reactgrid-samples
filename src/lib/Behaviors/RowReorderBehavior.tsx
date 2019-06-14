import * as React from 'react';
import { State, Behavior, PointerEvent, PointerLocation, Id } from '../Common';
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

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        this.initialRowIdx = location.row.idx;
        this.lastPossibleDropLocation = location;
        const indexes = state.selectedIndexes.sort();
        const rows = indexes.map(i => state.cellMatrix.rows[i]);
        this.shadowWidth = rows.reduce((sum, row) => sum + row.height, 0);
        const upperIndexes = indexes.filter(i => i < location.row.idx);
        const upperRows = upperIndexes.map(i => state.cellMatrix.rows[i]);
        const upperRowsWidth = upperRows.reduce((sum, row) => sum + row.height, 0);
        this.pointerOffset = upperRowsWidth + location.cellY;
        this.selectedIds = rows.map(r => r.id);
        return {
            ...state,
            lineOrientation: 'horizontal',
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
        const max = Math.min(state.viewportElement.clientHeight, state.cellMatrix.height) - this.shadowWidth;
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

        getLastPossibleDropLocation(currentLocation: PointerLocation): PointerLocation | undefined {
            const position = currentLocation.row.idx <= this.initialRowIdx ? 'before' : 'after'
            if (!currentLocation.row.canDrop || currentLocation.row.canDrop(this.selectedIds, position)) {
                return this.lastPossibleDropLocation = currentLocation;
            }
            return this.lastPossibleDropLocation;
        }

        handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
            if (this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.onDrop) {
                const isBefore = this.lastPossibleDropLocation.row.idx <= this.initialRowIdx;
                this.lastPossibleDropLocation.row.onDrop(this.selectedIds, isBefore ? 'before' : 'after');
                return {
                    ...state,
                    //focusedLocation: cell,
                    //isFocusedCellInEditMode: false,
                    selectedRanges: [],
                    selectedIndexes: [] // TODO state.cellMatrix.cols.map(col => col.idx)
                };
            }
        }
    }
