import { Range } from "./Range";

export type Orientation = 'horizontal' | 'vertical';

export type Direction = 'horizontal' | 'vertical' | 'both'

export type SelectionMode = 'row' | 'column' | 'range';

export interface DynaGridProps {
    readonly cellMatrixProps: CellMatrixProps;
    readonly style?: React.CSSProperties;
    readonly cellTemplates?: CellTemplates
    //readonly additionalFocusses: ;
    //usersFocuses: { colIdx: number; rowIdx: number; color: string }[];
    //readonly onInitialized?: (grid: GridController) => void;

    readonly onDataChanged?: (dataChanges: DataChange[]) => void;
    readonly onCellFocused?: (cellId: CellId) => void;
    readonly onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    readonly onColumnContextMenu?: (selectedColumnIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    readonly onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
    // readonly onContextMenuRequested?: (menuOptions: MenuOption[]) => void
    // readonly onRowDeletionRequested? : (rowIds: Id[]) => void
    // readonly onColumnDeletionRequested? : (colIds: Id[]) => void
}

export interface CellTemplates {
    [key: string]: CellTemplate<any>;
}

export interface CellId {
    readonly rowId: Id;
    readonly columnId: Id;
}

export interface DataChange {
    readonly rowId: Id;
    readonly columnId: Id;
    readonly type: string;
    readonly initialData: any;
    readonly newData: any;
}

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
    hasEditMode: boolean;
    validate(data: any): TCellData | null
    // Convert plain text to cell data
    textToCellData(text: string): TCellData
    // Convert cell data to plain text
    cellDataToText(cellData: TCellData): string;
    // Returns true, if the cell is able to switch into edit mode. 
    // The keyCode represents the key pressed on the keyboard, or 1 for a pointer event.
    //shouldEnableEditMode(keyCode: number): boolean;

    // The keyCode represents the key pressed on the keyboard, or 1 for a pointer event.
    handleKeyDown(keyCode: number, cellData: TCellData): { editable: boolean, cellData: TCellData }
    // Custom styles applied to the cells div element
    customStyle?: React.CSSProperties;
    // Render the cell content
    renderContent(props: CellRenderProps<TCellData>): React.ReactNode;
}

// // ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
// export interface CellData<TCellData> {
//     // Data type stored in the cell
//     readonly type: string;
//     // Raw data 
//     readonly data: TCellData;
//     // Text representation of the data
//     ///readonly text: string;
// }

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


