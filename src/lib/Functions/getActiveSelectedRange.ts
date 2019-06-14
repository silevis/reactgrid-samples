import { State } from "../Common";

export function getActiveSelectedRange(state: State) {
    return state.selectedRanges[state.activeSelectedRangeIdx]
}