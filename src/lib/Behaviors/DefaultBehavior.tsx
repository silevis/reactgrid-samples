import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Range, Location, keyCodes, CellData } from "../Common";
import { handleKeyDown as handleKeyDown } from "./DefaultBehavior/handleKeyDown";
import { changeBehavior } from "../Functions";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { getActiveSelectedRange } from "../Functions/getActiveSelectedRange";

export class DefaultBehavior extends Behavior {

    constructor(private gridContext: GridContext) { super(); }

    handlePointerDown(event: PointerEvent, location: Location) {
        // changing behavior will disable all keyboard event handlers
        const cellSelectionBehavior = new CellSelectionBehavior(this.gridContext);
        changeBehavior(this.gridContext, cellSelectionBehavior);
        cellSelectionBehavior.handlePointerDown(event, location);
    }

    handleContextMenu(event: PointerEvent): void {
        event.preventDefault();
        //changeBehavior(this.gridContext, new DrawContextMenuBehavior(this.gridContext, event))
        //event.persist();
    }

    handlePointerMove(event: PointerEvent, location: Location): void {

    }

    handlePointerUp(event: PointerEvent, location: Location): void {
    }

    handleDoubleClick(event: PointerEvent, location: Location): void {
        if (this.gridContext.state.isFocusedCellInEditMode /*|| this.grid.state.isFocusedCellReadOnly*/) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (
                this.gridContext.state.focusedLocation &&
                this.gridContext.state.focusedLocation.col.idx === location.col.idx &&
                this.gridContext.state.focusedLocation.row.idx === location.row.idx
            ) {
                this.gridContext.lastKeyCode = 0;
                setTimeout(() => this.gridContext.setState({ isFocusedCellInEditMode: true }));
            }
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        handleKeyDown(this.gridContext, event)
    }
    handleKeyUp(event: KeyboardEvent): void {
        if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

    }
    handleCopy(event: ClipboardEvent): void {
        // this.grid.preventFocusChange = true;
        this.copySelectedRangeToClipboard()
        // this.grid.hiddenFocusElement.focus()
        // this.grid.preventFocusChange = false;
        event.preventDefault()
    }
    handlePaste(event: ClipboardEvent): void {
        const activeSelectedRange = getActiveSelectedRange(this.gridContext)
        if (!activeSelectedRange) {
            return
        }
        let pasteContent: CellData[][];
        const htmlData = event.clipboardData.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            const cells = parsedData.body.firstElementChild!.firstElementChild!.children
            pasteContent = [];
            for (let i = 0; i < cells.length; i++) {
                const row: CellData[] = [];
                for (let j = 0; j < cells[i].children.length; j++) {
                    const data = JSON.parse(cells[i].children[j].getAttribute('data-data')!)
                    const type = cells[i].children[j].getAttribute('data-type')
                    const textValue = cells[i].children[j].innerHTML
                    row.push({ textValue: textValue, data: data, type: type! })
                }
                pasteContent.push(row)
            }
        } else {
            pasteContent = event.clipboardData.getData('text/plain').split('\n').map(line => line.split('\t').map(t => ({ textValue: t, data: t, type: 'string' })))
        }
        const cellMatrix = this.gridContext.cellMatrix
        if (pasteContent.length === 1 && pasteContent[0].length === 1) {
            activeSelectedRange.rows.forEach(row =>
                activeSelectedRange.cols.forEach(col => {
                    cellMatrix.getCell({ row, col }).trySetData(pasteContent[0][0])
                }
                )
            )
        } else {
            let lastLocation: Location
            pasteContent.forEach((row, pasteRowIdx) =>
                row.forEach((pasteValue: CellData, pasteColIdx: number) => {
                    const rowIdx = activeSelectedRange.rows[0].idx + pasteRowIdx
                    const colIdx = activeSelectedRange.cols[0].idx + pasteColIdx
                    if (rowIdx <= cellMatrix.last.row.idx && colIdx <= cellMatrix.last.col.idx) {
                        lastLocation = cellMatrix.getLocation(rowIdx, colIdx)
                        cellMatrix.getCell(lastLocation).trySetData(pasteValue)
                    }
                })
            )
            this.gridContext.setState({ selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, lastLocation!)] })
        }
        event.preventDefault()
        this.gridContext.commitChanges()
    }
    handleCut(event: ClipboardEvent): void {
        // this.grid.preventFocusChange = true;
        this.copySelectedRangeToClipboard(true)
        // this.grid.preventFocusChange = false;
        event.preventDefault()
        this.gridContext.commitChanges()
        this.gridContext.hiddenFocusElement.focus();
    }

    private copySelectedRangeToClipboard(removeValues = false) {
        const div = document.createElement('div')
        const table = document.createElement('table')
        table.setAttribute('empty-cells', 'show')
        table.setAttribute('data-key', 'dynagrid')
        const activeSelectedRange = getActiveSelectedRange(this.gridContext)
        activeSelectedRange.rows.forEach(row => {
            const tableRow = table.insertRow()
            activeSelectedRange.cols.forEach(col => {
                const tableCell = tableRow.insertCell()
                const gridCell = this.gridContext.cellMatrix.getCell({ row, col })
                tableCell.textContent = (gridCell.cellData ? gridCell.cellData.textValue : '')  // for undefined values
                if (!gridCell.cellData) {
                    tableCell.innerHTML = '<img>';
                }
                tableCell.setAttribute('data-data', JSON.stringify(gridCell.cellData.data))
                tableCell.setAttribute('data-type', gridCell.cellData.type)
                tableCell.style.border = '1px solid #D3D3D3'
                if (removeValues) { gridCell.trySetData({ textValue: '', data: '', type: 'string' }) }
            })
        })
        div.setAttribute('contenteditable', 'true')
        div.appendChild(table)
        document.body.appendChild(div)
        div.focus()
        document.execCommand('selectAll', false, undefined)
        document.execCommand('copy')
        document.body.removeChild(div)
        this.gridContext.hiddenFocusElement.focus();
    }
}
