import { CellMatrix, Column, Row, Range } from "../Common";

export function getVisibleCells(gridElement: HTMLDivElement, cellMatrix: CellMatrix) {
    const { scrollTop, scrollLeft, clientWidth, clientHeight } = gridElement;
    const scrollAreaWidth = clientWidth - cellMatrix.frozenLeftRange.width - cellMatrix.frozenRightRange.width;
    const scrollAreaHeight = clientHeight - cellMatrix.frozenTopRange.height - cellMatrix.frozenBottomRange.height;
    const horizontalPadding = scrollAreaWidth / 2;
    const verticalPadding = scrollAreaHeight / 2;
    const visibleCols = cellMatrix.scrollableRange.cols.filter(
        (col: Column) => col.right >= scrollLeft - horizontalPadding && col.left <= scrollLeft + scrollAreaWidth + horizontalPadding
    );
    const visibleRows = cellMatrix.scrollableRange.rows.filter(
        (row: Row) => row.bottom >= scrollTop - verticalPadding && row.top <= scrollTop + scrollAreaHeight + verticalPadding
    );
    const visibleRange = new Range(visibleCols, visibleRows);
    return {
        minScrollLeft: visibleRange.first.col.left + horizontalPadding / 2,
        maxScrollLeft: visibleRange.last.col.right - scrollAreaWidth - horizontalPadding / 2,
        minScrollTop: visibleRows.length > 0 ? visibleRange.first.row.top + verticalPadding / 2 : 0,
        maxScrollTop: visibleCols.length > 0 ? visibleRange.last.row.bottom - scrollAreaHeight - verticalPadding / 2 : 0,
        visibleRange: visibleRange,
    };
}