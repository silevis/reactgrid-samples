export const x = 1
// import * as React from 'react';
// import { Behavior, State, PointerLocation } from '../Common';

// export class ResizeColumnBehavior extends Behavior {
//     private minColumnWidth: number = 40;

//     handlePointerMove(event: PointerEvent, location: PointerLocation, state: State): State {
//         const positionX = event.clientX;
//         if (positionX >= state.viewportElement!.clientWidth - state.cellMatrix.frozenRightRange.width) {
//             return {
//                 ...state,
//                 linePosition: positionX
//             }
//         } else {
//             const mousePosition = (positionX + state.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
//                 positionX + state.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
//             this.setLinePosition(mousePosition);
//         }
//     }

//     handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State {
//         const positionX = event.clientX
//         const mousePosition = (positionX + state.viewportElement!.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
//             positionX + state.viewportElement!.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
//         const newWidth = mousePosition - this.resizedColumn.left - this.frozenColumnsWidth;
//         this.setLinePosition(-1);
//         if (this.resizedColumn.onResize) {
//             this.resizedColumn.onResize(newWidth);
//         }
//     }
// }