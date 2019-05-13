// import * as React from 'react';
// import { Behavior } from '../Common';
// import { DelegateBehavior } from "../Behaviors/DelegateBehavior";
// import { FillHandleBehavior } from '../Behaviors/FillHandleBehavior';
// import { changeBehavior } from '../Functions';
// import { Range } from '../Common';

import * as React from "react";
import { Location, GridContext } from "../Common";
import { changeBehavior } from "../Functions";
import { FillHandleBehavior } from "../Behaviors/FillHandleBehavior";

interface FillHandleProps {
    gridContext: GridContext,
    location: Location
}

export const FillHandle: React.FunctionComponent<FillHandleProps> = (props) =>
    <div
        className="dg-fill-handle"
        style={{
            position: 'absolute',
            top: props.location.row.bottom,
            left: props.location.col.right,
            marginTop: -4,
            marginLeft: -4,
            width: 4.2,
            height: 4.5,
            backgroundColor: '#3579f8',
            border: '1px solid white',
            cursor: 'crosshair',
        }}
        data-cy="dg-fill-handle"
        onPointerDown={() => changeBehavior(props.gridContext, new FillHandleBehavior(props.gridContext))}
    >
    </div>


// export class DrawFillHandleBehavior extends DelegateBehavior {
//     isVisible = true;

//     constructor(inner: Behavior, isVisible?: boolean) {
//         super(inner);
//         if (isVisible !== undefined) {
//             this.isVisible = isVisible;
//         }
//     }
//     private renderFillHandle(pane: Range) {
//         const activeSelectedRange = Utilities.getActiveSelectionRange(
//             this.gridContext.state.selectedRanges,
//             this.gridContext.state.focusedLocation
//         );
//         if (
//             !activeSelectedRange ||
//             !pane.contains(activeSelectedRange.last) ||
//             this.gridContext.state.isFocusedCellInEditMode ||
//             this.gridContext.state.isFocusedCellReadOnly
//         ) {
//             return;
//         }

//         const focusedCell = this.gridContext.state.focusedLocation!;
//         const row = activeSelectedRange.last;
//         // const first = this.grid.state.selectedRange.firstCell
//         const onFocus = row.col.idx === focusedCell.col.idx && row.row.idx === focusedCell.row.idx;
//         const left = row.col.left + row.col.width - (onFocus ? 5.5 : 4.5);
//         const top = row.row.top + row.row.height - (onFocus ? 5.5 : 4.5);
//         return (
//             <div
//                 data-cy="touch-fill-handle"
//                 onTouchStart={e => {
//                     changeBehavior(this.gridContext, new DrawFillHandleBehavior(new FillHandleBehavior(this.gridContext, e), false));
//                     e.stopPropagation();
//                 }}
//                 onTouchEnd={() => (this.isVisible = true)}
//                 style={{
//                     position: 'absolute',
//                     top: top - 10,
//                     left: left - 10,
//                     width: 20,
//                     height: 20
//                 }}
//             >
//                 <div
//                     className="fillHandle"
//                     data-cy="fillHandle"
//                     onMouseDown={e => {
//                         changeBehavior(this.gridContext, new FillHandleBehavior(this.gridContext, e));
//                         e.stopPropagation();
//                     }}
//                     style={{
//                         display: !this.isVisible ? 'none' : 'block',
//                         position: 'absolute',
//                         top: 9,
//                         left: 9,
//                         width: 6,
//                         height: 6,
//                         backgroundColor: '#3579f8',
//                         border: '1px solid white',
//                         cursor: 'crosshair'
//                     }}
//                 />
//             </div>
//         );
//     }

//     renderPanePart = (pane: Range): React.ReactNode => {
//         return (
//             <>
//                 {this.innerBehavior.renderPanePart(pane)}
//                 {this.renderFillHandle(pane)}
//             </>
//         );
//     };
// }
