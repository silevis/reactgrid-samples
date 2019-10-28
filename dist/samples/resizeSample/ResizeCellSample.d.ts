import * as React from 'react';
import { ColumnProps } from '@silevis/reactgrid';
export default class ResizeCellDemo extends React.Component<ColumnProps, {}> {
    state: {
        columns: ColumnProps[];
        rows: {
            id: string;
            height: number;
            reorderable: boolean;
            cells: ({
                type: string;
                data: string;
            } | {
                type: string;
                data: number;
            })[];
        }[];
    };
    private getMatrix;
    private prepareDataChanges;
    render(): JSX.Element;
}
