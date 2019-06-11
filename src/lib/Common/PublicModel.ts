export type Orientation = 'horizontal' | 'vertical';

export type Direction = 'horizontal' | 'vertical' | 'both'

export type SelectionMode = 'row' | 'column' | 'range';

export interface DynaGridProps {
    readonly cellMatrixProps: CellMatrixProps;
    readonly style?: React.CSSProperties;
    //readonly additionalFocusses: ;
    //usersFocuses: { colIdx: number; rowIdx: number; color: string }[];
    //readonly onInitialized?: (grid: GridController) => void;

    readonly onDataChanged?: (dataChanges: DataChange[]) => void;
    readonly onCellFocused?: (cellId: CellId) => void;
    readonly onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    readonly onColumnContextMenu?: (selectedColumnIds: Id[], menuOptions: MenuOption[]) => MenuOption[];
    // readonly onContextMenuRequested?: (menuOptions: MenuOption[]) => void
    // readonly onRowDeletionRequested? : (rowIds: Id[]) => void
    // readonly onColumnDeletionRequested? : (colIds: Id[]) => void
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
export interface Cell {
    // Data stored in the cell
    cellData: CellData;
    // Used by DynaGrid to pass data to a cell. Return true if successful.
    trySetData(cellData: CellData): boolean;
    // Returns true, if the cell is able to switch into edit mode. 
    // The keyCode represents the key pressed on the keyboard, or 1 for a pointer event.
    shouldEnableEditMode(keyCode: number): boolean;
    // Custom styles applied to the cells div element
    customStyle: React.CSSProperties;
    // Render the cell content
    renderContent(props: CellRenderProps): React.ReactNode;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
export interface CellData {
    // Data type stored in the cell
    readonly type: string;
    // Raw data 
    readonly data: any;
    // Text representation of the data
    readonly text: string;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface CellRenderProps {
    readonly isInEditMode: boolean;
    readonly lastKeyCode: number;
}

export type Id = number | string;

export interface ColumnProps {
    readonly id: Id;
    readonly width: number;
    readonly reorderable: boolean
    readonly canDropLeft?: (columnIds: Id[]) => boolean;
    readonly canDropRight?: (columnIds: Id[]) => boolean;
    readonly onDropLeft?: (columnIds: Id[]) => void;
    readonly onDropRight?: (columnIds: Id[]) => void;
    readonly onResize?: (columnId: Id, newWidth: number) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface RowProps {
    readonly id: Id;
    readonly cells: Cell[];
    readonly height: number;
    readonly reorderable: boolean;
    readonly canDropAbove?: (rowIds: Id[]) => boolean;
    readonly canDropBelow?: (rowIds: Id[]) => boolean;
    readonly onDropAbove?: (rowIds: Id[]) => void;
    readonly onDropBelow?: (rowIds: Id[]) => void;
}

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE! 
export interface MenuOption {
    title: string;
    handler: () => void;
}


