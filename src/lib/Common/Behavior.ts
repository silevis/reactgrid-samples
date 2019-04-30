import * as React from "react";
import { Range } from "./Range";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "./domEvents";

export interface Behavior {
    // handlePointerMove: (pointer: Pointer): void;
    // handlePointerMoveEnd: (pointer: Pointer): void;
    // handlePointerDown: (pointer: Pointer): void;
    // handlePointerUp: (pointer: Pointer): void;
    // handlePointerSingle: (pointer: Pointer): void;
    // handlePointerDouble: (pointer: Pointer): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleKeyUp(event: KeyboardEvent): void;
    handleCopy(event: ClipboardEvent): void;
    handlePaste(event: ClipboardEvent): void;
    handleCut(event: ClipboardEvent): void;
    handlePointerDown(event: PointerEvent, selectionMode: string): void;
    handlePointerMove(event: PointerEvent): void;
    handlePointerUp(event: PointerEvent): void;
    handleDoubleClick(event: PointerEvent): void;
    renderPanePart(pane: Range): React.ReactNode;
    renderGlobalPart(): React.ReactNode;
    dispose(): void;
}


