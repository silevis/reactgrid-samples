import * as React from 'react';
import { Grid } from '../Components/Gridonents/Grid';
import { Behavior } from '../Common/Behavior';
import { Range } from '../Model';

export class BasicGridBehavior implements Behavior {
    constructor(public grid: Grid) { }
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
