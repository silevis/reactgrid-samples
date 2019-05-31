import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown/*, isItLastRowOrCol*/, stopPropagationEventHandler } from './handleEvents';
import { CellRenderProps as CellRenderProps, Location, Cell as Cell, CellData, GridContext } from '../Common';
// import '../Grid.css';

export class TextCell implements Cell {
    cellData: CellData;
    isReadOnly = false;
    enteredValue: string = '';

    constructor(
        // customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        value: string,
        private onValueChanged: (value: string) => boolean,
    ) {
        this.cellData = { textValue: value, data: value, type: 'string' }
        this.enteredValue = value
    }

    trySetData(cellData: CellData) {
        return this.onValueChanged(cellData.textValue);
    }

    shouldEnableEditMode = () => true

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData.textValue;

        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return <input
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
            defaultValue={preserveValueKeyCodes.includes(props.gridContext.lastKeyCode) ? props.cellData.textValue : ''}
            onChange={e => props.onCellDataChanged({ textValue: e.currentTarget.value, data: e.currentTarget.value, type: 'string' })}
            onCopy={stopPropagationEventHandler}
            onCut={stopPropagationEventHandler}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}