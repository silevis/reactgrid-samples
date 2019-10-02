import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { isNumberInput, isNavigationKey, isTextInput } from './keyCodeCheckings'
import { CellRenderProps, CellTemplate } from '../Common';

export class DateCellTemplate implements CellTemplate<string, any> {

    isValid(cellData: string): boolean {
        const date_regex = /^\d{4}\-\d{2}\-\d{2}$/;
        return date_regex.test(cellData.toString().replace(/\s+/g, ''));
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(cellData: string, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
        if (!ctrl && !alt && !shift && isNumberInput(keyCode))
            return { cellData: '', enableEditMode: true }
        return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData;
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
            defaultValue={props.cellData}
            onChange={e => props.onCellDataChanged(e.currentTarget.value, false)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onKeyDown={e => {
                if (isTextInput(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
                if (e.keyCode == keyCodes.ESC) e.currentTarget.value = props.cellData.toString(); // reset
            }}
        />
    }
}