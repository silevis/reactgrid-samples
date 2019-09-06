import { CellMatrix, Behavior, Range, Location, SelectionMode, Orientation, DataChange } from ".";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";
import { CellTemplates, Id, Focus } from "./PublicModel";

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
// INTERNAL

export type StateUpdater = (modifier: (state: State) => State) => void;

export class State {
    constructor(public readonly updateState: StateUpdater) { }
    readonly cellMatrix!: CellMatrix;
    readonly currentBehavior: Behavior = new DefaultBehavior();
    readonly floatingCellEditor: boolean = false;

    cellTemplates!: CellTemplates;
    hiddenFocusElement!: HTMLDivElement;
    readonly viewportElement!: HTMLDivElement;

    // element for LegacyBrowserGridRenderer
    hiddenScrollableElement!: HTMLDivElement;

    lastKeyCode: number = 0;
    readonly queuedDataChanges: DataChange[] = [];
    currentlyEditedCell?: { type: string, data: any, text?: string };
    customFocuses: Focus[] = [];
    disableFillhandle?: boolean;
    disableRangeSelection?: boolean;
    disableColumnSelection?: boolean;
    disableRowSelection?: boolean;

    // CONTEXT MENU
    contextMenuPosition: number[] = [-1, -1] // [top, left]

    // LINE AND SHADOW
    lineOrientation: Orientation = 'horizontal';
    linePosition: number = -1;
    shadowSize: number = 0;
    shadowPosition: number = -1;

    // SELECTION
    selectionMode: SelectionMode = 'range'
    selectedRanges: Range[] = [];
    selectedIndexes: number[] = [];
    selectedIds: Id[] = [];
    focusedLocation?: Location;
    activeSelectedRangeIdx: number = 0;
    isFocusedCellInEditMode: boolean = false;

    // VISIBLE RANGE
    visibleRange!: Range;
    minScrollTop: number = -1;
    maxScrollTop: number = -1;
    minScrollLeft: number = -1;
    maxScrollLeft: number = -1;
}