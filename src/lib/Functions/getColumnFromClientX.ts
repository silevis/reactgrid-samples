import { Row } from "../Model";

export function getRowFromClientY(clientY: number, outOfRangeTrim?: boolean): Row {
    const rect = this.gridElement.getBoundingClientRect();
    const frozenTopRowsHeight = this.props.cellMatrix.frozenTopRange.height;
    const frozenBottomRowsHeight = this.props.cellMatrix.frozenBottomRange.height;
    const isCursorOnTopPane = clientY < frozenTopRowsHeight + rect.top;
    const isCursorOnBottomPane =
        this.props.cellMatrix.frozenBottomRange.rows.length > 0 && clientY > rect.height - frozenBottomRowsHeight;
    let virtualPositionOfY = clientY - rect.top;
    let rows = this.props.cellMatrix.rows;
    if (outOfRangeTrim) {
        if (clientY < this.gridElement.getBoundingClientRect().top) {
            return rows[0];
        }
        if (clientY > this.gridElement.getBoundingClientRect().bottom) {
            return rows[rows.length - 1];
        }
    }
    if (isCursorOnTopPane) {
        rows = this.props.cellMatrix.frozenTopRange.rows;
    } else if (isCursorOnBottomPane) {
        virtualPositionOfY = virtualPositionOfY - frozenTopRowsHeight - this.state.scrollAreaHeight;
        rows = this.props.cellMatrix.frozenBottomRange.rows;
    } else {
        virtualPositionOfY = virtualPositionOfY - frozenTopRowsHeight + this.gridElement.scrollTop;
        rows = rows.slice(
            this.props.cellMatrix.frozenTopRange.rows.length,
            rows.length - this.props.cellMatrix.frozenBottomRange.rows.length
        );
    }
    return (
        rows.find(row => row.top <= virtualPositionOfY && row.top + row.height >= virtualPositionOfY) ||
        (virtualPositionOfY < 0 ? rows[0] : rows[rows.length - 1])
    );
}