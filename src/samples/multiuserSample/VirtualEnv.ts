import { DefaultCellTypes, CellChange, Column, Highlight, } from '@silevis/reactgrid';
import { rows } from '../../data/crm/rows';
import { VirtualUser } from './VirtualUser';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';

export interface IMultiUserState {
    columns: Column[],
    rows: ReturnType<typeof rows>,
    stickyTopRows?: number,
    stickyLeftColumns?: number,
    highlights: Highlight[]
}

export type VirtualEnvCellChange = CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>;

export class VirtualEnv {

    private handleData: (data: VirtualEnvCellChange[]) => void;
    private virtualUsers: VirtualUser[] = [];

    constructor(handleData: (data: VirtualEnvCellChange[]) => void) {
        this.handleData = handleData;
    }

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [...this.virtualUsers, virtualUser];
        return this;
    }

    updateView = (state: IMultiUserState) => {
        let modifiedState = { ...state };
        this.virtualUsers.forEach(virtualUser => modifiedState = virtualUser.makeChanges(modifiedState, this.handleData));
        return modifiedState;
    }
}