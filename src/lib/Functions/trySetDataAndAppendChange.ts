import { CellData, DataChange, Location } from "../Common";

export function trySetDataAndAppendChange(location: Location, cellData: CellData, dataChanges: DataChange[]): DataChange[] {
    const initialCellData = location.cell.cellData.data;
    if (location.cell.trySetData(cellData)) {
        dataChanges.push({
            initialData: initialCellData,
            newData: location.cell.cellData.data,
            type: location.cell.cellData.type,
            rowId: location.row.id,
            columnId: location.col.id
        })
    }
    return dataChanges;
}