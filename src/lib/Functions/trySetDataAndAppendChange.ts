import { Location, State } from "../Common";

export function trySetDataAndAppendChange(state: State, location: Location, type: string, data: any, text: string): State {
    const initialData = location.cell.data;
    if (initialData === data)
        return state;
    const newData = (type === location.cell.type) ? data : state.cellTemplates[location.cell.type].textToCellData(text)
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}