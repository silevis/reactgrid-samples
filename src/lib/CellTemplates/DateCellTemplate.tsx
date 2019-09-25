import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

export class DateCellTemplate implements CellTemplate<string> {

    validate(data: any): string {
        const date_regex = /^\d{4}\-\d{2}\-\d{2}$/;
        data = data ? data.toString().replace(/\s+/g, '') : data;
        return (date_regex.test(data)) ? data : '';
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(keyCode: number, cellData: string) {
        return { cellData, enableEditMode: true }
    }

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData;
        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return <input
            type='date'
            style={{
                width: '100%',
                height: '100%',
                padding: 0,
                border: 0,
                background: 'transparent',
                fontSize: 14,
                outline: 'none'
            }}
            ref={input => {
                if (input) {
                    input.focus();
                    // input.setSelectionRange(input.value.length, input.value.length);
                }
            }}
            defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) ? props.cellData : ''}
            onChange={e => props.onCellDataChanged(e.currentTarget.value)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}