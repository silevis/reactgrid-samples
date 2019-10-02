import { State, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Location, keyCodes, PointerLocation, Id, SelectionMode, Cell } from "../Common";
import { handleKeyDown } from "./DefaultBehavior/handleKeyDown";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { ColumnSelectionBehavior } from "./ColumnSelectionBehavior";
import { ColumnReorderBehavior } from "./ColumnReorderBehavior";
import { RowSelectionBehavior } from "./RowSelectionBehavior";
import { RowReorderBehavior } from "./RowReorderBehavior";
import { getActiveSelectedRange } from "../Functions/getActiveSelectedRange";
import { trySetDataAndAppendChange } from "../Functions";
import { FillHandleBehavior } from "./FillHandleBehavior";
import { getLocationFromClient, focusLocation } from "../Functions";
import { ResizeColumnBehavior } from "./ResizeColumnBehavior";

export interface ClipboardData {
    type?: string | null;
    data: any;
    text: string;
}

export class DefaultBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        state = { ...state, currentBehavior: this.getNewBehavior(event, location, state) }
        return state.currentBehavior.handlePointerDown(event, location, state);
    }

    private getNewBehavior(event: any, location: PointerLocation, state: State): Behavior {
        // changing behavior will disable all keyboard event handlers
        if (event.pointerType === 'mouse' && location.row.idx == 0 && location.cellX > location.col.width - 7 && location.col.resizable) {
            return new ResizeColumnBehavior();
        } else if (location.row.idx == 0 && state.selectedColIds.includes(location.col.id) && !event.ctrlKey && state.selectionMode == 'column' && location.col.reorderable) {
            return new ColumnReorderBehavior();
        } else if (location.row.idx == 0 && (event.target.className !== 'dg-fill-handle' && event.target.className !== 'dg-touch-fill-handle')) {
            return new ColumnSelectionBehavior();
        } else if (location.col.idx == 0 && state.selectedRowIds.includes(location.row.id) && !event.ctrlKey && state.selectionMode == 'row' && location.row.reorderable) {
            return new RowReorderBehavior();
        } else if (location.col.idx == 0 && (event.target.className !== 'dg-fill-handle' && event.target.className !== 'dg-touch-fill-handle')) {
            return new RowSelectionBehavior();
        } else if ((event.pointerType === 'mouse' || event.pointerType === undefined) && event.target.className === 'dg-fill-handle' && !state.disableFillHandle) { // event.pointerType === undefined -> for cypress tests (is always undefined)
            return new FillHandleBehavior();
        } else {
            return new CellSelectionBehavior();
        }
    }

    handleContextMenu(event: PointerEvent, state: State): State {
        event.preventDefault();
        const clickX = event.clientX
        const clickY = event.clientY
        const top = window.innerHeight - clickY > 25;
        const right = window.innerWidth - clickX > 120;
        const bottom = !top;
        const left = !right;
        let contextMenuPosition = state.contextMenuPosition;
        if (top) { contextMenuPosition[0] = clickY; }
        if (right) { contextMenuPosition[1] = clickX + 5; }
        if (bottom) { contextMenuPosition[0] = clickY - 25 - 5; }
        if (left) { contextMenuPosition[1] = clickX - 120 - 5; }
        const focusedLocation = getLocationFromClient(state, clickX, clickY);
        if (!state.selectedRanges.find(range => range.contains(focusedLocation))) {
            state = focusLocation(state, focusedLocation)
        }
        return {
            ...state,
            contextMenuPosition
        }
    }

    handleDoubleClick(event: PointerEvent, location: Location, state: State): State {
        // TODO remove if it works without
        // if (state.currentlyEditedCell) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // } else 
        if (state.focusedLocation && location.equals(state.focusedLocation)) {
            const cellTemplate = state.cellTemplates[location.cell.type];
            if (cellTemplate.handleKeyDown) {
                const { cellData, enableEditMode } = cellTemplate.handleKeyDown(state.focusedLocation.cell.data, 1, event.ctrlKey, event.shiftKey, event.altKey);
                if (enableEditMode) {

                    return { ...state, currentlyEditedCell: { data: cellData, type: location.cell.type } };
                }
            }
        }
        return state;
    }

    handleKeyDown(event: KeyboardEvent, state: State): State {
        return handleKeyDown(state, event);
    }

    handleKeyUp(event: KeyboardEvent, state: State): State {
        if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
            event.stopPropagation();
        }
        return state;
    }

    handleCopy(event: ClipboardEvent, state: State): State {
        copySelectedRangeToClipboard(state);
        event.preventDefault();
        return state;
    }

    handlePaste(event: ClipboardEvent, state: State): State {
        const activeSelectedRange = getActiveSelectedRange(state)
        if (!activeSelectedRange) {
            return state;
        }
        let pasteContent: ClipboardData[][] = [];
        const htmlData = event.clipboardData.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        const selectionMode = parsedData.body.firstElementChild!.getAttribute('data-selection') as SelectionMode;
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            const cells = parsedData.body.firstElementChild!.firstElementChild!.children
            for (let i = 0; i < cells.length; i++) {
                const row: ClipboardData[] = [];
                for (let j = 0; j < cells[i].children.length; j++) {
                    // TODO Use REACT-GRID in attribute 
                    const rawData = cells[i].children[j].getAttribute('data-data');
                    const data = rawData && JSON.parse(rawData);
                    const type = cells[i].children[j].getAttribute('data-type')
                    const textValue = data ? cells[i].children[j].innerHTML : '';
                    row.push({ text: textValue, data: data, type: type })
                }
                pasteContent.push(row)
            }
        } else {
            pasteContent = event.clipboardData.getData('text/plain').split('\n').map(line => line.split('\t').map(t => ({ text: t, data: t, type: 'text' })))
        }
        event.preventDefault()
        return { ...pasteData(state, pasteContent), selectionMode: selectionMode ? selectionMode : 'range' };

    }

    handleCut(event: ClipboardEvent, state: State): State {
        copySelectedRangeToClipboard(state, true)
        event.preventDefault()
        return { ...state };
    }
}

