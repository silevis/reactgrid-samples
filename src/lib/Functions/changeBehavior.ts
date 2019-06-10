import { Behavior } from "../Common/Behavior";
import { GridContext } from "../Common/GridContext";


export function changeBehavior(gridContext: GridContext, behavior: Behavior) {
    gridContext.currentBehavior.dispose();
    gridContext.currentBehavior = behavior;
    gridContext.forceUpdate();
    gridContext.hiddenFocusElement.focus();
}