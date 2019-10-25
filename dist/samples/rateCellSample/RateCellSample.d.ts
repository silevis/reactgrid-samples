import * as React from 'react';
export default class RateCellDemo extends React.Component<{}, {}> {
    state: {
        columns: import("@silevis/reactgrid").ColumnProps[];
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
    private prepareDataChanges;
    render(): JSX.Element;
}
