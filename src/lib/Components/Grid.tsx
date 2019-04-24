import * as React from "react";
import { CellMatrix } from "../Common/CellMatrix";
import { Behavior } from "../Common/Behavior";


interface GridProps {
    cellMatrix: CellMatrix;
    style?: React.CSSProperties;
    // TODO idea: render user focus together with cell? onCellRender
    //usersFocuses: { colIdx: number; rowIdx: number; color: string }[];
    onInitialized: (grid: GridController) => void;
    // TODO idea: collect changes from cells and return here
    onValuesChanged?: () => void;

    // onRemoveSelection?: (value: boolean) => void;
    // onContextMenu?: (selectedRanges, selectedRows) => MenuOption[];
}

class GridState {
    //cellMatrix!: CellMatrix;
    gridElement?: HTMLDivElement
    currentBehavior!: Behavior;
    selectedRanges: Range[] = [];
    focusedLocation?: Location;
    isFocusedCellInEditMode: boolean = false;
    visibleRange?: Range;
    minScrollTop: number = -1;
    maxScrollTop: number = -1;
    minScrollLeft: number = -1;
    maxScrollLeft: number = -1;
}

// INTERNAL
export class GridContext {
    constructor(private grid: Grid) { }
    get state(): GridState { return this.grid.state }
    setState(state: Partial<GridState>) { this.grid.setState(state as GridState) };
    commitChanges() { this.grid.props.onValuesChanged && this.grid.props.onValuesChanged() }
    hiddenFocusElement?: HTMLDivElement
}

// PUBLIC
export class GridController {
    constructor(private grid: Grid) { }
    print(title: string) { };
    // TODO export 
}

export class Grid extends React.Component<GridProps, GridState> {

    state = new GridState();

    private gridContext = new GridContext(this);

