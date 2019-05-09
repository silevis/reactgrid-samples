import { GridContext, Location } from "../Common";

export function isItFocusedCellPointered(gridContext: GridContext, pointerLocation: Location) {
    if (gridContext.state.focusedLocation) {
        if (gridContext.state.focusedLocation.row.idx === pointerLocation.row.idx &&
            gridContext.state.focusedLocation.col.idx === pointerLocation.col.idx) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}