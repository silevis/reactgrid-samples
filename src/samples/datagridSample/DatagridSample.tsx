import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ReactGrid, DefaultCellTypes, CellChange, Id, DropPosition, Column, Row, Highlight,
  MenuOption, SelectionMode,
} from '@silevis/reactgrid';
import { DropdownNumberCellTemplate, DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
import { VirtualEnv } from './VirtualEnv';
import { VirtualUser } from './VirtualUser';
import useInterval from '@use-it/interval';


const ReactGridContainer = styled.div`
  overflow: scroll;
`;

export type DataGridSampleRow = Row<DefaultCellTypes | FlagCell | DropdownNumberCell>;

export type VirtualEnvCellChange = CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>;

export const DatagridSample: React.FC = () => {

  const [columns, setColumns] = React.useState<Column[]>(() => [...crmColumns(true, false)]);
  const [rows, setRows] = React.useState<DataGridSampleRow[]>(() => [...crmRows(true)]);
  const [highlights, setHighlights] = React.useState<Highlight[]>(() => []);
  const [virtualEnv] = useState(() => new VirtualEnv());

  const handleChanges = (changes: CellChange[]) => setRows((prevRows) => {
    changes.forEach(change => {
      const changeRowIdx = prevRows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = columns.findIndex(el => el.columnId === change.columnId);
      prevRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    });
    return [...prevRows];
  });

  useEffect(() => {
    virtualEnv
      .addUser(new VirtualUser('darkolivegreen', 12, 3))
      .addUser(new VirtualUser('mediumpurple', 0, 0))
      .addUser(new VirtualUser('red', 10, 12))
      .addUser(new VirtualUser('orange', 0, 18))

    const states = virtualEnv.updateView(columns, rows, highlights);

    states.forEach(({ rows: r, highlights: h }, idx) => {
      setRows(r);
      setHighlights(h);
    });

  }, [virtualEnv]);

  const handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    const columnInside = columnIds.includes(targetColumnId);
    if (columnInside) return false;
    return true;
  }

  const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
    const to = columns.findIndex((column: Column) => column.columnId === targetColumnId);
    const columnIdxs = columnIds.map((id: Id, idx: number) => columns.findIndex((c: Column) => c.columnId === id));
    setRows(rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIdxs, to) })));
    setColumns(reorderArray(columns, columnIdxs, to));
  }

  useInterval(() => {

    const states = virtualEnv.updateView(columns, rows, highlights);

    states.forEach(({ rows: r, highlights: h }, idx) => {
      setRows(r);
      setHighlights(h);
    });
  }, 250);

  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    setRows((prevRows) => {
      const to = rows.findIndex(row => row.rowId === targetRowId);
      const columnIdxs = rowIds.map(id => rows.findIndex(r => r.rowId === id));
      return reorderArray(prevRows, columnIdxs, to);
    });
  }

  const handleCanReorderRows = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
    const rowIndex = rows.findIndex(row => row.rowId === targetRowId);
    const rowInside = rowIds.includes(targetRowId);
    if (rowIndex === 0 || rowInside) return false;
    return true;
  }

  const handleColumnResize = (columnId: Id, width: number, selectedColIds: Id[]) => {
    // MULTI COLUMN RESIZE
    setColumns((prevColumns) => {
      const setColumnWidth = (columnIndex: number) => {
        const resizedColumn = prevColumns[columnIndex];
        prevColumns[columnIndex] = { ...resizedColumn, width };
      }

      if (selectedColIds.includes(columnId)) {
        const stateColumnIndexes = prevColumns
          .filter(col => selectedColIds.includes(col.columnId))
          .map(col => prevColumns.findIndex(el => el.columnId === col.columnId));
        stateColumnIndexes.forEach(setColumnWidth);
      } else {
        const columnIndex = prevColumns.findIndex(col => col.columnId === columnId);
        setColumnWidth(columnIndex);
      }
      return [...prevColumns];
    });
  }

  const handleContextMenu = (selectedRowIds: Id[], selectedColIds: Id[], selectionMode: SelectionMode, menuOptions: MenuOption[]): MenuOption[] => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removeRow', label: 'Remove row', handler: () => {
            setHighlights(high => high.filter(h => !selectedRowIds.includes(h.rowId)));
            setRows((r => rows.filter(row => !selectedRowIds.includes(row.rowId))));
          }
        },
      ]
    }
    if (selectionMode === 'column') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removeColumn', label: 'Remove column', handler: () => {
            const c = columns.filter(column => !selectedColIds.includes(column.columnId));
            const columnsIdxs = columns.map((column, idx) => {
              if (!c.includes(column)) return idx;
              return undefined;
            }).filter(idx => idx !== undefined);
            const r = rows.map(row => ({ ...row, cells: row.cells.filter((_, idx) => !columnsIdxs.includes(idx)) }));
            const h = highlights.filter(h => !selectedColIds.includes(h.columnId));
            setColumns(c);
            setRows(r);
            setHighlights(h);
          }
        },
      ]
    }
    return menuOptions;
  }

  return (
    <ReactGridContainer id="multiuser-sample">
      <ReactGrid
        rows={rows}
        columns={columns}
        customCellTemplates={{
          'flag': new FlagCellTemplate(),
          'dropdownNumber': new DropdownNumberCellTemplate(),
        }}
        highlights={highlights}
        stickyTopRows={1}
        stickyLeftColumns={2}
        onCellsChanged={handleChanges}
        canReorderRows={handleCanReorderRows}
        onRowsReordered={handleRowsReorder}
        canReorderColumns={handleCanReorderColumns}
        onColumnsReordered={handleColumnsReorder}
        onContextMenu={handleContextMenu}
        onColumnResized={handleColumnResize}
        enableColumnSelection
        enableRowSelection
        enableFillHandle
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
