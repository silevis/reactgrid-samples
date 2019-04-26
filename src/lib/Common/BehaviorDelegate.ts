import * as React from "react";
import { Behavior } from "./Behavior";
import { GridContext, Range } from ".";

export class BehaviorDelegate implements Behavior {
    constructor(private gridContext: GridContext) { }

    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleKeyDown(event);
    handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleKeyUp(event);
    handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleCopy(event);
    handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handlePaste(event);
    handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleCut(event);
    handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.gridContext.state.currentBehavior.handleMouseDown(event);
    handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.gridContext.state.currentBehavior.handleClick(event);
    handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleTouchStart(event);
    handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => this.gridContext.state.currentBehavior.handleTouchEnd(event);
    handleDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.gridContext.state.currentBehavior.handleDoubleClick(event);
    renderPanePart = (pane: Range) => this.gridContext.state.currentBehavior.renderPanePart(pane);
    renderGlobalPart = () => this.gridContext.state.currentBehavior.renderGlobalPart();
    dispose = () => this.gridContext.state.currentBehavior.dispose();
}