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
        rows: import("@silevis/reactgrid").Row<import("@silevis/reactgrid/core").CheckboxCell | import("@silevis/reactgrid/core").DateCell | import("@silevis/reactgrid/core").EmailCell | import("@silevis/reactgrid/core").ChevronCell | import("@silevis/reactgrid/core").HeaderCell | import("@silevis/reactgrid/core").NumberCell | import("@silevis/reactgrid/core").TextCell | import("@silevis/reactgrid/core").TimeCell | import("../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate").DropdownNumberCell | import("../../cell-templates/flagCell/FlagCellTemplate").FlagCell>[];
        stickyTopRows?: number | undefined;
        stickyLeftColumns?: number | undefined;
        highlights: Highlight[];
    };
}
