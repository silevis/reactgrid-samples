import * as React from "react";
import { GridContext, DynaGridProps, CellMatrix } from "../Common";
import { Range, Location, SelectionMode, } from "../Common";
import { PaneRow } from "./PaneRow";
import { recalcVisibleRange } from "../Functions";
import { KeyboardEvent, ClipboardEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";


export class GridState {

    cellMatrix!: CellMatrix;
    // SELECTION
    selectionMode: SelectionMode = 'range';
    selectedRanges: Range[] = [];
    selectedIndexes: number[] = [];
    focusedLocation?: Location;
    activeSelectedRangeIdx: number = -1;
    isFocusedCellInEditMode: boolean = false;
    // VISIBLE RANGE
    visibleRange?: Range;
    minScrollTop: number = -1;
    maxScrollTop: number = -1;
    minScrollLeft: number = -1;
    maxScrollLeft: number = -1;
}

export class DynaGrid extends React.Component<DynaGridProps, GridState> {

    private gridContext = new GridContext(this);
    private pointerEventsController = new PointerEventsController(this.gridContext)

    state = new GridState();

    static getDerivedStateFromProps(props: DynaGridProps, state: GridState) {
        //if (props.cellMatrixProps)
        return { ...state, cellMatrix: new CellMatrix(props.cellMatrixProps) };
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
                    onPointerDown={this.pointerEventsController.handlePointerDown}
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
                            gridContext={this.gridContext}
                            style={{ background: 'white', top: 0, position: 'sticky' }}
                            range={matrix.frozenTopRange}
                            borders={{ bottom: true }}
                            zIndex={3}
                        />}
                    {matrix.scrollableRange.height > 0 && this.state.visibleRange &&
                        <PaneRow
                            id='M'
                            gridContext={this.gridContext}
                            style={{ height: matrix.scrollableRange.height }}
                            range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows')}
                            borders={{}}
                            zIndex={0}
                        />}
                    {matrix.frozenBottomRange.height > 0 &&
                        <PaneRow
                            id='B'
                            gridContext={this.gridContext}
                            style={{ background: 'white', bottom: 0, position: 'sticky' }}
                            range={matrix.frozenBottomRange}
                            borders={{ top: true }}
                            zIndex={3}
                        />}
                    {this.gridContext.currentBehavior.renderGlobalPart && this.gridContext.currentBehavior.renderGlobalPart()}
                    <input className="dg-hidden-element" readOnly={true} style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }} ref={this.hiddenElementRefHandler} />
                </div>
            </div >
        );
    }

    private viewportElementRefHandler = (viewportElement: HTMLDivElement) => {
        this.gridContext.viewportElement = viewportElement;
        recalcVisibleRange(this.gridContext);
    }

    private hiddenElementRefHandler = (hiddenFocusElement: HTMLInputElement) => {
        this.gridContext.hiddenFocusElement = hiddenFocusElement;
    }

    private pasteCaptureHandler = (event: ClipboardEvent) => {
        const htmlData = event.clipboardData!.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            event.bubbles = false;
        }
    }

    private scrollHandler = () => {
        const { scrollTop, scrollLeft } = this.gridContext.viewportElement;
        if (
            scrollTop < this.state.minScrollTop || scrollTop > this.state.maxScrollTop ||
            scrollLeft < this.state.minScrollLeft || scrollLeft > this.state.maxScrollLeft
        ) {
            recalcVisibleRange(this.gridContext);
        }
    }

    private windowResizeHandler = () => {
        recalcVisibleRange(this.gridContext);
    }

    keyDownHandler = (event: KeyboardEvent) => this.gridContext.currentBehavior.handleKeyDown(event);
    keyUpHandler = (event: KeyboardEvent) => this.gridContext.currentBehavior.handleKeyUp(event);
    copyHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handleCopy(event);
    pasteHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handlePaste(event);
    cutHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handleCut(event);
    handleContextMenu = (event: React.MouseEvent) => this.gridContext.currentBehavior.handleContextMenu(event);
}



