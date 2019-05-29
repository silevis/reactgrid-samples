import * as React from 'react';
import { stopPropagationEventHandler } from './handleEvents';
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

    renderContent: (props: HeaderCellProps) => React.ReactNode = (props) => {

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
        let innerStyle = {
            background: '#eee',
            cursor: /*props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
            display: 'flex',
            justifyContent: 'space-between',
            width: `calc(100% - ${this.resizeDivWidth}px)`,
            alignItems: 'center'
        };
        return (
            <div style={innerStyle}
                onPointerDown={event => {
                    changeBehavior(props.gridContext, new ColumnSelectionBehavior(props.gridContext))
                }}>
                {
                    props.isInEditMode && (
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
                                width: '100%',
                                height: '100%',
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
                    )
                }
                {/* {props.children} && */   <div style={{ overflow: 'hidden' }}>{cellValue}</div>}
            </div>
        )
    }
}
