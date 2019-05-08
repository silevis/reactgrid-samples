import * as React from 'react';
import { Range, Behavior, GridContext } from "../Common";
import { PointerEvent } from "../Common/domEvents";

// // import { DelegateBehavior } from "./DelegateBehavior";
// // import { DrawExternalFocusedLocationsBehavior } from './DefaultGridBehavior/DrawExternalFocusedLocationsBehavior';
// // import { Behavior, Column, Row, Orientation } from '../Common';
// // import { Utilities } from '../Common/Utilities';
// // import { getRowFromClientY, getColumnFromClientX, scrollIntoView } from '../Functions';

export abstract class AutoScrollBehavior implements Behavior {
    handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    }

    handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>): void {

    }
    handleCopy(event: React.ClipboardEvent<HTMLDivElement>): void {

    }
    handlePaste(event: React.ClipboardEvent<HTMLDivElement>): void {

    }
    handleCut(event: React.ClipboardEvent<HTMLDivElement>): void {

    }
    handlePointerDown(event: React.PointerEvent<HTMLDivElement>): void {

    }
    handlePointerMove(event: PointerEvent): void {

    }
    handlePointerUp(event: React.PointerEvent<HTMLDivElement>): void {

    }
    handleDoubleClick(event: React.PointerEvent<HTMLDivElement>): void {

    }
    handleContextMenu(event: PointerEvent): void {

    }
    renderPanePart(pane: Range): React.ReactNode {
        return undefined
    }
    renderGlobalPart(): React.ReactNode {
        return undefined
    }
    dispose(): void {
    }

}


// export abstract class AutoScrollBehavior implements Behavior {

//     constructor(private gridContext: GridContext, private event: MouseEvent | TouchEvent) {
//         if (event instanceof MouseEvent) {
//             window.addEventListener('mousemove', this.handleMouseMove);
//         } else {
//             window.addEventListener('touchmove', this.handleTouchMove);
//         }
//     }

//     private handleMouseMove() {

//     }

//     private handleTouchMove() {

//     }


//     dispose = () => { }

//     handleKeyDown = () => { }
//     handleKeyUp = () => { }
//     handleCopy = () => { }
//     handlePaste = () => { }
//     handleCut = () => { }
//     handleMouseDown = () => { }
//     handleClick = () => { }
//     handleTouchStart = () => { }
//     handleTouchEnd = () => { }
//     handleDoubleClick = () => { }
//     renderPanePart = (_: any) => undefined
//     renderGlobalPart = () => undefined
// }


    //     private mouseMoveHandler = this.handleMouseMove.bind(this);
//     private scrollByTop = 0;
//     private scrollByLeft = 0;
//     private timer = 0;

//     constructor(inner: Behavior, private direction: Orientation | 'both' = 'both') {
//         super(new DrawExternalFocusedLocationsBehavior(inner));

//     }

//     dispose = () => {
//         window.removeEventListener('mousemove', this.mouseMoveHandler);
//         window.removeEventListener('touchmove', this.mouseMoveHandler);
//         window.clearInterval(this.timer);
//     };

//     private handleMouseMove(event: any) {
//         const positionX =
//             event.type === 'mousemove'
//                 ? event.clientX
//                 : event.type === 'touchmove'
//                     ? event.changedTouches[0].clientX
//                     : null;
//         const positionY =
//             event.type === 'mousemove'
//                 ? event.clientY
//                 : event.type === 'touchmove'
//                     ? event.changedTouches[0].clientY
//                     : null;
//         const scrollMargin = [25, 25, 50, 25]; // top right bottom left
//         const gridElement = this.gridContext.state.gridElement;
//         const gridRect = gridElement.getBoundingClientRect();
//         const cellMatrix = this.gridContext.cellMatrix;
//         const leftScrollBorder = gridRect.left + cellMatrix.frozenLeftRange.width + scrollMargin[3];
//         const rightScrollBorder = gridElement.clientWidth - cellMatrix.frozenRightRange.width - scrollMargin[1];
//         const topScrollBorder = gridRect.top + cellMatrix.frozenTopRange.height + scrollMargin[0];
//         const bottomScrollBorder = gridRect.bottom - cellMatrix.frozenBottomRange.height - scrollMargin[2];
//         const secondRow = cellMatrix.rows[1];
//         const lastRow = cellMatrix.last.row;

