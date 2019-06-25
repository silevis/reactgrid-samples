import { CellData, DataChange, Location, State } from "../Common";

export function trySetDataAndAppendChange(location: Location, cellData: CellData<any>, text: string, state: State): State {
    const initialData = location.cell.data;
    const newData = (cellData.type === location.cell.type) ? cellData.data : state.cellTemplates[location.cell.type].textToCellData(text)

    state.cellMatrix.rows[location.row.idx].cells[location.col.idx].data = newData;
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return state;
}