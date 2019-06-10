import { DynaGrid, GridState } from "../Components/DynaGrid";
import { CellMatrix } from "./CellMatrix";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";
import { Behavior, DataChange } from ".";
import { Grid } from "..";

// INTERNAL
export class GridContext {
    constructor(private grid: DynaGrid) { }
    get state(): GridState { return this.grid.state; }
    get cellMatrix(): CellMatrix { return this.grid.state.cellMatrix }
    setState(state: Partial<GridState>) { this.grid.setState(state as GridState); };
    forceUpdate() { this.grid.forceUpdate(); }
    commitChanges(changes: DataChange[]) { this.grid.props.onDataChanged && this.grid.props.onDataChanged(changes) }
    hiddenFocusElement!: HTMLDivElement;
    viewportElement!: HTMLDivElement;
    // currentBehavior cannot be in state, because setState() updates state asyncronously
    currentBehavior: Behavior = new DefaultBehavior(this);
    lastKeyCode: number = 0;
}