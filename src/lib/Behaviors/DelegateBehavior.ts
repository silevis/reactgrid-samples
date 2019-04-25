import { Behavior } from '../Common/Behavior';
export abstract class DelegateBehavior implements Behavior {
    constructor(protected innerBehavior: Behavior) { }
    renderPanePart = this.innerBehavior.renderPanePart;
    renderGlobalPart = this.innerBehavior.renderGlobalPart;
    dispose = this.innerBehavior.dispose;
    handleKeyDown = this.innerBehavior.handleKeyDown;
    handleKeyUp = this.innerBehavior.handleKeyUp;
    handleCopy = this.innerBehavior.handleCopy;
    handlePaste = this.innerBehavior.handlePaste;
    handleCut = this.innerBehavior.handleCut;
    handleMouseDown = this.innerBehavior.handleMouseDown;
    handleClick = this.innerBehavior.handleClick;
    handleTouchStart = this.innerBehavior.handleTouchStart;
    handleTouchEnd = this.innerBehavior.handleTouchEnd;
    handleDoubleClick = this.innerBehavior.handleDoubleClick;
    gridContext = this.innerBehavior.gridContext;
}
