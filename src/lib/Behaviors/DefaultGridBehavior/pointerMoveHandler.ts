import { GridContext, PointerEvent } from "../../Common";
import { getLocationFromClient } from "../../Functions";
import { isClickOutOfGrid } from "../../Functions/isClickOutOfGrid";

export function pointerMoveHandler(gridContext: GridContext, event: PointerEvent) {
    // const positionX =
    //     event.type === 'mousemove'
    //         ? event.clientX
    //         : event.type === 'touchmove'
    //             ? event.changedTouches[0].clientX
    //             : null;
    // const positionY =
    //     event.type === 'mousemove'
    //         ? event.clientY
    //         : event.type === 'touchmove'
    //             ? event.changedTouches[0].clientY
    //             : null;
    const location = getLocationFromClient(gridContext, event.clientX, event.clientY);

    if (location.col === undefined || location.row === undefined) {
        return;
    }

    // if (this.selectionType === 'cell') {
        updateCellSelection(gridContext, event.clientX, event.clientY);
    // }
}

export function updateCellSelection(gridContext: GridContext, clientX: number, clientY: number) {
    const cellMatrix = gridContext.cellMatrix;
    const cellUnderCursor = getLocationFromClient(gridContext, clientX, clientY, true);

    if (gridContext.state.focusedLocation && !isClickOutOfGrid(gridContext, clientX, clientY)) {
        const activeSelectedRange = cellMatrix.getRange(cellUnderCursor, gridContext.state.focusedLocation);
        const selectedRanges = gridContext.state.selectedRanges.map(range =>
            range.contains(gridContext.state.focusedLocation!) ? activeSelectedRange : range
        );
        gridContext.setState({ selectedRanges });
    }
}