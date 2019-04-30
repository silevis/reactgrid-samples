import { GridContext, PointerEvent } from "../../Common";
import { getLocationFromClient, focusLocation } from "../../Functions";
import { Utilities } from "../../Common/Utilities";

export function pointerDownHandler(gridContext: GridContext, event: PointerEvent) {
    const focusedLocation = getLocationFromClient(gridContext, event.clientX, event.clientY);

    if (gridContext.state.focusedLocation && 
        gridContext.state.focusedLocation.col.idx === focusedLocation.col.idx && 
        gridContext.state.focusedLocation.row.idx === focusedLocation.row.idx) {
        if (gridContext.state.isFocusedCellInEditMode) { 
            return;
        }
    } else {
        focusLocation(gridContext, focusedLocation, !event.ctrlKey); 
        if (event.ctrlKey) {
            if (!Utilities.isFocusedLocationInsideSelectedRanges(gridContext.state.selectedRanges, focusedLocation)) {
                gridContext.setState({
                    // selectedRowsIdx: [],
                    // selectedColsIdx: [],
                    selectedRanges: gridContext.state.selectedRanges.concat([gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)])
                });
            }
        } else {
            gridContext.setState({
                // selectedRowsIdx: [],
                // selectedColsIdx: [],
                selectedRanges: [gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)]
            });
        }
    }
}