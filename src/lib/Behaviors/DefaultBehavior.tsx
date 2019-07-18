import { State, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Location, keyCodes, PointerLocation } from "../Common";
import { handleKeyDown as handleKeyDown } from "./DefaultBehavior/handleKeyDown";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { ColumnSelectionBehavior } from "./ColumnSelectionBehavior";
import { ColumnReorderBehavior } from "./ColumnReorderBehavior";
import { RowSelectionBehavior } from "./RowSelectionBehavior";
import { RowReorderBehavior } from "./RowReorderBehavior";
import { getActiveSelectedRange } from "../Functions/getActiveSelectedRange";
import { trySetDataAndAppendChange } from "../Functions/trySetDataAndAppendChange";
import { FillHandleBehavior } from "./FillHandleBehavior";
import { getLocationFromClient, focusLocation } from "../Functions";
import { ResizeColumnBehavior } from "./ResizeColumnBehavior";

interface ClipboardData {
    type: string;
    data: any;
    text: string;
}
export class DefaultBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        state = { ...state, lastKeyCode: 0, currentBehavior: this.getNewBehavior(event, location, state) }
        return state.currentBehavior.handlePointerDown(event, location, state);
    }

    private getNewBehavior(event: any, location: PointerLocation, state: State): Behavior {
        // changing behavior will disable all keyboard event handlers
        if (location.row.idx == 0 && location.cellX > location.col.width - 6) {
            return new ResizeColumnBehavior();
        } else if (location.row.idx == 0 && state.selectedIds.includes(location.col.id) && !event.ctrlKey) {
            return new ColumnReorderBehavior();
        } else if (location.row.idx == 0) {
            return new ColumnSelectionBehavior();
        } else if (location.col.idx == 0 && state.selectedIds.includes(location.row.id) && !event.ctrlKey) {
            return new RowReorderBehavior();
        } else if (location.col.idx == 0) {
            return new RowSelectionBehavior();
        } else if ((event.pointerType === 'mouse' || event.pointerType === undefined) && event.target.className === 'dg-fill-handle') { // event.pointerType === undefined -> for cypress tests (is always undefined)
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
        if (state.isFocusedCellInEditMode /*|| this.grid.state.isFocusedCellReadOnly*/) {
            event.preventDefault();
            event.stopPropagation();
        } else if (location.equals(state.focusedLocation)) {
            return {
                ...state,
                isFocusedCellInEditMode: state.cellTemplates[state.focusedLocation!.cell.type].handleKeyDown(1, state.focusedLocation!.cell.data).editable
            };
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
        event.preventDefault()
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
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            const cells = parsedData.body.firstElementChild!.firstElementChild!.children
            for (let i = 0; i < cells.length; i++) {
                const row: ClipboardData[] = [];
                for (let j = 0; j < cells[i].children.length; j++) {
                    const data = JSON.parse(cells[i].children[j].getAttribute('data-data')!)
                    const type = cells[i].children[j].getAttribute('data-type')
                    const textValue = data ? cells[i].children[j].innerHTML : '';
                    row.push({ text: textValue, data: data, type: type! })
                }
                pasteContent.push(row)
            }
        } else {
            pasteContent = event.clipboardData.getData('text/plain').split('\n').map(line => line.split('\t').map(t => ({ text: t, data: t, type: 'text' })))
        }

        if (pasteContent.length === 1 && pasteContent[0].length === 1) {
            activeSelectedRange.rows.forEach(row =>
                activeSelectedRange.cols.forEach(col => {
                    if (!state.cellTemplates[row.cells[col.idx].type].handleKeyDown(0, pasteContent[0][0].data).editable)
                        return
                    state = trySetDataAndAppendChange(state, new Location(row, col), pasteContent[0][0].type, pasteContent[0][0].data, pasteContent[0][0].text)
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
                        if (!state.cellTemplates[lastLocation.cell.type].handleKeyDown(0, pasteValue.data).editable)
                            return
                        state = trySetDataAndAppendChange(state, lastLocation, pasteValue.type, pasteValue.data, pasteValue.text)
                    }
                })
            )
            return {
                ...state,
                selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, lastLocation!)]
            }
        }
        event.preventDefault()
        return { ...state };
    }

    handleCut(event: ClipboardEvent, state: State): State {
        // this.grid.preventFocusChange = true;
        copySelectedRangeToClipboard(state, true)
        // this.grid.preventFocusChange = false;
        event.preventDefault()
        //state.hiddenFocusElement.focus();
        return { ...state };
    }
}

export function copySelectedRangeToClipboard(state: State, removeValues = false) {

    const div = document.createElement('div')
    const table = document.createElement('table')
    table.setAttribute('empty-cells', 'show')
    table.setAttribute('data-key', 'dynagrid')
    const activeSelectedRange = getActiveSelectedRange(state)
    if (!activeSelectedRange)
        return
    activeSelectedRange.rows.forEach(row => {
        const tableRow = table.insertRow()
        activeSelectedRange.cols.forEach(col => {
            const tableCell = tableRow.insertCell()
            const cell = state.cellMatrix.getCell(row.id, col.id)!
            const data = state.cellTemplates[cell.type].validate(cell.data)
            tableCell.textContent = data;  // for undefined values
            if (!cell.data) {
                tableCell.innerHTML = '<img>';
            }
            tableCell.setAttribute('data-data', JSON.stringify(data))
            tableCell.setAttribute('data-type', cell.type)
            tableCell.style.border = '1px solid #D3D3D3'
            if (removeValues) {
                if (state.cellTemplates[cell.type].handleKeyDown(0, cell.data).editable)
                    state = trySetDataAndAppendChange(state, new Location(row, col), 'text', '', '');
            }
        })
    })
    div.setAttribute('contenteditable', 'true')
    div.appendChild(table)
    document.body.appendChild(div)
    div.focus()
    document.execCommand('selectAll', false, undefined)
    document.execCommand('copy')
    document.body.removeChild(div)
}