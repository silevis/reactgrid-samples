import * as React from "react";
import { Range } from "./Range";
import { GridContext } from "./GridContext";

export interface Behavior {
    renderPanePart: (pane: Range) => React.ReactNode;
    dispose: () => void;
    handleKeyDown: (gridContext: GridContext, event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleKeyUp: (gridContext: GridContext, event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleCopy: (gridContext: GridContext, event: React.ClipboardEvent<HTMLDivElement>) => void;
    handlePaste: (gridContext: GridContext, event: React.ClipboardEvent<HTMLDivElement>) => void;
    handleCut: (gridContext: GridContext, event: React.ClipboardEvent<HTMLDivElement>) => void;
    handleMouseDown: (gridContext: GridContext, event: React.MouseEvent<HTMLDivElement>) => void;
    handleClick: (gridContext: GridContext, event: React.MouseEvent<HTMLDivElement>) => void;
    handleTouchStart: (gridContext: GridContext, event: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchEnd: (gridContext: GridContext, event: React.TouchEvent<HTMLDivElement>) => void;
    handleDoubleClick: (gridContext: GridContext, event: React.MouseEvent<HTMLDivElement>) => void;
}


