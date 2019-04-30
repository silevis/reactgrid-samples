import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent } from "../Common";
import { pointerDownHandler } from "./DefaultGridBehavior/pointerDownHandler";
import { pointerMoveHandler } from "./DefaultGridBehavior/pointerMoveHandler";
import { keyDownHandlers } from "./DefaultGridBehavior/keyDownHandlers";
import { keyUpHandlers } from "./DefaultGridBehavior/keyUpHandler";
export class DefaultGridBehavior implements Behavior {

    constructor(private gridContext: GridContext) { }

    handlePointerDown(event: PointerEvent, selectionMode: string): void {
        pointerDownHandler(this.gridContext, event, selectionMode);
    }

    handlePointerMove(event: PointerEvent): void {
        pointerMoveHandler(this.gridContext, event);
    }

    handlePointerUp(event: PointerEvent): void {
        console.log('up');
    }

    handleDoubleClick(event: PointerEvent): void {
        console.log('double');
    }

    handleKeyDown = (event: KeyboardEvent) => {
        keyDownHandlers(this.gridContext, event)
    }
    handleKeyUp(event: KeyboardEvent): void {
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