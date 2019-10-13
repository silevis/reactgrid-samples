import * as React from "react";
import { ReactGridProps, CellMatrix, PointerEvent, State, StateUpdater, MenuOption } from "../Common";
import { recalcVisibleRange, isBrowserIE, isBrowserEdge, getActiveSelectedRange } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { updateSelectedRows, updateSelectedColumns } from "../Functions/updateState";
import { DefaultGridRenderer } from "./DefaultGridRenderer";
import { LegacyBrowserGridRenderer } from "./LegacyBrowserGridRenderer";
import { defaultCellTemplates } from "../Common/DefaultCellTemplates";
import { checkLicense } from "../Functions/licencing";

export class ReactGrid extends React.Component<ReactGridProps, State> {

    private updateState: StateUpdater = modifier => this.updateOnNewState(modifier(this.state));
    private pointerEventsController = new PointerEventsController(this.updateState);
    state = new State(this.updateState);

    static getDerivedStateFromProps(props: ReactGridProps, state: State) {

        const dataHasChanged = !state.cellMatrix || props.cellMatrixProps !== state.cellMatrix.props
        if (dataHasChanged) {
            state = { ...state, cellMatrix: new CellMatrix(props.cellMatrixProps) }
        }

        if (state.selectionMode === 'row' && state.selectedIds.length > 0) {
            state = updateSelectedRows(state);
        } else if (state.selectionMode === 'column' && state.selectedIds.length > 0) {
            state = updateSelectedColumns(state);
        } else {
            state = { ...state, selectedRanges: [...state.selectedRanges].map(range => state.cellMatrix.validateRange(range)) }
        }

        if (state.cellMatrix.cols.length > 0 && state.focusedLocation && !state.currentlyEditedCell) {
            state = { ...state, focusedLocation: state.cellMatrix.validateLocation(state.focusedLocation) }
            // TODO check it
            setTimeout(() => { if (document.activeElement !== state.hiddenFocusElement) state.hiddenFocusElement.focus(); });
        }

        if (state.visibleRange && dataHasChanged) {
            state = recalcVisibleRange(state)
        }

        return {
            ...state,
            cellTemplates: { ...defaultCellTemplates, ...props.cellTemplates },
            customFocuses: props.customFocuses,
            disableFillHandle: props.disableFillHandle,
            disableRangeSelection: props.disableRangeSelection,
            disableColumnSelection: props.disableColumnSelection,
            disableRowSelection: props.disableRowSelection,
        };
    }

    constructor(props: ReactGridProps) {
        super(props);
        checkLicense(props.license);
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandler);
    }

    render() {
        const grid = (typeof window !== 'undefined' && (isBrowserIE() || isBrowserEdge())) ? LegacyBrowserGridRenderer : DefaultGridRenderer;
        const range = getActiveSelectedRange(this.state);
        const rowIds = range ? range.rows.map(r => r.id) : []
        const colIds = range ? range.cols.map(c => c.id) : []
        return React.createElement(grid as any, {
            state: this.state,
            onKeyDown: this.keyDownHandler,
            onKeyUp: this.keyUpHandler,
            onCopy: this.copyHandler,
            onCut: this.cutHandler,
            onPaste: this.pasteHandler,
            onPasteCapture: this.pasteCaptureHandler,
            onPointerDown: this.pointerDownHandler,
            onContextMenu: this.handleContextMenu,
            onScroll: this.scrollHandler,
            onRowContextMenu: (menuOptions: MenuOption[]) => this.props.onRowContextMenu ? this.props.onRowContextMenu(rowIds, menuOptions) : [],
            onColumnContextMenu: (menuOptions: MenuOption[]) => this.props.onColumnContextMenu ? this.props.onColumnContextMenu(colIds, menuOptions) : [],
            onRangeContextMenu: (menuOptions: MenuOption[]) => this.props.onRangeContextMenu ? this.props.onRangeContextMenu(rowIds, colIds, menuOptions) : [],
            viewportElementRefHandler: this.viewportElementRefHandler,
            hiddenElementRefHandler: this.hiddenElementRefHandler
        })
    }

    private hiddenElementRefHandler = (hiddenFocusElement: HTMLInputElement) => {
        (this.state as State).hiddenFocusElement = hiddenFocusElement;
    }

    private pasteCaptureHandler = (event: ClipboardEvent) => {
        const htmlData = event.clipboardData!.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            event.bubbles = false;
        }
    }

    private scrollHandler = () => {
        const { scrollTop, scrollLeft } = this.state.viewportElement;
        if (scrollTop < this.state.minScrollTop || scrollTop > this.state.maxScrollTop ||
            scrollLeft < this.state.minScrollLeft || scrollLeft > this.state.maxScrollLeft
        ) {
            this.updateOnNewState(recalcVisibleRange(this.state));
        }
    }

    private viewportElementRefHandler = (viewportElement: HTMLDivElement) => viewportElement && this.updateOnNewState(recalcVisibleRange({ ...this.state, viewportElement }));
    private pointerDownHandler = (event: PointerEvent) => this.updateOnNewState(this.pointerEventsController.handlePointerDown(event, this.state));
    private windowResizeHandler = () => this.updateOnNewState(recalcVisibleRange(this.state));
    private keyDownHandler = (event: KeyboardEvent) => this.updateOnNewState(this.state.currentBehavior.handleKeyDown(event, this.state));
    private keyUpHandler = (event: KeyboardEvent) => this.updateOnNewState(this.state.currentBehavior.handleKeyUp(event, this.state));
    private copyHandler = (event: ClipboardEvent) => this.updateOnNewState(this.state.currentBehavior.handleCopy(event, this.state));
    private pasteHandler = (event: ClipboardEvent) => this.updateOnNewState(this.state.currentBehavior.handlePaste(event, this.state));
    private cutHandler = (event: ClipboardEvent) => this.updateOnNewState(this.state.currentBehavior.handleCut(event, this.state));
    private handleContextMenu = (event: PointerEvent) => this.updateOnNewState(this.state.currentBehavior.handleContextMenu(event, this.state));

    private updateOnNewState(state: State) {
        const dataChanges = state.queuedDataChanges;
        if (state === this.state && dataChanges.length === 0) return;
        this.setState({ ...state, queuedDataChanges: [] });
        if (this.props.onDataChanged && dataChanges.length > 0) {
            this.props.onDataChanged(dataChanges);
        }
    }
}