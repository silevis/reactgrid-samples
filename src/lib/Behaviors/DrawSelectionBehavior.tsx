import * as React from 'react';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { DrawFillHandleBehavior } from './DrawFillHandleBehavior';
import { DrawExternalFocusedLocationsBehavior } from './DrawExternalFocusedLocationsBehavior';
import { Range } from '../Common';

export class DrawSelectionBehavior extends DelegateBehavior {
    constructor(inner: Behavior) {
        super(new DrawFillHandleBehavior(new DrawExternalFocusedLocationsBehavior(inner)));
    }

    renderPanePart = (pane: Range): React.ReactNode => {
        return (
            <>
                {this.innerBehavior.renderPanePart(pane)}
                {/*this.grid.renderPartialAreaForPane(this.grid.state.selectedRange, pane, { border: '1px solid #3579f8', backgroundColor: 'rgba(53, 121, 248, 0.1)' })*/}
            </>
        );
    };
}
