import { State, KeyboardEvent, keyCodes, Row, Column, DataChange, Location } from "../../Common";
import { focusLocation, isBrowserIE, getDataToPasteInIE } from "../../Functions";
import { handleResizeSelectionWithKeys } from "./handleResizeSelectionWithKeys";
import { handleKeyNavigationInsideSelection as handleKeyNavigationInsideSelection } from "./handleKeyNavigationInsideSelection";
import { trySetDataAndAppendChange } from "../../Functions/trySetDataAndAppendChange";
import { copySelectedRangeToClipboard, pasteData } from "../DefaultBehavior";

export function handleKeyDown(state: State, event: KeyboardEvent): State {
    const focusedLocation = state.focusedLocation!;
    const key: string = event.key;
    state.lastKeyCode = event.keyCode;
    if (!focusedLocation) { return state }

    if (isBrowserIE()) {
        if (event.ctrlKey && event.keyCode === 67) { // Copy
            copySelectedRangeToClipboard(state);
        }

        if (event.ctrlKey && event.keyCode === 88) { // Cut
            copySelectedRangeToClipboard(state, true);
        }

        if (event.ctrlKey && event.keyCode === 86) { // Paste
            state = pasteData(state, getDataToPasteInIE());
        }
    }

    if ((focusedLocation.cell.data != state.cellTemplates[focusedLocation.cell.type].handleKeyDown(event.keyCode, focusedLocation.cell.data) &&
        state.selectedRanges.length == 1 && state.selectedRanges[0].first.equals(state.selectedRanges[0].last))) {

        state = trySetDataAndAppendChange(state, focusedLocation, {
            type: focusedLocation.cell.type,
            data: state.cellTemplates[focusedLocation.cell.type].handleKeyDown(event.keyCode, focusedLocation.cell.data).cellData
        })

    }

    if (event.shiftKey && !isEnterKey(key) && !isTabKey(key) && !possibleCharactersToEnter(event) && !state.isFocusedCellInEditMode) {
        return handleResizeSelectionWithKeys(state, event);
    }

    if (isArrowKey(key)) {
        return handleArrows(event, state);
    }

    if (isSpecialNavKeys(key)) {
        return handleSpecialNavKeys(event, state);
    }

    if (isSpecialKeys(key)) {
        return handleSpecialKeys(event, state);
    }

    if (isSelectedOneCell(state)) {
        if (isEnterKey(key)) {
            return handleEnterKey(event, state, event.shiftKey);
        }
        if (isTabKey(key)) {
            return handleTabKey(event, state, event.shiftKey);
        }
    } else {
        if ((isEnterKey(key) || isTabKey(key))) {
            return handleKeyNavigationInsideSelection(state, event, event.shiftKey);
        }
    }

    if (event.keyCode === keyCodes.ESC && state.isFocusedCellInEditMode) {
        return focusLocation(
            state,
            state.cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx
            ),
            true
        );
    }

    if (!event.ctrlKey && (possibleCharactersToEnter(event) || isEnterKey(key) || isSpaceKey(key))) {
        return { ...state, isFocusedCellInEditMode: state.cellTemplates[focusedLocation.cell.type].hasEditMode }
    }

    state.hiddenFocusElement.focus();
    return { ...state };
}


// TODO Check it
export const isArrowKey = (key: string): boolean => key.includes('Arrow');
const isEnterKey = (key: string): boolean => key.includes('Enter');
const isSpaceKey = (key: string): boolean => key.includes('');
const isSpecialNavKeys = (key: string): boolean => {
    const keys = ['Home', 'PageUp', 'PageDown', 'End'];
    return keys.some(el => el == key);
}
const isTabKey = (key: string): boolean => key.includes('Tab');
const isSpecialKeys = (key: string): boolean => {
    const keys = ['Backspace', 'Delete'];
    return keys.some(el => el == key);
}
const possibleCharactersToEnter = (event: KeyboardEvent) =>
    (event.keyCode >= keyCodes.ZERO && event.keyCode <= keyCodes.Z) ||
    (event.keyCode >= keyCodes.NUM_PAD_0 && event.keyCode <= keyCodes.DIVIDE) ||
    (event.keyCode >= keyCodes.SEMI_COLON && event.keyCode <= keyCodes.SINGLE_QUOTE);

// or replace it
// const isKeys = (key: string, keys: Array<string>): boolean => keys.some(el => el.includes(key))

const isSelectedOneCell = (state: State): boolean => {
    const activeSelectedRange = state.selectedRanges[state.activeSelectedRangeIdx];
    return state.selectedRanges.length <= 1 && state.selectedRanges.length > 0 && activeSelectedRange.cols.length <= 1 && activeSelectedRange.rows.length <= 1
}

function focusCell(colIdx: number, rowIdx: number, state: State): State {
    const location = state.cellMatrix.getLocation(rowIdx, colIdx);
    return focusLocation(state, location);
}

function handleArrows(event: KeyboardEvent, state: State): State {
    const focusedLocation = state.focusedLocation!;
    const cellMatrix = state.cellMatrix;
    event.preventDefault();
    if (!event.shiftKey) {
        if (event.keyCode === keyCodes.LEFT_ARROW && focusedLocation.col.idx > 0) {
            return focusCell(focusedLocation.col.idx - 1, focusedLocation.row.idx, state);
        } else if (
            event.keyCode === keyCodes.RIGHT_ARROW &&
            focusedLocation.col.idx < cellMatrix.last.col.idx
        ) {
            return focusCell(focusedLocation.col.idx + 1, focusedLocation.row.idx, state);
        } else if (event.keyCode === keyCodes.UP_ARROW && focusedLocation.row.idx > 0) {
            return focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, state);
        } else if (
            event.keyCode === keyCodes.DOWN_ARROW &&
            focusedLocation.row.idx < cellMatrix.last.row.idx
        ) {
            return focusCell(focusedLocation.col.idx, focusedLocation.row.idx + 1, state);
        }
    }
    return state
}

