import { CellData, DataChange, Location } from "../Common";

export function trySetDataAndAppendChange(location: Location, cellData: CellData, dataChanges: DataChange[]): DataChange[] {
    const initialCellData = location.cell.cellData;
    if (location.cell.trySetData(cellData)) {
        dataChanges.push({ initialCellData, newCellData: location.cell.cellData, cellId: { columnId: location.col.id, rowId: location.row.id } })
    }
    return dataChanges;
}