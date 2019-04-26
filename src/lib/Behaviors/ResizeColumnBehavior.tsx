export const x = 1;
// import { DelegateBehavior } from "./DelegateBehavior";
// import { BasicGridBehavior } from './BasicGridBehavior'
// import { DrawExternalFocusedLocationsBehavior } from './DefaultGridBehavior/DrawExternalFocusedLocationsBehavior';
// import { Column } from '../Common';
// import { resetToDefaultBehavior } from '../Functions';
// import { Grid } from "../Components/Grid";
// import { LineAndShadow } from "../Components/LineAndShadow";

// export class ResizeColumnBehavior extends DelegateBehavior {
//     private moveHandler = this.handleMove.bind(this);
//     private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this);
//     private minColumnWidth: number = 40;
//     private frozenColumnsWidth: number;
//     private setLinePosition: (position: number) => void = _ => { };

//     constructor(grid: Grid, private resizedColumn: Column, event: any) {
//         super(new DrawExternalFocusedLocationsBehavior(new BasicGridBehavior(grid)))
//         // doesn't seem like a best way to do that...
//         this.frozenColumnsWidth = grid.props.cellMatrix.frozenLeftRange.width;

//         // this.gridContext.setState({ linePosition: resizedColumn.left + resizedColumn.width + this.frozenColumnsWidth, lineOrientation: 'vertical' })

//         if (event.type === 'mousedown') {
//             window.addEventListener('mousemove', this.moveHandler);
//             window.addEventListener('mouseup', this.mouseUpAndTouchEndHandler);
//         } else if (event.type === 'touchstart') {
//             window.addEventListener('touchmove', this.moveHandler);
//             window.addEventListener('touchend', this.mouseUpAndTouchEndHandler);
//         }
//     }

//     handleMove(event: any) {
//         const positionX = event.type === 'mousemove' ? event.clientX : event.type === 'touchmove' ? event.changedTouches[0].clientX : null
//         if ((positionX) >= this.gridContext.state.gridElement.clientWidth - this.gridContext.cellMatrix.frozenRightRange.width) {
//             this.setLinePosition(positionX);
//         } else {
//             const mousePosition = (positionX + this.gridContext.state.gridElement.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
//                 positionX + this.gridContext.state.gridElement.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
//             this.setLinePosition(mousePosition);
//         }
//     }

//     private handleMouseUpAndTouchEnd(event: any) {
//         const positionX = event.type === 'mouseup' ? event.clientX : event.type === 'touchend' ? event.changedTouches[0].clientX : null;
//         const mousePosition = (positionX + this.gridContext.state.gridElement.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
//             positionX + this.gridContext.state.gridElement.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
//         const newWidth = mousePosition - this.resizedColumn.left - this.frozenColumnsWidth;
//         resetToDefaultBehavior(this.gridContext);
//         this.setLinePosition(-1);
//         if (this.resizedColumn.onColResize) {
//             this.resizedColumn.onColResize(this.resizedColumn, newWidth);
//         }
//         this.gridContext.commitChanges()
//         if (event.type === 'mouseup') {
//             window.removeEventListener('mousemove', this.moveHandler);
//             window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler);
//         } else if (event.type === 'touchend') {
//             window.removeEventListener('touchmove', this.moveHandler);
//             window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler);
//         }
//     }

//     // tslint:disable:member-ordering
//     renderGlobalPart = () => {
//         return (
//             <>
//                 {this.innerBehavior.renderGlobalPart()}
//                 <LineAndShadow 
//                     onInitialized={linePostion => { 
//                         this.setLinePosition = linePostion; 
//                     }} 
//                     isVertical={true} 
//                     cellMatrix={this.gridContext.cellMatrix}
//                 />
//             </>
//         );
//     }
// }