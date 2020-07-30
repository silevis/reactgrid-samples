import { IDatagridState } from './VirtualEnv';
export declare class VirtualUser {
    borderColor: string;
    private highlightColumnIdx;
    private highlightRowIdx;
    constructor(borderColor: string, highlightColumnIdx: number, highlightRowIdx: number);
    private count;
    private currectLetterCount;
    private drawData;
    private dataGen;
    getHighlightedCell(state: IDatagridState): import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").GroupCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell;
    getHighlightedColumn(state: IDatagridState): import("@silevis/reactgrid").Column;
    getHighlightedRow(state: IDatagridState): import("@silevis/reactgrid").Row<import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").GroupCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell>;
    drawHighlight(state: IDatagridState): void;
    updateHighlightsState(state: IDatagridState): IDatagridState;
    makeChanges(state: IDatagridState): IDatagridState;
}
