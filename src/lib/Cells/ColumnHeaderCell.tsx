import * as React from 'react';
import { stopPropagationEventHandler } from './handleEvents';
import './Cell.css';
import { Cell, CellProps, Location, CellMatrix, GridContext, CellData } from '../Common';
import { getLocationFromClient, changeBehavior } from '../Functions';
import { ColumnSelectionBehavior } from '../Behaviors/ColumnSelectionBehavior';

export interface HeaderCellProps extends CellProps {
    shouldStartReorder: boolean;
    shouldStartColResize: boolean;
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    enableCheckBox: boolean;
    checkBoxValue?: boolean;
    readonly setCheckBoxValue?: (value: boolean) => void;
}

export let headerCellTouchStartTime: number;

interface HeaderCellState {
    isResizerHover: boolean;
    checked: boolean;
    visibleCheckBox: boolean;
    checkboxFocused: boolean;
}

export class ColumnHeaderCell implements Cell {
    private readonly resizeDivWidth = 4;
    cellData: CellData;
    isReadOnly = false;

    constructor(
        value: string,
        private onValueChanged: (value: string) => boolean,
    ) {
        this.cellData = { textValue: value, data: value, type: 'string' }
    }

    trySetData(cellData: CellData) {
        return this.onValueChanged(cellData.textValue);
    }

