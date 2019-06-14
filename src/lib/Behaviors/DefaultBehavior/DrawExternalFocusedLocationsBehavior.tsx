export const x = 1;
// import * as React from 'react';
// import { Behavior } from '../../Common/Behavior';
// import { DelegateBehavior } from "./DelegateBehavior";
// import { Range } from '../../Common';

// export class DrawExternalFocusedLocationsBehavior extends DelegateBehavior {
//     constructor(innerBehavior: Behavior) {
//         super(innerBehavior);
//     }

//     renderPartialAreaForPane(pane: Range) {
//         let focuses: { range: Range; color: string }[] = [];
//         for (let el of state.usersFocuses) { // ?
//             let location = state.cellMatrix.getLocation(el.rowIdx, el.colIdx);
//             let range = new Range([location.col], [location.row]);
//             let element: { range: Range; color: string } = { range: range, color: el.color };
//             focuses.push(element);
//         }
//         let result = [];
//         focuses.forEach(f => {
//             result.push([
//                 renderPartialAreaForPane(f.range, pane, {
//                     padding: '1px',
//                     backgroundColor: f.color,
//                     opacity: 0.1
//                 })
//             ]);
//         });
//         return result;
//     }

//     renderPanePart = (pane: Range): React.ReactNode => {
//         return (
//             <>
//                 {this.innerBehavior.renderPanePart(pane)}
//                 {this.renderPartialAreaForPane(pane)}
//             </>
//         );
//     };
// }
