import { RowProps, ColumnProps } from ".";

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

export interface Cell {
    data: any;
    type: string;
    text?: string;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export class Location {
    constructor(
        public readonly row: Row,
        public readonly col: Column,
    ) { }
    get cell(): Cell { return this.row.cells[this.col.idx] };
    equals(location?: Location) {
        return location && this.col.idx === location.col.idx && this.row.idx === location.row.idx;
    }
}

export class PointerLocation extends Location {
    constructor(
        public readonly row: Row,
        public readonly col: Column,
        public readonly viewportX: number,
        public readonly viewportY: number,
        public readonly cellX: number,
        public readonly cellY: number) {
        super(row, col);
    }
}
