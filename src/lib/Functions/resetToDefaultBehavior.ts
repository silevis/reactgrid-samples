import { GridContext } from "../Common/GridContext";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";
import { changeBehavior } from "./changeBehavior";

export function resetToDefaultBehavior(gridContext: GridContext) {
    changeBehavior(gridContext, new DefaultBehavior(gridContext));
}