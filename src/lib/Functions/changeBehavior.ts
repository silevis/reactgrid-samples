import { Behavior } from "../Common/Behavior";
import { GridContext } from "../Common/GridContext";

export function changeBehavior(gridContext: GridContext, behavior: Behavior) {
    console.log(behavior.constructor.name);
    gridContext.currentBehavior.dispose();
    gridContext.currentBehavior = behavior;
    gridContext.forceUpdate();
}