import { Column, Highlight, Row, DefaultCellTypes } from '@silevis/reactgrid';
import { VirtualUser } from './VirtualUser';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DataGridSampleRow } from '..';

export interface IDatagridState {
    rows: Row<DefaultCellTypes | FlagCell | DropdownNumberCell>[],
    highlights: Highlight[]
}

export class VirtualEnv {

    private virtualUsers: VirtualUser[] = [];

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [...this.virtualUsers, virtualUser];
        return this;
    }

    updateView = (columns: Column[], rows: DataGridSampleRow[], highlights: Highlight[]) => {
        let modifiedState: IDatagridState[] = new Array(this.virtualUsers.length).fill({ columns, rows, highlights });
        this.virtualUsers.forEach((virtualUser, idx) => modifiedState[idx] = virtualUser.makeChanges(columns, rows, highlights));
        return modifiedState;
    }
}