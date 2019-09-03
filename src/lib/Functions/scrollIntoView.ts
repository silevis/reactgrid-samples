import { State, Direction, PointerLocation } from "../Common";
import { isBrowserIE, isBrowserEdge } from "../Functions";

export function scrollIntoView(state: State, location: any, direction: Direction = 'both') {

    const top = getScrollTop(state, location, direction === 'horizontal');
    const left = getScrollLeft(state, location, direction === 'vertical');

    if (isBrowserIE() || isBrowserEdge()) {
        state.hiddenScrollableElement.scrollTop = top;
        state.hiddenScrollableElement.scrollLeft = left;
    } else {
        state.viewportElement.scrollTop = top;
        state.viewportElement.scrollLeft = left;
    }
}

function getScrollTop(state: State, location: PointerLocation, dontChange: boolean): number {
    const row = location.row;
    const { scrollTop, clientHeight } = state.viewportElement;
    const { frozenTopRange, frozenBottomRange, rows } = state.cellMatrix;
    if (dontChange || !row)
        return scrollTop;

    const visibleContentHeight = Math.min(clientHeight, state.cellMatrix.height);
    const visibleScrollAreaHeight = visibleContentHeight - frozenTopRange.height - frozenBottomRange.height;
    const isBottomRowFrozen = frozenBottomRange.rows.some(r => row.idx === r.idx);
    const shouldScrollToBottom = () => ((location.cellY ? row.top + location.cellY : row.bottom) > visibleScrollAreaHeight + scrollTop - 1) || state.cellMatrix.last.row.idx === row.idx;
    const shouldScrollToTop = () => row.top + (location.cellY ? location.cellY : 0) < scrollTop + 1 && !isBottomRowFrozen;
    const isColumnBelowBottomPane = () => row.bottom > visibleScrollAreaHeight + scrollTop;
    const isColumnBelowTopPane = () => row.top < scrollTop && !isBottomRowFrozen;

    if (frozenBottomRange.rows.length === 0 && shouldScrollToBottom()) {
        if (location.cellY) {
            return rows[row.idx + 1] ? rows[row.idx + 1].bottom - visibleScrollAreaHeight + 1 : rows[row.idx].bottom - visibleScrollAreaHeight + 1;
        } else {
            return row.bottom - visibleScrollAreaHeight + 1;
        }
    } else if (isColumnBelowBottomPane() && (state.focusedLocation && frozenBottomRange.rows.length > 0) && state.focusedLocation.row.idx < frozenBottomRange.rows[0].idx) {
        return row.bottom - visibleScrollAreaHeight;
    } else if (frozenTopRange.rows.length === 0 && shouldScrollToTop()) {
        if (location.cellY) {
            return rows[row.idx - 1] ? rows[row.idx + - 1].top - 1 : rows[row.idx].top - 1;
        } else {
            return row.top - 1;
        }
    } else if (isColumnBelowTopPane() && state.focusedLocation && state.focusedLocation.row.idx > frozenTopRange.rows.length) {
        return row.top - 1;
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

    const visibleContentWidth = Math.min(clientWidth, state.cellMatrix.width);
    const visibleScrollAreaWidth = visibleContentWidth - frozenLeftRange.width - frozenRightRange.width;
    const isRightColFrozen = frozenRightRange.cols.some(col => column.idx === col.idx);
    const shouldScrollToRight = () => ((location.cellX ? column.left + location.cellX : column.right) > visibleScrollAreaWidth + scrollLeft - 1) || state.cellMatrix.last.col.idx === location.col.idx;
    const shouldScrollToLeft = () => column.left + (location.cellX ? location.cellX : 0) < scrollLeft + 1 && !isRightColFrozen;
    const isColumnBelowRightPane = () => column.right > visibleScrollAreaWidth + scrollLeft;
    const isColumnBelowLeftPane = () => column.left < scrollLeft && !isRightColFrozen;

    if (frozenRightRange.cols.length === 0 && shouldScrollToRight()) {
        if (location.cellX) {
            return cols[column.idx + 1] ? cols[column.idx + 1].right - visibleScrollAreaWidth + 1 : cols[column.idx].right - visibleScrollAreaWidth + 1;
        } else {
            return column.right - visibleScrollAreaWidth + 1;
        }
    } else if (isColumnBelowRightPane() && (state.focusedLocation && frozenRightRange.cols.length > 0) && state.focusedLocation.col.idx < frozenRightRange.cols[0].idx) {
        return column.right - visibleScrollAreaWidth + 1;
    } else if (frozenLeftRange.cols.length === 0 && shouldScrollToLeft()) {
        if (location.cellX) {
            return cols[column.idx - 1] ? cols[column.idx + - 1].left - 1 : cols[column.idx].left - 1;
        } else {
            return column.left - 1;
        }
    } else if (isColumnBelowLeftPane() && state.focusedLocation && state.focusedLocation.col.idx > frozenLeftRange.cols.length) {
        return column.left - 1;
    } else {
        return scrollLeft;
    }
}
