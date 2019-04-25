import { CellMatrix } from "../Common/CellMatrix";
import { Range } from "../Common/Range";
import { Column, Row } from "../Common/Model";

export function getVisibleCells(gridElement: HTMLDivElement, cellMatrix: CellMatrix) {
    const { scrollTop, scrollLeft, clientWidth, clientHeight } = gridElement;
    const scrollAreaWidth = clientWidth - cellMatrix.frozenLeftRange.width - cellMatrix.frozenRightRange.width;
    const scrollAreaHeight = clientHeight - cellMatrix.frozenTopRange.height - cellMatrix.frozenBottomRange.height;
    const visibleCols = cellMatrix.scrollableRange.cols.filter(
        (col: Column) => col.right >= scrollLeft - 200 && col.left <= scrollLeft + scrollAreaWidth + 200
    );
    const visibleRows = cellMatrix.scrollableRange.rows.filter(
        (row: Row) => row.bottom >= scrollTop - 200 && row.top <= scrollTop + scrollAreaHeight + 200
    );
    const visibleRange = new Range(visibleCols, visibleRows);
    return {
        minScrollLeft: visibleRange.first.col.left + 100,
        maxScrollLeft: visibleRange.last.col.right - scrollAreaWidth - 100,
        minScrollTop: visibleRows.length > 0 ? visibleRange.first.row.top + 100 : 0,
        maxScrollTop: visibleCols.length > 0 ? visibleRange.last.row.bottom - scrollAreaHeight - 100 : 0,
        visibleRange: visibleRange,
        lastGridRenderScrollLeft: scrollLeft,
        lastGridRenderScrollTop: scrollTop
    };
}