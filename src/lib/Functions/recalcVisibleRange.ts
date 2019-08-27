import { Column, Row, Range, State } from "../Common";
import { isBrowserIE, isBrowserEdge } from "../Functions";

export function recalcVisibleRange(state: State): State {
    const matrix = state.cellMatrix;
    const { scrollTop, scrollLeft, clientWidth, clientHeight } = isBrowserIE() || isBrowserEdge() ? state.hiddenScrollableElement : state.viewportElement;
    const scrollAreaWidth = clientWidth - matrix.frozenLeftRange.width - matrix.frozenRightRange.width;
    const scrollAreaHeight = clientHeight - matrix.frozenTopRange.height - matrix.frozenBottomRange.height;
    // TODO improve calculation of visibleCols & visibleRows
    const visibleCols = matrix.scrollableRange.cols.filter(
        (col: Column) => col.right >= scrollLeft && col.left <= scrollLeft + scrollAreaWidth
    );
    const visibleRows = matrix.scrollableRange.rows.filter(
        (row: Row) => row.bottom >= scrollTop && row.top <= scrollTop + scrollAreaHeight
    );
    const visibleRange = new Range(visibleCols, visibleRows);
    return {
        ...state,
        minScrollLeft: visibleRange.first.col.left,
        maxScrollLeft: visibleRange.last.col.right - scrollAreaWidth,
        minScrollTop: visibleRows.length > 0 ? visibleRange.first.row.top : 0,
        maxScrollTop: visibleCols.length > 0 ? visibleRange.last.row.bottom - scrollAreaHeight : 0,
        visibleRange: visibleRange,
    };
}