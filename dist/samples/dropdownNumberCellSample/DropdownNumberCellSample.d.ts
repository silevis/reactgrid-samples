import * as React from 'react';
import { CellMatrixProps } from '@silevis/reactgrid';
import './styling.scss';
export default class DropdownNumberCell extends React.Component<{}, CellMatrixProps> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
    };
    private prepareDataChanges;
    render(): JSX.Element;
}
