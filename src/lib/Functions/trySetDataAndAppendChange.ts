import { CellData, DataChange, Location, State } from "../Common";

export function trySetDataAndAppendChange(location: Location, cellData: CellData, state: State): State {
    const initialCellData = location.cell.cellData.data;
    if (location.cell.trySetData(cellData)) {
        state.queuedDataChanges.push({
            initialData: initialCellData,
            newData: location.cell.cellData.data,
            type: location.cell.cellData.type,
            rowId: location.row.id,
            columnId: location.col.id
        })
    }
    return state;
}