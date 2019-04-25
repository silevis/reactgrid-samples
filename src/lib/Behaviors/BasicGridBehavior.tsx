import * as React from 'react';
import { GridContext, Behavior, Range } from '../Common';

export class BasicGridBehavior implements Behavior {
    constructor(public gridContext: GridContext) { }
    renderPanePart: (pane: Range) => React.ReactNode = _ => undefined;
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
