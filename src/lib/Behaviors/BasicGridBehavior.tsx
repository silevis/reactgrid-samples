import { Behavior } from '../Common';

export class BasicGridBehavior implements Behavior {
    constructor() { }
    renderPanePart = () => undefined;
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
