// import * as React from 'react';
// import { Behavior } from '../Common/Behavior';
// import { DelegateBehavior } from "./DelegateBehavior";
// import { Range } from '../Common';
// import { PartialArea } from './PartialArea';

// export class DrawSelectionBehavior extends DelegateBehavior {
//     constructor(inner: Behavior) {
//         super(inner);
//     }

//     renderPanePart = (pane: Range): React.ReactNode => {
//         return (
//             <>
//                 {this.innerBehavior.renderPanePart(pane)}
//                 {this.gridContext.state.selectedRanges.map(range => <PartialArea pane={pane} area={range} style={{ border: '1px solid #3579f8', backgroundColor: 'rgba(53, 121, 248, 0.1)' }} />)}
//             </>
//         );
//     };
// }
