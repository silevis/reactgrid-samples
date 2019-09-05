import { Location, State, Cell } from "../Common";
import { TextCellTemplate } from "../Cells/TextCellTemplate";

export function trySetDataAndAppendChange(state: State, location: Location, cell: Cell): State {
    const initialData = location.cell.data;
    if (initialData === cell.data)
        return state;
    const isCellTemplateExist: boolean = state.cellTemplates[location.cell.type] ? true : false;
    const cellTemplate = isCellTemplateExist ? state.cellTemplates[location.cell.type] : new TextCellTemplate();
    const newData = (cell.type === location.cell.type) 
                        ? cell.data 
                        : isCellTemplateExist ? cellTemplate.textToCellData(cell.text ? cell.text : '') : cell.data;
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}