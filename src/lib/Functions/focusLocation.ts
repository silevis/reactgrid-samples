import { GridContext } from "../Common/GridContext";
import { Location } from "../Common/Model";
import { scrollIntoView } from "./scrollIntoView";

export function focusLocation(gridContext: GridContext, location: Location, resetSelection = true) {
    const cellMatrix = gridContext.cellMatrix;
    const cell = cellMatrix.getCell(location);
    const isReadOnly = cell.isReadOnly;
    scrollIntoView(gridContext, location);
    // cell.onFocusChanged(location);
    if (resetSelection) {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            // isFocusedCellReadOnly: isReadOnly,
            selectedRanges: [cellMatrix.getRange(location, location)]
        });
    } else {
        gridContext.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            // isFocusedCellReadOnly: isReadOnly
        });
    }
}