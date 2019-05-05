import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent } from "../Common";
// import { pointerDownHandler } from "./DefaultGridBehavior/pointerDownHandler";
import { keyDownHandlers } from "./DefaultGridBehavior/keyDownHandlers";
import { keyUpHandlers } from "./DefaultGridBehavior/keyUpHandler";
import { focusLocation, getLocationFromClient } from "../Functions";
import { selectRange } from "../Functions/selectRange";


export class DefaultGridBehavior implements Behavior {

    constructor(private gridContext: GridContext) { }

    handlePointerDown(event: PointerEvent): void {
        const location = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        if (event.shiftKey && this.gridContext.state.focusedLocation) {
            const range = this.gridContext.cellMatrix.getRange(this.gridContext.state.focusedLocation, location);
            selectRange(this.gridContext, range);
        } else if (event.ctrlKey) {

            focusLocation(this.gridContext, location)

        } else {
            focusLocation(this.gridContext, location);
        }
        //pointerDownHandler(this.gridContext, event);
    }

    handlePointerMove(event: PointerEvent): void {
        // TODO move this to cell selection behavior to disable all other events while moving
        // pointerMoveHandler(this.gridContext, event);
    }

    handlePointerUp(event: PointerEvent): void {
        console.log('up');
    }

    handleDoubleClick(event: PointerEvent): void {
        console.log('double');
    }

    handleKeyDown = (event: KeyboardEvent) => {
        console.log('key down')
        keyDownHandlers(this.gridContext, event)
    }
    handleKeyUp(event: KeyboardEvent): void {
        console.log('key up');
        keyUpHandlers(this.gridContext, event)
    }
    handleCopy(event: ClipboardEvent): void {
        event.preventDefault();
    }
    handlePaste(event: ClipboardEvent): void {
        event.preventDefault();
    }
    handleCut(event: ClipboardEvent): void {
        event.preventDefault();
    }


    renderPanePart(_pane: import("../Common").Range): React.ReactNode {
        // <FillHandle pane={pane} />y
        return <>

        </>
    }

    renderGlobalPart(): React.ReactNode {
        return <>

        </>
    }

    dispose(): void {
    }


}