import { GridContext } from "./GridContext";

export type Orientation = 'horizontal' | 'vertical';

export type Direction = 'horizontal' | 'vertical' | 'both'

export type SelectionMode = 'row' | 'column' | 'range';

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
export interface CellData {
    textValue: string;
    data: any;
    type: string;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Cell {
    cellData: CellData;
    trySetData(cellData: CellData): void;
    shouldEnableEditMode(keyCode: number): boolean;
    renderContent(props: CellRenderProps): React.ReactNode;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellRenderProps {
    cellData: CellData;
    gridContext: GridContext;
    onCellDataChanged: (cellData: CellData) => void;
    isInEditMode: boolean;
    location: Location;
}


// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Location {
    readonly row: Row;
    readonly col: Column;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Column {
    readonly idx: number;
    readonly left: number;
    readonly right: number;

    readonly width: number;
    readonly context: any;
    readonly onDropRight?: (reorderedColumns: Column[], targetColumn: Column) => void;
    readonly onDropLeft?: (reorderedColumns: Column[], targetColumn: Column) => void;
    readonly onColResize?: (onColResize: Column, newColWidth: number) => void;
    readonly canDropRight?: (reorderedColumns?: Column[]) => boolean;
    readonly canDropLeft?: (reorderedColumns?: Column[]) => boolean;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface ColProps {
    readonly id?: string;
    readonly width: number;
    readonly context: any;
    readonly canDropRight?: (reorderedColumns?: Column[]) => boolean;
    readonly canDropLeft?: (reorderedColumns?: Column[]) => boolean;
    readonly onDropRight?: (reorderedColumns: Column[], targetColumn: Column) => void;
    readonly onDropLeft?: (reorderedColumns: Column[], targetColumn: Column) => void;
    readonly onColResize?: (resizedColumn: Column, newColWidth: number) => void;

}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Row {
    readonly idx: number;
    readonly top: number;
    readonly bottom: number;

    readonly height: number;
    readonly context: any;
    readonly onDropBelow?: (reorderedRows: Row[], targetRow: Row) => void;
    readonly onDropAbove?: (reorderedRows: Row[], targetRow: Row) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface RowProps {
    readonly id?: string;
    readonly height: number;
    readonly context: any;
    readonly onDropBelow?: (reorderedRows: Row[], targetRow: Row) => void;
    readonly onDropAbove?: (reorderedRows: Row[], targetRow: Row) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface MenuOption {
    name: string;
    handler: () => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Borders {
    top?: boolean;
    left?: boolean;
    bottom?: boolean;
    right?: boolean;
}
