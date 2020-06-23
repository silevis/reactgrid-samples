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

export const NotLimitedHeightByParentSample: React.FunctionComponent = () => {

    const [state, setState] = React.useState<ColumnReorderGridState>(() => ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }))

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            customCellTemplates={{
                'rating': new RateCellTemplate,
                'flag': new FlagCellTemplate
            }}
            stickyTopRows={1}
            enableFillHandle
            enableRangeSelection
        />
    )
}
