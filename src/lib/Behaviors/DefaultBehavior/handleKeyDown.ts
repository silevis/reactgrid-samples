import { GridContext, KeyboardEvent, keyCodes, Row, Column } from "../../Common";
import { focusLocation } from "../../Functions";
import { ResizeSelectionWithKeysBehavior } from "./ResizeSelectionWithKeysBehavior";
import { KeyNavigationInsideSelectionBehavior as handleKeyNavigationInsideSelection } from "./KeyNavigationInsideSelectionBehavior";
import { KeyObject } from "crypto";

export function handleKeyDown(gridContext: GridContext, event: KeyboardEvent) {
    const focusedLocation = gridContext.state.focusedLocation!;
    const key: string = event.key
    if (!focusedLocation) { return }

    if (!isSelectedOneCell(gridContext) && !isArrowKey(key)) {
        handleKeyNavigationInsideSelection(gridContext, event)
    } else {
        if (isTabKey(key)) {
            handleTabKey(event, gridContext)
        }
        if (isEnterKey(key)) {
            handleEnterKey(event, gridContext)
        }
    }
    if (event.shiftKey) {
        ResizeSelectionWithKeysBehavior(gridContext, event)
    }
    if (isArrowKey(key)) {
        handleArrows(event, gridContext)
    }



    if (isSpecialNavKeys(key)) {
        handleSpecialNavKeys(event, gridContext)
    }
    if (isSpecialKeys(key)) {
        handleSpecialKeys(event, gridContext)
    }


    if (!event.ctrlKey && !gridContext.state.isFocusedCellInEditMode && (event.keyCode == keyCodes.ENTER || (event.keyCode >= keyCodes.ZERO && event.keyCode <= keyCodes.Z) || (event.keyCode >= keyCodes.NUM_PAD_0 && event.keyCode <= keyCodes.DIVIDE) || (event.keyCode >= keyCodes.SEMI_COLON && event.keyCode <= keyCodes.SINGLE_QUOTE) || event.keyCode === keyCodes.SPACE)) {
        // TODO call shouldEnableEditMode on current cell
        if (gridContext.cellMatrix.getCell(gridContext.state.focusedLocation!).shouldEnableEditMode(event.keyCode))
            gridContext.setState({ isFocusedCellInEditMode: true })
        gridContext.lastKeyCode = event.keyCode;

    }

    if (event.keyCode === keyCodes.ESC && gridContext.state.isFocusedCellInEditMode) {
        gridContext.lastKeyCode = event.keyCode;
        gridContext.setState({ isFocusedCellInEditMode: false })
        gridContext.hiddenFocusElement.focus();
    }
    //event.stopPropagation();
    //event.preventDefault();
    return;
}


// TODO Check it
const isArrowKey = (key: string): boolean => key.includes('Arrow')
const isEnterKey = (key: string): boolean => key.includes('Enter')
const isSpecialNavKeys = (key: string): boolean => {
    const keys = ['Home', 'PageUp', 'PageDown', 'End']
    return keys.some(el => el.includes(key))
}
const isTabKey = (key: string): boolean => key.includes('Tab')
const isSpecialKeys = (key: string): boolean => {
    const keys = ['Backspace', 'Delete']
    return keys.some(el => el.includes(key))
}
// or replace it
// const isKeys = (key: string, keys: Array<string>): boolean => keys.some(el => el.includes(key))

const isSelectedOneCell = (gridContext: GridContext): boolean => {
    const activeSelectedRange = gridContext.state.selectedRanges[gridContext.state.activeSelectedRangeIdx]
    if (!activeSelectedRange) {
        return false
    }
    return gridContext.state.selectedRanges.length <= 1 && gridContext.state.selectedRanges.length > 0 && activeSelectedRange.cols.length <= 1 && activeSelectedRange.rows.length <= 1
}


const focusCell = (colIdx: number, rowIdx: number, gridContext: GridContext) => {
    const location = gridContext.cellMatrix.getLocation(rowIdx, colIdx);
    focusLocation(gridContext, location);
}

