
import { GridContext } from "../Common/GridContext";
import { getVisibleCells } from "./getVisibleCells";

export function refreshIfNeeded(gridContext: GridContext) {
    const gridElement = gridContext.state.gridElement;
    const scrollTop = gridElement.scrollTop;
    const scrollLeft = gridElement.scrollLeft;
    if (
        scrollTop < gridContext.state.minScrollTop ||
        scrollTop > gridContext.state.maxScrollTop ||
        scrollLeft < gridContext.state.minScrollLeft ||
        scrollLeft > gridContext.state.maxScrollLeft
    ) {
        gridContext.setState(getVisibleCells(gridElement, gridContext.cellMatrix));
    }
};