export function validateOuterData(state: State, clipboardData: ClipboardData): Cell {
    const type = clipboardData.type
    if (type && state.cellTemplates[type] && state.cellTemplates[type].isValid(clipboardData.data))
        return { data: clipboardData.data, type }
    return { data: clipboardData.text, type: 'text' }
}

export function pasteData(state: State, pasteContent: ClipboardData[][]): State {
    const activeSelectedRange = getActiveSelectedRange(state)
    if (pasteContent.length === 1 && pasteContent[0].length === 1) {
        activeSelectedRange.rows.forEach(row =>
            activeSelectedRange.cols.forEach(col => {
                state = trySetDataAndAppendChange(state, new Location(row, col), validateOuterData(state, pasteContent[0][0]))
            })
        )
    } else {
        let lastLocation: Location
        const cellMatrix = state.cellMatrix
        pasteContent.forEach((row, pasteRowIdx) =>
            row.forEach((pasteValue: ClipboardData, pasteColIdx: number) => {
                const rowIdx = activeSelectedRange.rows[0].idx + pasteRowIdx
                const colIdx = activeSelectedRange.cols[0].idx + pasteColIdx
                if (rowIdx <= cellMatrix.last.row.idx && colIdx <= cellMatrix.last.col.idx) {
                    lastLocation = cellMatrix.getLocation(rowIdx, colIdx)
                    state = trySetDataAndAppendChange(state, lastLocation, validateOuterData(state, pasteValue))
                }
            })
        )
        const range = cellMatrix.getRange(activeSelectedRange.first, lastLocation!);
        // const selectedIds = (): Id[] => {
        //     const range = cellMatrix.getRange(activeSelectedRange.first, lastLocation!);
        //     if (state.selectionMode == 'column' && activeSelectedRange.first.row == state.cellMatrix.first.row)
        //         return range.cols.map(c => c.id)
        //     if (state.selectionMode == 'row' && activeSelectedRange.first.col == state.cellMatrix.first.col)
        //         return range.rows.map(r => r.id)
        //     return []
        // }
        return {
            ...state,
            selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, lastLocation!)],
            activeSelectedRangeIdx: 0,
            selectedColIds: range.cols.map(c => c.id),
            selectedRowIds: range.rows.map(r => r.id)
        }
    }
    return state
}

