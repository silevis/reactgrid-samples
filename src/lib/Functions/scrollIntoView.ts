import { GridContext } from "../Common/GridContext";
import { Location } from "../Common/Model";
import { CellMatrix } from "../Common/CellMatrix";

export function scrollIntoView(gridContext: GridContext, cell: Location) {
    const col = cell.col;
    const row = cell.row;
    const cellMatrix: CellMatrix = gridContext.cellMatrix;
    const gridElement = gridContext.state.gridElement;
    const rightScrollBorder = gridElement.clientWidth - cellMatrix.frozenRightRange.width;
    const bottomScrollBorder = gridElement.clientHeight - cellMatrix.frozenBottomRange.height;
    let left = gridElement.scrollLeft;
    let top = gridElement.scrollTop;
    let colLeft = col.left;
    let rowTop = row.top;
    const isColOnRightPane = cellMatrix.frozenRightRange.cols.length > 0 && col.idx >= cellMatrix.frozenRightStart;
    const isColOnMiddlePane =
        col.idx >= cellMatrix.scrollableRange.cols[0].idx && col.idx < cellMatrix.frozenRightStart;
    const isRowOnBottomPane =
        cellMatrix.frozenBottomRange.rows.length > 0 && row.idx >= cellMatrix.frozenBottomStart;
    const isRowOnMiddlePane =
        row.idx >= cellMatrix.scrollableRange.rows[0].idx && row.idx < cellMatrix.frozenBottomStart;
    if (isColOnRightPane) {
        colLeft += cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width;
    } else if (isColOnMiddlePane) {
        colLeft += cellMatrix.frozenLeftRange.width;
    }
    if (isRowOnBottomPane) {
        rowTop += cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height;
    } else if (isRowOnMiddlePane) {
        rowTop += cellMatrix.frozenTopRange.height;
    }
    if (colLeft >= cellMatrix.frozenLeftRange.width && colLeft - gridElement.scrollLeft < cellMatrix.frozenLeftRange.width) {
        left = colLeft - cellMatrix.frozenLeftRange.width - 1;
    } else if (
        colLeft + col.width <= cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width &&
        colLeft + col.width - gridElement.scrollLeft > rightScrollBorder
    ) {
        if (!(cell.col.width > rightScrollBorder - cellMatrix.frozenLeftRange.width)) {
            left = colLeft + col.width - rightScrollBorder;
        } else {
            left = colLeft - cellMatrix.frozenLeftRange.width - 1;
        }
    }
    if (
        rowTop >= cellMatrix.frozenTopRange.height &&
        rowTop - gridElement.scrollTop < cellMatrix.frozenTopRange.height
    ) {
        top = rowTop - cellMatrix.frozenTopRange.height - 1;
    } else if (
        rowTop + row.height <= cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height &&
        rowTop + row.height - gridElement.scrollTop > bottomScrollBorder
    ) {
        top = rowTop + row.height - bottomScrollBorder + cellMatrix.frozenBottomRange.height;
    }
    gridElement.scrollTo({ top: top, left: left, behavior: 'smooth' });
}