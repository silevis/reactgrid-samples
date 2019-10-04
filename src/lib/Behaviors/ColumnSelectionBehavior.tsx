import { focusLocation } from '../Functions';
import { State, Location, Behavior, Direction } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectOneColumn, selectMultipleColumns, unSelectOneColumn } from '../Functions/selectRange';

export class ColumnSelectionBehavior extends Behavior {
    autoScrollDirection: Direction = 'horizontal';

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.ctrlKey && state.selectionMode === 'column' && state.selectedIds.some(id => id === location.col.id)) {
            state = unSelectOneColumn(state, location.col);
        } else if (event.shiftKey && state.focusedLocation) {
            state = selectMultipleColumns(state, state.focusedLocation!.col, location.col, event.ctrlKey);
        } else {
            state = focusLocation(state, location, state.disableColumnSelection);
            if (!state.disableColumnSelection)
                state = selectOneColumn(state, location.col, event.ctrlKey);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        if (state.disableColumnSelection)
            return focusLocation(state, location);
        else
            return selectMultipleColumns(state, state.focusedLocation!.col, location.col, event.ctrlKey);
    }
}