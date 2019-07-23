import * as React from "react";
import { PointerLocation, State } from "./";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "./domEvents";
import { Direction } from "./PublicModel";
import { Range } from "./Range";

// IMPORTANT !! PLEASE DO NOT INTRODUCE CHANGE WITHOUT TALKING TO ARCHITECT !!
export abstract class Behavior {
    handleKeyDown(event: KeyboardEvent, state: State): State { return state }
    handleKeyUp(event: KeyboardEvent, state: State): State { return state }
    handleCopy(event: ClipboardEvent, state: State): State { return state }
    handlePaste(event: ClipboardEvent, state: State): State { return state }
    handleCut(event: ClipboardEvent, state: State): State { return state }
    handlePointerDown(event: PointerEvent, location: PointerLocation, state: State): State { return state }
    handlePointerEnter(event: PointerEvent, location: PointerLocation, state: State): State { return state }
    handlePointerMove(event: PointerEvent, location: PointerLocation, state: State): State { return state }
    handlePointerUp(event: PointerEvent, location: PointerLocation, state: State): State { return state }
    handleDoubleClick(event: PointerEvent, location: PointerLocation, state: State): State { return state }
    handleContextMenu(event: PointerEvent, state: State): State { return state }
    renderPanePart(state: State, pane: Range): React.ReactNode { return undefined }
    autoScrollDirection: Direction = 'both';
}


