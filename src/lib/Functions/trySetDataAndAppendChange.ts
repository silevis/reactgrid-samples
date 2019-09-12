import { Location, State, Cell } from "../Common";
import { TextCellTemplate } from "../CellTemplates/TextCellTemplate";

export function trySetDataAndAppendChange(state: State, location: Location, cell: Cell): State {
    const initialData = location.cell.data;
    if (initialData === cell.data)
        return state;
    // TODO should not render without poper cellTemplate - remove this
    const doesCellTemplateExist = state.cellTemplates[location.cell.type] ? true : false;
    // TODO remove new TextCellTemplate
    const cellTemplate = doesCellTemplateExist ? state.cellTemplates[location.cell.type] : new TextCellTemplate();
    const newData = (cell.type === location.cell.type)
        ? cell.data
        : doesCellTemplateExist ? cellTemplate.textToCellData(cell.text ? cell.text : '') : cell.data;
    state.queuedDataChanges.push({
        initialData,
        newData,
        type: location.cell.type,
        rowId: location.row.id,
        columnId: location.col.id
    })
    return { ...state };
}