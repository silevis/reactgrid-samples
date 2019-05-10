import { resetToDefaultBehavior, focusLocation, getRowFromClientY } from '../Functions';
import { GridContext, Location } from '../Common';
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { PointerEvent } from "../Common/domEvents";
import { selectRow, updateActiveSelectedRows } from '../Functions/selectRange';

export class RowSelectionBehavior extends AutoScrollBehavior {

    constructor(private gridContext: GridContext) {
        super();
    }

    handlePointerDown(event: PointerEvent, location: Location) {
        if (event.ctrlKey && this.gridContext.state.selectionMode === 'row' && this.gridContext.state.selectedIndexes.some(idx => idx === location.row.idx)) {
            // TODO remove row from selected indexes
        } if (event.shiftKey) {
            // TODO        
        } else {
            focusLocation(this.gridContext, location);
            selectRow(this.gridContext, location.row, event.ctrlKey);
        }
    }

    handlePointerEnter(event: PointerEvent, location: Location) {
        console.log('enter')
        updateActiveSelectedRows(this.gridContext, this.gridContext.state.focusedLocation!.row, location.row, event.ctrlKey);
    }

    handlePointerUp() {
        resetToDefaultBehavior(this.gridContext);
    }
}