import { GridContext } from "./GridContext";

export type Orientation = 'horizontal' | 'vertical';

export type Direction = 'left' | 'right' | 'up' | 'down';

export type SelectionMode = 'rows' | 'columns' | 'ranges';

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Cell {
    value: any;
    isReadOnly: boolean;
    type?: string;
    readonly trySetValue: (value: any) => void;
    readonly render: (props: CellProps) => React.ReactNode;
    readonly validateValue?: (value: any) => boolean;
    onContextMenu?: (ref: HTMLDivElement, closeContextMenu: () => void) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Location {
    readonly row: Row;
    readonly col: Column;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellProps extends Cell {
    attributes: React.HTMLAttributes<HTMLDivElement>;
    gridContext: GridContext;
    cellKey: string;
    isInEditMode: boolean;
    isSelected: boolean;
    isFocused: boolean;
    setEditMode: (value: boolean) => void;
    setFocusedCellRef: (ref: HTMLDivElement) => void;
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
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface ColProps {
    readonly id: string;
    readonly width: number;
    readonly context: any;
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
    readonly id: string;
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
