import * as React from 'react';
import { getLocationFromClient, resetToDefaultBehavior } from '../Functions';
import { GridContext, Range } from '../Common';
import { updateCellSelection } from './DefaultGridBehavior/pointerMoveHandler';
import { CellFocus } from '../Components/CellFocus';
// import { Utilities } from '../Common/Utilities';
// import { focusLocation, getLocationFromClient, resetToDefaultBehavior, isClickInsideSelectedRange } from '../Functions';
// import { Location, CellMatrix, GridContext, Behavior } from '../Common';
// import { isClickOutOfGrid } from '../Functions/isClickOutOfGrid';
// // import { AutoScrollBehavior } from './AutoScrollBehavior';



// // export let userIsMarkingGrid: boolean = false;

export class CellSelectionBehavior { //extends AutoScrollBehavior {
    constructor(private gridContext: GridContext) {}

    handlePointerMove(event: PointerEvent) {
        const location = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        if (location.col === undefined || location.row === undefined) { return }
        updateCellSelection(this.gridContext, event.clientX, event.clientY);
    }

    handlePointerUp() {
        resetToDefaultBehavior(this.gridContext);
    }

    dispose() { }

    renderPanePart(pane: Range): React.ReactNode {
        const focusedLocation = this.gridContext.state.focusedLocation;
        return focusedLocation && pane.contains(focusedLocation) && <CellFocus location={focusedLocation} />
    }

    // handlePointerMove {

