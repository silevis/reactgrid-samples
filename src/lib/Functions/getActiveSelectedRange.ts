import { GridContext } from "../Common";

export function getActiveSelectedRange(gridContext: GridContext) {
    return gridContext.state.selectedRanges[gridContext.state.activeSelectedRangeIdx]
}