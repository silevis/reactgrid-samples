import { CellData, DataChange, Location, State } from "../Common";

export function trySetDataAndAppendChange(location: Location, cellData: CellData, state: State): State {
    const initialCellData = location.cell.data;
    state.cellMatrix.rows[location.row.idx].cells[location.col.idx] = cellData;
    if (state.cellTemplates[cellData.type].trySetData(cellData)) {
        state.queuedDataChanges.push({
            initialData: initialCellData,
            newData: location.cell.data,
            type: location.cell.type,
            rowId: location.row.id,
            columnId: location.col.id
        })
    }
    return state;
}