function handleSpecialNavKeys(event: KeyboardEvent, state: State) {
    const focusedLocation = state.focusedLocation!;
    const cellMatrix = state.cellMatrix;
    if (event.ctrlKey && event.keyCode === keyCodes.HOME) {
        return focusCell(0, 0, state);
    } else if (event.keyCode === keyCodes.HOME) {
        return focusCell(0, focusedLocation.row.idx, state);
    } else if (event.ctrlKey && event.keyCode === keyCodes.END) {
        return focusLocation(state, cellMatrix.last);
    } else if (event.keyCode === keyCodes.END) {
        return focusCell(cellMatrix.cols.length - 1, focusedLocation.row.idx, state);
    } else if (
        !event.shiftKey &&
        event.keyCode === keyCodes.PAGE_UP &&
        !state.isFocusedCellInEditMode
    ) {
        const rowsOnScreen = cellMatrix.rows.filter(
            (r: Row) => r.top < state.viewportElement.clientHeight
        );
        return focusCell(
            focusedLocation.col.idx,
            focusedLocation.row.idx - rowsOnScreen.length > 0
                ? focusedLocation.row.idx - rowsOnScreen.length
                : 0, state
        );
    } else if (!event.shiftKey && event.keyCode === keyCodes.PAGE_DOWN) {
        const rowsOnScreen = cellMatrix.rows
            .slice(
                cellMatrix.frozenTopRange.rows.length,
                cellMatrix.rows.length -
                cellMatrix.frozenBottomRange.rows.length -
                1
            )
            .filter((r: Row) => r.top + r.height < state.viewportElement.clientHeight);
        return focusCell(
            focusedLocation.col.idx,
            focusedLocation.row.idx + rowsOnScreen.length < cellMatrix.rows.length
                ? focusedLocation.row.idx +
                rowsOnScreen.length -
                cellMatrix.frozenBottomRange.rows.length
                : cellMatrix.rows.length - 1, state
        );
    }
    return state
}

function handleTabKey(event: KeyboardEvent, state: State, shiftPressed: boolean) {
    const focusedLocation = state.focusedLocation!;
    const cellMatrix = state.cellMatrix;
    if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
        event.preventDefault();
    }
    if (
        event.keyCode === keyCodes.TAB &&
        !shiftPressed &&
        focusedLocation.col.idx < cellMatrix.last.col.idx
    ) {
        return focusLocation(
            state,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx + 1
            ),
            true,
        );
    } else if (
        event.keyCode === keyCodes.TAB &&
        shiftPressed &&
        focusedLocation.col.idx > 0
    ) {
        return focusLocation(
            state,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx - 1
            ),
            true
        );
    }
    return state
}

function handleEnterKey(event: KeyboardEvent, state: State, shiftPressed: boolean) {
    const focusedLocation = state.focusedLocation!;
    const cellMatrix = state.cellMatrix;
    if (
        !shiftPressed &&
        state.isFocusedCellInEditMode &&
        focusedLocation.row.idx < cellMatrix.last.row.idx
    ) {
        return focusLocation(
            state,
            cellMatrix.getLocation(
                focusedLocation.row.idx + 1,
                focusedLocation.col.idx
            ),
            true
        );
    } else if (
        shiftPressed &&
        state.isFocusedCellInEditMode &&
        focusedLocation.row.idx > 0
    ) {
        return focusLocation(
            state,
            cellMatrix.getLocation(
                focusedLocation.row.idx - 1,
                focusedLocation.col.idx
            ),
            true
        );
    }
    if (
        !shiftPressed &&
        !state.isFocusedCellInEditMode
        // !state.isFocusedCellReadOnly 
    ) {
        return { ...state, isFocusedCellInEditMode: state.cellTemplates[focusedLocation.cell.type].hasEditMode };
    } else if (shiftPressed && event.keyCode === keyCodes.ENTER && focusedLocation.row.idx > 0) {
        return focusCell(focusedLocation.col.idx, focusedLocation.row.idx - 1, state);
    }
    else {
        return focusLocation(
            state,
            cellMatrix.getLocation(
                focusedLocation.row.idx,
                focusedLocation.col.idx
            ),
            true
        );
        // state.currentBehavior.handleKeyDown(event)
        // TODO
        // return this.innerBehavior.handleKeyDown(event);
    }
    return state
}

function handleSpecialKeys(event: KeyboardEvent, state: State) {
    if (!state.isFocusedCellInEditMode && (event.keyCode === keyCodes.DELETE || event.keyCode === keyCodes.BACKSPACE)) {
        const dataChanges: DataChange[] = []
        state.selectedRanges.forEach(range =>
            range.rows.forEach((row: Row) =>
                range.cols.forEach((col: Column) => {
                    const cell = state.cellMatrix.getCell(row.id, col.id);
                    if (state.cellTemplates[cell.type].handleKeyDown(keyCodes.DELETE, cell.data).editable)
                        trySetDataAndAppendChange(state, new Location(row, col), { data: '', type: 'text' })
                })
            )
        );
        return { ...state, dataChanges };
    }
    return state
}
