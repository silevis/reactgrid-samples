import * as React from "react";
import { Range, PointerLocation } from "./";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "./domEvents";
import { Direction } from "./PublicModel";

// IMPORTANT !! PLEASE DO NOT INTRODUCE CHANGE WITHOUT TALKING TO ARCHITECT !!
export abstract class Behavior {
    handleKeyDown(event: KeyboardEvent): void { }
    handleKeyUp(event: KeyboardEvent): void { }
    handleCopy(event: ClipboardEvent): void { }
    handlePaste(event: ClipboardEvent): void { }
    handleCut(event: ClipboardEvent): void { }
    handlePointerEnter(event: PointerEvent, location: PointerLocation): void { }
    handlePointerDown(event: PointerEvent, location: PointerLocation): void { }
    handlePointerMove(event: PointerEvent, location: PointerLocation): void { }
    handlePointerUp(event: PointerEvent, location: PointerLocation): void { }
    handleDoubleClick(event: PointerEvent, location: PointerLocation): void { }
    handleContextMenu(event: PointerEvent): void { event.preventDefault(); event.stopPropagation(); }
    renderPanePart(pane: Range): React.ReactNode { return undefined; }
    renderGlobalPart(): React.ReactNode { return undefined; }
    dispose(): void { }
    autoScrollDirection: Direction = 'both';
}


