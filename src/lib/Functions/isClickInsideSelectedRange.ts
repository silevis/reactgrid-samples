import { GridContext } from "../Common";
import { getLocationFromClient } from "./getLocationFromClient";

export function isClickInsideSelectedRange(gridContext: GridContext, e: React.MouseEvent<HTMLDivElement>): boolean {
    let isClickOnSelection = false;
    for (let range of gridContext.state.selectedRanges) {
        const foc = getLocationFromClient(gridContext, e.clientX, e.clientY);
        const col = range.cols.some(col => col.idx === foc.col.idx);
        const rec = range.rows.some(row => row.idx === foc.row.idx);
        if (col && rec) {
            isClickOnSelection = true;
        }
    }
    return isClickOnSelection;
}