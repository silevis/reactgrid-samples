import { focusLocation } from '../Functions';
import { State, Location, Behavior } from '../Common';
import { PointerEvent } from "../Common/domEvents";
import { selectRange, updateActiveSelectedRange } from '../Functions/selectRange';
import { TextCellTemplate } from '../CellTemplates/TextCellTemplate';

export class CellSelectionBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: Location, state: State): State {
        if (event.shiftKey && state.focusedLocation) {
            const range = state.cellMatrix.getRange(state.focusedLocation, location);
            if (event.ctrlKey && state.selectionMode === 'range') {
                return updateActiveSelectedRange(state, range);
            } else {
                return selectRange(state, range, false);
            }

        } else if (event.ctrlKey) {
            const pointedRangeIdx = state.selectedRanges.findIndex((range) => range.contains(location));
            const pointedRange = state.selectedRanges[pointedRangeIdx]

            if (pointedRange) {
                state = focusLocation(state, location, false);
                state = { ...state, activeSelectedRangeIdx: pointedRangeIdx }
            } else {
                const range = state.cellMatrix.getRange(location, location);
                state = selectRange(state, range, true);
                state = focusLocation(state, location, false);
            }
        } else {
            state = focusLocation(state, location);
        }
        return state;
    }

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        const range = state.cellMatrix.getRange(state.focusedLocation!, location);
        if (state.disableRangeSelection) {
            return focusLocation(state, new Location(state.focusedLocation!.row, state.focusedLocation!.col));
        } else if (state.selectionMode === 'range') {
            return updateActiveSelectedRange(state, range);
        } else {
            return selectRange(state, range, false);
        }
    }

    handleDoubleClick(event: PointerEvent, location: Location, state: State): State {
        if (state.isFocusedCellInEditMode /*|| this.grid.state.isFocusedCellReadOnly*/) {
            event.preventDefault();
            event.stopPropagation();
        } else if (location.equals(state.focusedLocation)) {
            const cellTemplate = state.cellTemplates[state.focusedLocation!.cell.type];
            const { cellData, enableEditMode } = cellTemplate.handleKeyDown(1, state.focusedLocation!.cell.data);
            return { ...state, isFocusedCellInEditMode: enableEditMode };
        }
        return state;
    }
}