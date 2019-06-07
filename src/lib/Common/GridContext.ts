import { Grid, GridState } from "../Components/Grid";
import { CellMatrix } from "./CellMatrix";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";
import { Behavior } from ".";

// INTERNAL
export class GridContext {
    constructor(private grid: Grid) { }
    get state(): GridState { return this.grid.state; }
    get cellMatrix(): CellMatrix { return this.grid.props.cellMatrix }
    setState(state: Partial<GridState>) { this.grid.setState(state as GridState); };
    forceUpdate() { this.grid.forceUpdate(); }
    commitChanges() { this.grid.props.onValuesChanged && this.grid.props.onValuesChanged() }
    hiddenFocusElement!: HTMLDivElement;
    viewportElement!: HTMLDivElement;
    // currentBehavior cannot be in state, because setState() updates state asyncronously
    currentBehavior: Behavior = new DefaultBehavior(this);
    lastKeyCode: number = 0;
}
