import * as React from "react";
import { ReactGrid, Id, DropPosition, Column, Row } from "@silevis/reactgrid";
import "./styling.scss";

export const ColumnsAndRowsReorderSample = () => {
    const [columns, setColumns] = React.useState<Column[]>(() => [
        { columnId: "Name", width: 100, reorderable: true },
        { columnId: "Surname", width: 100, reorderable: true }
    ]);
    const [rows, setRows] = React.useState<Row[]>(() => [
        {
            rowId: 0,
            reorderable: true,
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
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]);

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
        to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
        const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
        const to = columns.findIndex((column: Column) => column.columnId === targetColumnId);
        const columnIdxs = columnIds.map((id: Id, idx: number) => columns.findIndex((c: Column) => c.columnId === id));
        setRows(rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIdxs, to) })));
        setColumns(reorderArray(columns, columnIdxs, to));
    }

    const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        setRows((prevRows) => {
            const to = rows.findIndex(row => row.rowId === targetRowId);
            const columnIdxs = rowIds.map(id => rows.findIndex(r => r.rowId === id));
            return reorderArray(prevRows, columnIdxs, to);
        });
    }

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            onColumnsReordered={handleColumnsReorder}
            onRowsReordered={handleRowsReorder}
            enableRowSelection
            enableColumnSelection
        />
    );
}
