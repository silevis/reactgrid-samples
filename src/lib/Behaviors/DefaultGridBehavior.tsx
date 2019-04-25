// import * as React from 'react'
import { DelegateBehavior } from "./DelegateBehavior";
import { KeyNavigationInsideSelectionBehavior } from './KeyNavigationInsideSelectionBehavior'
import { DefaultKeyNavigationBehavior } from './DefaultKeyNavigationBehavior'
import { CopyCutPasteBehavior } from './CopyCutPasteBehavior'
import { ResizeSelectionWithKeysBehavior } from './ResizeSelectionWithKeysBehavior'
import { BasicGridBehavior } from './BasicGridBehavior'
import { DefaultKeyHandlerBehavior } from './DefaultKeyHandlerBehavior'
import { DrawSelectionBehavior } from './DrawSelectionBehavior';
import { PointerHandlerBehavior } from './PointerHandlerBehavior';
import { GridContext } from '../Common';
export class DefaultGridBehavior extends DelegateBehavior {
    constructor(gridContext: GridContext) {
        super(
            new DrawSelectionBehavior(
                new PointerHandlerBehavior(
                    new DefaultKeyHandlerBehavior(
                        new ResizeSelectionWithKeysBehavior(
                            new KeyNavigationInsideSelectionBehavior(
                                new DefaultKeyNavigationBehavior(
                                    new CopyCutPasteBehavior(
                                        new BasicGridBehavior(gridContext)
                                    )
                                )
                            )
                        )
                    )
                )))
    }
}