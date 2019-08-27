import * as React from "react";
import { DynaGridProps, CellMatrix, PointerEvent, State, StateUpdater, MenuOption } from "../Common";
import { PaneRow } from "./PaneRow";
import { recalcVisibleRange, isBrowserIE, isBrowserEdge } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { CellEditor } from "./CellEditor";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { updateSelectedRows, updateSelectedColumns } from "../Functions/updateState";
import { ContextMenu } from "./ContextMenu";
import { Pane } from "./Pane";

export class DynaGrid extends React.Component<DynaGridProps, State> {

    private updateState: StateUpdater = modifier => this.updateOnNewState(modifier(this.state));
    private pointerEventsController = new PointerEventsController(this.updateState);
    private frozenTopScrollableElement!: HTMLDivElement;
    private frozenRightScrollableElement!: HTMLDivElement;
    private frozenBottomScrollableElement!: HTMLDivElement;
    private frozenLeftScrollableElement!: HTMLDivElement;
    state = new State(this.updateState);

    static getDerivedStateFromProps(props: DynaGridProps, state: State) {

        const dataHasChanged = state.cellMatrix && props.cellMatrixProps !== state.cellMatrix.props

        state = {
            ...state,
            // floatingCellEditor: props.floatingCellEditor,
            cellMatrix: new CellMatrix(props.cellMatrixProps)
        }

        if (state.selectionMode === 'row' && state.selectedIds.length > 0) {
            state = updateSelectedRows(state);
        } else if (state.selectionMode === 'column' && state.selectedIds.length > 0) {
            state = updateSelectedColumns(state);
        } else {
            state.selectedRanges = [...state.selectedRanges].map(range => state.cellMatrix.validateRange(range))
        }
        if (state.focusedLocation) {
            try {
                state.focusedLocation = state.cellMatrix.validateLocation(state.focusedLocation);
            } catch (error) {
                console.log(error);
            }
        }


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
            isBrowserIE() || isBrowserEdge() ? this.internetExplorerAndEdgeDynagrid() :
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
                            {matrix.scrollableRange.height > 0 && matrix.scrollableRange.first.col && matrix.scrollableRange.first.row && matrix.scrollableRange.last.row && this.state.visibleRange &&
                                <PaneRow
                                    id='M'
                                    state={this.state}
                                    style={{ height: matrix.scrollableRange.height }}
                                    range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows')}
                                    borders={{}}
                                    zIndex={0}
                                />}
                            {matrix.frozenBottomRange.height > 0 && matrix.rows.length > 1 &&
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

    private internetExplorerAndEdgeDynagrid() {
        const matrix = this.state.cellMatrix;
        const hiddenScrollableElement = this.state.hiddenScrollableElement;
        const isClickedOutOfGrid = (event: PointerEvent) => {
            const rightEmptySpace = hiddenScrollableElement.clientWidth - this.state.cellMatrix.width;
            const bottomEmptySpace = hiddenScrollableElement.clientHeight - this.state.cellMatrix.height;

            if (this.state.cellMatrix.width > hiddenScrollableElement.clientWidth) {
                if (event.clientX > hiddenScrollableElement.clientWidth + hiddenScrollableElement.getBoundingClientRect().left) return true;
            } else {
                if (event.clientX > hiddenScrollableElement.clientWidth - rightEmptySpace + hiddenScrollableElement.getBoundingClientRect().left) return true;
            }

            if (this.state.cellMatrix.height > hiddenScrollableElement.clientHeight) {
                if (event.clientY > hiddenScrollableElement.clientHeight + hiddenScrollableElement.getBoundingClientRect().top) return true;
            } else {
                if (event.clientY > hiddenScrollableElement.clientHeight - bottomEmptySpace + hiddenScrollableElement.getBoundingClientRect().top) return true;
            }
            return false;
        }

        return (
            <div
                className="dyna-grid-ie-edge"
                onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler}
                onPointerDown={this.pointerDownHandler}
                onCopy={this.copyHandler}
                onCut={this.cutHandler}
                onPaste={this.pasteHandler}
                onPasteCapture={this.pasteCaptureHandler}
                onContextMenu={this.handleContextMenu}
                style={{
                    ...this.props.style,
                    MozUserSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none',
                }}
            >
                <div
                    ref={((hiddenScrollableElement: HTMLDivElement) => (this.state as State).hiddenScrollableElement = hiddenScrollableElement)}
                    className="dg-hidden-scrollable-element"
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        overflowX: this.isHorizontalScrollbarVisible() ? 'scroll' : 'auto',
                        overflowY: this.isVerticalScrollbarVisible() ? 'scroll' : 'auto',
                        zIndex: 1
                    }}
                    onPointerDown={e => { if (isClickedOutOfGrid(e)) e.stopPropagation() }}
                    onScroll={this.scrollHandler}
                >
                    <div style={{ width: matrix.width, height: matrix.height }}></div>
                </div>
                {matrix.frozenTopRange.height > 0 && this.state.visibleRange && this.state.visibleRange.width > 0 &&
                    <div
                        className="dg-frozen-top"
                        style={{
                            position: 'absolute', top: 0,
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : matrix.frozenLeftRange.width + this.state.visibleRange.width + (matrix.frozenRightRange.width > 0 ? matrix.frozenRightRange.width : 0),
                            height: matrix.frozenTopRange.height,
                            background: '#fff',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    >
                        {matrix.frozenLeftRange.width > 0 &&
                            <Pane
                                id="TL"
                                state={this.state}
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                range={matrix.frozenLeftRange.slice(matrix.frozenTopRange, 'rows')}
                                borders={{}}
                            />
                        }
                        <div
                            ref={(frozenTopElement: HTMLDivElement) => this.frozenTopScrollableElement = frozenTopElement}
                            style={{
                                position: 'absolute', top: 0, left: matrix.frozenLeftRange.width,
                                width: `calc(100% - ${matrix.frozenLeftRange.width + matrix.frozenRightRange.width}px + 2px)`, height: 'calc(100% + 2px)',
                                overflow: 'hidden'
                            }}>
                            <Pane
                                id="TC"
                                state={this.state}
                                style={{
                                    width: matrix.width - matrix.frozenLeftRange.width - matrix.frozenRightRange.width + 2,
                                    paddingBottom: 100,
                                    overflowX: 'scroll', overflowY: 'hidden'
                                }}
                                range={matrix.frozenTopRange.slice(this.state.visibleRange, 'columns')}
                                borders={{}}
                            />
                        </div>
                        {matrix.frozenRightRange.width > 0 &&
                            <Pane
                                id="TR"
                                state={this.state}
                                style={{
                                    position: 'absolute', top: 0, right: 0
                                }}
                                range={matrix.frozenRightRange.slice(matrix.frozenTopRange, 'rows')}
                                borders={{}}
                            />
                        }
                    </div>
                }
                {matrix.scrollableRange.height > 0 && this.state.visibleRange && this.state.visibleRange.width > 0 &&
                    <div
                        style={{
                            position: 'absolute', top: matrix.frozenTopRange.height,
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : matrix.frozenLeftRange.width + this.state.visibleRange.width + (matrix.frozenRightRange.width > 0 ? matrix.frozenRightRange.width : 0),
                            height: this.isVerticalScrollbarVisible() ? this.state.viewportElement.clientHeight - matrix.frozenTopRange.height - matrix.frozenBottomRange.height : this.state.visibleRange.height,
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    >
                        {matrix.frozenLeftRange.width > 0 &&
                            <div
                                className="dg-frozen-left"
                                ref={(frozenLeftElement: HTMLDivElement) => this.frozenLeftScrollableElement = frozenLeftElement}
                                style={{
                                    position: 'absolute',
                                    width: matrix.frozenLeftRange.width, height: '100%',
                                    overflow: 'hidden'
                                }}>
                                <Pane
                                    id="ML"
                                    state={this.state}
                                    style={{
                                        height: matrix.height,
                                        background: '#fff',
                                        overflowX: 'hidden', overflowY: 'scroll',
                                        paddingRight: 100
                                    }}
                                    range={matrix.frozenLeftRange.slice(matrix.scrollableRange.slice(this.state.visibleRange, 'rows'), 'rows')}
                                    borders={{}}
                                />
                            </div>
                        }
                        {matrix.frozenRightRange.width > 0 &&
                            <div
                                className="dg-frozen-right"
                                ref={(frozenRightElement: HTMLDivElement) => this.frozenRightScrollableElement = frozenRightElement}
                                style={{
                                    position: 'absolute', right: 0,
                                    width: matrix.frozenRightRange.width, height: '100%',
                                    overflow: 'hidden'
                                }}
                            >
                                <Pane
                                    id="MR"
                                    state={this.state}
                                    style={{
                                        height: matrix.height,
                                        background: '#fff',
                                        paddingRight: 100,
                                        overflowX: 'hidden', overflowY: 'scroll'
                                    }}
                                    range={matrix.frozenRightRange.slice(matrix.scrollableRange.slice(this.state.visibleRange, 'rows'), 'rows')}
                                    borders={{}}
                                />
                            </div>
                        }
                    </div>
                }
                {matrix.frozenBottomRange.height > 0 && this.state.visibleRange && this.state.visibleRange.width > 0 && matrix.rows.length > 1 &&
                    <div
                        className="dg-frozen-bottom"
                        style={{
                            position: 'absolute',
                            bottom: this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : (!this.isVerticalScrollbarVisible() ? `calc(100% - ${matrix.frozenTopRange.height + this.state.visibleRange.height + matrix.frozenBottomRange.height}px)` : 0),
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : matrix.frozenLeftRange.width + this.state.visibleRange.width + (matrix.frozenRightRange.width > 0 ? matrix.frozenRightRange.width : 0),
                            height: matrix.frozenBottomRange.height,
                            background: '#fff',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}>
                        {matrix.frozenLeftRange.width > 0 &&
                            <Pane
                                id="BL"
                                state={this.state}
                                style={{ position: 'absolute', bottom: 0, left: 0 }}
                                range={matrix.frozenLeftRange.slice(matrix.frozenBottomRange, 'rows')}
                                borders={{}}
                            />
                        }
                        {this.state.visibleRange && this.state.visibleRange.width > 0 &&
                            <div
                                ref={(frozenBottomElement: HTMLDivElement) => this.frozenBottomScrollableElement = frozenBottomElement}
                                style={{
                                    position: 'absolute', bottom: 0, left: matrix.frozenLeftRange.width,
                                    width: `calc(100% - ${matrix.frozenLeftRange.width + matrix.frozenRightRange.width}px)`, height: matrix.frozenBottomRange.height,
                                    overflow: 'hidden'
                                }}>
                                <Pane
                                    id="BC"
                                    state={this.state}
                                    style={{
                                        width: matrix.scrollableRange.width + 2,
                                        paddingBottom: 100,
                                        overflowX: 'scroll', overflowY: 'hidden'
                                    }}
                                    range={matrix.frozenBottomRange.slice(this.state.visibleRange, 'columns')}
                                    borders={{}}
                                />
                            </div>
                        }
                        {matrix.frozenRightRange.width > 0 &&
                            <Pane
                                id="BR"
                                state={this.state}
                                style={{ position: 'absolute', bottom: 0, right: 0 }}
                                range={matrix.frozenRightRange.slice(matrix.frozenBottomRange, 'rows')}
                                borders={{}}
                            />
                        }
                    </div>
                }
                <div
                    className="dg-viewport"
                    ref={this.viewportElementRefHandler}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: (this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : 0), bottom: (this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : 0),
                        overflow: 'hidden'
                    }}
                >
                    <div
                        data-cy="dyna-grid"
                        className="dg-content"
                        style={{ width: matrix.width, height: matrix.height }}
                    >
                        {matrix.scrollableRange.height > 0 && matrix.scrollableRange.first.col && matrix.scrollableRange.first.row && matrix.scrollableRange.last.row && this.state.visibleRange &&
                            <Pane
                                id="MC"
                                state={this.state}
                                style={{
                                    position: 'absolute', top: matrix.frozenTopRange.height, left: matrix.frozenLeftRange.width,
                                    width: this.isHorizontalScrollbarVisible() ? matrix.width : this.state.visibleRange.width,
                                    height: this.isVerticalScrollbarVisible() ? matrix.height : this.state.visibleRange.height,
                                }}
                                range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows').slice(this.state.visibleRange, 'columns')}
                                borders={{ right: false, bottom: false }}
                            />
                        }
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
            </div >
        );
    }

    private isHorizontalScrollbarVisible(): boolean {
        return this.state.hiddenScrollableElement && this.state.cellMatrix.width > this.state.hiddenScrollableElement.clientWidth;
    }

    private isVerticalScrollbarVisible(): boolean {
        return this.state.hiddenScrollableElement && this.state.cellMatrix.height > this.state.hiddenScrollableElement.clientHeight;
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
        const { scrollTop, scrollLeft } = isBrowserIE() || isBrowserEdge() ? this.state.hiddenScrollableElement : this.state.viewportElement;
        if (
            scrollTop < this.state.minScrollTop || scrollTop > this.state.maxScrollTop ||
            scrollLeft < this.state.minScrollLeft || scrollLeft > this.state.maxScrollLeft
        ) {
            this.updateOnNewState(recalcVisibleRange(this.state));
        }

        if (isBrowserIE() || isBrowserEdge()) {
            if (this.frozenTopScrollableElement) {
                this.frozenTopScrollableElement.scrollLeft = this.state.hiddenScrollableElement.scrollLeft;
            }
            if (this.frozenBottomScrollableElement) {
                this.frozenBottomScrollableElement.scrollLeft = scrollLeft;
            }
            if (this.frozenLeftScrollableElement) {
                this.frozenLeftScrollableElement.scrollTop = scrollTop;
            }
            if (this.frozenRightScrollableElement) {
                this.frozenRightScrollableElement.scrollTop = scrollTop;
            }
            if (this.state.viewportElement && this.state.hiddenScrollableElement) {
                this.state.viewportElement.scrollTop = scrollTop;
                this.state.viewportElement.scrollLeft = scrollLeft;
            }
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
