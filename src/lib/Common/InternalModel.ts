import { RowProps, ColumnProps, DataChange } from ".";
import { CellData } from "./PublicModel";

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
// INTERNAL
export interface Column extends ColumnProps {
    readonly idx: number;
    readonly left: number;
    readonly right: number;
}

// INTERNAL
export interface Row extends RowProps {
    readonly idx: number;
    readonly top: number;
    readonly bottom: number;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Borders {
    top?: boolean;
    left?: boolean;
    bottom?: boolean;
    right?: boolean;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export class Location {
    constructor(public readonly row: Row, public readonly col: Column) { }
    get cell() { return this.row.cells[this.col.idx] };
}

