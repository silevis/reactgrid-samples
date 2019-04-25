import { Column } from "../Common/Model";
import { GridContext } from "../Common/GridContext";

export function getColumnFromClientX(gridContext: GridContext, clientX: number, outOfRangeTrim?: boolean): Column {
    const gridElement = gridContext.state.gridElement;
    const cellMatrix = gridContext.cellMatrix;
    const rect = gridElement.getBoundingClientRect();
    const frozenLeftColsWidth = cellMatrix.frozenLeftRange.width;
    const frozenRightColsWidth = cellMatrix.frozenRightRange.width;
    const isCursorOnLeftPane = clientX < frozenLeftColsWidth + rect.left;
    const isCursorOnRightPane = clientX > rect.width - frozenRightColsWidth;
    let virtualPositionOfX =
        clientX -
        rect.left +
        (frozenRightColsWidth && isCursorOnRightPane
            ? cellMatrix.frozenRightRange.cols[0].left -
            (gridElement.clientWidth - frozenRightColsWidth)
            : clientX > rect.left + frozenLeftColsWidth
                ? gridElement.scrollLeft
                : 0);
    let cols = cellMatrix.cols;
    if (outOfRangeTrim) {
        if (clientX < gridElement.getBoundingClientRect().left) {
            return cols[0];
        }
        if (clientX > gridElement.getBoundingClientRect().right) {
            return cols[cols.length - 1];
        }
    }
    if (isCursorOnLeftPane) {
        cols = cellMatrix.frozenLeftRange.cols;
    } else if (isCursorOnRightPane) {
        cols = cellMatrix.frozenRightRange.cols;
    } else {
        virtualPositionOfX -= frozenLeftColsWidth;
        cols = cols.slice(
            cellMatrix.frozenLeftRange.cols.length,
            cols.length - cellMatrix.frozenRightRange.cols.length
        );
    }
    return (
        cols.find(col => col.left <= virtualPositionOfX && col.left + col.width >= virtualPositionOfX) ||
        (virtualPositionOfX < 0 ? cols[0] : cols[cols.length - 1])
    );
}