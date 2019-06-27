import { State, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Location, keyCodes, DataChange, PointerLocation } from "../Common";
import { handleKeyDown as handleKeyDown } from "./DefaultBehavior/handleKeyDown";
import { changeBehavior } from "../Functions";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { ColumnSelectionBehavior } from "./ColumnSelectionBehavior";
import { ColumnReorderBehavior } from "./ColumnReorderBehavior";
import { RowSelectionBehavior } from "./RowSelectionBehavior";
import { RowReorderBehavior } from "./RowReorderBehavior";
import { getActiveSelectedRange } from "../Functions/getActiveSelectedRange";
import { trySetDataAndAppendChange } from "../Functions/trySetDataAndAppendChange";

interface ClipboardData {
    type: string;
    data: any;
    text: string;
}

export class DefaultBehavior extends Behavior {

    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State {
        state.lastKeyCode = 0;
        // changing behavior will disable all keyboard event handlers
        if (location.row.idx == 0 && state.selectedIndexes.includes(location.col.idx)) {
            const colReorderBehavior = new ColumnReorderBehavior();
            state = changeBehavior(state, colReorderBehavior);
            return colReorderBehavior.handlePointerDown(event, location, state);
        } else if (location.row.idx == 0) {
            const columnSelectionBehavior = new ColumnSelectionBehavior();
            state = changeBehavior(state, columnSelectionBehavior);
            return columnSelectionBehavior.handlePointerDown(event, location, state);
        } else if (location.col.idx == 0 && state.selectedIndexes.includes(location.row.idx)) {
            const columnSelectionBehavior = new RowReorderBehavior();
            state = changeBehavior(state, columnSelectionBehavior);
            return columnSelectionBehavior.handlePointerDown(event, location, state);
        } else if (location.col.idx == 0) {
            const columnSelectionBehavior = new RowSelectionBehavior();
            state = changeBehavior(state, columnSelectionBehavior);
            return columnSelectionBehavior.handlePointerDown(event, location, state);
        } else {
            const cellSelectionBehavior = new CellSelectionBehavior();
            state = changeBehavior(state, cellSelectionBehavior);
            return cellSelectionBehavior.handlePointerDown(event, location, state);
        }
    }

    handleContextMenu(event: PointerEvent): void {
        event.preventDefault();
        //changeBehavior(state, new DrawContextMenuBehavior(state, event))
        //event.persist();
    }

    handleDoubleClick(event: PointerEvent, location: Location, state: State): State {
        if (state.isFocusedCellInEditMode /*|| this.grid.state.isFocusedCellReadOnly*/) {
            event.preventDefault();
            event.stopPropagation();
        } else if (location.equals(state.focusedLocation)) {
            return {
                ...state,
                isFocusedCellInEditMode: true
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
        this.copySelectedRangeToClipboard(state);
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
                    state = trySetDataAndAppendChange(new Location(row, col), pasteContent[0][0].data, pasteContent[0][0].type, pasteContent[0][0].text, state)
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
                        state = trySetDataAndAppendChange(lastLocation, pasteValue.data, pasteValue.type, pasteValue.text, state)
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
        this.copySelectedRangeToClipboard(state, true)
        // this.grid.preventFocusChange = false;
        event.preventDefault()
        //state.hiddenFocusElement.focus();
        return { ...state };
    }

    private copySelectedRangeToClipboard(state: State, removeValues = false) {

        const div = document.createElement('div')
        const table = document.createElement('table')
        table.setAttribute('empty-cells', 'show')
        table.setAttribute('data-key', 'dynagrid')
        const activeSelectedRange = getActiveSelectedRange(state)
        activeSelectedRange.rows.forEach(row => {
            const tableRow = table.insertRow()
            activeSelectedRange.cols.forEach(col => {
                const tableCell = tableRow.insertCell()
                const location = new Location(row, col)
                const data = state.cellTemplates[location.cell.type].validate(location.cell.data)
                tableCell.textContent = data;  // for undefined values
                if (!location.cell.data) {
                    tableCell.innerHTML = '<img>';
                }
                tableCell.setAttribute('data-data', JSON.stringify(data))
                tableCell.setAttribute('data-type', location.cell.type)
                tableCell.style.border = '1px solid #D3D3D3'
                if (removeValues) {
                    state = trySetDataAndAppendChange(location, '', 'text', '', state);
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
}
