import * as React from 'react';
import { CellMatrixProps } from '@silevis/reactgrid';
import './styling.scss';
export declare class FrozensSample extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
        frozenTopRows: number;
        frozenLeftColumns: number;
        frozenRightColumns: number;
    };
    private prepareDataChanges;
    render(): JSX.Element;
}
