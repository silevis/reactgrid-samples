import * as React from "react";
import { ReactGrid, Column, Row, DropPosition } from "@silevis/reactgrid";
import "./styling.scss";
import { Id } from '@silevis/reactgrid/lib';


interface Person {
    name: string;
    surname: string;
}

const getPeople = (): Person[] => [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
];

declare module "@silevis/reactgrid" {
    interface Column {
        columnId: ColumnId;
    }
}
interface ColumnMap {
    name: 'Name';
    surname: 'Surname';
}

const columnMap: ColumnMap = {
    name: 'Name',
    surname: 'Surname'
};

type ColumnId = keyof ColumnMap;

const getColumns = (): Column[] => [
    { columnId: 'name', width: 150, reorderable: true },
    { columnId: 'surname', width: 200, reorderable: true }
];

const getRows = (people: Person[], columnsOrder: ColumnId[]): Row[] => {
    return [
        {
            rowId: "header",
            cells: [
                { type: "header", text: columnMap[columnsOrder[0]] },
                { type: "header", text: columnMap[columnsOrder[1]] }
            ]
        },
        ...people.map<Row>((person, idx) => ({
            rowId: idx,
            cells: [
                { type: "text", text: person[columnsOrder[0]] },
                { type: "text", text: person[columnsOrder[1]] }
            ]
        }))
    ]
};

const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
}

export const ColumnsAndRowsReorderSample = () => {
    const [people] = React.useState<Person[]>(getPeople());
    const [columns, setColumns] = React.useState<Column[]>(getColumns());

    const rows = getRows(people, columns.map(c => c.columnId));

    const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
        const to = columns.findIndex((column) => column.columnId === targetColumnId);
        const columnIdxs = columnIds.map((columnId) => columns.findIndex((c) => c.columnId === columnId));
        setColumns(prevColumns => reorderArray(prevColumns, columnIdxs, to));
    }

    return <ReactGrid
        rows={rows}
        columns={columns}
        onColumnsReordered={handleColumnsReorder}
        // onRowsReordered={handleRowsReorder}
        enableRowSelection
        enableColumnSelection
    />;
}