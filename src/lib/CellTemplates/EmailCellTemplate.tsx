export const x = 1;
import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

export class EmailCellTemplate implements CellTemplate<string> {

    isValid(cellData: string): boolean {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return email_regex.test(cellData.replace(/\s+/g, ''));
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
            type='email'
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