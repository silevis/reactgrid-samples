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

interface GroupHeaderCellData {
    name: string;
    isExpanded: boolean | undefined;
    depth: number;
}

export class GroupHeaderCellTemplate implements CellTemplate<GroupHeaderCellData> {

    isValid(cellData: GroupHeaderCellData): boolean {
        return typeof (cellData.name) === 'string' && (cellData.isExpanded === undefined || typeof (cellData.isExpanded) === 'boolean') && typeof (cellData.depth) === 'number';
    }

    textToCellData(text: string): any {
        return { name: text, isExpanded: false, depth: 1 };
    }

    cellDataToText(cellData: GroupHeaderCellData) {
        return cellData.name;
    }

    handleKeyDown(cellData: GroupHeaderCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
        if (keyCode === keyCodes.SPACE) {
            cellData.isExpanded = !cellData.isExpanded;
        }
        return { cellData: Object.assign({}, cellData), enableEditMode: true }
    }

    renderContent: (props: CellRenderProps<GroupHeaderCellData>) => React.ReactNode = (props) => {
        const cellData = Object.assign({}, props.cellData);

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
                    defaultValue={cellData.name}
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