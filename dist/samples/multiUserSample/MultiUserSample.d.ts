import * as React from 'react';
import { Focus, CellMatrixProps } from '@silevis/reactgrid';
import './styling.scss';
export interface IMultiUserSampleState extends CellMatrixProps {
    focuses: Focus[];
}
export default class MultiUserSample extends React.Component<{}, IMultiUserSampleState> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
        rows: import("@silevis/reactgrid").RowProps[];
        focuses: never[];
    };
    intervalId?: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private setVirtualEnv;
    private unsetVirtualEnv;
    private prepareDataChanges;
    render(): JSX.Element;
}
