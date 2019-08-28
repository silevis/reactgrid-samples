import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

export class FlagCellTemplate implements CellTemplate<string> {
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
        if (!props.isInEditMode) {
            const flagISO = props.cellData.toLowerCase(); // ISO 3166-1, 2/3 letters
            const flagURL = 'https://restcountries.eu/data/' + flagISO + '.svg';
            // return <img style={style} onError={this.handleOnError} src={flagURL} />
            return <div style={{
                margin: 'auto auto', 
                width: '35px', 
                height: '21px', 
                backgroundSize: 'cover', 
                border: '1px solid #cccccc', 
                backgroundImage: 'url("' + flagURL + '"), url("https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg")', 
                backgroundPosition: 'center center' }} />
        }
        const preserveValueKeyCodes = [0, keyCodes.ENTER];
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