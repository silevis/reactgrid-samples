import React, { useState } from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/group/columns';
import { rows as dataRows, headerRow } from '../../data/group/rows';
import { CellChange, Column, GroupCell, ReactGrid, Row, DefaultCellTypes, Id, DropPosition } from '@silevis/reactgrid';
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

    const createIndents = (rows: Row[]): Row[] => rows.map(row => {
        const groupCell = getGroupCell(row);
        if (groupCell.parentId === undefined) {
            const hasRowChildrens = hasChildren(rows, row);
            groupCell.hasChildren = hasRowChildrens;
            if (hasRowChildrens) assignIndentAndHasChildrens(rows, row, 0);
        }
        return row;
    });

    const [state, setState] = useState<GroupTestGridStateData>(() => {
        const columns = dataColumns(true, false);
        let rows = [...dataRows(true)];
        rows = getDataFromRows(rows);
        rows = createIndents(rows);
        return { columns, rows }
    });

    const [rowsToRender, setRowsToRender] = useState<Row[]>([headerRow, ...getExpandedRows(state.rows)]);

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

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
        to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
        const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...state };
        let to = newState.rows.findIndex(row => row.rowId === targetRowId);
        let rowIdxs = rowIds.map(id => state.rows.findIndex(r => r.rowId === id));

        if (rowIdxs.length === 1) {
            const row = newState.rows[rowIdxs[0]];
            rowIdxs = [row, ...new Set(getRowChildren(newState.rows, [], row))].map(item => newState.rows.findIndex(r => r.rowId === item.rowId));

            if (dropPosition === 'on') {
                const onRow = newState.rows.find(row => row.rowId === targetRowId);
                if (onRow) {
                    const movingRowRoot = getGroupCell(row);
                    movingRowRoot.parentId = onRow.rowId;
                    to += 1;
                }
            }

        }

        const reorderedRows = reorderArray(newState.rows, rowIdxs, to);

        setState({ ...newState, rows: createIndents(reorderedRows) });
        setRowsToRender([headerRow, ...getExpandedRows(reorderedRows)]);
    }

    const getRowChildren = (rows: Row[], acc: Row[], row: Row) => {
        const rowsChildren = getDirectChildrenRows(rows, row);
        if (!rowsChildren) return [];

        rowsChildren.forEach(childRow => {
            acc = [...acc, ...getRowChildren(rows, rowsChildren, childRow)];
        });
        return acc;
    }

    const handleCanReorderRows = (targetColumnId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
        return true;
    }

    return (
        <ReactGridContainer id="group-cell-sample">
            <ReactGrid
                rows={rowsToRender}
                columns={state.columns}
                onCellsChanged={handleChanges}
                onRowsReordered={handleRowsReorder}
                canReorderRows={handleCanReorderRows}
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