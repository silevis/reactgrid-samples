import * as React from 'react';
import { CellMatrixProps } from '@silevis/reactgrid';
import './styling.scss';
export declare class RateCellSample extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
    };
    private prepareDataChanges;
    render(): JSX.Element;
}
