import * as React from "react";
import {
    ReactGrid,
    CellChange,
    Id,
    MenuOption,
    SelectionMode
} from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/lib/assets/core.scss";

export const SimpleContextMenuHandlingSample: React.FunctionComponent = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", width: 100 },
            { columnId: "Surname", width: 100 }
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
                cells: [{ type: "text", text: "" }, { type: "text", text: "" }]
            }
        ]
    }));

    const handleChanges = (changes: CellChange[]) => {
        let newState = { ...state };
        changes.forEach((change: any) => {
            const changeRowIdx = newState.rows.findIndex(
                el => el.rowId === change.rowId
            );
            const changeColumnIdx = newState.columns.findIndex(
                el => el.columnId === change.columnId
            );
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
        return true;
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
            rows={state.rows}
            columns={state.columns}
            onCellsChanged={handleChanges}
            onContextMenu={simpleHandleContextMenu}
        />
    );
}