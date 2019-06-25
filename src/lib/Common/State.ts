import { CellMatrix, Behavior, Range, Location, SelectionMode, Orientation, DataChange } from ".";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";
import { CellData, ICellTemplates } from "./PublicModel";
import { TextCellTemplate } from "../Cells/TextCellTemplate";
import { HeaderCell as HeaderCellTemplate } from "../Cells/HeaderCellTemplate";

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
// INTERNAL

export type AsyncStateUpdate = (modifier: (state: State) => State) => void;

export class State {
    constructor(public readonly updateState: AsyncStateUpdate) { }
    prevState?: State;
    readonly cellMatrix!: CellMatrix;
    readonly currentBehavior: Behavior = new DefaultBehavior();

    cellTemplates: ICellTemplates = {
        'text': new TextCellTemplate(),
        'header': new HeaderCellTemplate(),
    }

    hiddenFocusElement!: HTMLDivElement;
    readonly viewportElement!: HTMLDivElement;
    lastKeyCode: number = 0;
    readonly queuedDataChanges: DataChange[] = [];
    editedCell?: CellData<any>;

    // LINE AND SHADOW
    lineOrientation: Orientation = 'horizontal';
    linePosition: number = -1
    shadowSize: number = 0;
    shadowPosition: number = -1;

    // SELECTION
    selectionMode: SelectionMode = 'range'
    selectedRanges: Range[] = [];
    selectedIndexes: number[] = [];
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