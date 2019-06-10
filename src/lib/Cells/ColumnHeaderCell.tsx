import * as React from 'react';
import { Cell, CellRenderProps, CellData } from '../Common';
import { changeBehavior } from '../Functions';
import { ColumnSelectionBehavior } from '../Behaviors/ColumnSelectionBehavior';
import { ColReorderBehavior } from '../Behaviors/ColReorderBehavior';

export class ColumnHeaderCell implements Cell {
    customStyle: React.CSSProperties = {};
    cellData: CellData;

    constructor(value: string) {
        this.cellData = { text: value, data: value, type: 'string' }
    }

    trySetData(cellData: CellData) {
        return false;
    }

    shouldEnableEditMode = () => false;

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => {

        return (
            <div style={{
                background: '#eee',
                cursor: /*props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                alignItems: 'center'
            }}
            >
                {this.cellData.text}
            </div>
        )
    }
}
