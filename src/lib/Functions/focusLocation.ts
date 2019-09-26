import { State, Location } from "../Common";
import { scrollIntoView } from "./scrollIntoView";

export function focusLocation(state: State, location: Location, resetSelection = true): State {
    // TODO scroll into view after changing state !? 
    scrollIntoView(state, location);
    // cell.onFocusChanged(location);
    // TODO external event needed?
    // TODO move resetSelection out to an other function
    state.hiddenFocusElement.focus();

    if (resetSelection) {
        return {
            ...state,
            contextMenuPosition: [-1, -1],
            focusedLocation: location,
            currentlyEditedCell: undefined,
            activeSelectedRangeIdx: 0,
            selectedRanges: [state.cellMatrix.getRange(location, location)],
            selectedIndexes: [],
            selectedIds: [],
            selectionMode: 'range'
        };
    } else {
        return {
            ...state,
            contextMenuPosition: [-1, -1],
            focusedLocation: location,
            currentlyEditedCell: undefined
        };
    }
}