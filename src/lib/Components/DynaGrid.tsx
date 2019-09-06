import * as React from "react";
import { DynaGridProps, CellMatrix, PointerEvent, State, StateUpdater, MenuOption } from "../Common";
import { recalcVisibleRange, isBrowserIE, isBrowserEdge, focusLocation } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { updateSelectedRows, updateSelectedColumns } from "../Functions/updateState";
import { DefaultGridRenderer } from "./DefaultGridRenderer";
import { LegacyBrowserGridRenderer } from "./LegacyBrowserGridRenderer";
import { DefaultCellTemplates } from '../Common/DefaultCellTemplates'

export class DynaGrid extends React.Component<DynaGridProps, State> {

    private updateState: StateUpdater = modifier => this.updateOnNewState(modifier(this.state));
    private pointerEventsController = new PointerEventsController(this.updateState);
    state = new State(this.updateState);

    static getDerivedStateFromProps(props: DynaGridProps, state: State) {

        const dataHasChanged = state.cellMatrix && props.cellMatrixProps !== state.cellMatrix.props

        state = {
            ...state,
            cellMatrix: new CellMatrix(props.cellMatrixProps)
        }

        if (state.selectionMode === 'row' && state.selectedIds.length > 0) {
            state = updateSelectedRows(state);
        } else if (state.selectionMode === 'column' && state.selectedIds.length > 0) {
            state = updateSelectedColumns(state);
        } else {
            state.selectedRanges = [...state.selectedRanges].map(range => state.cellMatrix.validateRange(range))
        }

        if (state.cellMatrix.cols.length > 0 && state.focusedLocation) {
            state.focusedLocation = state.cellMatrix.validateLocation(state.focusedLocation);
        }

        if (state.visibleRange && dataHasChanged)
            state = recalcVisibleRange(state, isBrowserIE() || isBrowserEdge() ? true : false)

        return {
            ...state,
            currentlyEditedCell: state.isFocusedCellInEditMode && state.focusedLocation ? { ...state.focusedLocation.cell } : undefined,
            cellTemplates: { ...DefaultCellTemplates.getTemplates(), ...props.cellTemplates },
            customFocuses: props.customFocuses,
            disableFillHandle: props.disableFillHandle,
            disableRangeSelection: props.disableRangeSelection,
            disableColumnSelection: props.disableColumnSelection,
            disableRowSelection: props.disableRowSelection,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResizeHandler);
        //this.props.onInitialized && this.props.onInitialized(new GridController(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandler);
    }

    render() {
        return (
            isBrowserIE() || isBrowserEdge()
                ? <LegacyBrowserGridRenderer
                    state={this.state}
                    onKeyDown={this.keyDownHandler}
                    onKeyUp={this.keyUpHandler}
                    onPointerDown={this.pointerDownHandler}
                    onContextMenu={this.handleContextMenu}
                    onRowContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRowContextMenu ? this.props.onRowContextMenu(this.state.selectedIds, menuOptions) : []}
                    onColumnContextMenu={(_, menuOptions: MenuOption[]) => this.props.onColumnContextMenu ? this.props.onColumnContextMenu(this.state.selectedIds, menuOptions) : []}
                    onRangeContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRangeContextMenu ? this.props.onRangeContextMenu(this.state.selectedRanges, menuOptions) : []}
                    viewportElementRefHandler={this.viewportElementRefHandler}
                    hiddenElementRefHandler={this.hiddenElementRefHandler}
                />
                : <DefaultGridRenderer
                    state={this.state}
                    onKeyDown={this.keyDownHandler}
                    onKeyUp={this.keyUpHandler}
                    onScroll={this.scrollHandler}
                    onPointerDown={this.pointerDownHandler}
                    onCopy={this.copyHandler}
                    onCut={this.cutHandler}
                    onPaste={this.pasteHandler}
                    onPasteCapture={this.pasteCaptureHandler}
                    onContextMenu={this.handleContextMenu}
                    onRowContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRowContextMenu ? this.props.onRowContextMenu(this.state.selectedIds, menuOptions) : []}
                    onColumnContextMenu={(_, menuOptions: MenuOption[]) => this.props.onColumnContextMenu ? this.props.onColumnContextMenu(this.state.selectedIds, menuOptions) : []}
                    onRangeContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRangeContextMenu ? this.props.onRangeContextMenu(this.state.selectedRanges, menuOptions) : []}
                    viewportElementRefHandler={this.viewportElementRefHandler}
                    hiddenElementRefHandler={this.hiddenElementRefHandler}
                />
        );
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
        if (
            scrollTop < this.state.minScrollTop || scrollTop > this.state.maxScrollTop ||
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
        if (state === this.state) return;
        // Force state to update immediately (SetState updates async)
        const dataChanges = state.queuedDataChanges;
        this.setState({ ...state, queuedDataChanges: [] });
        // TODO pop changes form state
        this.props.onDataChanged && dataChanges.length > 0 && this.props.onDataChanged(dataChanges)
    }
}
