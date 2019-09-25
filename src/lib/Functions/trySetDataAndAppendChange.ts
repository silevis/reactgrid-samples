import { Location, State } from "../Common";

export function trySetDataAndAppendChange(state: State, location: Location, cell: { data?: any, type?: string | null, text?: string }): State {
    const initialCellData = location.cell.data;
    if (cell.data && cell.data === initialCellData)
        return state;

    const targetCellTemplate = state.cellTemplates[location.cell.type];
    if (targetCellTemplate.isReadonly && targetCellTemplate.isReadonly(initialCellData))
        return state;

    let newData = null;
    if (cell.type && cell.type === location.cell.type)
        newData = cell.data;
    else if (cell.type && state.cellTemplates[cell.type] && targetCellTemplate.textToCellData)
        newData = targetCellTemplate.textToCellData(state.cellTemplates[cell.type].cellDataToText(cell.data))

    if (newData === null && cell.text && targetCellTemplate.textToCellData)
        newData = targetCellTemplate.textToCellData(cell.text);

    if (newData === null)
        return state;

    state.queuedDataChanges.push({
        initialData: initialCellData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}
