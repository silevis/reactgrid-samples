import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';
import styled from 'styled-components';

const ChevronIcon = styled.div`
    display: inline-block;
    margin-right: 7px;
    color: grey;
    font-weight: bold;
    /* transition: transform .2s ease-in-out; */

    &:hover {
        color: black;
        cursor: pointer;
    }
`;

export class GroupHeaderCellTemplate implements CellTemplate<any> {
    readonly hasEditMode = true;

    validate(data: any): any {
        return { name: (typeof (data.name) === 'string') ? data.name : '', isExpanded: data.isExpanded !== undefined ? data.isExpanded : undefined, depth: data.depth };
    }

    textToCellData(text: string): any {
        return {};
    }

    cellDataToText(cellData: any) {
        return cellData;
    }

    handleKeyDown(keyCode: number, cellData: any) {
        if (keyCode === keyCodes.SPACE) {
            cellData.isExpanded = cellData.isExpanded !== undefined ? !cellData.isExpanded : undefined;
        }
        return { cellData: Object.assign({}, cellData), enableEditMode: true }
    }

    customStyle: React.CSSProperties = { background: '#fff' };

    renderContent: (props: CellRenderProps<any>) => React.ReactNode = (props) => {
        const cellData: any = props.cellData;
        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return (
            !props.isInEditMode ?
                <div style={{ width: '100%', marginLeft: 10 * (cellData.depth ? cellData.depth : 1) + (cellData.isExpanded === undefined ? 9 : 0) }}>
                    {cellData.isExpanded !== undefined &&
                        <ChevronIcon
                            onPointerDown={e => {
                                e.stopPropagation();
                                cellData.isExpanded = !cellData.isExpanded;
                                if (props.onCellDataChanged) props.onCellDataChanged(cellData);
                            }}
                            style={{
                                transform: `${cellData.isExpanded ? 'rotate(90deg)' : 'rotate(0)'}`,
                                zIndex: 1,
                                pointerEvents: 'auto'
                            }}
                        >❯</ChevronIcon>}
                    <span style={{ marginLeft: cellData.isExpanded !== undefined ? 4.5 : 0 }}>{cellData.name}</span>
                </div>
                :
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
                    onChange={e => {
                        props.onCellDataChanged
                            ? props.onCellDataChanged({ name: e.currentTarget.value, isExpanded: cellData.isExpanded, depth: cellData.depth })
                            : { name: '', isExpanded: cellData.isExpanded, depth: cellData.depth }
                    }
                    }
                    onCopy={e => e.stopPropagation()}
                    onCut={e => e.stopPropagation()}
                    onPaste={e => e.stopPropagation()}
                    onPointerDown={e => e.stopPropagation()}
                />
        );
    }
}