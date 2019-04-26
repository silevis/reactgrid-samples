export const x = 1;
// import * as React from 'react'
// import { Row, Column, Location, GridContext } from '../../Common';

// export function handleCut(gridContext: GridContext, event: React.ClipboardEvent<HTMLDivElement>) {
//         //this.grid.preventFocusChange = true;
//         copySelectedRangeToClipboard(true)
//         //this.grid.hiddenFocusElement.focus()
//         //this.grid.preventFocusChange = false;
//         event.preventDefault()
//         this.gridContext.commitChanges()
//     }

// export handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
//         // this.gridContext.preventFocusChange = true;
//         this.copySelectedRangeToClipboard()
//         this.gridContext.hiddenFocusElement.focus()
//         // this.gridContext.preventFocusChange = false;
//         event.preventDefault()
//     }

// export handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
//         const activeSelectedRange = Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//         const pasteContent = event.clipboardData.getData('text/plain').split('\n').map((line: string) => line.split('\t'))
//         const cellMatrix = this.gridContext.cellMatrix
//         if (pasteContent.length === 1 && pasteContent[0].length === 1) {
//             activeSelectedRange.rows.forEach((row: Row) =>
//                 activeSelectedRange.cols.forEach((col: Column) =>
//                     cellMatrix.getCell({ row, col }).trySetValue(pasteContent[0][0])
//                 )
//             )
//         } else {
//             let lastLocation: Location
//             pasteContent.forEach((row, pasteRowIdx) => {
//                 row.forEach((pasteValue, pasteColIdx) => {
//                     const rowIdx = activeSelectedRange.rows[0].idx + pasteRowIdx
//                     const colIdx = activeSelectedRange.cols[0].idx + pasteColIdx
//                     if (rowIdx <= cellMatrix.last.row.idx && colIdx <= cellMatrix.last.col.idx) {
//                         lastLocation = cellMatrix.getLocation(rowIdx, colIdx)
//                         cellMatrix.getCell(lastLocation).trySetValue(pasteValue ? pasteValue : undefined)
//                     }
//                 })
//             })
//             this.gridContext.setState({ selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, lastLocation!)] })
//         }
//         event.preventDefault()
//         this.gridContext.commitChanges()
//     }


// copySelectedRangeToClipboard(gridContext: GridContext, removeValues = false) {
//         const div = document.createElement('div')
//         const table = document.createElement('table')
//         table.setAttribute('empty-cells', 'show')
//         const activeSelectedRange = Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//         activeSelectedRange.rows.forEach((row: Row) => {
//             const tableRow = table.insertRow()
//             activeSelectedRange.cols.forEach((col: Column) => {
//                 const tableCell = tableRow.insertCell()
//                 const gridCell = gridContext.cellMatrix.getCell({ row, col })
//                 tableCell.textContent = (gridCell.value ? gridCell.value : '')  // for undefined values
//                 if (!gridCell.value) {
//                     tableCell.innerHTML = '<img>';
//                 }
//                 tableCell.style.border = '1px solid #D3D3D3'
//                 if (removeValues) { gridCell.trySetValue(undefined) }
//             })
//         })

//         div.setAttribute('contenteditable', 'true')
//         div.appendChild(table)
//         document.body.appendChild(div)
//         div.focus()
//         document.execCommand('selectAll', false, undefined)
//         document.execCommand('copy')
//         document.body.removeChild(div)
//     }

// }