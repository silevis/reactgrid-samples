import * as React from "react";
import { DynaGridProps, CellMatrix, PointerEvent, State, StateUpdater, MenuOption } from "../Common";
import { PaneRow } from "./PaneRow";
import { recalcVisibleRange } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { CellEditor } from "./CellEditor";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { updateFocusedLocation, updateSelectedRows, updateSelectedColumns, updateSelectedRanges } from "../Functions/updateState";
import { getActiveSelectedRange } from "../Functions/getActiveSelectedRange";
import { ContextMenu } from "./ContextMenu";

export class DynaGrid extends React.Component<DynaGridProps, State> {

    private updateState: StateUpdater = modifier => this.updateOnNewState(modifier(this.state));
    private pointerEventsController = new PointerEventsController(this.updateState)
    state = new State(this.updateState);

    static getDerivedStateFromProps(props: DynaGridProps, state: State) {

        state = {
            ...state,
            cellMatrix: new CellMatrix(props.cellMatrixProps)
        }

        if (state.selectionMode === 'row') {
            state = updateSelectedRows(state);
        } else if (state.selectionMode === 'column') {
            state = updateSelectedColumns(state);
        } else {
            state = updateSelectedRanges(state)
        }

        state = updateFocusedLocation(state)


        return {
            ...state,
            currentlyEditedCell: state.isFocusedCellInEditMode && state.focusedLocation ? { ...state.focusedLocation.cell } : undefined,
            cellTemplates: { ...state.cellTemplates, ...props.cellTemplates },
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
                className="dyna-grid dg-viewport"
                ref={this.viewportElementRefHandler}
                style={{
                    ...this.props.style,
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
                    onContextMenu={this.handleContextMenu}
                    onKeyDown={this.keyDownHandler}
                    onKeyUp={this.keyUpHandler}
                    onCopy={this.copyHandler}
                    onCut={this.cutHandler}
                    onPaste={this.pasteHandler}
                    onPasteCapture={this.pasteCaptureHandler}
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
                    {this.state.isFocusedCellInEditMode && this.state.currentlyEditedCell && <CellEditor state={this.state} />}
                    <Line linePosition={this.state.linePosition} orientation={this.state.lineOrientation} cellMatrix={this.state.cellMatrix} />
                    <Shadow shadowPosition={this.state.shadowPosition}
                        orientation={this.state.lineOrientation}
                        cellMatrix={this.state.cellMatrix}
                        shadowSize={this.state.shadowSize}
                        verticalOffset={this.state.viewportElement ? this.state.viewportElement.offsetTop : 0}
                        horizontalOffset={this.state.viewportElement ? this.state.viewportElement.offsetLeft : 0}
                    />
                    <ContextMenu
                        state={this.state}
                        onRowContextMenu={(_, menuOptions: MenuOption[]) => this.props.onRowContextMenu ? this.props.onRowContextMenu(this.state.selectedIds, menuOptions) : []}
                        onColumnContextMenu={(_, menuOptions: MenuOption[]) => this.props.onColumnContextMenu ? this.props.onColumnContextMenu(this.state.selectedIds, menuOptions) : []}
                        contextMenuPosition={this.state.contextMenuPosition}
                    />
                </div>
            </div >
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
