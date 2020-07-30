import { Id } from '@silevis/reactgrid';
export declare type RandomDataTypes = string | number | Date | undefined;
export declare class DatagridDataGenerator {
    static nextId: number;
    static data: any;
    static getRandomInt(min: number, max: number): number;
    getDataAttrByKey(key: Id): RandomDataTypes;
    getRandomName(): string;
    getRandomEmail(): string;
    getRandomSurname(): string;
    getRandomCountry(): string;
    getRandomAge(min?: number, max?: number): number;
    getRandomDate(start?: Date, end?: Date): Date;
    getRandomPosition(): any;
    getRandomBoolean(): boolean;
}
