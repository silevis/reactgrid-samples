import { GridContext } from "../Common/GridContext";
import { Row } from "../Common/Model";

export function getRowFromClientY(gridContext: GridContext, clientY: number, outOfRangeTrim?: boolean): Row {
    const cellMatrix = gridContext.cellMatrix;
    const gridElement = gridContext.state.gridElement;
    const rect = gridElement.getBoundingClientRect();
    const frozenTopRowsHeight = cellMatrix.frozenTopRange.height;
    const frozenBottomRowsHeight = cellMatrix.frozenBottomRange.height;
    const isCursorOnTopPane = clientY < frozenTopRowsHeight + rect.top;
    const isCursorOnBottomPane =
        cellMatrix.frozenBottomRange.rows.length > 0 && clientY > rect.height - frozenBottomRowsHeight;
    const scrollAreaHeight = gridElement.clientHeight - cellMatrix.frozenTopRange.height - cellMatrix.frozenBottomRange.height;
    let virtualPositionOfY = clientY - rect.top;
    let rows = cellMatrix.rows;
    if (outOfRangeTrim) {
        if (clientY < gridElement.getBoundingClientRect().top) {
            return rows[0];
        }
        if (clientY > gridElement.getBoundingClientRect().bottom) {
            return rows[rows.length - 1];
        }
    }
    if (isCursorOnTopPane) {
        rows = cellMatrix.frozenTopRange.rows;
    } else if (isCursorOnBottomPane) {
        virtualPositionOfY = virtualPositionOfY - frozenTopRowsHeight - scrollAreaHeight;
        rows = cellMatrix.frozenBottomRange.rows;
    } else {
        virtualPositionOfY = virtualPositionOfY - frozenTopRowsHeight + gridElement.scrollTop;
        rows = rows.slice(
            cellMatrix.frozenTopRange.rows.length,
            rows.length - cellMatrix.frozenBottomRange.rows.length
        );
    }
    return (
        rows.find(row => row.top <= virtualPositionOfY && row.top + row.height >= virtualPositionOfY) ||
        (virtualPositionOfY < 0 ? rows[0] : rows[rows.length - 1])
    );
}