import { State, Location, Column, Row, Direction } from "../Common";

export function scrollIntoView(state: State, location: Location, direction: Direction = 'both') {

    const top = getScrollTop(state, location.row, direction === 'horizontal');
    const left = getScrollLeft(state, location.col, direction === 'vertical');

    state.viewportElement.scrollTo({ top, left, behavior: 'auto' });
}

function getScrollTop(state: State, row: Row, dontChange: boolean): number {
    const { scrollTop, clientHeight } = state.viewportElement;
    if (dontChange || !row)
        return scrollTop;

    const { frozenTopRange, frozenBottomRange } = state.cellMatrix;

    const isRowOnFrozenPane = (frozenTopRange.last.row && frozenBottomRange.first.row) ? row.idx <= frozenTopRange.last.row.idx || row.idx >= frozenBottomRange.first.row.idx : false;
    const visibleContentHeight = Math.min(clientHeight, state.cellMatrix.height);
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

function getScrollLeft(state: State, column: Column, dontChange: boolean): number {
    const { scrollLeft, clientWidth } = state.viewportElement;
    if (dontChange || !column)
        return scrollLeft

    const { frozenLeftRange, frozenRightRange } = state.cellMatrix;

    const isColumnOnFrozenPane = (frozenLeftRange.last.col && frozenRightRange.first.col) ? column.idx <= frozenLeftRange.last.col.idx || column.idx >= frozenRightRange.first.col.idx : false;
    const visibleContentWidth = Math.min(clientWidth, state.cellMatrix.width);
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
