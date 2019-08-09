import * as React from "react";
import { DynaGridProps, CellMatrix, PointerEvent, State, StateUpdater, MenuOption } from "../Common";
import { PaneRow } from "./PaneRow";
import { recalcVisibleRange } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { CellEditor } from "./CellEditor";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { updateSelectedRows, updateSelectedColumns } from "../Functions/updateState";
import { ContextMenu } from "./ContextMenu";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export class DynaGrid extends React.Component<DynaGridProps, State> {

    private updateState: StateUpdater = modifier => this.updateOnNewState(modifier(this.state));
    private pointerEventsController = new PointerEventsController(this.updateState)
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
        if (state.focusedLocation)
            state.focusedLocation = state.cellMatrix.validateLocation(state.focusedLocation)

        if (state.visibleRange && dataHasChanged)
            state = recalcVisibleRange(state)

        return {
            ...state,
            currentlyEditedCell: state.isFocusedCellInEditMode && state.focusedLocation ? { ...state.focusedLocation.cell } : undefined,
            cellTemplates: { ...state.cellTemplates, ...props.cellTemplates },
            customFocuses: props.customFocuses,
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
        const matrix = this.state.cellMatrix;
        return (
            <div
                className="dyna-grid"
                onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler}
                style={{ ...this.props.style }}
            >
                <div
                    className="dg-viewport"
                    ref={this.viewportElementRefHandler}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                        msUserSelect: 'none',
                        userSelect: 'none',
                        overflow: 'auto'
                    }}
                    onScroll={this.scrollHandler}

                >
                    <div
                        data-cy="dyna-grid"
                        className="dg-content"
                        style={{
                            width: matrix.width, height: matrix.height, position: 'relative', outline: 'none'
                        }}
                        onPointerDown={this.pointerDownHandler}
                        onCopy={this.copyHandler}
                        onCut={this.cutHandler}
                        onPaste={this.pasteHandler}
                        onPasteCapture={this.pasteCaptureHandler}
                        onContextMenu={this.handleContextMenu}
                    >
                        {matrix.frozenTopRange.height > 0 &&
                            <PaneRow
                                id='T'
                                state={this.state}
                                style={{ background: 'white', top: 0, position: 'sticky' }}
                                range={matrix.frozenTopRange}
                                borders={{ bottom: true }}
                                zIndex={3}
                            />}
                        {matrix.scrollableRange.height > 0 && this.state.visibleRange &&
                            <PaneRow
                                id='M'
                                state={this.state}
                                style={{ height: matrix.scrollableRange.height }}
                                range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows')}
                                borders={{}}
                                zIndex={0}
                            />}
                        {matrix.frozenBottomRange.height > 0 &&
                            <PaneRow
                                id='B'
                                state={this.state}
                                style={{ background: 'white', bottom: 0, position: 'sticky' }}
                                range={matrix.frozenBottomRange}
                                borders={{ top: true }}
                                zIndex={3}
                            />}
                        <input className="dg-hidden-element" readOnly={true} style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }} ref={this.hiddenElementRefHandler} />
                        <Line
                            linePosition={this.state.linePosition}
                            orientation={this.state.lineOrientation}
                            cellMatrix={this.state.cellMatrix}
                        />
                        <Shadow
                            shadowPosition={this.state.shadowPosition}
                            orientation={this.state.lineOrientation}
                            cellMatrix={this.state.cellMatrix}
                            shadowSize={this.state.shadowSize}
                        />
                        <ContextMenu
                            state={this.state}
                            onRowContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRowContextMenu ? this.props.onRowContextMenu(this.state.selectedIds, menuOptions) : []}
                            onColumnContextMenu={(_, menuOptions: MenuOption[]) => this.props.onColumnContextMenu ? this.props.onColumnContextMenu(this.state.selectedIds, menuOptions) : []}
                            onRangeContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRangeContextMenu ? this.props.onRangeContextMenu(this.state.selectedRanges, menuOptions) : []}
                            contextMenuPosition={this.state.contextMenuPosition}
                        />
                    </div>
                </div >
                {this.state.isFocusedCellInEditMode && this.state.currentlyEditedCell && <CellEditor state={this.state} />}
            </div>
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
