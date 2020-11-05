import * as React from 'react';
import './styling.scss';
import styled from 'styled-components';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
// import { DataChange, ReactGrid, RowProps } from '@silevis/reactgrid';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
// import { FilterCellTemplate } from '../../cell-templates/filterCell/FilterCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';

const ReactGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  min-height: 475px;
`;

const filterRow = {
    id: 'filter',
    height: 25,
    reorderable: false,
    cells: [
        { type: 'filter', data: "" },
        { type: 'filter', data: "" },
        { type: 'filter', data: "" },
        { type: 'filter', data: "" },
        { type: 'filter', data: "" }
    ]
}

/* export default class FilterRowsSample extends React.Component<{}, {}> {
    private filtersArray = filterRow.cells.map(cell => cell.data);
    private rowsDatabase: any = this.getRows()

    state = {
        columns: columns(false, false),
        rows: this.getRows()
    }

    getRows() {
        const r = rows(false);
        r.splice(1, 0, filterRow);
        return r;
    }

    private prepareDataChanges = (dataChanges: DataChange[]): {} => {
        const state = { ...this.state }

        if (dataChanges[0].type === 'filter') {
            let rows: RowProps[] = this.rowsDatabase;
            const editedColIdx = state.columns.findIndex(el => el.id === dataChanges[0].columnId);
            this.filtersArray[editedColIdx] = dataChanges[0].newData.toString().toLowerCase();
            state.columns.forEach((_, colIdx) => {
                rows = rows.filter(el => el.id === 'header' || el.id === 'filter' || el.cells[colIdx].data.toString().toLowerCase().includes(this.filtersArray[colIdx]));
            });
            const filterRowIdx = rows.findIndex(el => el.id === 'filter');
            rows[filterRowIdx].cells[editedColIdx].data = dataChanges[0].newData;
            return { ...state, rows }
        } else {
            dataChanges.forEach(change => {
                state.rows.forEach((row: any) => {
                    if (row.id == change.rowId) {
                        const field = this.state.columns.findIndex((column: any) => column.id == change.columnId)
                        if (field !== undefined)
                            row.cells[field].data = change.newData;
                    }
                })
            })
        }
        this.rowsDatabase = state.rows;
        return state;
    }

    render() {
        return (
            <ReactGridContainer className="filter-rows">
                <ReactGrid
                    cellMatrixProps={this.state}
                    cellTemplates={{
                        'rating': new RateCellTemplate,
                        'flag': new FlagCellTemplate,
                        'filter': new FilterCellTemplate
                    }}
                    onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
                    license={'non-commercial'}
                />
            </ReactGridContainer>
        );
    }
}  */