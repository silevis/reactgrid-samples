import * as React from "react";
import { Range, Location } from "./";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "./domEvents";
import { Direction } from "./Model";

// IMPORTANT !! PLEASE DO NOT INTRODUCE CHANGE WITHOUT TALKING TO ARCHITECT !!
export abstract class Behavior {
    handleKeyDown(event: KeyboardEvent): void { }
    handleKeyUp(event: KeyboardEvent): void { }
    handleCopy(event: ClipboardEvent): void { }
    handlePaste(event: ClipboardEvent): void { }
    handleCut(event: ClipboardEvent): void { }
    handlePointerEnter(event: PointerEvent, location: Location): void { }
    handlePointerDown(event: PointerEvent, location: Location): void { }
    handlePointerMove(event: PointerEvent, location: Location): void { }
    handlePointerUp(event: PointerEvent, location: Location): void { }
    handleDoubleClick(event: PointerEvent, location: Location): void { }
    handleContextMenu(event: React.MouseEvent): void { }
    renderPanePart(pane: Range): React.ReactNode { return undefined; }
    renderGlobalPart(): React.ReactNode { return undefined; }
    dispose(): void { }
    autoScrollDirection: Direction = 'both';
}


