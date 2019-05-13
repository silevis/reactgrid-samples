import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Range, Location, keyCodes } from "../Common";
import { handleKeyDown as handleKeyDown } from "./DefaultBehavior/handleKeyDown";
import { changeBehavior } from "../Functions";
import { CellSelectionBehavior } from "./CellSelectionBehavior";

export class DefaultBehavior extends Behavior {

    constructor(private gridContext: GridContext) { super(); }

    handlePointerDown(event: PointerEvent, location: Location) {
        // changing behavior will disable all keyboard event handlers
        const cellSelectionBehavior = new CellSelectionBehavior(this.gridContext);
        changeBehavior(this.gridContext, cellSelectionBehavior);
        cellSelectionBehavior.handlePointerDown(event, location);
    }

    handleContextMenu(event: PointerEvent): void {
        event.preventDefault();
        //changeBehavior(this.gridContext, new DrawContextMenuBehavior(this.gridContext, event))
        //event.persist();
    }

    handlePointerMove(event: PointerEvent, location: Location): void {

    }

    handlePointerUp(event: PointerEvent, location: Location): void {
    }

    handleDoubleClick(event: PointerEvent, location: Location): void {
        console.log('double');
    }

    handleKeyDown(event: KeyboardEvent) {
        handleKeyDown(this.gridContext, event)
    }
    handleKeyUp(event: KeyboardEvent): void {
        if (event.keyCode === keyCodes.TAB || event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

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