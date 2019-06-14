import { focusLocation } from '../Functions';
import { State, Location, Behavior, Direction } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectColumn, updateActiveSelectedColumns } from '../Functions/selectRange';
// import { Utilities } from '../Common/Utilities';
// import { focusLocation, getLocationFromClient, resetToDefaultBehavior, isClickInsideSelectedRange } from '../Functions';
// import { Location, CellMatrix, state, Behavior } from '../Common';
// import { isClickOutOfGrid } from '../Functions/isClickOutOfGrid';

export class ColumnSelectionBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'column') {
            // TODO remove column from selected indexes
        } if (event.shiftKey) {
            // TODO        
        } else {
            state = focusLocation(state, location);
            state = selectColumn(state, location.col, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        return updateActiveSelectedColumns(state, state.focusedLocation!.col, location.col, event.ctrlKey);
    }
}
