import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, Column, CellChange, Row } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  height: 300px;
  width: 600px;
  overflow: scroll;
`;

interface StickyState {
  columns: Column[]
  rows: Row[],
  stickyTopRows?: number,
  stickyBottomRows?: number,
  stickyLeftColumns?: number,
  stickyRightColumns?: number,
}

export const StickySample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<StickyState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    stickyTopRows: 1,
    stickyLeftColumns: 2,
    stickyRightColumns: 1,
    stickyBottomRows: undefined
  }))

  const handleChanges = (changes: CellChange[]) => {
    let newState = { ...state };
    changes.forEach((change: any) => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
    return true;
  }

  const getExt = () => {
    return {
      getAdditionalEventHandlers: (updateState: any) => {
        return {
          handleContextMenu: (event: any) =>
            updateState((state: any) => state.currentBehavior.handleContextMenu(event, state)),
          // scrollHandler: () => updateState((state: any) => state),
        }
      },
      getDefaultProStateFields: (): any => {
        return {
          // currentBehavior: new DefaultBehavior(), // create behaviour manager ??
          disableFillHandle: false,
          disableRangeSelection: false,
          enableColumnSelection: false,
          enableRowSelection: false,
          contextMenuPosition: { top: -1, left: -1 },
          lineOrientation: 'horizontal',
          linePosition: -1,
          shadowSize: 0,
          shadowPosition: -1,
          shadowCursor: 'default',
          selectionMode: 'range',
          selectedRanges: [],
          selectedIndexes: [],
          selectedIds: [],
          activeSelectedRangeIdx: 0,
        }
      },
    }
  }


  return (
    <ReactGridContainer id="sticky-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        extensions={getExt()}
        customCellTemplates={{
          'rating': new RateCellTemplate,
          'flag': new FlagCellTemplate,
          'dropdownNumber': new DropdownNumberCellTemplate,
        }}
        stickyTopRows={state.stickyTopRows}
        stickyBottomRows={state.stickyBottomRows}
        stickyLeftColumns={state.stickyLeftColumns}
        stickyRightColumns={state.stickyRightColumns}
        onCellsChanged={handleChanges}
        enableColumnSelection
        enableRowSelection
        license={'non-commercial'}
      />
    </ReactGridContainer>
  )
}
