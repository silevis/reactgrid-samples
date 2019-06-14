import { focusLocation } from '../Functions';
import { State, Location, Behavior } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectRow, updateActiveSelectedRows } from '../Functions/selectRange';

export class RowSelectionBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'row' && state.selectedIndexes.some(idx => idx === location.row.idx)) {
            // TODO remove row from selected indexes
        } if (event.shiftKey) {
            // TODO        
        } else {
            state = focusLocation(state, location);
            state = selectRow(state, location.row, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        return updateActiveSelectedRows(state, state.focusedLocation!.row, location.row, event.ctrlKey);
    }
}