import { IMultiUserSampleState } from './MultiUserSample';
export declare class ReactGridDataGenerator {
    static nextId: number;
    static data: any;
    getDataAttrByKey(key: string): any;
    getRandomName(): string;
    getRandomEmail(): string;
    getRandomSurname(): string;
    getRandomCountry(): string;
    getRandomAge(min?: number, max?: number): number;
    getRandomDate(start?: Date, end?: Date): string;
    getRandomPosition(): any;
    getRandomBoolean(): boolean;
}
export declare class VirtualEnv {
    handleData: (data: any) => IMultiUserSampleState;
    private virtualUsers;
    state: IMultiUserSampleState;
    constructor(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState);
    addUser(virtualUser: VirtualUser): VirtualEnv;
    updateView: (state: IMultiUserSampleState) => IMultiUserSampleState;
}
export declare class VirtualUser {
    color: string;
    constructor(color: string);
    private count;
    private focusX;
    private focusY;
    updateFocusesState(state: IMultiUserSampleState): IMultiUserSampleState;
    getUpdatedFieldState(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState): any;
    makeChanges(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState): IMultiUserSampleState;
}