export function copySelectedRangeToClipboard(state: State, removeValues = false) {

    const div = document.createElement('div')
    const table = document.createElement('table')
    table.setAttribute('empty-cells', 'show')
    table.setAttribute('data-key', 'dynagrid')
    table.setAttribute('data-selection', state.selectionMode)
    const activeSelectedRange = getActiveSelectedRange(state)
    if (!activeSelectedRange)
        return
    activeSelectedRange.rows.forEach(row => {
        const tableRow = table.insertRow()
        activeSelectedRange.cols.forEach(col => {
            const tableCell = tableRow.insertCell()
            const cell = state.cellMatrix.getCell(row.id, col.id)!
            let data = cell.data;
            // TODO remove hardcoded stuff
            data = cell.type === 'group' ? data.name : data;
            tableCell.textContent = data;  // for undefined values
            if (!cell.data) {
                tableCell.innerHTML = '<img>';
            }
            tableCell.setAttribute('data-data', JSON.stringify(data))
            tableCell.setAttribute('data-type', cell.type)
            tableCell.style.border = '1px solid #D3D3D3'
            if (removeValues) {
                state = trySetDataAndAppendChange(state, new Location(row, col), { data: '', type: 'text' });
            }
        })
    })
    div.setAttribute('contenteditable', 'true')
    div.appendChild(table)
    document.body.appendChild(div)
    div.focus()
    document.execCommand('selectAll', false, undefined)
    document.execCommand('copy')
    document.body.removeChild(div);
    state.hiddenFocusElement.focus();
}

export function copySelectedRangeToClipboardInIE(state: State, removeValues = false) {
    const div = document.createElement('div')
    const activeSelectedRange = getActiveSelectedRange(state)
    if (!activeSelectedRange)
        return

    let text = '';
    activeSelectedRange.rows.forEach((row, rowIdx) => {
        activeSelectedRange.cols.forEach((col, colIdx) => {
            const prevCol = (colIdx - 1 >= 0) ? activeSelectedRange.cols[colIdx - 1] : undefined;
            const nextCol = (colIdx + 1 < activeSelectedRange.cols.length) ? activeSelectedRange.cols[colIdx + 1] : undefined;
            const cell = state.cellMatrix.getCell(row.id, col.id);
            const prevCell = prevCol ? state.cellMatrix.getCell(row.id, prevCol.id) : undefined;
            const nextCell = nextCol ? state.cellMatrix.getCell(row.id, nextCol.id) : undefined;
            const cellData = cell.data ? cell.data.toString() : '';
            const prevCellData = (prevCell && prevCell.data) ? prevCell.data.toString() : '';
            const nextCellData = (nextCell && nextCell.data) ? nextCell.data.toString() : '';
            text = text + cellData;
            if (!cellData) {
                text = text + '\t';
                if (prevCellData.length > 0 && nextCellData.length > 0) {
                    text = text + '\t'
                }
            } else {
                if (nextCellData.length > 0) {
                    text = text + '\t'
                }
            }
            if (removeValues) {
                state = trySetDataAndAppendChange(state, new Location(row, col), { data: '', type: 'text' });
            }
        })
        const areAllEmptyCells = activeSelectedRange.cols.every(el => {
            const cellData = state.cellMatrix.getCell(row.id, el.id).data;
            if (!cellData) {
                return true
            } else {
                return false;
            }
        });
        if (areAllEmptyCells) {
            text = text.substring(0, text.length - 1);
        }
        text = (activeSelectedRange.rows.length > 1 && rowIdx < activeSelectedRange.rows.length - 1) ? text + '\n' : text;
    });
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);
    div.focus();
    (window as any).clipboardData.setData('text', text);
    document.body.removeChild(div)
}