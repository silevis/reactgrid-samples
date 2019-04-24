
export function scrollIntoView(cell: Location) {
    const col = cell.col;
    const row = cell.row;
    const cellMatrix: CellMatrix = this.props.cellMatrix;
    const rightScrollBorder = this.gridElement.clientWidth - cellMatrix.frozenRightRange.width;
    const bottomScrollBorder = this.gridElement.clientHeight - cellMatrix.frozenBottomRange.height;
    let left = this.gridElement.scrollLeft;
    let top = this.gridElement.scrollTop;
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
    if (
        colLeft >= cellMatrix.frozenLeftRange.width &&
        colLeft - this.gridElement.scrollLeft < cellMatrix.frozenLeftRange.width
    ) {
        left = colLeft - cellMatrix.frozenLeftRange.width - 1;
    } else if (
        colLeft + col.width <= cellMatrix.frozenLeftRange.width + cellMatrix.scrollableRange.width &&
        colLeft + col.width - this.gridElement.scrollLeft > rightScrollBorder
    ) {
        if (!(cell.col.width > rightScrollBorder - cellMatrix.frozenLeftRange.width)) {
            left = colLeft + col.width - rightScrollBorder;
        } else {
            left = colLeft - cellMatrix.frozenLeftRange.width - 1;
        }
    }
    if (
        rowTop >= cellMatrix.frozenTopRange.height &&
        rowTop - this.gridElement.scrollTop < cellMatrix.frozenTopRange.height
    ) {
        top = rowTop - cellMatrix.frozenTopRange.height - 1;
    } else if (
        rowTop + row.height <= cellMatrix.frozenTopRange.height + cellMatrix.scrollableRange.height &&
        rowTop + row.height - this.gridElement.scrollTop > bottomScrollBorder
    ) {
        top = rowTop + row.height - bottomScrollBorder + cellMatrix.frozenBottomRange.height;
    }
    this.gridElement.scrollTo({ top: top, left: left, behavior: behavior });
}