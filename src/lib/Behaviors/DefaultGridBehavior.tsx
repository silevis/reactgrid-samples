import * as React from "react";
import { GridContext, Behavior } from "../Common";
import { handleMouseDown } from "./DefaultGridBehavior/mouseDownHandler";
// import { handleCut } from "./DefaultGridBehavior/copyCutPasteHandlers";

export class DefaultGridBehavior implements Behavior {
    constructor(private gridContext: GridContext) { }

    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>): void {
        event.preventDefault();
    }
    handleCopy(event: React.ClipboardEvent<HTMLDivElement>): void {
        event.preventDefault();
    }
    handlePaste(event: React.ClipboardEvent<HTMLDivElement>): void {
        event.preventDefault();
    }
    handleCut(event: React.ClipboardEvent<HTMLDivElement>): void {
        event.preventDefault();
    }

    handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        handleMouseDown(this.gridContext, event);
    }
    handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
    }
    handleTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
        event.preventDefault();
    }
    handleTouchEnd(event: React.TouchEvent<HTMLDivElement>): void {
        event.preventDefault();
    }
    handleDoubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        this.gridContext;
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