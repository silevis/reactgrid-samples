import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

export class TimeCellTemplate implements CellTemplate<string> {

    isValid(cellData: string): boolean {
        const time_regex = /^\d{2}\:\d{2}$/;
        return time_regex.test(cellData.replace(/\s+/g, ''));
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(cellData: string, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
        return { cellData, enableEditMode: true };
    }

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData;

        return <input
            type='time'
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
            defaultValue={props.cellData}
            onChange={e => props.onCellDataChanged(e.currentTarget.value, false)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}
