import { GridContext, Location } from "../Common";
import { scrollIntoView } from "./scrollIntoView";
import { selectRange } from "./selectRange";

export function focusLocation(gridContext: GridContext, location: Location, resetSelection = true) {
    const cellMatrix = gridContext.cellMatrix;
    // TODO scroll into view after changing state !? 
    scrollIntoView(gridContext, location);
    // cell.onFocusChanged(location);
    // TODO external event needed?
    if (resetSelection) {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            activeSelectedRangeIdx: 0,
            selectedRanges: [cellMatrix.getRange(location, location)]
        });
    } else {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            activeSelectedRangeIdx: 0,
        });
    }
}