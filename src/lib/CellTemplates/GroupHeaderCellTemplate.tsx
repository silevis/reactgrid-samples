import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';
import styled from 'styled-components';

const ChevronIcon = styled.div`
    display: inline-block;
    margin-right: 7px;
    color: grey;
    font-weight: bold;
    transition: transform .2s ease-in-out;

    &:hover {
        color: black;
        cursor: pointer;
    }
`;

export class GroupHeaderCellTemplate implements CellTemplate<any> {
    readonly hasEditMode = true;

    validate(data: any): any {
        return { name: (typeof (data.name) === 'string') ? data.name : '', isExpanded: data.isExpanded, level: data.level };
    }

    textToCellData(text: string): any {
        return text;
    }

    cellDataToText(cellData: any) {
        return cellData.name;
    }

    handleKeyDown(keyCode: number, cellData: any) {
        return { editable: true, cellData }
    }

    customStyle: React.CSSProperties = { background: '#fff' };

    renderContent: (props: CellRenderProps<any>) => React.ReactNode = (props) => {
        const cellData: any = props.cellData;
        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return (
            <>
                {cellData.isExpanded !== undefined &&
                    <ChevronIcon
                        onPointerDown={e => {
                            e.stopPropagation();
                            cellData.isExpanded = !cellData.isExpanded;
                            props.onCellDataChanged ? props.onCellDataChanged(cellData) : null
                        }}
                        style={{ marginLeft: 5 * (cellData.level ? cellData.level : 1) + ((cellData.level && cellData.level > 1) ? 14 : 0), transform: `${cellData.isExpanded ? 'rotate(90deg)' : 'rotate(0)'}` }}>
                        ❯
                </ChevronIcon>}
                {!props.isInEditMode ? <div style={{ marginLeft: 5 * (cellData.level ? cellData.level : 1) + (cellData.isExpanded === undefined ? 14 : 0) }} onPointerDown={e => e.stopPropagation()}>{cellData.name}</div> :
                    <input
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
                        defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) ? cellData.name : ''}
                        onChange={e => props.onCellDataChanged ? props.onCellDataChanged([e.currentTarget.value, { isExpanded: cellData.isExpanded, level: cellData.level }]) : ['', { isExpanded: cellData.isExpanded, level: cellData.level }]}
                        onCopy={e => e.stopPropagation()}
                        onCut={e => e.stopPropagation()}
                        onPaste={e => e.stopPropagation()}
                        onPointerDown={e => e.stopPropagation()}
                    />}
            </>
        );
    }
}