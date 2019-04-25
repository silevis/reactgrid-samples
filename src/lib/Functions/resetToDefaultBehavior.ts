import { GridContext } from "../Common/GridContext";
import { DefaultGridBehavior } from "../Behaviors/DefaultGridBehavior";
import { changeBehavior } from "./changeBehavior";

export function resetToDefaultBehavior(gridContext: GridContext) {
    changeBehavior(gridContext, new DefaultGridBehavior(this));
}