    static getDerivedStateFromProps(nextProps: GridProps, prevState: GridState) {
        return (prevState.gridElement) ?
            getVisibleCells(prevState.gridElement, nextProps.cellMatrix)
            :
            prevState;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        // TODO remove? this might be done by 
        //this.setState(getVisibleCells(this.state.gridElement, this.props.cellMatrix));
        this.props.onInitialized && this.props.onInitialized(new GridController(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
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

    render() {
        const matrix = this.props.cellMatrix;

        return (
            <div
                className="dyna-grid"
                ref={this.handleNewGridElementRef}
                style={{
                    ...this.props.style,
                    MozUserSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none',
                    // overflow: userIsMarkingGrid || columnIsMoving || rowIsMoving ? 'hidden' : 'auto'
                }}
                onScroll={this.handleScroll}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onCopy={this.handleCopy}
                onCut={this.handleCut}
                onPaste={this.handlePaste}
                data-cy="data-grid"
            >
                <div
                    style={{ width: matrix.contentWidth, height: matrix.contentHeight, position: 'relative' }}
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={/*this.state.focusedLocation &&*/ this.handleTouchStart}
                    onTouchEnd={this.handleTouchEnd}
                    onContextMenu={/*this.state.focusedLocation &&*/ this.handleContextMenu}
                    onDoubleClick={this.handleDoubleClick}
                    onClick={this.handleClick}
                >
                    {matrix.frozenTopRange.height > 0 &&
                        <PaneRow
                            style={{ top: 0, position: 'sticky', zIndex: zIndex.horizontalPane }}
                            range={matrix.frozenTopRange}
                            borders={{ bottom: true }}
                            matrix={matrix}
                        />}
                    {matrix.scrollableRange.height > 0 && this.state.visibleRange &&
                        <PaneRow
                            style={{ height: matrix.scrollableRange.height }}
                            range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows')}
                            borders={{}}
                            matrix={matrix}
                        />}
                    {matrix.frozenBottomRange.height > 0 &&
                        <PaneRow
                            style={{ bottom: 0, position: 'sticky', zIndex: zIndex.horizontalPane }}
                            range={matrix.frozenBottomRange}
                            borders={{ top: true }}
                            matrix={matrix}
                        />}
                    <div
                        className="hiddenFocusElement"
                        contentEditable={true}
                        style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }}
                        // onBlur={this.handleBlur}
                        onPaste={this.handlePasteOnHiddenElement}
                        ref={this.handleNewHiddenElementRef}
                    />
                    )}
                </div>
            </div>
        );
    }

    // renderMultiplePartialAreasForPane(area: Range[], pane: Range, style: React.CSSProperties) {
    //     let result = [];
    //     area.forEach(range => {
    //         if (range.first && range.last) {
    //             if (
    //                 !(
    //                     range.first.col.idx === this.state.focusedLocation.col.idx &&
    //                     range.first.row.idx === this.state.focusedLocation.row.idx &&
    //                     range.last.col.idx === this.state.focusedLocation.col.idx &&
    //                     range.last.row.idx === this.state.focusedLocation.row.idx
    //                 )
    //             ) {
    //                 let partialPane = this.renderPartialAreaForPane(range, pane, style);
    //                 partialPane && result.push([partialPane]);
    //             }
    //         }
    //     });
    //     return result;
    // }


    // all selected range


    // isClickInsideSelectedRange(e: React.MouseEvent<HTMLDivElement>): boolean {
    //     let isClickOnSelection = false;
    //     for (let range of this.state.selectedRanges) {
    //         const foc = this.getLocationOnScreen(e.clientX, e.clientY);
    //         const col = range.cols.some(col => col.idx === foc.col.idx);
    //         const rec = range.rows.some(row => row.idx === foc.row.idx);
    //         if (col && rec) {
    //             isClickOnSelection = true;
    //         }
    //     }
    //     return isClickOnSelection;
    // }


    // selectRows(selectedRowsIdx: number[]): Range[] {
    //     let selectedRows: Range[] = [];
    //     if (selectedRowsIdx.length > 0) {
    //         const { cellMatrix } = this.props;
    //         selectedRowsIdx.forEach(id => {
    //             let location = this.props.cellMatrix.getLocation(id + 1, cellMatrix.cols[0].idx);
    //             let range = this.props.cellMatrix.getRange(location, {
    //                 row: location.row,
    //                 col: cellMatrix.cols[cellMatrix.cols.length - 1]
    //             });
    //             selectedRows.push(range);
    //         });
    //     }
    //     return selectedRows;
    // }


    // isClickOutOfGrid(clientX, clientY): boolean {
    //     const gridCellsContainerRef = this.gridCellsContainerRef.getBoundingClientRect();
    //     let outOfGrid: boolean = false;
    //     if (
    //         clientY > gridCellsContainerRef.bottom ||
    //         clientY < gridCellsContainerRef.top ||
    //         clientX > gridCellsContainerRef.right ||
    //         clientX < gridCellsContainerRef.left
    //     ) {
    //         outOfGrid = true;
    //     }
    //     return outOfGrid;
    // }

    private handleNewGridElementRef = (gridElement: HTMLDivElement) => {
        // TODO do we need setTimout here due to setState inside ComponentDidMount?
        if (gridElement) { this.setState({ gridElement }) };
    }

    private handleNewHiddenElementRef = (hiddenFocusElement: HTMLDivElement) => {
        if (hiddenFocusElement) { this.gridContext.hiddenFocusElement = hiddenFocusElement };
    }

    private handleContextMenu = (e: any) => {
        e.preventDefault();
        //changeBehavior(new DrawContextMenuBehavior(new DefaultGridBehavior(this), this, e));
        e.persist();
    };

    private handleScroll = () => {
        refreshIfNeeded(this.gridContext);
    }

    private handleWindowResize = () => {
        refreshIfNeeded(this.gridContext);
    }



    // dataMatrix = () => {
    //     let cells = this.props.cellMatrix.cells;
    //     const data = [];
    //     cells.forEach((row, rIdx) => {
    //         if (rIdx < cells.length - 1) {
    //             let dataRow: string[] = [];
    //             row.forEach((col, cIdx) => {
    //                 if (cIdx > 0 && cIdx < row.length - 1) {
    //                     dataRow.push(col.value);
    //                 }
    //             });
    //             data.push(dataRow);
    //         }
    //     });
    //     return data;
    // };



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




    // private renderPartial(range: Range) {
    //     return this.renderMultiplePartialAreasForPane(this.state.selectedRanges, range, {
    //         border: '1px solid rgb(53, 121, 248)',
    //         backgroundColor: 'rgba(53, 121, 248, 0.1)'
    //     });
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

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleKeyDown(event);
    };

    private handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleKeyUp(event);
    };

    private handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleCopy(event);
    };

    private handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleCut(event);
    };

    private handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handlePaste(event);
    };

    private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleMouseDown(e);
    };

    private handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleClick(e);
    };

    private handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleTouchStart(e);
    };

    private handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleTouchEnd(e);
    };

    private handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        this.state.currentBehavior.handleDoubleClick(e);
    };

    // private handleBlur = (e: React.ClipboardEvent<HTMLDivElement>) => {
    //     if (this.state.isFocusedCellInEditMode) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // };

    private handlePasteOnHiddenElement = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
}
