import * as React from 'react';
import { GridContext, PointerEvent, Range, Behavior } from "../Common";
import { getLocationFromClient, focusLocation, changeBehavior } from "../Functions";

export class DrawContextMenuBehavior extends Behavior {
    constructor(private gridContext: GridContext, private event: PointerEvent) {
        super();
    }

    // renderPanePart = (pane: Range): React.ReactNode => {
    //     return (
    //         <>
    //             {renderContextMenu(pane, this.gridContext, this.event)}
    //         </>
    //     );
    // }
    // renderGlobalPart(): React.ReactNode {
    //     return undefined
    // }
    // dispose(): void {
    // }
}

// const renderContextMenu = (pane: Range, gridContext: GridContext, event: PointerEvent) => {
//     if (pane.contains(gridContext.state.focusedLocation!)) {
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
//                     onContextMenu={e => contextMenuHandler(e, gridContext)}
//                     onDoubleClick={e => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                     }}
//                     onClick={e => {
//                         e.stopPropagation();
//                         contextMenuHandler(e, gridContext);
//                     }}
//                 />
//                 {renderCustomContextMenu(pane, gridContext, event)}
//             </>
//         );
//     }
// }

const renderCustomContextMenu = (pane: Range, gridContext: GridContext, event: PointerEvent) => {
    // TODO
    // const selectedRows: Range[] = this.gridContext.selectRows(this.gridContext.state.selectedRowsIdx);
    // const options: MenuOption[] = this.gridContext.props.onContextMenu(this.gridContext.state.selectedRanges, selectedRows);
    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const right = screenW - clickX > 120;
    const left = !right;
    const top = screenH - clickY > 25;
    const bottom = !top;
    let stylePosition = { left: '', top: '' };
    if (right) {
        stylePosition.left = `${clickX + 5}px`;
    }
    if (left) {
        stylePosition.left = `${clickX - 120 - 5}px`;
    }
    if (top) {
        stylePosition.top = `${clickY + 5}px`;
    }
    if (bottom) {
        stylePosition.top = `${clickY - 25 - 5}px`;
    }
    const style = { width: '80px', height: '20px', fontSize: '15px', cursor: 'pointer', overflow: 'hidden', padding: '10px 40px 10px 20px' };
    return (
        <div
            style={{
                ...stylePosition,
                height: 'auto',
                position: 'fixed',
                background: 'white',
                boxShadow: '0 4px 5px 3px rgba(0, 0, 0, 0.2)',
                zIndex: 999
            }}
        >
            {/* TODO */}
            {/* {options.map((option, idx) => { return ()}} */}
            <div
                className="context-menu-option"
                style={style}
                onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onClick={e => {
                    e.stopPropagation();
                    // option.handler();
                    //contextMenuHandler(e, gridContext);
                }}
                onTouchStart={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onTouchEnd={e => {
                    e.stopPropagation();
                    // option.handler();
                }}
            >
                Option 1
                </div>
        </div >
    );
}

const contextMenuHandler = (e: PointerEvent, gridContext: GridContext) => {

    // TODO 
    gridContext.forceUpdate()
    const location = getLocationFromClient(gridContext, e.clientX, e.clientY);
    focusLocation(gridContext, location);
    if (e.button === 2) {
        e.preventDefault();
        changeBehavior(gridContext, new DrawContextMenuBehavior(gridContext, e))
        e.persist();
    }
}

