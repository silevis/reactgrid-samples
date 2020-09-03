import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, CellChange, Column, Id, Row, DefaultCellTypes } from '@silevis/reactgrid';
import { RateCellTemplate, RateCell } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

export const ResizeColumnSample: React.FunctionComponent = () => {

  const [columns, setColumns] = React.useState<Column[]>(() => dataColumns(false, true));
  const [rows, setRows] = React.useState<Row<DefaultCellTypes | FlagCell | RateCell>[]>(() => [...dataRows(false)]);


  const handleChanges = (changes: CellChange[]) => {
    setRows((prevRows) => {
      changes.forEach((change) => {
        const changeRowIdx = prevRows.findIndex(
          (el) => el.rowId === change.rowId
        );
        const changeColumnIdx = columns.findIndex(
          (el) => el.columnId === change.columnId
        );
        prevRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
      });
      return [...prevRows];
    });
  };

  const handleColumnResize = (ci: Id, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  }

  return (
    <ReactGridContainer id="column-reorder-sample">
      <ReactGrid
        rows={rows}
        columns={columns}
        customCellTemplates={{
          'rate': new RateCellTemplate(),
          'flag': new FlagCellTemplate(),
        }}
        onCellsChanged={handleChanges}
        onColumnResized={handleColumnResize}
        enableColumnSelection
        enableRowSelection
        enableFillHandle
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
