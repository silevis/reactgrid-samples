import * as React from 'react';
import { State, PointerEvent, Range, Behavior } from "../Common";

export class DrawContextMenuBehavior extends Behavior {
    constructor(private state: State, private event: PointerEvent) {
        super();
    }

    // renderPanePart = (pane: Range): React.ReactNode => {
    //     return (
    //         <>
    //             {renderContextMenu(pane, state, this.event)}
    //         </>
    //     );
    // }
    // renderGlobalPart(): React.ReactNode {
    //     return undefined
    // }
    // dispose(): void {
    // }
}

// const renderContextMenu = (pane: Range, state: State, event: PointerEvent) => {
//     if (pane.contains(state.focusedLocation!)) {
//         return (
//             <>
//                 <div
//                     style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 900 }}
//                     onTouchStart={e => {
//                         e.stopPropagation();
//                         e.preventDefault();
//                     }}
//                     onTouchEnd={e => {
//                         e.stopPropagation();
//                     }}
//                     onContextMenu={e => contextMenuHandler(e, state)}
//                     onDoubleClick={e => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                     }}
//                     onClick={e => {
//                         e.stopPropagation();
//                         contextMenuHandler(e, state);
//                     }}
//                 />
//                 {renderCustomContextMenu(pane, state, event)}
//             </>
//         );
//     }
// }

//const renderCustomContextMenu = (pane: Range, state: State, event: PointerEvent) => {
//     // TODO
//     // const selectedRows: Range[] = state.selectRows(state.selectedRowsIdx);
//     // const options: MenuOption[] = state.props.onContextMenu(state.selectedRanges, selectedRows);
//     const clickX = event.clientX
//     const clickY = event.clientY
//     const screenW = window.innerWidth;
//     const screenH = window.innerHeight;
//     const right = screenW - clickX > 120;
//     const left = !right;
//     const top = screenH - clickY > 25;
//     const bottom = !top;
//     let stylePosition = { left: '', top: '' };
//     if (right) {
//         stylePosition.left = `${clickX + 5}px`;
//     }
//     if (left) {
//         stylePosition.left = `${clickX - 120 - 5}px`;
//     }
//     if (top) {
//         stylePosition.top = `${clickY + 5}px`;
//     }
//     if (bottom) {
//         stylePosition.top = `${clickY - 25 - 5}px`;
//     }
//     const style = { width: '80px', height: '20px', fontSize: '15px', cursor: 'pointer', overflow: 'hidden', padding: '10px 40px 10px 20px' };
//     return (
//         <div
//             style={{
//                 ...stylePosition,
//                 height: 'auto',
//                 position: 'fixed',
//                 background: 'white',
//                 boxShadow: '0 4px 5px 3px rgba(0, 0, 0, 0.2)',
//                 zIndex: 999
//             }}
//         >
//             {/* TODO */}
//             {/* {options.map((option, idx) => { return ()}} */}
//             <div
//                 className="context-menu-option"
//                 style={style}
//                 onMouseDown={e => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                 }}
//                 onClick={e => {
//                     e.stopPropagation();
//                     // option.handler();
//                     //contextMenuHandler(e, state);
//                 }}
//                 onTouchStart={e => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                 }}
//                 onTouchEnd={e => {
//                     e.stopPropagation();
//                     // option.handler();
//                 }}
//             >
//                 Option 1
//                 </div>
//         </div >
//     );
// }

// const contextMenuHandler = (e: PointerEvent, state: State) => {

//     // TODO 
//     state.forceUpdate()
//     const location = getLocationFromClient(state, e.clientX, e.clientY);
//     focusLocation(state, location);
//     if (e.button === 2) {
//         e.preventDefault();
//         changeBehavior(state, new DrawContextMenuBehavior(state, e))
//         e.persist();
//     }
// }

