import * as React from 'react';
import { ColumnProps, CellMatrixProps, RowProps } from '@silevis/reactgrid';
import '@silevis/reactgrid/dist/lib/assets/core.css';
export declare class ColumnReorderSample extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: ColumnProps[];
        rows: RowProps[];
    };
    private getMatrix;
    private prepareDataChanges;
    private getReorderedColumns;
    private getUpdatedRows;
    private getReorderedRows;
    render(): JSX.Element;
}
