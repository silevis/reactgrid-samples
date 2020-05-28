import { CellChange } from '@silevis/reactgrid';
import { IDatagridState } from './DatagridSample';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { DefaultCellTypes } from '@silevis/reactgrid/lib';
export declare type RandomDataTypes = string | number | Date | undefined;
export declare class DatagridDataGenerator {
    static nextId: number;
    static data: any;
    static getRandomInt(min: number, max: number): number;
    getDataAttrByKey(key: string): RandomDataTypes;
    getRandomName(): string;
    getRandomEmail(): string;
    getRandomSurname(): string;
    getRandomCountry(): string;
    getRandomAge(min?: number, max?: number): number;
    getRandomDate(start?: Date, end?: Date): Date;
    getRandomPosition(): any;
    getRandomBoolean(): boolean;
}
export declare class VirtualEnv {
    private handleData;
    private virtualUsers;
    constructor(handleData: (data: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]) => IDatagridState);
    addUser(virtualUser: VirtualUser): VirtualEnv;
    updateView: (state: IDatagridState) => IDatagridState;
}
export declare class VirtualUser {
    borderColor: string;
    constructor(borderColor: string);
    private count;
    private highlightColumnIdx;
    private highlightRowIdx;
    getHighlightedCell(state: IDatagridState): DropdownNumberCell | FlagCell | import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").GroupCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell;
    getHighlightedColumn(state: IDatagridState): import("@silevis/reactgrid").Column;
    getHighlightedRow(state: IDatagridState): import("@silevis/reactgrid").Row<DropdownNumberCell | FlagCell | import("@silevis/reactgrid/lib").CheckboxCell | import("@silevis/reactgrid/lib").DateCell | import("@silevis/reactgrid/lib").EmailCell | import("@silevis/reactgrid/lib").GroupCell | import("@silevis/reactgrid/lib").HeaderCell | import("@silevis/reactgrid/lib").NumberCell | import("@silevis/reactgrid/lib").TextCell | import("@silevis/reactgrid/lib").TimeCell>;
    updateHighlightsState(state: IDatagridState): IDatagridState;
    getUpdatedFieldState(state: IDatagridState, handleData: (data: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]) => IDatagridState): any;
    makeChanges(state: IDatagridState, handleData: (data: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]) => IDatagridState): IDatagridState;
}