const handleArrows = (event: KeyboardEvent, gridContext: GridContext) => {
    const focusedLocation = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    if (!event.shiftKey) {
        if (event.keyCode === keyCodes.LEFT_ARROW && focusedLocation.col.idx > 0) {
            focusCell(focusedLocation.col.idx - 1, focusedLocation.row.idx, gridContext);
        } else if (
            event.keyCode === keyCodes.RIGHT_ARROW &&
            focusedLocation.col.idx < cellMatrix.last.col.idx
        ) {
            focusCell(focusedLocation.col.idx + 1, focusedLocation.row.idx, gridContext);
        } else if (event.keyCode === keyCodes.UP_ARROW && focusedLocation.row.idx > 0) {
            focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, gridContext);
        } else if (
            event.keyCode === keyCodes.DOWN_ARROW &&
            focusedLocation.row.idx < cellMatrix.last.row.idx
        ) {
            focusCell(focusedLocation.col.idx, focusedLocation.row.idx + 1, gridContext);
        }
    }
}

const handleSpecialNavKeys = (event: KeyboardEvent, gridContext: GridContext) => {
    const focusedLocation = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    if (event.ctrlKey && event.keyCode === keyCodes.HOME) {
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
            (r: Row) => r.top < gridContext.viewportElement.clientHeight
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
            .filter((r: Row) => r.top + r.height < gridContext.viewportElement.clientHeight);
        focusCell(
            focusedLocation.col.idx,
            focusedLocation.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                ? focusedLocation.row.idx +
                rowsOnScreen.length -
                cellMatrix.frozenBottomRange.rows.length
                : cellMatrix.rows.length - 1, gridContext
        );
    }
}

const handleTabKey = (event: KeyboardEvent, gridContext: GridContext) => {
    const focusedLocation = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
        event.preventDefault();
    }
    if (
        event.keyCode === keyCodes.TAB &&
        !event.shiftKey &&
        focusedLocation.col.idx < cellMatrix.last.col.idx
    ) {
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
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx - 1
            ),
            true
        );
    }
}

const handleEnterKey = (event: KeyboardEvent, gridContext: GridContext) => {
    const focusedLocation = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    if (
        !event.shiftKey &&
        gridContext.state.isFocusedCellInEditMode &&
        focusedLocation.row.idx < cellMatrix.last.row.idx
    ) {
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
        gridContext.state.isFocusedCellInEditMode &&
        focusedLocation.row.idx > 0
    ) {
        focusLocation(
            gridContext,
            cellMatrix.getLocation(
                focusedLocation.row.idx - 1,
                focusedLocation.col.idx
            ),
            true
        );
    }
    if (
        !event.shiftKey &&
        !gridContext.state.isFocusedCellInEditMode
        // !gridContext.state.isFocusedCellReadOnly 
    ) {
        gridContext.setState({ isFocusedCellInEditMode: true });
    } else if (event.shiftKey && event.keyCode === keyCodes.ENTER && focusedLocation.row.idx > 0) {
        focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, gridContext);
    }
    else {
        // gridContext.state.currentBehavior.handleKeyDown(event)
        // TODO
        // return this.innerBehavior.handleKeyDown(event);
    }
}

const handleSpecialKeys = (event: KeyboardEvent, gridContext: GridContext) => {
    const focusedLocation = gridContext.state.focusedLocation!;
    const cellMatrix = gridContext.cellMatrix;
    if (event.keyCode === keyCodes.DELETE || event.keyCode === keyCodes.BACKSPACE) {
        gridContext.state.selectedRanges.forEach(range => {
            range.rows.forEach((row: Row) =>
                range.cols.forEach((col: Column) =>
                    cellMatrix.getCell({ row, col }).trySetData({ textValue: '', data: null, type: 'string' })

                )
            );
        });
        gridContext.commitChanges();
    }
}
