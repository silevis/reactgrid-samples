import { focusLocation } from '../Functions';
import { State, Location, Behavior } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectRow, selectRows } from '../Functions/selectRange';

export class RowSelectionBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'row' && state.selectedIds.some(id => id === location.row.id)) {
            // TODO remove row from selected indexes
        } if (event.shiftKey && state.focusedLocation) {
            state = selectRows(state, state.focusedLocation.row, location.row, event.ctrlKey);
        } else {
            state = focusLocation(state, location);
            state = selectRow(state, location.row, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        return selectRows(state, state.focusedLocation!.row, location.row, event.ctrlKey);
    }
}