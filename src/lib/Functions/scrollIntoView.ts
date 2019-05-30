import { GridContext, Location, Column, Row, Direction } from "../Common";

export function scrollIntoView(gridContext: GridContext, location: Location, direction: Direction = 'both') {

    const top = getScrollTop(gridContext, location.row, direction === 'horizontal');
    const left = getScrollLeft(gridContext, location.col, direction === 'vertical');

    gridContext.viewportElement.scrollTo({ top, left, behavior: 'auto' });
}

function getScrollTop(gridContext: GridContext, row: Row, dontChange: boolean): number {
    const { scrollTop, clientHeight } = gridContext.viewportElement;
    if (dontChange || !row)
        return scrollTop;

    const { frozenTopRange, frozenBottomRange } = gridContext.cellMatrix;

    const isRowOnFrozenPane = row.idx <= frozenTopRange.last.row.idx || row.idx >= frozenBottomRange.first.row.idx;
    const visibleContentHeight = Math.min(clientHeight, gridContext.cellMatrix.height);
    const visibleScrollAreaHeight = visibleContentHeight - frozenTopRange.height - frozenBottomRange.height;
    const isRowBelowTopPane = row.top < scrollTop;

    const isRowVisible = isRowOnFrozenPane || !isRowBelowTopPane && row.bottom < scrollTop + visibleScrollAreaHeight;
    if (isRowVisible) {
        return scrollTop;
    } else if (isRowBelowTopPane) {
        return row.top;
    } else // row is below bottom pane
        return row.bottom - visibleScrollAreaHeight;
}

function getScrollLeft(gridContext: GridContext, column: Column, dontChange: boolean): number {
    const { scrollLeft, clientWidth } = gridContext.viewportElement;
    if (dontChange || !column)
        return scrollLeft

    const { frozenLeftRange, frozenRightRange } = gridContext.cellMatrix;

    const isColumnOnFrozenPane = column.idx <= frozenLeftRange.last.col.idx || column.idx >= frozenRightRange.first.col.idx;
    const visibleContentWidth = Math.min(clientWidth, gridContext.cellMatrix.width);
    const visibleScrollAreaWidth = visibleContentWidth - frozenLeftRange.width - frozenRightRange.width;
    const isColumnBelowLeftPane = column.left < scrollLeft;

    const isColumnVisible = isColumnOnFrozenPane || !isColumnBelowLeftPane && column.right < scrollLeft + visibleScrollAreaWidth;
    if (isColumnVisible) {
        return scrollLeft;
    } else if (isColumnBelowLeftPane) {
        return column.left;
    } else // column is below right pane
        return column.right - visibleScrollAreaWidth;
}
