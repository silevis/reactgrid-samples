import { GridContext, Location, Column, Row } from "../Common";

export function scrollIntoView(gridContext: GridContext, location: Location, smooth = false) {

    const top = getScrollTopToMakeRowVisible(gridContext, location.row);
    const left = getScrollLeftToMakeColumnVisible(gridContext, location.col);

    gridContext.viewportElement.scrollTo({ top, left, behavior: smooth ? 'smooth' : 'auto' });

}

function getScrollTopToMakeRowVisible(gridContext: GridContext, row: Row): number {
    const { scrollTop, clientHeight } = gridContext.viewportElement;
    const { frozenTopRange, frozenBottomRange } = gridContext.cellMatrix;

    const isRowOnFrozenPane = row.idx <= frozenTopRange.last.row.idx || row.idx >= frozenBottomRange.first.row.idx;
    const visibleContentHeight = Math.min(clientHeight, gridContext.cellMatrix.height);
    const visibleScrollAreaHeight = visibleContentHeight - frozenTopRange.height - frozenBottomRange.height;
    const isRowBelowTopPane = row.top < scrollTop

    const isRowVisible = isRowOnFrozenPane || !isRowBelowTopPane && row.bottom < scrollTop + visibleScrollAreaHeight;
    if (isRowVisible) {
        return scrollTop;
    } else if (isRowBelowTopPane) {
        return row.top;
    } else // row is below bottom pane
        return row.bottom - visibleScrollAreaHeight;
}

function getScrollLeftToMakeColumnVisible(gridContext: GridContext, column: Column): number {
    const { scrollLeft, clientWidth } = gridContext.viewportElement;
    const { frozenLeftRange, frozenRightRange } = gridContext.cellMatrix;

    const isColumnOnFrozenPane = column.idx <= frozenLeftRange.last.col.idx || column.idx >= frozenRightRange.first.col.idx;
    const visibleContentWidth = Math.min(clientWidth, gridContext.cellMatrix.width);
    const visibleScrollAreaWidth = visibleContentWidth - frozenLeftRange.width - frozenRightRange.width;
    const isColumnBelowLeftPane = column.left < scrollLeft

    const isColumnVisible = isColumnOnFrozenPane || !isColumnBelowLeftPane && column.right < scrollLeft + visibleScrollAreaWidth;
    if (isColumnVisible) {
        return scrollLeft;
    } else if (isColumnBelowLeftPane) {
        return column.left;
    } else // column is below right pane
        return column.right - visibleScrollAreaWidth;
}

