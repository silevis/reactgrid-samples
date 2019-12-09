import React, {useState} from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/group/columns';
import { rows as dataRows } from '../../data/group/rows';
import {Cell, CellChange, Column, GroupCell, Id, ReactGrid, Row, TextCell, NumberCell, HeaderCell} from '@silevis/reactgrid'
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface GroupTestGridStateData {
    columns:    Column[]
    rows:       Row[]
}

let headerRow = 
{
  rowId: -1,
    cells: [
        { type: 'header', text: `Id`} as HeaderCell,
        { type: 'header', text: `Branch Name`} as HeaderCell,
        { type: 'header', text: `Commit Hash`} as HeaderCell,
        { type: 'header', text: `Added`} as HeaderCell,
        { type: 'header', text: `Removed` } as HeaderCell,
      ]
}

export const GroupCellSample: React.FunctionComponent = () => {

  

    const getGroupCell = (row: Row): GroupCell => row.cells.find((cell: Cell) => cell.type === 'group') as GroupCell;

    const hasChildren = (rows: Row[], row: Row): boolean => rows.some((r: Row) => getGroupCell(r).parentId === row.rowId);

    const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
      const parentRow = getParentRow(rows, row);
      if (parentRow) {
        if (!getGroupCell(parentRow).isExpanded) return false;
        return isRowFullyExpanded(rows, parentRow);
      }
      return true
    };

    const getExpandedRows = (rows: Row[]): Row[] => {
        return rows.filter((row: Row) => {
            const areAllParentsExpanded = isRowFullyExpanded(rows, row);
            return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
        });
    };

    const getDirectChildrenRows = (rows: Row[], parentRow: Row): Row[] => rows.filter((row: Row) => !!row.cells.find((cell: Cell) => cell.type === 'group' && (cell as GroupCell).parentId === parentRow.rowId));

    const getParentRow = (rows: Row[], row: Row): Row | undefined => rows.find((r: Row) => r.rowId === getGroupCell(row).parentId); 

    const assignIndentAndHasChildrens = (allRows: Row[], parentRow: Row, indent: number) => {
        ++indent;
        getDirectChildrenRows(allRows, parentRow).forEach((row: Row) => {
            const groupCell = getGroupCell(row);
            groupCell.indent = indent;
            const hasRowChildrens = hasChildren(allRows, row);
            groupCell.hasChildrens = hasRowChildrens;
            if (hasRowChildrens) assignIndentAndHasChildrens(allRows, row, indent);
        });
    };

    const createIndents = (rows: Row[]): Row[] => {
        return rows.map((row: Row) => {
            const groupCell: GroupCell = getGroupCell(row);           
            if (groupCell.parentId === undefined) {
                const hasRowChildrens = hasChildren(rows, row);
                groupCell.hasChildrens = hasRowChildrens;
                if (hasRowChildrens) assignIndentAndHasChildrens(rows, row, 0);
            }
            return row;
        });
    };

    const getRowsFromData = (): Row[] => {
       return [...dataRows(true)].map((dataRow: any): Row => {
        
          if(dataRow.rowId === 'header'){
            return {
              rowId: dataRow.rowId,
                cells: [
                    {
                        type: 'group',
                        text: `Id`,
                        parentId: dataRow.cells[0].parentId,
                        isExpanded: true,
                    } as GroupCell,
                    { type: 'header', text: `${dataRow.cells[1].text}`} as HeaderCell,
                    { type: 'header', text: `${dataRow.cells[2].text}`} as HeaderCell,
                    { type: 'header', text: dataRow.cells[3].text } as HeaderCell,
                    { type: 'header', text: dataRow.cells[4].text } as HeaderCell,
                  ]
            }
          }
          else{
    
            return {
                rowId: dataRow.rowId,
                cells: [
                    {
                        type: 'group',
                        text: ` ${dataRow.rowId}`,
                        parentId: dataRow.cells[0].parentId,
                        isExpanded: true,
                    } as GroupCell,
                    { type: 'text', text: `${dataRow.cells[1].text}`} as TextCell,
                    { type: 'text', text: `${dataRow.cells[2].text}`} as TextCell,
                    { type: 'number', value: dataRow.cells[3].value } as NumberCell,
                    { type: 'number', value: dataRow.cells[4].value } as NumberCell,
                ]
            }
         }
        }
        );
    };

    const [state, setState] = useState<GroupTestGridStateData>(() => {
        const columns: Column[] = dataColumns(true, false);
        let rows: Row[] =  getRowsFromData();
        rows = createIndents(rows);
        rows = getExpandedRows(rows);
        //rows = [headerRow, ...getExpandedRows(rows)];
        return { columns, rows }
    });
   
    const [rowsToRender, setRowsToRender] = useState<Row[]>([ ...state.rows ]);

    const handleColumnResize = (ci: Id, width: number) => {
        let newState = { ...state };
        const columnIndex = newState.columns.findIndex(el => el.columnId === ci);
        const resizedColumn: Column = newState.columns[columnIndex];
        newState.columns[columnIndex] = { ...resizedColumn, width };
        setState(newState);
    };

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach((change: CellChange) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });

        setState({ ...state, rows: createIndents(newState.rows) });
        setRowsToRender([
...getExpandedRows(newState.rows)]);
        return true;
    };

    return(
    <ReactGridContainer id="group-cell-sample">
            <ReactGrid
          rows={rowsToRender}
          columns={state.columns}
          license={'non-commercial'}
          onCellsChanged={handleChanges}
          onColumnResized={handleColumnResize}
          frozenLeftColumns={1}
          enableRowSelection
          enableColumnSelection
    />
    </ReactGridContainer>  
    )
}