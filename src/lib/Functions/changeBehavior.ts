import { Behavior } from "../Common/Behavior";
import { GridContext } from "../Common/GridContext";

export function changeBehavior(gridContext: GridContext, behavior: Behavior, shouldFocusInnerElement: boolean = true) {
    gridContext.currentBehavior.dispose();
    gridContext.currentBehavior = behavior;
    gridContext.forceUpdate();
    console.log('change behavior')

    // TODO who needs this and why?
    if (shouldFocusInnerElement) {
        gridContext.hiddenFocusElement && gridContext.hiddenFocusElement.focus();
    }
}