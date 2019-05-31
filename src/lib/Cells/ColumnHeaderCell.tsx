import * as React from 'react';
import { stopPropagationEventHandler } from './handleEvents';
import { Cell, CellRenderProps, Location, CellMatrix, GridContext, CellData } from '../Common';
import { getLocationFromClient, changeBehavior } from '../Functions';
import { ColumnSelectionBehavior } from '../Behaviors/ColumnSelectionBehavior';

export interface HeaderCellProps extends CellRenderProps {
    shouldStartReorder: boolean;
    shouldStartColResize: boolean;
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    enableCheckBox: boolean;
    checkBoxValue?: boolean;
    readonly setCheckBoxValue?: (value: boolean) => void;
}

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

        // if (!props.isInEditMode)
        return (
            <div style={innerStyle}
                onPointerDown={_ => {
                    changeBehavior(props.gridContext, new ColumnSelectionBehavior(props.gridContext))
                }}>
                {props.cellData.textValue}
            </div>
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
}
