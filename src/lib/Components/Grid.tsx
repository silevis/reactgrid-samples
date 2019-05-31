import * as React from "react";
import { GridContext, GridController, CellMatrix } from "../Common";
import { Range, Location, SelectionMode, } from "../Common";
import { PaneRow } from "./PaneRow";
import { refresh } from "../Functions";
import { KeyboardEvent, ClipboardEvent, PointerEvent } from "../Common";
import { PointerEventsController } from "../Common/PointerEventsController";
import { FillHandle } from "./FillHandle";
import { timingSafeEqual } from "crypto";


interface GridProps {
    cellMatrix: CellMatrix;
    style?: React.CSSProperties;
    // TODO idea: render user focus together with cell? onCellRender
    //usersFocuses: { colIdx: number; rowIdx: number; color: string }[];
    onInitialized?: (grid: GridController) => void;
    // TODO idea: collect changes from cells and return here
    onValuesChanged?: () => void;
    // onRemoveSelection?: (value: boolean) => void;
    // onContextMenu?: (selectedRanges, selectedRows) => MenuOption[];
}



export class GridState {

    viewportElement?: HTMLDivElement = undefined;
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

export class Grid extends React.Component<GridProps, GridState> {

    private gridContext = new GridContext(this);

    private pointerEventsController = new PointerEventsController(this.gridContext)

    state = new GridState();

    // static getDerivedStateFromProps(props: GridProps, state: GridState): GridState {

    //     if (!state.viewportElement)
    //         return state;

    //     const matrix = props.cellMatrix;
    //     const { scrollTop, scrollLeft, clientWidth, clientHeight } = state.viewportElement;
    //     const scrollAreaWidth = clientWidth - matrix.frozenLeftRange.width - matrix.frozenRightRange.width;
    //     const scrollAreaHeight = clientHeight - matrix.frozenTopRange.height - matrix.frozenBottomRange.height;
    //     // TODO improve calculation of visibleCols & visibleRows
    //     const visibleCols = matrix.scrollableRange.cols.filter(
    //         col => col.right >= scrollLeft && col.left <= scrollLeft + scrollAreaWidth
    //     );
    //     const visibleRows = matrix.scrollableRange.rows.filter(
    //         row => row.bottom >= scrollTop && row.top <= scrollTop + scrollAreaHeight
    //     );
    //     const visibleRange = new Range(visibleCols, visibleRows);

    //     return ({
    //         ...state,
    //         minScrollLeft: visibleRange.first.col.left,
    //         maxScrollLeft: visibleRange.last.col.right - scrollAreaWidth,
    //         minScrollTop: visibleRows.length > 0 ? visibleRange.first.row.top : 0,
    //         maxScrollTop: visibleCols.length > 0 ? visibleRange.last.row.bottom - scrollAreaHeight : 0,
    //         visibleRange: visibleRange,
    //     });

    // }

    componentDidMount() {
        window.addEventListener('resize', this.windowResizeHandler);
        this.props.onInitialized && this.props.onInitialized(new GridController(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandler);
    }

    componentDidUpdate(oldprops: GridProps) {
        // const cellMatrix = this.props.cellMatrix;
        // this.forceNewFocusLocation(oldprops);
        // if (!(this.state.currentBehavior instanceof DefaultGridBehavior)) {
        //     return;
        // }
        // if (
        //     !cellMatrix.getRange(cellMatrix.first, cellMatrix.last).contains(this.state.focusedLocation) &&
        //     this.state.focusedLocation
        // ) {
        //     const location: Location = {
        //         row: cellMatrix.rows[1],
        //         col: cellMatrix.cols[1]
        //     };
        //     this.focusLocation(location, true);
        //     this.hiddenFocusElement.focus();
        // }

        // if (!this.validateSelection(oldprops)) {
        //     const { focusedLocation } = this.state;
        //     if (focusedLocation != null) {
        //         if (
        //             !this.props.cellMatrix.rows.find(r => r.idx === focusedLocation.row.idx) ||
        //             !this.props.cellMatrix.cols.find(r => r.idx === focusedLocation.col.idx)
        //         ) {
        //             return;
        //         }
        //         const cell = this.props.cellMatrix.getCell(focusedLocation);
        //         // cell.onFocusChanged(focusedLocation);
        //     }
        // }
    }

    handlePasteCapture(e: React.ClipboardEvent<HTMLDivElement>) {
        const htmlData = e.clipboardData!.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            e.bubbles = false;
        }
    }

