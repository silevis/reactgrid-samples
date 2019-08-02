import { State, Direction, PointerLocation, Row } from "../Common";

export function scrollIntoView(state: State, location: any, direction: Direction = 'both') {

    const top = getScrollTop(state, location, direction === 'horizontal');
    const left = getScrollLeft(state, location, direction === 'vertical');

    state.viewportElement.scrollTo({ top, left, behavior: 'auto' });
}

function getScrollTop(state: State, location: PointerLocation, dontChange: boolean): number {
    const row = location.row;
    const { scrollTop, clientHeight } = state.viewportElement;
    const { frozenTopRange, frozenBottomRange, rows } = state.cellMatrix;
    if (dontChange || !row)
        return scrollTop;

    const browserScrollHeight = 17;
    const visibleContentHeight = Math.min(clientHeight, state.cellMatrix.height);
    const visibleScrollAreaHeight = visibleContentHeight - frozenTopRange.height - frozenBottomRange.height;
    const isBottomRowFrozen = frozenBottomRange.rows.some(r => row.idx === r.idx);
    const shouldScrollToBottom = () => row.top + location.cellY > visibleScrollAreaHeight + scrollTop - browserScrollHeight;
    const shouldScrollToTop = () => row.top + location.cellY < scrollTop + browserScrollHeight && !isBottomRowFrozen;
    const isColumnBelowBottomPane = () => row.bottom > visibleScrollAreaHeight + scrollTop;
    const isColumnBelowTopPane = () => row.top < scrollTop && !isBottomRowFrozen;

    if (frozenBottomRange.rows.length === 0 && shouldScrollToBottom()) {
        return rows[row.idx + 1] ? rows[row.idx + 1].bottom - visibleScrollAreaHeight : rows[row.idx].bottom - visibleScrollAreaHeight
    } else if (isColumnBelowBottomPane()) {
        return row.bottom - visibleScrollAreaHeight;
    } else if (frozenTopRange.rows.length === 0 && shouldScrollToTop()) {
        return rows[row.idx - 1] ? rows[row.idx + - 1].top : rows[row.idx].top
    } else if (isColumnBelowTopPane()) {
        return row.top;
    } else {
        return scrollTop;
    }
}

function getScrollLeft(state: State, location: PointerLocation, dontChange: boolean): number {
    const column = location.col;
    const { scrollLeft, clientWidth } = state.viewportElement;
    const { frozenLeftRange, frozenRightRange, cols } = state.cellMatrix;
    if (dontChange || !column)
        return scrollLeft

    const browserScrollWidth = 17;
    const visibleContentWidth = Math.min(clientWidth, state.cellMatrix.width);
    const visibleScrollAreaWidth = visibleContentWidth - frozenLeftRange.width - frozenRightRange.width;
    const isRightRowFrozen = frozenRightRange.cols.some(col => column.idx === col.idx);
    const shouldScrollToRight = () => column.left + location.cellX > visibleScrollAreaWidth + scrollLeft - browserScrollWidth;
    const shouldScrollToLeft = () => column.left + location.cellX < scrollLeft + browserScrollWidth && !isRightRowFrozen;
    const isColumnBelowRightPane = () => column.right > visibleScrollAreaWidth + scrollLeft;
    const isColumnBelowLeftPane = () => column.left < scrollLeft && !isRightRowFrozen;

    if (frozenRightRange.cols.length === 0 && shouldScrollToRight()) {
        return cols[column.idx + 1] ? cols[column.idx + 1].right - visibleScrollAreaWidth : cols[column.idx].right - visibleScrollAreaWidth;
    } else if (isColumnBelowRightPane()) {
        return column.right - visibleScrollAreaWidth;
    } else if (frozenLeftRange.cols.length === 0 && shouldScrollToLeft()) {
        return cols[column.idx - 1] ? cols[column.idx + - 1].left : cols[column.idx].left;
    } else if (isColumnBelowLeftPane()) {
        return column.left;
    } else {
        return scrollLeft;
    }
}
