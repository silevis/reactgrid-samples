import { GridContext } from "../Common/GridContext";
import { Location } from "../Common/Model";
import { scrollIntoView } from "./scrollIntoView";
import { selectRange } from "./selectRange";

export function focusLocation(gridContext: GridContext, location: Location, resetSelection = true) {
    const cellMatrix = gridContext.cellMatrix;
    const cell = cellMatrix.getCell(location);
    const isReadOnly = cell.isReadOnly;
    // TODO scroll into view after changing state !? 
    scrollIntoView(gridContext, location);
    // cell.onFocusChanged(location);
    // TODO external event needed?
    if (resetSelection) {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            focusedSelectedRangeIdx: 0,
            selectedRanges: [cellMatrix.getRange(location, location)]
        });
    } else {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            focusedSelectedRangeIdx: 0,
        });
    }
}