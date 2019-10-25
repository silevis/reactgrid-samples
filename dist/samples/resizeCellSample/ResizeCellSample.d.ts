import * as React from 'react';
import { ColumnProps } from '@silevis/reactgrid';
export default class ResizeCellDemo extends React.Component<ColumnProps, {}> {
    state: {
        columns: ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
    };
    private getMatrix;
    private prepareDataChanges;
    render(): JSX.Element;
}
