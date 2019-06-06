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
// INTERNAL
export interface Column {
    readonly idx: number;
    readonly left: number;
    readonly right: number;

    readonly id: string | number;
    readonly width: number;
    readonly context?: any;
    readonly canDropRight?: (columnContexts: any[]) => boolean;
    readonly canDropLeft?: (columnContexts: any[]) => boolean;
    readonly onDropRight?: (columnContexts: any[]) => void;
    readonly onDropLeft?: (columnContexts: any[]) => void;
    readonly onResize?: (column: Column, newWidth: number) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
// PUBLIC
export interface ColumnProps {
    readonly id: string | number;
    readonly width: number;
    readonly context?: any;
    readonly canDropRight?: (columnContexts: any[]) => boolean;
    readonly canDropLeft?: (columnContexts: any[]) => boolean;
    readonly onDropRight?: (columnContexts: any[]) => void;
    readonly onDropLeft?: (columnContexts: any[]) => void;
    readonly onResize?: (columnContext: any, newColWidth: number) => void;

}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
// INTERNAL
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
