import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

// TODO move to own file
const isTextInput = (keyCode: number) =>
    (keyCode >= keyCodes.ZERO && keyCode <= keyCodes.Z) ||
    (keyCode >= keyCodes.NUM_PAD_0 && keyCode <= keyCodes.DIVIDE) ||
    (keyCode >= keyCodes.SEMI_COLON && keyCode <= keyCodes.SINGLE_QUOTE) ||
    (keyCode == keyCodes.SPACE);

const isNavigationKey = (keyCode: number) =>
    keyCode == keyCodes.LEFT_ARROW || keyCode == keyCodes.RIGHT_ARROW ||
    keyCode == keyCodes.END || keyCode == keyCodes.HOME || keyCode == keyCodes.BACKSPACE

export class TextCellTemplate implements CellTemplate<string> {

    isValid(cellData: string): boolean {
        return typeof (cellData) === 'string';
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(cellData: string, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cellData: '', enableEditMode: true }
        return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return props.cellData;

        return <input
            style={{
                position: 'inherit',
                width: '100%',
                height: '100%',
                padding: 0,
                border: 0,
                background: 'transparent',
                fontSize: 14,
                outline: 'none',
            }}
            ref={input => {
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }}
            defaultValue={props.cellData}
            onChange={e => props.onCellDataChanged(e.currentTarget.value, false)}
            onBlur={e => props.onCellDataChanged(e.currentTarget.value, true)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onKeyDown={e => {
                if (isTextInput(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
                if (e.keyCode == keyCodes.ESC) e.currentTarget.value = props.cellData; // reset
            }}
        />
    }
}