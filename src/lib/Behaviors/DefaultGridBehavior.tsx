import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent } from "../Common";
import { pointerDownHandler } from "./DefaultGridBehavior/pointerDownHandler";
export class DefaultGridBehavior implements Behavior {

    constructor(private gridContext: GridContext) { }

    handlePointerDown(event: PointerEvent): void {
        pointerDownHandler(this.gridContext, event);
    }

    handlePointerMove(event: PointerEvent): void {
        console.log('move');
    }

    handlePointerUp(event: PointerEvent): void {
        console.log('up');
    }

    handleDoubleClick(event: PointerEvent): void {
        console.log('double');
    }

    handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
    }
    handleKeyUp(event: KeyboardEvent): void {
        event.preventDefault();
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
        // <FillHandle pane={pane} />
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