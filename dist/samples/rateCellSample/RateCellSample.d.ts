import * as React from 'react';
import './styling.scss';
export default class RateCellSample extends React.Component<{}, {}> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
    };
    private prepareDataChanges;
    render(): JSX.Element;
}
