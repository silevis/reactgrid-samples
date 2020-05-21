import * as React from 'react';
import {
    keyCodes,
    // isTextInput,
    // CellRenderProps,
    isNavigationKey,
    CellTemplate
} from '@silevis/reactgrid';

//  TODO needs update
/* export class FilterCellTemplate implements CellTemplate<string, any> {

    isValid(data: string): boolean {
        return (typeof (data) === 'string');
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(cellData: string, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cellData: '', enableEditMode: true }
        return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode = (props) => {
        if (!props.isInEditMode && props.cellData.length === 0) return <span style={{ color: "rgba(0, 0, 0, .5)" }}>Filter...</span>;
        if (!props.isInEditMode) return props.cellData;
        return <input
            type='text'
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
                input && input.focus();
            }}
            defaultValue={props.cellData}
            onChange={e => props.onCellDataChanged(e.currentTarget.value, false)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onKeyDown={e => {
                if (isTextInput(e.keyCode) || isNavigationKey(e)) e.stopPropagation();
                if (e.keyCode == keyCodes.ESC) e.currentTarget.value = props.cellData; // reset
            }}
        />
    }
}  */