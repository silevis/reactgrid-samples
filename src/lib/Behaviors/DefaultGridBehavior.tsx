import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Range } from "../Common";
import { keyDownHandlers } from "./DefaultGridBehavior/keyDownHandlers";
import { keyUpHandlers } from "./DefaultGridBehavior/keyUpHandler";
import { changeBehavior } from "../Functions";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { DrawContextMenuBehavior } from "../Components/ContextMenu";
import { Utilities } from "../Common/Utilities";

export class DefaultGridBehavior implements Behavior {

    constructor(private gridContext: GridContext) { }

    handlePointerDown(event: PointerEvent) {
        // changing behavior will disable all keyboard event handlers
        const cellSelectionBehavior = new CellSelectionBehavior(this.gridContext);
        changeBehavior(this.gridContext, cellSelectionBehavior);
        cellSelectionBehavior.handlePointerDown(event);
    }

    handleContextMenu(event: PointerEvent): void {
        event.preventDefault();
        changeBehavior(this.gridContext, new DrawContextMenuBehavior(this.gridContext, event))
        event.persist();
    }

    handlePointerMove(event: PointerEvent): void {

    }

    handlePointerUp(event: PointerEvent): void {
    }

    handleDoubleClick(event: PointerEvent): void {
        console.log('double');
    }

    handleKeyDown(event: KeyboardEvent) {
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

    renderPanePart(pane: Range): React.ReactNode {
        return <></>
    }

    renderGlobalPart(): React.ReactNode {
        return <></>
    }

    dispose(): void {
    }


}