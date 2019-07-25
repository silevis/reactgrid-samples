import { focusLocation } from '../Functions';
import { State, Location, Behavior, Direction } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectOneRow, selectMultipleRows, unSelectOneRow } from '../Functions/selectRange';

export class RowSelectionBehavior extends Behavior {
    autoScrollDirection: Direction = 'vertical';

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'row' && state.selectedIds.some(id => id === location.row.id)) {
            state = unSelectOneRow(state, location.row);
        } else if (event.shiftKey && state.focusedLocation) {
            state = selectMultipleRows(state, state.focusedLocation!.row, location.row, event.ctrlKey);
        } else {
            state = focusLocation(state, location, false);
            state = selectOneRow(state, location.row, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        return selectMultipleRows(state, state.focusedLocation!.row, location.row, event.ctrlKey);
    }
}