import * as React from 'react';
import { Focus } from '@silevis/reactgrid';
import './styling.scss';
interface Column {
    id: number;
    name: string;
    type: string;
    width: number;
    pinned: boolean;
}
export interface Record {
    id: number;
    name: string;
    surname: string;
    age: number;
    country: string;
    position: {
        name: string;
        isExpanded: boolean | undefined;
        depth: number;
    };
    onHoliday: boolean;
    pinned: boolean;
    parentId?: number;
}
export interface IReactgridAllInOneState {
    fields: Column[];
    records: Record[];
    focuses: Focus[];
    virtualUsers: boolean;
    resizing: boolean;
    columnReordering: boolean;
    rowReordering: boolean;
    flagCell: boolean;
    disableFillHandle: boolean;
    disableRangeSelection: boolean;
    frozenPanes: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        active: boolean;
    };
}
export interface IReactgridAllInOneActions {
    toggleResizeAction(): void;
    toggleColumnReorderAction(): void;
    toggleRowReorderAction(): void;
    toggleFreezePaneAction(): void;
    toggleVirtualUsersAction(): void;
    toggleFlagCellAction(): void;
    toggleDisableFillHandleAction(): void;
    toggleDisableRangeSelectionAction(): void;
    addNewRecordAction(): void;
    addNewFieldAction(): void;
}
export default class AllInOneSample extends React.Component<{}, IReactgridAllInOneState> {
    state: {
        fields: Column[];
        records: any[];
        focuses: never[];
        virtualUsers: boolean;
        resizing: boolean;
        columnReordering: boolean;
        rowReordering: boolean;
        flagCell: boolean;
        disableFillHandle: boolean;
        disableRangeSelection: boolean;
        frozenPanes: {
            top: number;
            bottom: number;
            left: number;
            right: number;
            active: boolean;
        };
    };
    intervalId: number;
    private setVirtualEnv;
    private addNewRecord;
    private addNewField;
    private unsetVirtualEnv;
    private generateMatrix;
    private prepareDataChanges;
    private calculateColumnReorder;
    private reorderedColumns;
    private findParent;
    private getChildren;
    private prepareMovedRecords;
    private reorderedRows;
    private handleRowContextMenu;
    private handleColContextMenu;
    private deleteRows;
    private deleteColumns;
    private deleteRowsFocuses;
    private deleteColumnsFocuses;
    private pinColumns;
    private unpinColumns;
    private unpinRows;
    private pinRows;
    private handleRangeContextMenu;
    demoActions: IReactgridAllInOneActions;
    getCustomCellTemplates(): any;
    render(): JSX.Element;
}
export {};
