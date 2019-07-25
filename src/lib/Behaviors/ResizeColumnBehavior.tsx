import { Column, Behavior, PointerLocation, State, PointerEvent, Direction } from '../Common';

export class ResizeColumnBehavior extends Behavior {
    private minColumnWidth: number = 40;
    private resizedColumn!: Column;
    private initialLocation!: PointerLocation;
    autoScrollDirection: Direction = 'horizontal';

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        this.initialLocation = location;
        this.resizedColumn = location.col;
        return state;
    }
    handlePointerMove(event: PointerEvent, location: PointerLocation, state: State): State {
        let linePosition;
        if (location.col.idx == this.resizedColumn.idx && location.cellX > this.minColumnWidth || location.col.idx > this.resizedColumn.idx) {
            linePosition = location.viewportX + state.viewportElement.scrollLeft;
        } else {
            let offset = 0;
            if (state.cellMatrix.scrollableRange.cols.map(c => c.idx).includes(this.resizedColumn.idx)) {
                offset = state.cellMatrix.frozenLeftRange.width;
            } else if (state.cellMatrix.frozenRightRange.cols.map(c => c.idx).includes(this.resizedColumn.idx)) {
                offset = Math.min(state.viewportElement.clientWidth, state.cellMatrix.width) - state.cellMatrix.frozenRightRange.width
            }
            linePosition = this.resizedColumn.left + this.minColumnWidth + offset + state.viewportElement.scrollLeft;
        }
        return { ...state, linePosition, lineOrientation: 'vertical' };
    }

    handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
        const newWidth = this.resizedColumn.width + location.viewportX - this.initialLocation.viewportX
        if (this.resizedColumn.onResize && newWidth >= this.minColumnWidth) {
            this.resizedColumn.onResize(newWidth);
        } else if (this.resizedColumn.onResize) {
            this.resizedColumn.onResize(this.minColumnWidth + state.viewportElement.scrollLeft);
        }
        return { ...state, linePosition: -1 };
    }
}