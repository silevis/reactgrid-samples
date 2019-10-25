import { IDynaGridDemoState, Record } from './AllInOneSample';
export declare class DynaGridDataGenerator {
    static nextId: number;
    static data: any;
    constructor();
    getDataAttrByKey(key: string): any;
    getRandomName(): string;
    getRandomSurname(): string;
    getRandomCountry(): string;
    getRandomAge(min?: number, max?: number): number;
    getRandomPosition(): any;
    getRandomBoolean(): boolean;
    createNewUser(): Record;
}
export declare class VirtualEnv {
    handleData: (data: any) => IDynaGridDemoState;
    private virtualUsers;
    state: IDynaGridDemoState;
    constructor(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState);
    addUser(virtualUser: VirtualUser): VirtualEnv;
    updateView: (state: IDynaGridDemoState) => IDynaGridDemoState;
}
export declare class VirtualUser {
    color: string;
    constructor(color: string);
    private count;
    private focusX;
    private focusY;
    updateFocusesState(state: IDynaGridDemoState): IDynaGridDemoState;
    getUpdatedFieldState(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState): any;
    makeChanges(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState): IDynaGridDemoState;
}
