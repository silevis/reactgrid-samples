import * as React from 'react';
import { Highlight, Column } from '@silevis/reactgrid';
import { rows } from '../../data/crm/rows';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import './styling.scss';
export interface IDatagridState {
    columns: Column[];
    rows: ReturnType<typeof rows>;
    stickyTopRows?: number;
    stickyLeftColumns?: number;
    highlights: Highlight[];
}
export declare class DatagridSample extends React.Component<{}, IDatagridState> {
    state: {
        columns: Column[];
        rows: import("@silevis/reactgrid").Row<DropdownNumberCell | FlagCell | import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").GroupCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell>[];
        stickyTopRows: number;
        stickyLeftColumns: number;
        highlights: never[];
    };
    intervalId?: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private setVirtualEnv;
    private unsetVirtualEnv;
    private makeChanges;
    private reorderArray;
    private handleCanReorderColumns;
    private handleCanReorderRows;
    private handleColumnsReorder;
    private handleRowsReorder;
    private handleChanges;
    private handleColumnResize;
    private handleContextMenu;
    render(): JSX.Element;
}
