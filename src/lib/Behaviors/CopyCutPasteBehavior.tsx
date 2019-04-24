import * as React from 'react'
import { Location } from '../Model'
import { DelegateBehavior } from "./DelegateBehavior";
import { Utilities } from '../Common/Utilities';

export class CopyCutPasteBehavior extends DelegateBehavior {

    handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {
        //this.grid.preventFocusChange = true;
        this.copySelectedRangeToClipboard(true)
        //this.grid.hiddenFocusElement.focus()
        //this.grid.preventFocusChange = false;
        event.preventDefault()
        this.grid.commitChanges()
    }

    handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
        this.grid.preventFocusChange = true;
        this.copySelectedRangeToClipboard()
        this.grid.hiddenFocusElement.focus()
        this.grid.preventFocusChange = false;
        event.preventDefault()
    }

    handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        const activeSelectedRange = Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
        const pasteContent = event.clipboardData.getData('text/plain').split('\n').map(line => line.split('\t'))
        const cellMatrix = this.grid.props.cellMatrix
        if (pasteContent.length === 1 && pasteContent[0].length === 1) {
            activeSelectedRange.rows.forEach(row =>
                activeSelectedRange.cols.forEach(col =>
                    cellMatrix.getCell({ row, col }).trySetValue(pasteContent[0][0])
                )
            )
        } else {
            let lastLocation: Location
            pasteContent.forEach((row, pasteRowIdx) =>
                row.forEach((pasteValue, pasteColIdx) => {
                    const rowIdx = activeSelectedRange.rows[0].idx + pasteRowIdx
                    const colIdx = activeSelectedRange.cols[0].idx + pasteColIdx
                    if (rowIdx <= cellMatrix.last.row.idx && colIdx <= cellMatrix.last.col.idx) {
                        lastLocation = cellMatrix.getLocation(rowIdx, colIdx)
                        cellMatrix.getCell(lastLocation).trySetValue(pasteValue ? pasteValue : undefined)
                    }
                })
            )
            this.grid.setState({ selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, lastLocation)] })
        }
        event.preventDefault()
        this.grid.commitChanges()
    }

    private copySelectedRangeToClipboard(removeValues = false) {
        const div = document.createElement('div')
        const table = document.createElement('table')
        table.setAttribute('empty-cells', 'show')
        const activeSelectedRange = Utilities.getActiveSelectionRange(this.grid.state.selectedRanges, this.grid.state.focusedLocation)
        activeSelectedRange.rows.forEach(row => {
            const tableRow = table.insertRow()
            activeSelectedRange.cols.forEach(col => {
                const tableCell = tableRow.insertCell()
                const gridCell = this.grid.props.cellMatrix.getCell({ row, col })
                tableCell.textContent = (gridCell.value ? gridCell.value : '')  // for undefined values
                if (!gridCell.value) {
                    tableCell.innerHTML = '<img>';
                }
                tableCell.style.border = '1px solid #D3D3D3'
                if (removeValues) { gridCell.trySetValue(undefined) }
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