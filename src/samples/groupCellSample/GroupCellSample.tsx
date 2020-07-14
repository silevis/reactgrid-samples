import React, { useState } from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/group/columns';
import { rows as dataRows, headerRow } from '../../data/group/rows';
import { Cell, CellChange, Column, GroupCell, ReactGrid, Row, DefaultCellTypes } from '@silevis/reactgrid';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface GroupTestGridStateData {
    columns: Column[]
    rows: Row[]
}

export const GroupCellSample: React.FunctionComponent = () => {

    const getGroupCell = (row: Row) => row.cells.find((cell: DefaultCellTypes) => cell.type === 'group') as GroupCell;

    const hasChildren = (rows: Row[], row: Row): boolean => rows.some(r => getGroupCell(r).parentId === row.rowId);

    const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
        const parentRow = getParentRow(rows, row);
        if (parentRow) {
            if (!getGroupCell(parentRow).isExpanded) return false;
            return isRowFullyExpanded(rows, parentRow);
        }
        return true;
    };

    const getExpandedRows = (rows: Row[]): Row[] => rows.filter(row => {
        const areAllParentsExpanded = isRowFullyExpanded(rows, row);
        return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
    });

    const getDirectChildrenRows = (rows: Row[], parentRow: Row): Row[] => rows.filter(row => !!row.cells.find(cell => cell.type === 'group' && cell.parentId === parentRow.rowId));

    const getParentRow = (rows: Row[], row: Row): Row | undefined => rows.find(r => r.rowId === getGroupCell(row).parentId);

    const assignIndentAndHasChildrens = (allRows: Row[], parentRow: Row, indent: number) => {
        ++indent;
        getDirectChildrenRows(allRows, parentRow).forEach(row => {
            const groupCell = getGroupCell(row);
            groupCell.indent = indent;
            const hasRowChildrens = hasChildren(allRows, row);
            groupCell.hasChildren = hasRowChildrens;
            if (hasRowChildrens) assignIndentAndHasChildrens(allRows, row, indent);
        });
    };

    const getDataFromRows = (rows: Row[]): Row[] => rows.filter(row => row.cells.find(cell => cell.type === 'group') !== undefined);

    const createIndents = (rows: Row[]): Row[] => {
        return rows.map(row => {
            const groupCell = getGroupCell(row);
            if (groupCell.parentId === undefined) {
                const hasRowChildrens = hasChildren(rows, row);
                groupCell.hasChildren = hasRowChildrens;
                if (hasRowChildrens) assignIndentAndHasChildrens(rows, row, 0);
            }
            return row;
        });
    };

    const [state, setState] = useState<GroupTestGridStateData>(() => {
        const columns = dataColumns(true, false);
        let rows = [...dataRows(true)];
        rows = getDataFromRows(rows);
        rows = createIndents(rows);
        return { columns, rows }
    });

    const [rowsToRender, setRowsToRender] = useState<Row[]>([headerRow, ...state.rows]);

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState({ ...state, rows: createIndents(newState.rows) });
        setRowsToRender([headerRow, ...getExpandedRows(newState.rows)]);
    };

    return (
        <ReactGridContainer id="group-cell-sample">
            <ReactGrid
                rows={rowsToRender}
                columns={state.columns}
                onCellsChanged={handleChanges}
                stickyLeftColumns={1}
                stickyTopRows={1}
                enableRowSelection
                enableColumnSelection
                enableFillHandle
                enableRangeSelection
            />
        </ReactGridContainer>
    )
}