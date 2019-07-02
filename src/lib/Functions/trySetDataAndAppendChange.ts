import { Location, State } from "../Common";

export function trySetDataAndAppendChange(location: Location, data: any, type: string, text: string, state: State): State {
    const initialData = location.cell.data;
    const newData = (type === location.cell.type) ? data : state.cellTemplates[location.cell.type].textToCellData(text)

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