    // }

//     private clientX = 0; // for gridScrollHandler!
//     private clientY = 0;
//     private touch: boolean = false;

//     private moveHandler = this.handleMove.bind(this);

//     constructor(private gridContext: GridContext) {
//         //super();

//         // const positionX =
//         //     event.type === 'mousedown' || event.type === 'click'
//         //         ? event.clientX
//         //         : event.type === 'touchstart'
//         //             ? event.changedTouches[0].clientX
//         //             : null;
//         // const positionY =
//         //     event.type === 'mousedown' || event.type === 'click'
//         //         ? event.clientY
//         //         : event.type === 'touchstart'
//         //             ? event.changedTouches[0].clientY
//         //             : null;

//         // this.clientX = positionX;
//         // this.clientY = positionY;

//         //if (touch) {
//             // this.touch = touch;
//             // if (event.type === 'click') {
//             //     this.handleMouseDownAndClick(event);
//             // } else if (event.type === 'touchstart') {
//             //     window.addEventListener('touchmove', this.moveHandler);
//             //     window.addEventListener('touchend', this.touchEndHandler);
//             //     gridContext.state.gridElement.addEventListener('scroll', this.gridScrollHandler);
//             // }
//         //} else {
//          //   this.handleMouseDownAndClick(event);

//             // if (event.shiftKey && gridContext.state.focusedLocation) {
//             //     this.updateCellSelection();
//             // }

//             gridContext.state.gridElement.addEventListener('scroll', this.gridScrollHandler);
//         }
//     }

//     dispose = () => {
//         // this.gridContext.state.currentBehavior.dispose();
//         // window.removeEventListener('mousemove', this.moveHandler);
//         // window.removeEventListener('mouseup', this.mouseUpHandler);
//         // window.removeEventListener('touchmove', this.moveHandler);
//         // window.removeEventListener('touchend', this.touchEndHandler);
//         // this.gridContext.state.gridElement.removeEventListener('scroll', this.gridScrollHandler);
//     };

//     // handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     // const location: Location = getLocationFromClient(this.gridContext, e.clientX, e.clientY);
//     // if (this.gridContext.state.isFocusedCellInEditMode /*|| this.grid.state.isFocusedCellReadOnly*/) {
//     //     e.preventDefault();
//     //     e.stopPropagation();
//     // } else {
//     //     if (
//     //         this.gridContext.state.focusedLocation &&
//     //         this.gridContext.state.focusedLocation.col.idx === location.col.idx &&
//     //         this.gridContext.state.focusedLocation.row.idx === location.row.idx
//     //     ) {
//     //         setTimeout(() => this.gridContext.setState({ isFocusedCellInEditMode: true }));
//     //     }
//     // }
//     // };

//     private handleMouseDownAndClick = (event: any) => {
//         const locationOfCell = getLocationFromClient(this.gridContext, this.clientX, this.clientY);
//         const cellMatrix = this.gridContext.cellMatrix;

//         if (event.type === 'mousedown') {
//             if (event.button === 2) {
//                 // right button of mouse
//                 if (isClickInsideSelectedRange(this.gridContext, event)) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                     focusLocation(this.gridContext, locationOfCell, false);
//                     return;
//                 } else if (!event.shiftKey) {
//                     if (isClickOutOfGrid(this.gridContext, this.clientX, this.clientY)) {
//                     } else {
//                         this.setFocusLocation(this.clientX, this.clientY);
//                     }
//                 }
//             } else {
//                 event.preventDefault();
//                 event.stopPropagation();
//                 if (!event.shiftKey) {
//                     this.selectCellOrRowOrColumn({ event, locationOfCell, cellMatrix });
//                 }
//             }

//             window.addEventListener('mousemove', this.moveHandler);
//             window.addEventListener('mouseup', this.mouseUpHandler);
//         } else if (event.type === 'click') {
//             // this.selectCellOrRowOrColumn({ event, locationOfCell, cellMatrix });
//         }
//     };

//     private selectCellOrRowOrColumn({ event, locationOfCell, cellMatrix }: { event: any; locationOfCell: Location; cellMatrix: CellMatrix; }) {
//         if (this.selectionType === 'cell') {
//             this.setFocusLocation(this.clientX, this.clientY, event.ctrlKey);
//         } else if (this.selectionType === 'row') {
//             const range = this.gridContext.cellMatrix.getRange(locationOfCell, {
//                 row: locationOfCell.row,
//                 col: cellMatrix.cols[cellMatrix.cols.length - 1]
//             });
//             // let selectedRowsIdx: number[] = this.gridContext.state.selectedRowsIdx;
//             if (event.type === 'mousedown') {
//                 if (event.ctrlKey) {
//                     // this.toggleRow(event, selectedRowsIdx, locationOfCell, cellMatrix, range);
//                 } else {
//                     // selectedRowsIdx = [];
//                     // selectedRowsIdx.push(locationOfCell.row.idx);
//                     this.gridContext.setState({
//                         // selectedRowsIdx,
//                         focusedLocation: locationOfCell,
//                         selectedRanges: [range]
//                     });
//                 }
//             } else if (event.type === 'click') {
//                 // this.toggleRow(event, selectedRowsIdx, locationOfCell, cellMatrix, range);
//             }
//         } else if (this.selectionType === 'column') {
//             const range = cellMatrix.getRange(locationOfCell, {
//                 row: cellMatrix.rows[cellMatrix.rows.length - 1],
//                 col: locationOfCell.col
//             });
//             // let selectedColsIdx: number[] = this.gridContext.state.selectedColsIdx;
//             if (event.type === 'mousedown') {
//                 if (event.ctrlKey) {
//                     // this.toggleColumn(event, selectedColsIdx, locationOfCell, cellMatrix, range);
//                 } else {
//                     // selectedColsIdx = [];
//                     // selectedColsIdx.push(locationOfCell.col.idx);
//                     this.gridContext.setState({
//                         // selectedColsIdx,
//                         focusedLocation: locationOfCell,
//                         selectedRanges: [range]
//                     });
//                 }
//             } else if (event.type === 'click') {
//                 // this.toggleColumn(event, selectedColsIdx, locationOfCell, cellMatrix, range);
//             }
//         }
//         if (event.type === 'click') {
//             setTimeout(() => resetToDefaultBehavior(this.gridContext));
//         }
//     }

//     // private toggleRow(
//     //     event: any,
//     //     selectedRowsIdx: number[],
//     //     locationOfCell: Location,
//     //     cellMatrix: CellMatrix,
//     //     range: any
//     // ) {
//     //     if (selectedRowsIdx.some(idx => idx === locationOfCell.row.idx)) {
//     //         if (selectedRowsIdx.length > 1) {
//     //             selectedRowsIdx = selectedRowsIdx.filter(r => r !== locationOfCell.row.idx);
//     //             this.gridContext.setState({
//     //                 // selectedRowsIdx,
//     //                 focusedLocation: cellMatrix.getLocation(selectedRowsIdx[selectedRowsIdx.length - 1], 0),
//     //                 selectedRanges: this.gridContext.state.selectedRanges.filter(
//     //                     r => r.first.row.idx !== locationOfCell.row.idx
//     //                 )
//     //             });
//     //         }
//     //     } else {
//     //         selectedRowsIdx.push(locationOfCell.row.idx);
//     //         const selectedRanges =
//     //             event.type === 'click'
//     //                 ? selectedRowsIdx.length === 1
//     //                     ? [].concat(range)
//     //                     : this.gridContext.state.selectedRanges.concat(range)
//     //                 : this.gridContext.state.selectedRanges.concat(range);
//     //         this.gridContext.setState({
//     //             // selectedRowsIdx,
//     //             focusedLocation: locationOfCell,
//     //             selectedRanges
//     //         });
//     //     }
//     // }

//     // private toggleColumn(
//     //     event: any,
//     //     selectedColsIdx: number[],
//     //     locationOfCell: Location,
//     //     cellMatrix: CellMatrix,
//     //     range: any
//     // ) {
//     //     if (selectedColsIdx.some(idx => idx === locationOfCell.col.idx)) {
//     //         if (selectedColsIdx.length > 1) {
//     //             selectedColsIdx = selectedColsIdx.filter(r => r !== locationOfCell.col.idx);
//     //             this.gridContext.setState({
//     //                 // selectedColsIdx,
//     //                 focusedLocation: cellMatrix.getLocation(0, selectedColsIdx[selectedColsIdx.length - 1]),
//     //                 selectedRanges: this.gridContext.state.selectedRanges.filter(
//     //                     r => r.first.col.idx !== locationOfCell.col.idx
//     //                 )
//     //             });
//     //         }
//     //     } else {
//     //         selectedColsIdx.push(locationOfCell.col.idx);
//     //         const selectedRanges =
//     //             event.type === 'click'
//     //                 ? selectedColsIdx.length === 1
//     //                     ? [].concat(range)
//     //                     : this.gridContext.state.selectedRanges.concat(range)
//     //                 : this.gridContext.state.selectedRanges.concat(range);
//     //         this.gridContext.setState({
//     //             // selectedColsIdx,
//     //             focusedLocation: locationOfCell,
//     //             selectedRanges
//     //         });
//     //     }
//     // }

//     private mouseUpHandler = () => {
//         resetToDefaultBehavior(this.gridContext);
//     };
//     private touchEndHandler = () => {
//         const activeSelectedRange = Utilities.getActiveSelectionRange(
//             this.gridContext.state.selectedRanges,
//             this.gridContext.state.focusedLocation!
//         );
//         if (activeSelectedRange.rows.length > 1 || activeSelectedRange.cols.length > 1) {
//             // userIsMarkingGrid = false;
//         }
//         resetToDefaultBehavior(this.gridContext);
//     };
//     private gridScrollHandler = () => this.updateCellSelection();

//     private handleMove(event: any) {
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
//         const location = getLocationFromClient(this.gridContext, positionX, positionY);

//         this.clientX = positionX;
//         this.clientY = positionY;

//         if (location.col === undefined || location.row === undefined) {
//             return;
//         }

//         if (this.selectionType === 'cell') {
//             this.updateCellSelection();
//         }
//     }

//     private setFocusLocation(positionX: number, positionY: number, ctrlKeyPressed: boolean = false) {
//         let focusedLocation = getLocationFromClient(this.gridContext, positionX, positionY);

//         if (
//             this.gridContext.state.focusedLocation &&
//             this.gridContext.state.focusedLocation.col.idx === focusedLocation.col.idx &&
//             this.gridContext.state.focusedLocation.row.idx === focusedLocation.row.idx
//         ) {
//             if (this.gridContext.state.isFocusedCellInEditMode) {
//                 return;
//             }
//         } else {
//             focusLocation(this.gridContext, focusedLocation, !ctrlKeyPressed);
//             if (ctrlKeyPressed) {
//                 if (!Utilities.isFocusedLocationInsideSelectedRanges(this.gridContext.state.selectedRanges, focusedLocation)) {
//                     this.gridContext.setState({
//                         // selectedRowsIdx: [],
//                         // selectedColsIdx: [],
//                         selectedRanges: this.gridContext.state.selectedRanges.concat([
//                             this.gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)
//                         ])
//                     });
//                 }
//             } else {
//                 this.gridContext.setState({
//                     focusedLocation,
//                     // selectedRowsIdx: [],
//                     // selectedColsIdx: [],
//                     selectedRanges: [this.gridContext.cellMatrix.getRange(focusedLocation, focusedLocation)]
//                 });
//             }
//         }
//     }

//     private updateCellSelection() {
//         const cellMatrix = this.gridContext.cellMatrix;
//         const cellUnderCursor = getLocationFromClient(this.gridContext, this.clientX, this.clientY, true);
//         if (this.touch) {
//             // userIsMarkingGrid = true;
//         }
//         if (this.gridContext.state.focusedLocation && !isClickOutOfGrid(this.gridContext, this.clientX, this.clientY)) {
//             const activeSelectedRange = cellMatrix.getRange(cellUnderCursor, this.gridContext.state.focusedLocation);
//             const selectedRanges = this.gridContext.state.selectedRanges.map(range =>
//                 range.contains(this.gridContext.state.focusedLocation!) ? activeSelectedRange : range
//             );
//             this.gridContext.setState({ selectedRanges: selectedRanges });
//         }
//     }
}
