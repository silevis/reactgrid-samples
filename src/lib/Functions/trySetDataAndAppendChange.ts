import { Location, State, Cell } from "../Common";

export function trySetDataAndAppendChange(state: State, location: Location, cell: Cell): State {
    // 1: Unchanged => do nothing
    const initialData = location.cell.data;
    if (initialData === cell.data)
        return state;

    const cellTemplate = state.cellTemplates[location.cell.type]
    const newData =
        // 2: Same type => validate data
        ((cell.type === location.cell.type) && cellTemplate.validate(cell.data))
        // 3: Different type => get data from text
        || cellTemplate.textToCellData && cellTemplate.textToCellData(cell.text || '')

    if (!newData)
        return state;

    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}