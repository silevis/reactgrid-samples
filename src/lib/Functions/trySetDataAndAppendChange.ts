import { Location, State, Cell } from "../Common";

export function trySetDataAndAppendChange(state: State, location: Location, cell: Cell): State {
    const initialData = location.cell.data;
    if (initialData === cell.data)
        return state;
    const newData = (cell.type === location.cell.type) ? cell.data : state.cellTemplates[location.cell.type].textToCellData(cell.text ? cell.text : '')
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}