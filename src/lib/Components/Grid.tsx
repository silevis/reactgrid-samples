import * as React from "react";
import { GridContext, GridController, CellMatrix } from "../Common";
import { Range, Location, SelectionMode, Behavior, zIndex, BehaviorDelegate } from "../Common";
import { PaneRow } from "./PaneRow";
import { getVisibleCells, refreshIfNeeded } from "../Functions";

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



export class GridState {
    gridElement!: HTMLDivElement;
    currentBehavior!: Behavior;
    // SELECTION
    selectionMode: SelectionMode = 'ranges';
    selectedRanges: Range[] = [];
    selectedIndexes: number[] = [];
    focusedLocation?: Location;
    focusedSelectedRangeIdx: number = 0;
    isFocusedCellInEditMode: boolean = false;
    // VISIBLE RANGE
    visibleRange?: Range;
    minScrollTop: number = -1;
    maxScrollTop: number = -1;
    minScrollLeft: number = -1;
    maxScrollLeft: number = -1;
}

export class Grid extends React.Component<GridProps, GridState> {

    state = new GridState();

    private gridContext = new GridContext(this);

    static getDerivedStateFromProps(nextProps: GridProps, prevState: GridState) {
        return (prevState.gridElement) ?
            getVisibleCells(prevState.gridElement, nextProps.cellMatrix) : prevState;
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
        const delegate = new BehaviorDelegate(this.gridContext);

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
                onKeyDown={delegate.handleKeyDown}
                onKeyUp={delegate.handleKeyUp}
                onCopy={delegate.handleCopy}
                onCut={delegate.handleCut}
                onPaste={delegate.handlePaste}
                data-cy="data-grid"
            >
                <div
                    style={{ width: matrix.contentWidth, height: matrix.contentHeight, position: 'relative' }}
                    onMouseDown={delegate.handleMouseDown}
                    onTouchStart={delegate.handleTouchStart}
                    onTouchEnd={delegate.handleTouchEnd}
                    onContextMenu={this.handleContextMenu}
                    onDoubleClick={delegate.handleDoubleClick}
                    onClick={delegate.handleClick}
                >
                    {matrix.frozenTopRange.height > 0 &&
                        <PaneRow
                            gridContext={this.gridContext}
                            style={{ top: 0, position: 'sticky', zIndex: zIndex.horizontalPane }}
                            range={matrix.frozenTopRange}
                            borders={{ bottom: true }}
                        />}
                    {matrix.scrollableRange.height > 0 && this.state.visibleRange &&
                        <PaneRow
                            gridContext={this.gridContext}
                            style={{ height: matrix.scrollableRange.height }}
                            range={matrix.scrollableRange.slice(this.state.visibleRange, 'rows')}
                            borders={{}}
                        />}
                    {matrix.frozenBottomRange.height > 0 &&
                        <PaneRow
                            gridContext={this.gridContext}
                            style={{ bottom: 0, position: 'sticky', zIndex: zIndex.horizontalPane }}
                            range={matrix.frozenBottomRange}
                            borders={{ top: true }}
                        />}
                    <div
                        className="hiddenFocusElement"
                        contentEditable={true}
                        style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }}
                        // onBlur={this.handleBlur}
                        onPaste={this.handlePasteOnHiddenElement}
                        ref={this.handleNewHiddenElementRef}
                    />
                    {this.state.currentBehavior.renderGlobalPart()}
                </div>
            </div>
        );
    }

    private handleNewGridElementRef = (gridElement: HTMLDivElement) => {
        // TODO do we need setTimout here due to setState inside ComponentDidMount?
        if (gridElement) { this.setState({ gridElement }) };
    }

    private handleNewHiddenElementRef = (hiddenFocusElement: HTMLDivElement) => {
        if (hiddenFocusElement) { this.gridContext.hiddenFocusElement = hiddenFocusElement };
    }

    private handleContextMenu = (event: any) => {
        /*this.state.focusedLocation &&*/
        event.preventDefault();
        //changeBehavior(new DrawContextMenuBehavior(new DefaultGridBehavior(this), this, e));
        event.persist();
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


    // private handleBlur = (event: React.ClipboardEvent<HTMLDivElement>) => {
    //     if (this.state.isFocusedCellInEditMode) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // };

    private handlePasteOnHiddenElement = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
}
