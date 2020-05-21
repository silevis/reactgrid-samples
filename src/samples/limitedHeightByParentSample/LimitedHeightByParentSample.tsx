import * as React from 'react';
import { ReactGrid, Column, Row } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';


interface ColumnReorderGridState {
    columns: Column[]
    rows: Row[]
}

export const LimitedHeightByParentSample: React.FunctionComponent = () => {

    const [state, setState] = React.useState<ColumnReorderGridState>(() => ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }))

    return (
        <div className="test-grid-container" style={{
            height: 150,
            overflow: 'auto'
        }}>
            <h1>Content inside</h1> Example Content
            <ReactGrid
                rows={state.rows}
                columns={state.columns}
                customCellTemplates={{
                    'rating': new RateCellTemplate,
                    'flag': new FlagCellTemplate
                }}
                stickyTopRows={1}
            />
        </div>
    )
}
