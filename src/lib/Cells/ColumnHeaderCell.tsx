import * as React from 'react';
import { Cell, CellRenderProps, GridContext, CellData } from '../Common';
import { changeBehavior } from '../Functions';
import { ColumnSelectionBehavior } from '../Behaviors/ColumnSelectionBehavior';
import { ColReorderBehavior } from '../Behaviors/ColReorderBehavior';
import { useState } from 'react';
import { getColumnFromClientX } from '../Functions/getLocationFromClient';
import { ResizeColumnBehavior } from '../Behaviors/ResizeColumnBehavior';
// import { ResizeColumnBehavior } from '../Behaviors/ResizeColumnBehavior';

// export interface HeaderCellProps extends CellRenderProps {
//     shouldStartReorder: boolean;
//     shouldStartColResize: boolean;
//     customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
//     enableCheckBox: boolean;
//     checkBoxValue?: boolean;
//     readonly setCheckBoxValue?: (value: boolean) => void;
// }

export let headerCellTouchStartTime: number;

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

    shouldEnableEditMode = () => false;

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => {

        let innerStyle = {
            background: '#eee',
            cursor: /*props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            alignItems: 'center',
        };
        const state = props.gridContext.state;
        const [isResizerHover, setIsResizeHover] = useState(false);
        return (
            <div style={innerStyle}
                onPointerDown={e => {
                    if (state.selectionMode === 'column' && state.selectedIndexes.includes(props.location.col.idx)) {
                        changeBehavior(props.gridContext, new ColReorderBehavior(props.gridContext, e))
                    } else {
                        changeBehavior(props.gridContext, new ColumnSelectionBehavior(props.gridContext))
                    }
                }}>
                {props.cellData.textValue}
                <div
                    style={{
                        position: 'relative',
                        right: 0,
                        width: 10,
                        height: '100%',
                    }}
                    onPointerDown={e => this.startResizingColumn(e, props.gridContext)}

                >
                    <div
                        onClick={e => e.stopPropagation()}
                        onMouseEnter={() => setIsResizeHover(true)}
                        onMouseOut={() => setIsResizeHover(false)}
                        style={{
                            width: this.resizeDivWidth,
                            height: '100%',
                            cursor: isResizerHover ? 'w-resize' : 'default',
                            background: isResizerHover ? '#3498db' : '#eee',
                            position: 'absolute',
                            right: 0
                        }}
                    />
                </div>
            </div >
        )

        // return (
        //     <input
        //     style={{
        //         width: '100%',
        //         height: '100%',
        //         border: 0,
        //         fontSize: 16,
        //         outline: 'none'
        //     }}
        //     ref={input => {
        //         if (input) {
        //             input.focus();
        //             input.setSelectionRange(input.value.length, input.value.length);
        //         }
        //     }}
        //     defaultValue={preserveValueKeyCodes.includes(props.gridContext.lastKeyCode) ? props.cellData.textValue : ''}
        //     onChange={e => props.onCellDataChanged({ textValue: e.currentTarget.value, data: e.currentTarget.value, type: 'string' })}
        //     onCopy={stopPropagationEventHandler}
        //     onCut={stopPropagationEventHandler}
        //     onPaste={e => e.stopPropagation()}
        //     onPointerDown={e => e.stopPropagation()}
        // />
        // )
    }

    private startResizingColumn(e: any, gridContext: GridContext) {
        const column = getColumnFromClientX(gridContext, e.clientX, false);
        e.stopPropagation();
        changeBehavior(gridContext, new ResizeColumnBehavior(gridContext, column, e));
    }
}
