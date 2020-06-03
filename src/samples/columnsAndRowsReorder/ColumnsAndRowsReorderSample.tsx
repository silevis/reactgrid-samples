import * as React from "react";
import {
    ReactGrid,
    Id,
    DropPosition,
    Column,
    Row
} from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnsAndRowsReorderSample = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", width: 100, reorderable: true },
            { columnId: "Surname", width: 100, reorderable: true }
        ] as Column[],
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
        ] as Row[]
    }));

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
        to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
        const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
        const to = state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
        const columnIdxs = columnIds.map((id: Id, idx: number) => state.columns.findIndex((c: Column) => c.columnId === id));
        setState({
            columns: reorderArray(state.columns, columnIdxs, to),
            rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIdxs, to) })),
        });
    }

    const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...state };
        const to = state.rows.findIndex(row => row.rowId === targetRowId);
        const ids = rowIds.map(id => state.rows.findIndex(r => r.rowId === id));
        setState({ ...newState, rows: reorderArray(state.rows, ids, to) });
    }

    const handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
        return true;
    }

    const handleCanReorderRows = (targetColumnId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
        return true;
    }

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onColumnsReordered={handleColumnsReorder}
            onRowsReordered={handleRowsReorder}
            canReorderRows={handleCanReorderRows}
            canReorderColumns={handleCanReorderColumns}
            enableRowSelection
            enableColumnSelection
        />
    );
}
