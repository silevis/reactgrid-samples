import * as React from 'react';
import { ColumnProps, CellMatrixProps, RowProps } from '@silevis/reactgrid';
export declare class ResizeColumnSample extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: ColumnProps[];
        rows: RowProps[];
    };
    private getMatrix;
    private prepareDataChanges;
    render(): JSX.Element;
}
