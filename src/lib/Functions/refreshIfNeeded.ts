
import { GridContext } from "../Common/GridContext";
import { getVisibleCells } from "./getVisibleCells";

export function refreshIfNeeded(gridContext: GridContext) {
    const scrollTop = gridContext.gridElement.scrollTop;
    const scrollLeft = gridContext.gridElement.scrollLeft;
    if (
        scrollTop < gridContext.state.minScrollTop ||
        scrollTop > gridContext.state.maxScrollTop ||
        scrollLeft < gridContext.state.minScrollLeft ||
        scrollLeft > gridContext.state.maxScrollLeft
    ) {
        gridContext.setState(getVisibleCells(gridContext.gridElement, gridContext.cellMatrix));
    }
};