//         this.scrollByLeft =
//             this.direction === 'vertical'
//                 ? 0
//                 : positionX < leftScrollBorder
//                     ? positionX - leftScrollBorder
//                     : positionX > rightScrollBorder
//                         ? positionX - rightScrollBorder
//                         : 0;
//         this.scrollByTop =
//             this.direction === 'horizontal'
//                 ? 0
//                 : positionY < topScrollBorder
//                     ? positionY - topScrollBorder
//                     : positionY > bottomScrollBorder
//                         ? positionY - bottomScrollBorder
//                         : 0;
//         if (this.direction === 'both') {
//             if (this.isSelectionFixedVertically()) {
//                 this.scrollByTop = 0;
//             }
//             if (this.isSelectionFixedHorizontally()) {
//                 this.scrollByLeft = 0;
//             }
//         }

//         if ((this.timer === 0 && this.scrollByLeft !== 0) || this.scrollByTop !== 0) {
//             window.clearInterval(this.timer);
//             this.timer = window.setInterval(() => {
//                 let nextCol = undefined;
//                 if (this.scrollByLeft !== 0) {
//                     const isLeftGreaterThanLastCol =
//                         rightScrollBorder + this.scrollByLeft + gridElement.scrollLeft >
//                         cellMatrix.scrollableRange.last.col.left;
//                     if (this.scrollByLeft > 0 && isLeftGreaterThanLastCol) {
//                         nextCol = cellMatrix.scrollableRange.last.col;
//                     } else {
//                         nextCol = cellMatrix.scrollableRange.cols.find(
//                             (c: Column) =>
//                                 c.left >=
//                                 (this.scrollByLeft > 0
//                                     ? rightScrollBorder
//                                     : leftScrollBorder >= c.width
//                                         ? -leftScrollBorder
//                                         : -c.width) +
//                                 this.scrollByLeft +
//                                 gridElement.scrollLeft
//                         );
//                     }
//                 }

//                 const hiddenHeight = gridElement.scrollHeight - gridElement.clientHeight;
//                 const topLastVisibleRow = gridElement.scrollHeight - hiddenHeight + gridElement.scrollTop;
//                 const searchedNextRow = cellMatrix.scrollableRange.rows.find((r: Row) => r.top >= topLastVisibleRow);

//                 const nextRowTop =
//                     this.scrollByTop !== 0
//                         ? this.scrollByTop < 0
//                             ? gridElement.scrollTop - -this.scrollByTop
//                             : (searchedNextRow ? searchedNextRow.top : topLastVisibleRow) + this.scrollByTop
//                         : undefined!;

//                 const nextRow =
//                     this.scrollByTop !== 0
//                         ? this.scrollByTop < 0
//                             ? nextRowTop > 0
//                                 ? cellMatrix.scrollableRange.rows
//                                     .slice()
//                                     .reverse()
//                                     .find((r: Row) => r.top < nextRowTop)
//                                 : secondRow
//                             : nextRowTop < lastRow.top
//                                 ? cellMatrix.scrollableRange.rows.find((r: Row) => r.top >= nextRowTop)
//                                 : lastRow
//                         : undefined;

//                 const scrollToCol = nextCol || (nextRow ? getColumnFromClientX(this.gridContext, positionX) : undefined);
//                 const scrollToRow = nextRow || (nextCol ? getRowFromClientY(this.gridContext, positionY) : undefined);

//                 if (scrollToCol && scrollToRow) {
//                     scrollIntoView(this.gridContext, cellMatrix.getLocation(scrollToRow.idx, scrollToCol.idx));
//                 }
//             }, 300);
//         } else if (this.timer !== 0 && this.scrollByLeft === 0 && this.scrollByTop === 0) {
//             window.clearInterval(this.timer);
//             this.timer = 0;
//         }
//     }

//     private isSelectionFixedVertically() {
//         const cellMatrix = this.gridContext.cellMatrix;
//         return (
//             (cellMatrix.frozenTopRange.rows.length &&
//                 cellMatrix.frozenTopRange.containsRange(
//                     Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//                 )) ||
//             (cellMatrix.frozenBottomRange.rows.length > 0 &&
//                 cellMatrix.frozenBottomRange.containsRange(
//                     Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//                 ))
//         );
//     }

//     private isSelectionFixedHorizontally() {
//         const cellMatrix = this.gridContext.cellMatrix;
//         return (
//             (cellMatrix.frozenLeftRange.cols.length > 0 &&
//                 cellMatrix.frozenLeftRange.containsRange(
//                     Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//                 )) ||
//             (cellMatrix.frozenRightRange.cols.length > 0 &&
//                 cellMatrix.frozenRightRange.containsRange(
//                     Utilities.getActiveSelectionRange(this.gridContext.state.selectedRanges, this.gridContext.state.focusedLocation!)
//                 ))
//         );
//     }
// }
