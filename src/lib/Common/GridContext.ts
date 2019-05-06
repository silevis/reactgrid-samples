import { Grid, GridState } from "../Components/Grid";
import { CellMatrix } from "./CellMatrix";
import { Location } from "./Model";

// INTERNAL
export class GridContext {
    constructor(private grid: Grid) { }
    get state(): GridState { return this.grid.state; }
    get cellMatrix(): CellMatrix { return this.grid.props.cellMatrix }
    setState(state: Partial<GridState>) { this.grid.setState(state as GridState); };
    commitChanges() { this.grid.props.onValuesChanged && this.grid.props.onValuesChanged(); }
    hiddenFocusElement!: HTMLDivElement;
    renderScheduled: boolean = false;
    focusedLocation!: Location;
}
