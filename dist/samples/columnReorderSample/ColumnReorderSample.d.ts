import * as React from 'react';
import { ColumnProps, CellMatrixProps, RowProps } from '@silevis/reactgrid';
import './styling.scss';
export declare class ColumnReorderSample extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: ColumnProps[];
        rows: RowProps[];
    };
    private getMatrix;
    private prepareDataChanges;
    private reorderArray;
    render(): JSX.Element;
}
