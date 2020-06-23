import * as React from "react";
import {
    ReactGrid,
    CellChange,
    Id,
    MenuOption,
    SelectionMode,
    Column,
    Row,
} from "@silevis/reactgrid";
import "./styling.scss";

export const AdvancedContextMenuHandlingSample = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Name", width: 100 },
            { columnId: "Surname", width: 100 }
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
        ] as Row[]
    }));

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
    };

    const handleContextMenu = (
        selectedRowIds: Id[],
        selectedColIds: Id[],
        selectionMode: SelectionMode,
        menuOptions: MenuOption[]
    ): MenuOption[] => {
        if (selectionMode === "row") {
            menuOptions = [
                ...menuOptions,
                {
                    id: "removeRow",
                    label: "Remove row",
                    handler: () => {
                        setState({
                            ...state,
                            rows: state.rows.filter(row => !selectedRowIds.includes(row.rowId))
                        });
                    }
                }
            ];
        }
        if (selectionMode === "column") {
            menuOptions = [
                ...menuOptions,
                {
                    id: "removeColumn",
                    label: "Remove column",
                    handler: () => {
                        const columns = state.columns.filter(column => !selectedColIds.includes(column.columnId));
                        const columnsIdxs = state.columns
                            .map((column, idx) => {
                                if (!columns.includes(column)) return idx;
                                return undefined;
                            })
                            .filter(idx => idx !== undefined);
                        const rows = state.rows.map(row => ({
                            ...row,
                            cells: row.cells.filter((_, idx) => !columnsIdxs.includes(idx))
                        }));
                        setState({ ...state, ...columns, ...rows });
                    }
                }
            ];
        }
        return menuOptions;
    };

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onCellsChanged={handleChanges}
            onContextMenu={handleContextMenu}
            enableFillHandle
            enableRangeSelection
            enableColumnSelection
            enableRowSelection
        />
    );
}