    render: (props: HeaderCellProps) => React.ReactNode = (props) => {

        const [resizerHover, setResizerHover] = React.useState(false);
        const [checked, setChecked] = React.useState(false);
        const [checkboxFocused, setCheckboxFocused] = React.useState(false);

        const orientationAllowsResizing = () => {
            // return props.orientation === 'horizontal' || props.orientation === 'full-dimension';
        }

        const nameIsNullOrEmpty = (name: string) => {
            return !name || !name.trim();
        }


        const cellValue = props.cellData.data === 'columnHeader' ? props.cellData.data : props.cellData.textValue;
        let style = {
            background: '#eee',
            cursor: 'default',
            // props.isSelected &&
            //     props.gridContext.cellMatrix.first.row.idx !== 0 &&
            //     props.gridContext.cellMatrix.first.col.idx !== 0
            //     ? '-webkit-grab'
            //     : 'default',
            paddingRight: 0
        };
        let mergedStyle = Object.assign({}, props.attributes.style, style);
        let innerStyle = {
            background: '#eee',
            cursor: /*props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
            display: 'flex',
            justifyContent: 'space-between',
            width: `calc(100% - ${this.resizeDivWidth}px)`,
            alignItems: 'center'
        };
        return (
            <div
                key={props.cellKey}
                className="dg-header-cell"
                {...(props.attributes, { style: mergedStyle })}
                onPointerDown={event => {
                    changeBehavior(props.gridContext, new ColumnSelectionBehavior(props.gridContext));
                    // e.stopPropagation();
                    // if (props.orientation === 'horizontal') {
                    //     props.gridContext.state.currentBehavior.handlePointerDown(e, 'column')
                    // } else if (props.orientation === 'vertical') {
                    //     props.gridContext.state.currentBehavior.handlePointerDown(e, 'row')
                    // }
                    // props.gridContext.state.currentBehavior.handlePointerDown(e)
                }}
            // onMouseDown={e => {
            //     e.stopPropagation();
            //     if (this.mouseEvent) {
            //         this.handleMouseDownClickAndTouchStart(e);
            //     }
            // }}
            // onTouchStart={e => {
            //     this.handleMouseDownClickAndTouchStart(e);
            // }}
            // onTouchEnd={() => {
            //     this.mouseEvent = false;
            // }}
            // onClick={e => {
            //     e.stopPropagation();
            //     if (!this.mouseEvent) {
            //         this.handleMouseDownClickAndTouchStart(e);
            //     }
            //     this.mouseEvent = true;
            // }}
            // onDoubleClick={e => {
            //     if (props.isReadOnly) {
            //         e.stopPropagation();
            //     }
            // }}
            >
                <div style={innerStyle}>
                    {props.isInEditMode && (
                        <input
                            onBlur={e => {
                                if (
                                    !nameIsNullOrEmpty(e.currentTarget.value) &&
                                    e.currentTarget.value !== cellValue
                                ) {
                                    this.onValueChanged(e.currentTarget.value);
                                    props.gridContext.commitChanges();
                                }
                                // props.setEditMode(false);
                            }}
                            onKeyDown={e => { }/*handleKeyDown(e, this.props)*/}
                            onCopy={stopPropagationEventHandler}
                            onCut={stopPropagationEventHandler}
                            onPaste={stopPropagationEventHandler}
                            style={{
                                width: props.attributes.style!.width,
                                height: props.attributes.style!.height,
                                border: 0,
                                fontSize: 16,
                                outline: 'none'
                            }}
                            ref={input => {
                                if (input) {
                                    input.focus();
                                    input.setSelectionRange(input.value.length, input.value.length);
                                }
                            }}
                            defaultValue={cellValue}
                        />
                    )}
                    {/* {props.children} && */   <div style={{ overflow: 'hidden' }}>{cellValue}</div>}
                    {/* {props.children} */}
                </div>
                {/* {props.shouldStartColResize && orientationAllowsResizing() && (
                    <div
                        data-cy="touch-resize-button"
                        onTouchStart={e => {
                            this.startResizingColumn(e);
                            setResizerHover(true);
                        }}
                        onTouchEnd={() => setResizerHover(true)}
                        style={{
                            position: 'relative',
                            right: 0,
                            width: 10,
                            height: props.attributes.style!.height
                        }}
                    >
                        <div
                            onMouseDown={e => this.startResizingColumn(e)}
                            onClick={e => e.stopPropagation()}
                            onMouseEnter={() => setResizerHover(true)}
                            onMouseOut={() => setResizerHover(true)}
                            style={{
                                width: this.resizeDivWidth,
                                height: props.attributes.style!.height,
                                cursor: resizerHover ? 'w-resize' : 'default',
                                background: resizerHover ? '#3498db' : '#eee',
                                position: 'absolute',
                                right: 0
                            }}
                        />
                    </div>
                )} */}
            </div>
        );
    }

    // const setCheckBoxValue => (value: boolean) {
    //     this.setState({ checked: value });
    // }

    //     private handleMouseDownClickAndTouchStart(e: any) {
    //         const positionX =
    //             e.type === 'mousedown' || e.type === 'click'
    //                 ? e.clientX
    //                 : e.type === 'touchstart'
    //                     ? e.changedTouches[0].clientX
    //                     : null;
    //         const positionY =
    //             e.type === 'mousedown' || e.type === 'click'
    //                 ? e.clientY
    //                 : e.type === 'touchstart'
    //                     ? e.changedTouches[0].clientY
    //                     : null;
    //         const locationOfCell = getLocationFromClient(props.gridContext, positionX, positionY);
    //         const isItTheSameCell = props.gridContext.state.focusedLocation
    //             ? props.gridContext.state.focusedLocation.row.idx === locationOfCell.row.idx &&
    //             props.gridContext.state.focusedLocation.col.idx === locationOfCell.col.idx
    //             : null;

    //         if (isItTheSameCell && props.gridContext.state.isFocusedCellInEditMode) {
    //             return;
    //         }
    //         const selRange = props.gridContext.state.selectedRanges[props.gridContext.state.activeSelectedRangeIdx]
    //         const cellMatrix = props.gridContext.cellMatrix;

    //         if (e.type === 'touchstart') {
    //             headerCellTouchStartTime = new Date().getTime();
    //         }

    //         if (e.type === 'mousedown' || e.type === 'touchstart') {
    //             if (selRange && selRange.contains(locationOfCell) && !e.ctrlKey) {
    //                 if (props.shouldStartReorder) {
    //                     // if (props.orientation === 'horizontal') {
    //                     // changeBehavior(props.gridContext, new ColReorderBehavior(props.gridContext, e));
    //                     // } else {
    //                     // changeBehavior(props.gridContext, new RowReorderBehavior(props.gridContext, e));
    //                     // }
    //                 }
    //             } else {
    //                 this.selectColumnOrRow(e, locationOfCell, cellMatrix);
    //             }
    //             e.stopPropagation();
    //             e.preventDefault();
    //         } else if (e.type === 'click') {
    //             this.selectColumnOrRow(e, locationOfCell, cellMatrix);
    //         }
    //     }

    //     private selectColumnOrRow(e: any, locationOfCell: Location, cellMatrix: CellMatrix) {
    //         const gridContext = props.gridContext;

    //         // if (orientation === 'horizontal') {
    //         //     if (e.type === 'click') {
    //         //         // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'column', true));
    //         //     } else if (e.type === 'mousedown') {
    //         //         // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'column'));
    //         //     }
    //         // } else if (orientation === 'vertical') {
    //         //     if (e.type === 'click') {
    //         //         // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'row', true));
    //         //     } else if (e.type === 'mousedown') {
    //         //         // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'row'));
    //         //     }
    //         // } else if (orientation === 'full-dimension') {
    //         //     if (e.type === 'mousedown' || e.type === 'click') {
    //         //         gridContext.setState({
    //         //             focusedLocation: locationOfCell,
    //         //             selectedRanges: [cellMatrix.getRange(cellMatrix.first, cellMatrix.last)]
    //         //         });
    //         //     }
    //         // }
    //     }

    //     private startResizingColumn(e: any) {
    //         const positionX =
    //             e.type === 'mousedown' ? e.clientX : e.type === 'touchstart' ? e.changedTouches[0].clientX : null;
    //         // const column = props.grid.getColumnFromClientX(positionX);
    //         e.stopPropagation();
    //         // props.grid.changeBehavior(new ResizeColumnBehavior(props.grid, column, e));
    //     }

    // }

    // function isItTheSameCell(gridContext: GridContext, location: Location) {
    //     if (gridContext.state.focusedLocation) {
    //         if (gridContext.state.focusedLocation.row.idx === location.row.idx && gridContext.state.focusedLocation.col.idx === location.col.idx) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return false;
    //     }
}