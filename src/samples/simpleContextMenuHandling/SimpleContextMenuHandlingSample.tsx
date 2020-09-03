import * as React from "react";
import { ReactGrid, CellChange, Id, MenuOption, SelectionMode, Row, Column } from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/styles.css";

export const SimpleContextMenuHandlingSample: React.FunctionComponent = () => {
    const [columns] = React.useState<Column[]>(() => [
        { columnId: "Name", width: 100 },
        { columnId: "Surname", width: 100 }
    ]);
    const [rows, setRows] = React.useState<Row[]>(() => [
        {
            rowId: 0,
            cells: [
                { type: "header", text: "Name" },
                { type: "header", text: "Surname" }
            ]
        },
        {
            rowId: 1,
            cells: [
                { type: "text", text: "Thomas" },
                { type: "text", text: "Goldman" }
            ]
        },
        {
            rowId: 2,
            cells: [
                { type: "text", text: "Susie" },
                { type: "text", text: "Spencer" }
            ]
        },
        {
            rowId: 3,
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]);

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

    const simpleHandleContextMenu = (
        selectedRowIds: Id[],
        selectedColIds: Id[],
        selectionMode: SelectionMode,
        menuOptions: MenuOption[]
    ): MenuOption[] => {
        return menuOptions;
    };

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            onCellsChanged={handleChanges}
            onContextMenu={simpleHandleContextMenu}
        />
    );
}