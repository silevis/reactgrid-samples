import { Behavior, GridContext } from '../Common';

export class BasicGridBehavior implements Behavior {
    constructor(public gridContext: GridContext) { }
    renderPanePart = () => undefined;
    renderGlobalPart = () => undefined;
    dispose = () => { };
    handleCopy = () => { };
    handlePaste = () => { };
    handleCut = () => { };
    handleKeyDown = () => { };
    handleKeyUp = () => { };
    handleMouseDown = () => { };
    handleClick = () => { };
    handleTouchStart = () => { };
    handleTouchEnd = () => { };
    handleDoubleClick = () => { };
}
