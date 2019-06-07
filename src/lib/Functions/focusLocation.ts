import { GridContext, Location } from "../Common";
import { scrollIntoView } from "./scrollIntoView";

export function focusLocation(gridContext: GridContext, location: Location, resetSelection = true) {
    const cellMatrix = gridContext.cellMatrix;
    // TODO scroll into view after changing state !? 
    scrollIntoView(gridContext, location);
    // cell.onFocusChanged(location);
    // TODO external event needed?
    // TODO move resetSelection out to an other function

    gridContext.hiddenFocusElement.focus();
    if (resetSelection) {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            activeSelectedRangeIdx: 0,
            selectedRanges: [cellMatrix.getRange(location, location)],
            selectedIndexes: []
        });
    } else {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
        });
    }
}