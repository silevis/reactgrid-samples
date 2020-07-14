import { DefaultCellTypes, CellChange, Column, Highlight, } from '@silevis/reactgrid';
import { rows } from '../../data/crm/rows';
import { VirtualUser } from './VirtualUser';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';

export interface IDatagridState {
    columns: Column[],
    rows: ReturnType<typeof rows>,
    stickyTopRows?: number,
    stickyLeftColumns?: number,
    highlights: Highlight[]
}

export type VirtualEnvCellChange = CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>;

export class VirtualEnv {

    private handleData: (data: VirtualEnvCellChange[]) => IDatagridState;
    private virtualUsers: VirtualUser[] = [];

    constructor(handleData: (data: VirtualEnvCellChange[]) => IDatagridState) {
        this.handleData = handleData;
    }

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [...this.virtualUsers, virtualUser];
        return this;
    }

    updateView = (state: IDatagridState) => {
        let modifiedState: IDatagridState = { ...state };
        this.virtualUsers.forEach(virtualUser => modifiedState = virtualUser.makeChanges(modifiedState, this.handleData));
        return modifiedState;
    }
}