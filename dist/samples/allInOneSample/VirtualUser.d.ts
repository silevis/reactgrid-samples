import { IReactgridAllInOneState, Record } from './AllInOneSample';
export declare class ReactGridDataGenerator {
    static nextId: number;
    static data: any;
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
    handleData: (data: any) => IReactgridAllInOneState;
    private virtualUsers;
    state: IReactgridAllInOneState;
    constructor(state: IReactgridAllInOneState, handleData: (data: any) => IReactgridAllInOneState);
    addUser(virtualUser: VirtualUser): VirtualEnv;
    updateView: (state: IReactgridAllInOneState) => IReactgridAllInOneState;
}
export declare class VirtualUser {
    color: string;
    constructor(color: string);
    private count;
    private focusX;
    private focusY;
    updateFocusesState(state: IReactgridAllInOneState): IReactgridAllInOneState;
    getUpdatedFieldState(state: IReactgridAllInOneState, handleData: (data: any) => IReactgridAllInOneState): any;
    makeChanges(state: IReactgridAllInOneState, handleData: (data: any) => IReactgridAllInOneState): IReactgridAllInOneState;
}
