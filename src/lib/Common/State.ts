import { CellMatrix, Behavior, Range, Location, SelectionMode, Orientation, DataChange } from ".";

// ASK ARCHITECT BEFORE INTRODUCING ANY CHANGE!
// INTERNAL
export interface State {
    cellMatrix: CellMatrix
    currentBehavior: Behavior

    hiddenFocusElement: HTMLDivElement
    viewportElement: HTMLDivElement
    lastKeyCode: number
    queuedDataChanges: DataChange[]

    // LINE AND SHADOW
    lineOrientation: Orientation
    linePosition: number
    shadowSize: number
    shadowPosition: number

    // SELECTION
    selectionMode: SelectionMode
    selectedRanges: Range[]
    selectedIndexes: number[]
    focusedLocation?: Location;
    activeSelectedRangeIdx: number
    isFocusedCellInEditMode: boolean

    // VISIBLE RANGE
    visibleRange: Range | undefined;
    minScrollTop: number
    maxScrollTop: number
    minScrollLeft: number
    maxScrollLeft: number
}