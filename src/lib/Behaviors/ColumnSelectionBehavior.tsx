import { focusLocation } from '../Functions';
import { State, Location, Behavior } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectOneColumn, selectMultipleColumns } from '../Functions/selectRange';

export class ColumnSelectionBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'column' && state.selectedIds.some(id => id === location.col.id)) {
            // TODO remove column from selected indexes
        } if (event.shiftKey) {
            state = selectMultipleColumns(state, state.focusedLocation!.col, location.col);
        } else {
            state = focusLocation(state, location);
            state = selectOneColumn(state, location.col, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        return selectMultipleColumns(state, state.focusedLocation!.col, location.col, event.ctrlKey);
    }
}
