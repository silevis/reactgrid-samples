import { GridContext, KeyboardEvent, keyCodes } from "../../Common";
import { Utilities } from "../../Common/Utilities";

export function keyUpHandlers(gridContext: GridContext, event: KeyboardEvent) {
    const activeSelectedRange = Utilities.getActiveSelectionRange(
        gridContext.state.selectedRanges,
        gridContext.state.focusedLocation!
    );
    if (
        activeSelectedRange === undefined ||
        !(activeSelectedRange.cols.length > 1 || activeSelectedRange.rows.length > 1)
    ) {
        // TODO
        // this.innerBehavior.handleKeyUp(event);
        return;
    }
    if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
};


