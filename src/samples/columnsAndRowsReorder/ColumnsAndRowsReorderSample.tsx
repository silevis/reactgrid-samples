import * as React from "react";
import {
    ReactGrid,
    Id,
    DropPosition,
    Column,
    Row,
    Cell
} from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnsAndRowsReorderSample: React.FunctionComponent = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", width: 100, reorderable: true },
            { columnId: "Surname", width: 100, reorderable: true }
        ],
        rows: [
            {
                rowId: 0,
                cells: [
                    { type: "header", text: "Name" },
                    { type: "header", text: "Surname" }
                ]
            },
            {
                rowId: 1,
                reorderable: true,
                cells: [
                    { type: "text", text: "Thomas" },
                    { type: "text", text: "Goldman" }
                ]
            },
            {
                rowId: 2,
                reorderable: true,
                cells: [
                    { type: "text", text: "Susie" },
                    { type: "text", text: "Spencer" }
                ]
            },
            {
                rowId: 3,
                reorderable: true,
                cells: [{ type: "text", text: "" }, { type: "text", text: "" }]
            }
        ]
    }));

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) =>
            idxs.includes(idx)
        );
        to =
            Math.min(...idxs) < to
                ? (to += 1)
                : (to -= idxs.filter(idx => idx < to).length);
        const leftSide: T[] = arr.filter(
            (_: T, idx: number) => idx < to && !idxs.includes(idx)
        );
        const rightSide: T[] = arr.filter(
            (_: T, idx: number) => idx >= to && !idxs.includes(idx)
        );
        return [...leftSide, ...movedElements, ...rightSide];
    };

    const handleColumnsReordered = (
        targetColumnId: Id,
        columnIds: Id[],
        dropPosition: DropPosition
    ) => {
        const to = state.columns.findIndex(
            (column: Column) => column.columnId === targetColumnId
        );
        const columnIdxs = columnIds.map((id: Id, idx: number) =>
            state.columns.findIndex((c: Column) => c.columnId === id)
        );
        setState({
            columns: reorderArray<Column>(state.columns, columnIdxs, to),
            rows: [...state.rows].map(row => ({
                ...row,
                cells: reorderArray<Cell>(row.cells, columnIdxs, to)
            }))
        } as any);
    };

    const handleRowsReordered = (
        targetRowId: Id,
        rowIds: Id[],
        dropPosition: DropPosition
    ) => {
        const newState = { ...state };
        const to = state.rows.findIndex((row: Row) => row.rowId === targetRowId);
        const ids = rowIds.map((id: Id) =>
            state.rows.findIndex(r => r.rowId === id)
        );
        setState({
            ...newState,
            rows: reorderArray<Row>(state.rows, ids, to)
        } as any);
    };

    const handleCanReorderColumns = (
        targetColumnId: Id,
        columnIds: Id[],
        dropPosition: DropPosition
    ): boolean => {
        return true;
    };

    const handleCanReorderRows = (
        targetColumnId: Id,
        rowIds: Id[],
        dropPosition: DropPosition
    ): boolean => {
        const rowIndex = state.rows.findIndex(
            (row: Row) => row.rowId === targetColumnId
        );
        if (rowIndex === 0) return false;
        return true;
    };

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onColumnsReordered={handleColumnsReordered}
            onRowsReordered={handleRowsReordered}
            canReorderRows={handleCanReorderRows}
            canReorderColumns={handleCanReorderColumns}
            enableRowSelection
            enableColumnSelection
        />
    );
}
