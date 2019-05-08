import * as React from "react";
import { Range } from "./Range";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "./domEvents";

// IMPORTANT !! PLEASE DO NOT INTRODUCE CHANGE WITHOUT TALKING TO ARCHITECT !!
export interface Behavior {
    handleKeyDown(event: KeyboardEvent): void;
    handleKeyUp(event: KeyboardEvent): void;
    handleCopy(event: ClipboardEvent): void;
    handlePaste(event: ClipboardEvent): void;
    handleCut(event: ClipboardEvent): void;
    handlePointerDown(event: PointerEvent): void;
    handlePointerMove(event: PointerEvent): void;
    handlePointerUp(event: PointerEvent): void;
    handleDoubleClick(event: PointerEvent): void;
    handleContextMenu(event: React.MouseEvent): void;
    renderPanePart(pane: Range): React.ReactNode;
    renderGlobalPart(): React.ReactNode;
    dispose(): void;
}


