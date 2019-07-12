import { State, Location } from "../Common";
import { scrollIntoView } from "./scrollIntoView";

export function focusLocation(state: State, location: Location, resetSelection = true): State {
    const cellMatrix = state.cellMatrix;
    // TODO scroll into view after changing state !? 
    scrollIntoView(state, location);
    // cell.onFocusChanged(location);
    // TODO external event needed?
    // TODO move resetSelection out to an other function
    state.hiddenFocusElement.focus();

    if (resetSelection) {
        return {
            ...state,
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            activeSelectedRangeIdx: 0,
            selectedRanges: [cellMatrix.getRange(location, location)],
            selectedIndexes: [],
            // selectedIds: []
        };
    } else {
        return {
            ...state,
            focusedLocation: location,
            isFocusedCellInEditMode: false,
        };
    }
}