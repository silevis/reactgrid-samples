import { Location, State } from "../Common";

export function trySetDataAndAppendChange(state: State, location: Location, type: string, data: any, text: string): State {
    const initialData = location.cell.data;
    if (initialData === data)
        return state;
    const newData = (type === location.cell.type) ? data : state.cellTemplates[location.cell.type].textToCellData(text)
    // TODO We shouldnt update the cell matrix here
    state.cellMatrix.rows[location.row.idx].cells[location.col.idx].data = newData;
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}