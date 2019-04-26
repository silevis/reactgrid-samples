import * as React from "react";
import { GridContext, Behavior } from "../Common";
import { handleCut } from "./DefaultGridBehavior/copyCutPasteHandlers";

export class DefaultGridBehavior implements Behavior {
    constructor(private gridContext: GridContext) { }

    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    }
    handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>): void {
    }
    handleCopy(event: React.ClipboardEvent<HTMLDivElement>): void {
    }
    handlePaste(event: React.ClipboardEvent<HTMLDivElement>): void {
    }
    handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => handleCut(this.gridContext, event);

    handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    }
    handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    }
    handleTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
    }
    handleTouchEnd(event: React.TouchEvent<HTMLDivElement>): void {
    }
    handleDoubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    }


    renderPanePart(pane: import("../Common").Range): React.ReactNode {
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