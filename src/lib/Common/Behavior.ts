import * as React from "react";
import { Range } from "./Range";

export interface Behavior {
    handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
    handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>): void;
    handleCopy(event: React.ClipboardEvent<HTMLDivElement>): void;
    handlePaste(event: React.ClipboardEvent<HTMLDivElement>): void;
    handleCut(event: React.ClipboardEvent<HTMLDivElement>): void;
    handleMouseDown(event: React.MouseEvent<HTMLDivElement>): void;
    handleClick(event: React.MouseEvent<HTMLDivElement>): void;
    handleTouchStart(event: React.TouchEvent<HTMLDivElement>): void;
    handleTouchEnd(event: React.TouchEvent<HTMLDivElement>): void;
    handleDoubleClick(event: React.MouseEvent<HTMLDivElement>): void;
    renderPanePart(pane: Range): React.ReactNode;
    renderGlobalPart(): React.ReactNode;
    dispose(): void;
}


