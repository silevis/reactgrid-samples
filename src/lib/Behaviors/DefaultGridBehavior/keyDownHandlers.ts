import { GridContext, KeyboardEvent, keyCodes, Row, Column } from "../../Common";
import { focusLocation, scrollIntoView } from "../../Functions";
import { setFocusLocation } from "../DefaultGridBehavior";

export function keyDownHandlers(gridContext: GridContext, event: KeyboardEvent) {
    const focusedLocation = gridContext.state.focusedLocation;
    const cellMatrix = gridContext.cellMatrix;

    if (!focusedLocation) { return }

    if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
        event.preventDefault();
    }
    if (
        event.keyCode === keyCodes.TAB &&
        !event.shiftKey &&
        focusedLocation.col.idx < cellMatrix.last.col.idx
    ) {
        gridContext.setState({ isFocusedCellInEditMode: false });
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx + 1
            ),
            true,
        );
    } else if (
        event.keyCode === keyCodes.TAB &&
        event.shiftKey &&
        focusedLocation.col.idx > 0
    ) {
        gridContext.setState({ isFocusedCellInEditMode: false });
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx - 1
            ),
            true
        );
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.ENTER &&
        gridContext.state.isFocusedCellInEditMode &&
        focusedLocation.row.idx < cellMatrix.last.row.idx
    ) {
        gridContext.setState({ isFocusedCellInEditMode: false });
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx + 1,
                focusedLocation.col.idx
            ),
            true
        );
    } else if (
        event.shiftKey &&
        event.keyCode === keyCodes.ENTER &&
        gridContext.state.isFocusedCellInEditMode &&
        focusedLocation.row.idx > 0
    ) {
        gridContext.setState({ isFocusedCellInEditMode: false });
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx - 1,
                focusedLocation.col.idx
            ),
            true
        );
    } else if (!event.shiftKey && event.keyCode === keyCodes.LEFT_ARROW && focusedLocation.col.idx > 0) {
        focusCell(focusedLocation.col.idx - 1, focusedLocation.row.idx, gridContext);
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.RIGHT_ARROW &&
        focusedLocation.col.idx < cellMatrix.last.col.idx
    ) {
        focusCell(focusedLocation.col.idx + 1, focusedLocation.row.idx, gridContext);
    } else if (!event.shiftKey && event.keyCode === keyCodes.UP_ARROW && focusedLocation.row.idx > 0) {
        focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, gridContext);
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.DOWN_ARROW &&
        focusedLocation.row.idx < cellMatrix.last.row.idx
    ) {
        focusCell(focusedLocation.col.idx, focusedLocation.row.idx + 1, gridContext);
    } else if (event.ctrlKey && event.keyCode === keyCodes.HOME) {
        focusCell(0, 0, gridContext);
    } else if (event.keyCode === keyCodes.HOME) {
        focusCell(0, focusedLocation.row.idx, gridContext);
    } else if (event.ctrlKey && event.keyCode === keyCodes.END) {
        focusLocation(gridContext, cellMatrix.last);
    } else if (event.keyCode === keyCodes.END) {
        focusCell(cellMatrix.cols.length - 1, focusedLocation.row.idx, gridContext);
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.PAGE_UP &&
        !gridContext.state.isFocusedCellInEditMode
    ) {
        const rowsOnScreen = cellMatrix.rows.filter(
            (r: Row) => r.top < gridContext.state.gridElement.clientHeight
        );
        focusCell(
            focusedLocation.col.idx,
            focusedLocation.row.idx - rowsOnScreen.length > 0
                ? focusedLocation.row.idx - rowsOnScreen.length
                : 0, gridContext
        );
    } else if (!event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
        const rowsOnScreen = cellMatrix.rows
            .slice(
                cellMatrix.frozenTopRange.rows.length,
                cellMatrix.rows.length -
                cellMatrix.frozenBottomRange.rows.length -
                1
            )
            .filter((r: Row) => r.top + r.height < gridContext.state.gridElement.clientHeight);
        focusCell(
            focusedLocation.col.idx,
            focusedLocation.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                ? focusedLocation.row.idx +
                rowsOnScreen.length -
                cellMatrix.frozenBottomRange.rows.length
                : cellMatrix.rows.length - 1, gridContext
        );
    } else if (event.keyCode === keyCodes.BACKSPACE) {
        cellMatrix.getCell(focusedLocation).trySetValue(undefined);
        gridContext.commitChanges();
    } else if (event.keyCode === keyCodes.DELETE) {
        gridContext.state.selectedRanges.forEach(range => {
            range.rows.forEach((row: Row) =>
                range.cols.forEach((col: Column) =>
                    cellMatrix.getCell({ row, col }).trySetValue(undefined)
                )
            );
        });
        gridContext.commitChanges();
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.ENTER &&
        !gridContext.state.isFocusedCellInEditMode
        // !gridContext.state.isFocusedCellReadOnly 
    ) {
        gridContext.setState({ isFocusedCellInEditMode: true });
    } else if (event.shiftKey && event.keyCode === keyCodes.ENTER && focusedLocation.row.idx > 0) {
        focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, gridContext);
    } else {
        // TODO
        // return this.innerBehavior.handleKeyDown(event);
    }
    
    event.stopPropagation();
    event.preventDefault();
    return;
};


const focusCell = (colIdx: number, rowIdx: number, gridContext: GridContext) => {
    const location = gridContext.cellMatrix.getLocation(rowIdx, colIdx);
    focusLocation(gridContext, location);
}
