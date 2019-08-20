import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

export class TextCellTemplate implements CellTemplate<string> {
    readonly hasEditMode = true;

    validate(data: any): string {
        return (typeof (data) === 'string') ? data : '';
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(keyCode: number, cellData: string) {
        return { editable: true, cellData }
    }

    customStyle: React.CSSProperties = { background: '#fff' };

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData;
        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return <input
            style={{
                position: 'inherit',
                width: '100%',
                height: '100%',
                padding: 0,
                border: 0,
                background: 'transparent',
                fontSize: 12,
                outline: 'none',
            }}
            ref={input => {
                if (input) {
                    input.focus();
                    // input.setSelectionRange(input.value.length, input.value.length);
                }
            }}
            defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) ? props.cellData : ''}
            onChange={e => props.onCellDataChanged ? props.onCellDataChanged(e.currentTarget.value) : null}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}