    render() {
        const matrix = this.props.cellMatrix;
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
                data-cy="dyna-grid"
            >
                <div
                    // this tabIndex attracts 
                    tabIndex={0}
                    className="dg-content"
                    style={{ width: matrix.width, height: matrix.height, position: 'relative', outline: 'none' }}
                    onPointerDown={this.pointerEventsController.handlePointerDown}
                    onContextMenu={this.handleContextMenu}
                    onKeyDown={this.keyDownHandler}
                    onKeyUp={this.keyUpHandler}
                    onCopy={this.copyHandler}
                    onCut={this.cutHandler}
                    onPaste={this.pasteHandler}
                    onPasteCapture={this.handlePasteCapture}
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
                    <div
                        className="dg-hidden-focus-element"
                        contentEditable={true}
                        style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }}
                        onBlur={() => console.log('HFE: blur')}
                        onFocus={() => console.log('HFE: focus')}
                        onPaste={this.handlePasteOnHiddenElement}
                        ref={this.hiddenElementRefHandler}
                    />
                    {/* {this.state.currentBehavior.renderGlobalPart && this.state.currentBehavior.renderGlobalPart()} */}
                </div>
            </div>
        );
    }

    private viewportElementRefHandler = (viewportElement: HTMLDivElement) => {
        this.gridContext.viewportElement = viewportElement;
        refresh(this.gridContext);
    }
    private hiddenElementRefHandler = (hiddenFocusElement: HTMLDivElement) => {
        this.gridContext.hiddenFocusElement = hiddenFocusElement;
    }

    private scrollHandler = () => {
        const { scrollTop, scrollLeft } = this.gridContext.viewportElement;
        if (
            scrollTop < this.state.minScrollTop || scrollTop > this.state.maxScrollTop ||
            scrollLeft < this.state.minScrollLeft || scrollLeft > this.state.maxScrollLeft
        ) {
            refresh(this.gridContext);
        }
    }

    private windowResizeHandler = () => {
        refresh(this.gridContext);
    }

    private handlePasteOnHiddenElement = (event: ClipboardEvent) => {
        event.preventDefault();
    };

    keyDownHandler = (event: KeyboardEvent) => this.gridContext.currentBehavior.handleKeyDown(event);
    keyUpHandler = (event: KeyboardEvent) => this.gridContext.currentBehavior.handleKeyUp(event);
    copyHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handleCopy(event);
    pasteHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handlePaste(event);
    cutHandler = (event: ClipboardEvent) => this.gridContext.currentBehavior.handleCut(event);
    handleContextMenu = (event: React.MouseEvent) => this.gridContext.currentBehavior.handleContextMenu(event);


    // private validateSelection(oldprops: GridProps) {
    //     const { selectedRanges } = this.state;

    //     for (let idx = 0; idx < selectedRanges.length; idx++) {
    //         const selectedRange = selectedRanges[idx];
    //         if (selectedRange) {
    //             if (!selectedRange.first || !selectedRange.last) {
    //                 return false;
    //             }

    //             const newRange = this.props.cellMatrix.getRange(selectedRange.first, selectedRange.last);
    //             const oldRange = oldprops.cellMatrix.getRange(selectedRange.first, selectedRange.last);
    //             let validationResult = true;
    //             selectedRange.rows.forEach((_, idx) => {
    //                 if (validationResult) {
    //                     if (!oldRange.rows[idx].context.record || !newRange.rows[idx].context.record) {
    //                         if (
    //                             !newRange.rows[idx].context.record &&
    //                             oldRange.rows[idx].context.record !== newRange.rows[idx].context.record
    //                         ) {
    //                             validationResult = false;
    //                         }
    //                     } else {
    //                         if (oldRange.rows[idx].context.record.id !== newRange.rows[idx].context.record.id) {
    //                             validationResult = false;
    //                         }
    //                     }
    //                 }
    //             });
    //             if (!validationResult) {
    //                 return validationResult;
    //             }
    //             selectedRange.cols.forEach((_, idx) => {
    //                 if (validationResult) {
    //                     if (!oldRange.cols[idx].context || !newRange.cols[idx].context) {
    //                         if (oldRange.cols[idx].context !== newRange.cols[idx].context) {
    //                             validationResult = false;
    //                         }
    //                     } else {
    //                         if (oldRange.cols[idx].context.idx !== newRange.cols[idx].context.idx) {
    //                             validationResult = false;
    //                         }
    //                     }
    //                 }
    //             });
    //             return validationResult;
    //         }
    //     }
    // }



    // private forceNewFocusLocation(oldProps: GridProps) {
    //     const cellMatrix = this.props.cellMatrix;
    //     if (cellMatrix.focusLocation && cellMatrix.focusLocation !== oldProps.cellMatrix.focusLocation) {
    //         const focusLocation = cellMatrix.focusLocation;
    //         if (
    //             this.state.focusedLocation &&
    //             (this.state.focusedLocation.row.idx !== focusLocation.rowIdx ||
    //                 this.state.focusedLocation.col.idx !== focusLocation.colIdx)
    //         ) {
    //             const location: Location = {
    //                 row: cellMatrix.rows[focusLocation.rowIdx],
    //                 col: cellMatrix.cols[focusLocation.colIdx]
    //             };
    //             location.row && this.focusLocation(location);
    //             this.hiddenFocusElement.focus();
    //         }
    //     }
    // }


    // private handleBlur = (event: React.ClipboardEvent<HTMLDivElement>) => {
    //     if (this.state.isFocusedCellInEditMode) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // };
}



