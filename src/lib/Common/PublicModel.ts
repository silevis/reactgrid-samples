//
//  This is the core API for ReactGrid
//  PLEASE 
//  ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE
//  THANKS!
//

// TODO Range is INTERNAL! Should not be public! 
import { Range } from "./Range";

export type Orientation = 'horizontal' | 'vertical';

export type Direction = 'horizontal' | 'vertical' | 'both'

export type SelectionMode = 'row' | 'column' | 'range';

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface Focus {
    columnId: Id;
    rowId: Id;
    color: string;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface ReactGridProps {
    readonly cellMatrixProps: CellMatrixProps;
    readonly style?: React.CSSProperties;
    readonly cellTemplates?: CellTemplates
    readonly customFocuses?: Focus[];
    readonly disableFillHandle?: boolean;
    readonly disableRangeSelection?: boolean;
    readonly disableRowSelection?: boolean;
    readonly disableColumnSelection?: boolean;
    readonly onDataChanged?: (dataChanges: DataChange[]) => void;
    readonly onCellFocused?: (cellId: CellId) => void;
    readonly onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    readonly onColumnContextMenu?: (selectedColumnIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    // TODO Range is INTERNAL! Should not be public! 
    readonly onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
    // readonly onContextMenuRequested?: (menuOptions: MenuOption[]) => void
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellTemplates {
    [key: string]: CellTemplate<any>;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellId {
    readonly rowId: Id;
    readonly columnId: Id;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface DataChange {
    readonly rowId: Id;
    readonly columnId: Id;
    readonly type: string;
    readonly initialData: any;
    readonly newData: any;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellMatrixProps {
    readonly columns: ColumnProps[];
    readonly rows: RowProps[];
    readonly frozenTopRows?: number;
    readonly frozenBottomRows?: number;
    readonly frozenLeftColumns?: number;
    readonly frozenRightColumns?: number;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
// This interface is used for the communication between DynaGrid and a cell
export interface CellTemplate<TCellData> {
    // TODO the event handler should check the keycode
    hasEditMode: boolean;

    validate(data: any): TCellData | null
    // Convert plain text to cell data
    textToCellData(text: string): TCellData
    // Convert cell data to plain text
    cellDataToText(cellData: TCellData): string;
    // Returns true, if the cell is able to switch into edit mode. 
    // The keyCode represents the key pressed on the keyboard, or 1 for a pointer event.
    //shouldEnableEditMode(keyCode: number): boolean;

    // TODO Explain this:
    // The keyCode represents the key pressed on the keyboard, or 1 for a pointer event.
    handleKeyDown(keyCode: number, cellData: TCellData): { editable: boolean, cellData: TCellData }
    // Custom styles applied to the cells div element
    customStyle?: React.CSSProperties;
    // Render the cell content
    renderContent(props: CellRenderProps<TCellData>): React.ReactNode;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellRenderProps<TCellData> {
    cellData: TCellData;
    onCellDataChanged(cellData: TCellData): void;
    readonly isInEditMode: boolean;
    readonly lastKeyCode: number;
}

export type Id = number | string;

export type DropPosition = 'before' | 'on' | 'after'

export interface ColumnProps {
    readonly id: Id;
    readonly width: number;
    readonly reorderable: boolean
    readonly resizable: boolean
    readonly canDrop?: (columnIds: Id[], position: DropPosition) => boolean;
    readonly onDrop?: (columnIds: Id[], position: DropPosition) => void;
    readonly onResize?: (newWidth: number) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface RowProps {
    readonly id: Id;
    cells: { type: string, data: any }[];
    readonly height: number;
    readonly reorderable: boolean;
    readonly canDrop?: (rowIds: Id[], position: DropPosition) => boolean;
    readonly onDrop?: (rowIds: Id[], position: DropPosition) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface MenuOption {
    title: string;
    handler: () => void;
}


