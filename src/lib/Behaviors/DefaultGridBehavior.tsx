import * as React from "react";
import { GridContext, Behavior, KeyboardEvent, ClipboardEvent, PointerEvent, Range } from "../Common";
import { keyDownHandlers } from "./DefaultGridBehavior/keyDownHandlers";
import { keyUpHandlers } from "./DefaultGridBehavior/keyUpHandler";
import { getLocationFromClient, focusLocation, changeBehavior } from "../Functions";
import { selectRange } from "../Functions/selectRange";
import { CellSelectionBehavior } from "./CellSelectionBehavior";

export class DefaultGridBehavior implements Behavior {

    constructor(private gridContext: GridContext) { }

    handlePointerDown(event: PointerEvent): void {
        const location = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        if (event.shiftKey && this.gridContext.state.focusedLocation) {
            const range = this.gridContext.cellMatrix.getRange(this.gridContext.state.focusedLocation, location);
            selectRange(this.gridContext, range);
        } else if (event.ctrlKey) {
            focusLocation(this.gridContext, location);

            this.gridContext.setState({
                focusedSelectedRangeIdx: this.gridContext.state.selectedRanges.length,
                selectedRanges: this.gridContext.state.selectedRanges.concat([
                    this.gridContext.cellMatrix.getRange(location, location)
                ])
            });
        } else {
            focusLocation(this.gridContext, location);
        }
    }

    handlePointerMove(event: PointerEvent): void { changeBehavior(this.gridContext, new CellSelectionBehavior(this.gridContext)) }
    handlePointerUp(event: PointerEvent): void { }
    handleDoubleClick(event: PointerEvent): void { }
    handleKeyDown(event: KeyboardEvent) { keyDownHandlers(this.gridContext, event) }
    handleKeyUp(event: KeyboardEvent): void { keyUpHandlers(this.gridContext, event) }
    handleCopy(event: ClipboardEvent): void { }
    handlePaste(event: ClipboardEvent): void { }
    handleCut(event: ClipboardEvent): void { }
    renderPanePart(pane: Range): React.ReactNode { return <></> }
    renderGlobalPart(): React.ReactNode { return <></> }
    dispose(): void { }
}