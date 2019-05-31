import * as React from 'react';
import { stopPropagationEventHandler } from './handleEvents';
// import './Cell.css';
import { Cell, CellRenderProps, Location, CellMatrix, GridContext, CellData } from '../Common';
import { getLocationFromClient, changeBehavior } from '../Functions';
import { RowSelectionBehavior } from '../Behaviors/RowSelectionBehavior';

export interface HeaderCellProps extends CellRenderProps {
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

export class RowHeaderCell implements Cell {
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

    shouldEnableEditMode = () => true;

    renderContent: (props: HeaderCellProps) => React.ReactNode = (props) => {
        let innerStyle = {
            background: '#eee',
            cursor: /*props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            alignItems: 'center'
        };
        // <input
        //                 onBlur={e => {
        //                     if (
        //                         !this.nameIsNullOrEmpty(e.currentTarget.value) &&
        //                         e.currentTarget.value !== cellValue
        //                     ) {
        //                         props.trySetValue(e.currentTarget.value);
        //                         props.gridContext.commitChanges();
        //                     }
        //                     // props.setEditMode(false);
        //                 }}
        //                 onKeyDown={e => { }/*handleKeyDown(e, props)*/}
        //                 onCopy={stopPropagationEventHandler}
        //                 onCut={stopPropagationEventHandler}
        //                 onPaste={stopPropagationEventHandler}
        //                 style={{
        //                     width: props.attributes.style!.width,
        //                     height: props.attributes.style!.height,
        //                     border: 0,
        //                     fontSize: 16,
        //                     outline: 'none'
        //                 }}
        //                 ref={input => {
        //                     if (input) {
        //                         input.focus();
        //                         input.setSelectionRange(input.value.length, input.value.length);
        //                     }
        //                 }}
        //                 defaultValue={cellValue}
        //             />
        return (
            <div style={innerStyle}
                onPointerDown={_ => {
                    changeBehavior(props.gridContext, new RowSelectionBehavior(props.gridContext));
                }}>
                {props.cellData.textValue}
            </div>
            //         {
            //     props.shouldStartColResize && this.orientationAllowsResizing() && (
            //         <div
            //             data-cy="touch-resize-button"
            //             onTouchStart={e => {
            //                 this.startResizingColumn(e);
            //                 this.setState({ isResizerHover: true });
            //             }}
            //             onTouchEnd={() => this.setState({ isResizerHover: false })}
            //             style={{
            //                 position: 'relative',
            //                 right: 0,
            //                 width: 10,
            //                 height: props.attributes.style!.height
            //             }}
            //         >
            //             <div
            //                 onMouseDown={e => this.startResizingColumn(e)}
            //                 onClick={e => e.stopPropagation()}
            //                 onMouseEnter={() => this.setState({ isResizerHover: true })}
            //                 onMouseOut={() => this.setState({ isResizerHover: false })}
            //                 style={{
            //                     width: this.resizeDivWidth,
            //                     height: props.attributes.style!.height,
            //                     cursor: this.state.isResizerHover ? 'w-resize' : 'default',
            //                     background: this.state.isResizerHover ? '#3498db' : '#eee',
            //                     position: 'absolute',
            //                     right: 0
            //                 }}
            //             />
            //         </div>
            //     )
            // }
        );
    }


    //     private orientationAllowsResizing() {
    //         // return props.orientation === 'horizontal'/* || props.orientation === 'full-dimension'*/;
    //     }

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
    //         const selRange = props.gridContext.state.selectedRanges[props.gridContext.state.activeSelectedRangeIdx];
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

    //     private nameIsNullOrEmpty(name: string) {
    //         return !name || !name.trim();
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
    // }
}