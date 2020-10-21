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
    getHighlightedCell(state: IDatagridState): import("@silevis/reactgrid/core").CheckboxCell | import("@silevis/reactgrid/core").DateCell | import("@silevis/reactgrid/core").EmailCell | import("@silevis/reactgrid/core").ChevronCell | import("@silevis/reactgrid/core").HeaderCell | import("@silevis/reactgrid/core").NumberCell | import("@silevis/reactgrid/core").TextCell | import("@silevis/reactgrid/core").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell;
    getHighlightedColumn(state: IDatagridState): import("@silevis/reactgrid").Column;
    getHighlightedRow(state: IDatagridState): import("@silevis/reactgrid").Row<import("@silevis/reactgrid/core").CheckboxCell | import("@silevis/reactgrid/core").DateCell | import("@silevis/reactgrid/core").EmailCell | import("@silevis/reactgrid/core").ChevronCell | import("@silevis/reactgrid/core").HeaderCell | import("@silevis/reactgrid/core").NumberCell | import("@silevis/reactgrid/core").TextCell | import("@silevis/reactgrid/core").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell>;
    drawHighlight(state: IDatagridState): void;
    updateHighlightsState(state: IDatagridState): IDatagridState;
    makeChanges(state: IDatagridState): IDatagridState;
}
