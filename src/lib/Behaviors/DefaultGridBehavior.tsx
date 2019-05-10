import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Range, Location } from "../Common";
import { keyDownHandlers } from "./DefaultGridBehavior/keyDownHandlers";
import { keyUpHandlers } from "./DefaultGridBehavior/keyUpHandler";
import { changeBehavior } from "../Functions";
import { CellSelectionBehavior } from "./CellSelectionBehavior";
import { DrawContextMenuBehavior } from "../Components/ContextMenu";

export class DefaultGridBehavior extends Behavior {

    constructor(private gridContext: GridContext) { super(); }

    handlePointerDown(event: PointerEvent, location: Location) {
        // changing behavior will disable all keyboard event handlers
        const cellSelectionBehavior = new CellSelectionBehavior(this.gridContext);
        changeBehavior(this.gridContext, cellSelectionBehavior);
        cellSelectionBehavior.handlePointerDown(event, location);
    }

    handleContextMenu(event: PointerEvent): void {
        event.preventDefault();
        changeBehavior(this.gridContext, new DrawContextMenuBehavior(this.gridContext, event))
        event.persist();
    }

    handlePointerMove(event: PointerEvent, location: Location): void {

    }

    handlePointerUp(event: PointerEvent, location: Location): void {
    }

    handleDoubleClick(event: PointerEvent, location: Location): void {
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
}