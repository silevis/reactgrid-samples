import { Behavior } from "../Common/Behavior";
import { GridContext } from "../Common/GridContext";

export function changeBehavior(gridContext: GridContext, behavior: Behavior, shouldFocusInnerElement: boolean = true) {
    gridContext.state.currentBehavior.dispose();
    gridContext.setState({ currentBehavior: behavior });

    if (shouldFocusInnerElement) {
        gridContext.hiddenFocusElement && gridContext.hiddenFocusElement.focus();
    }
}