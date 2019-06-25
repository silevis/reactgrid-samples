import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, CellTemplate, CellData } from '../Common';

export class TextCell implements CellTemplate {

    trySetData(cellData: CellData) {
        return { text: this.getText(cellData), data: cellData.text, type: 'text' }
    }

    shouldEnableEditMode = () => true

    getText(cellData: CellData) {
        return cellData.data;
    }

    customStyle: React.CSSProperties = {};

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return this.getText(props.cellData);

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
            defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) ? this.getText(props.cellData) : ''}
            onChange={e => props.onCellDataChanged ? props.onCellDataChanged({ text: e.currentTarget.value, data: e.currentTarget.value, type: 'text' }) : null}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}