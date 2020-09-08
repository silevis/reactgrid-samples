import * as React from 'react';
import { ReactGrid, Column, Row, DefaultCellTypes } from '@silevis/reactgrid';
import { RateCellTemplate, RateCell } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';


interface ColumnReorderGridState {
    columns: Column[]
    rows: Row<DefaultCellTypes | FlagCell | RateCell>[]
}

export const LimitedHeightByParentSample: React.FunctionComponent = () => {

    const [state] = React.useState<ColumnReorderGridState>(() => ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }))

    return (
        <div className="test-grid-container" style={{
            height: 150,
            overflow: 'auto'
        }}>
            <h1>Scroll me</h1> Example Content
            <ReactGrid
                rows={state.rows}
                columns={state.columns}
                customCellTemplates={{
                    'rate': new RateCellTemplate(),
                    'flag': new FlagCellTemplate(),
                }}
                stickyTopRows={1}
                enableFillHandle
                enableRangeSelection
            />
        </div>
    )
}
