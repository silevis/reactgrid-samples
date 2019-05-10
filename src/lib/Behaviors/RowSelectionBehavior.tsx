import { getLocationFromClient, resetToDefaultBehavior, focusLocation, getColumnFromClientX, getRowFromClientY } from '../Functions';
import { GridContext } from '../Common';
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { PointerEvent } from "../Common/domEvents";
import { selectRow, updateActiveSelectedRows } from '../Functions/selectRange';

export class RowSelectionBehavior extends AutoScrollBehavior {

    constructor(private gridContext: GridContext) {
        super();
    }

    handlePointerDown(event: PointerEvent) {
        const location = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        if (event.ctrlKey && this.gridContext.state.selectionMode === 'row' && this.gridContext.state.selectedIndexes.some(idx => idx === location.row.idx)) {
            // TODO remove row from selected indexes
        } if (event.shiftKey) {
            // TODO        
        } else {
            focusLocation(this.gridContext, location);
            selectRow(this.gridContext, location.row, event.ctrlKey);
        }
    }

    handlePointerMove(event: PointerEvent) {
        const row = getRowFromClientY(this.gridContext, event.clientY);
        if (!this.gridContext.state.selectedIndexes.some(idx => idx === row.idx)) {
            updateActiveSelectedRows(this.gridContext, this.gridContext.state.focusedLocation!.row, row, event.ctrlKey);
        }
    }

    handlePointerUp() {
        resetToDefaultBehavior(this.gridContext);
    }
}