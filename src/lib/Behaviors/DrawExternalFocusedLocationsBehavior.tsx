import * as React from 'react';
import { Range } from '../Model';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";

export class DrawExternalFocusedLocationsBehavior extends DelegateBehavior {
    constructor(innerBehavior: Behavior) {
        super(innerBehavior);
    }

    renderPartialAreaForPane(pane: Range) {
        let focuses: { range: Range; color: string }[] = [];
        for (let el of this.grid.props.usersFocuses) {
            let location = this.grid.props.cellMatrix.getLocation(el.rowIdx, el.colIdx);
            let range = new Range([location.col], [location.row]);
            let element: { range: Range; color: string } = { range: range, color: el.color };
            focuses.push(element);
        }
        let result = [];
        focuses.forEach(f => {
            result.push([
                this.grid.renderPartialAreaForPane(f.range, pane, {
                    padding: '1px',
                    backgroundColor: f.color,
                    opacity: 0.1
                })
            ]);
        });
        return result;
    }

    renderPanePart = (pane: Range): React.ReactNode => {
        return (
            <>
                {this.innerBehavior.renderPanePart(pane)}
                {this.renderPartialAreaForPane(pane)}
            </>
        );
    };
}
