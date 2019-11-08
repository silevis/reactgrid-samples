import * as React from 'react';
import { Focus, CellMatrixProps, RowProps, ColumnProps } from '@silevis/reactgrid';
import './styling.scss';
export interface IMultiUserSampleState extends CellMatrixProps {
    focuses: Focus[];
}
export declare class MultiUserSample extends React.Component<{}, IMultiUserSampleState> {
    state: {
        columns: ColumnProps[];
        rows: RowProps[];
        focuses: never[];
    };
    intervalId?: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private setVirtualEnv;
    private unsetVirtualEnv;
    private prepareDataChanges;
    private reorderArray;
    private getMatrix;
    render(): JSX.Element;
}
