import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, Cell, CellData } from '../Common';

export class TextCell implements Cell {
    cellData: CellData;

    constructor(value: string) {
        this.cellData = { text: value, data: value, type: 'string' }
    }

    trySetData(cellData: CellData) {
        this.cellData = { text: cellData.text, data: cellData.text, type: 'string' }
        return true;
    }

    shouldEnableEditMode = () => true

    customStyle: React.CSSProperties = {};

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return this.cellData.text;

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
            defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) ? this.cellData.text : ''}
            onChange={e => this.cellData = { text: e.currentTarget.value, data: e.currentTarget.value, type: 'string' }}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}