export const x = 1;
// import * as React from 'react'
// import { DelegateBehavior } from "./DelegateBehavior";
// import { keyCodes } from '../../Common/Constants';

// export class SwitchCellToEditModeBehavior extends DelegateBehavior {
//     public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
//         if (!state.focusedLocation || event.ctrlKey || state.isFocusedCellReadOnly || state.cellMatrix.getCell(state.focusedLocation).type === FieldTypes.checkbox) {
//             return this.innerBehavior.handleKeyDown(event);
//         }

//         if (!state.isFocusedCellInEditMode) {
//             const cellMatrix = state.cellMatrix
//             const cell = cellMatrix.getCell(state.focusedLocation)

//             if (navigator.userAgent.match(/Android/i)) {
//                 var keyCode = event.keyCode || event.which;
//                 if (keyCode === 0 || keyCode === 229) {
//                     return { isFocusedCellInEditMode: true })
//                 }
//             } else {
//                 if ((event.keyCode >= keyCodes.ZERO && event.keyCode <= keyCodes.Z) || (event.keyCode >= keyCodes.NUM_PAD_0 && event.keyCode <= keyCodes.DIVIDE) || (event.keyCode >= keyCodes.SEMI_COLON && event.keyCode <= keyCodes.SINGLE_QUOTE) || event.keyCode === keyCodes.SPACE) {
//                     if (cell.validateValue && !cell.validateValue(event.keyCode)) {
//                         event.preventDefault()
//                     }
//                     return { isFocusedCellInEditMode: true })
//                     return;
//                 }
//             }
//         } return this.innerBehavior.handleKeyDown(event);

//     }
// }