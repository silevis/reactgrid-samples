import { Column, Highlight } from '@silevis/reactgrid';
import { rows } from '../../data/crm/rows';
import { VirtualUser } from './VirtualUser';
export interface IDatagridState {
    columns: Column[];
    rows: ReturnType<typeof rows>;
    stickyTopRows?: number;
    stickyLeftColumns?: number;
    highlights: Highlight[];
}
export declare class VirtualEnv {
    private virtualUsers;
    addUser(virtualUser: VirtualUser): VirtualEnv;
    updateView: (state: IDatagridState) => {
        columns: Column[];
        rows: import("@silevis/reactgrid").Row<import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").ChevronCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell>[];
        stickyTopRows?: number | undefined;
        stickyLeftColumns?: number | undefined;
        highlights: Highlight[];
    };
}
