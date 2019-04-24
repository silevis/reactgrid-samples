import { Column } from "../Model";

export function getColumnFromClientX(clientX: number, outOfRangeTrim?: boolean): Column {
    const rect = this.gridElement.getBoundingClientRect();
    const frozenLeftColsWidth = this.props.cellMatrix.frozenLeftRange.width;
    const frozenRightColsWidth = this.props.cellMatrix.frozenRightRange.width;
    const isCursorOnLeftPane = clientX < frozenLeftColsWidth + rect.left;
    const isCursorOnRightPane = clientX > rect.width - frozenRightColsWidth;
    let virtualPositionOfX =
        clientX -
        rect.left +
        (frozenRightColsWidth && isCursorOnRightPane
            ? this.props.cellMatrix.frozenRightRange.cols[0].left -
            (this.gridElement.clientWidth - frozenRightColsWidth)
            : clientX > rect.left + frozenLeftColsWidth
                ? this.gridElement.scrollLeft
                : 0);
    let cols = this.props.cellMatrix.cols;
    if (outOfRangeTrim) {
        if (clientX < this.gridElement.getBoundingClientRect().left) {
            return cols[0];
        }
        if (clientX > this.gridElement.getBoundingClientRect().right) {
            return cols[cols.length - 1];
        }
    }
    if (isCursorOnLeftPane) {
        cols = this.props.cellMatrix.frozenLeftRange.cols;
    } else if (isCursorOnRightPane) {
        cols = this.props.cellMatrix.frozenRightRange.cols;
    } else {
        virtualPositionOfX -= frozenLeftColsWidth;
        cols = cols.slice(
            this.props.cellMatrix.frozenLeftRange.cols.length,
            cols.length - this.props.cellMatrix.frozenRightRange.cols.length
        );
    }
    return (
        cols.find(col => col.left <= virtualPositionOfX && col.left + col.width >= virtualPositionOfX) ||
        (virtualPositionOfX < 0 ? cols[0] : cols[cols.length - 1])
    );
}