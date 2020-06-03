import { Value } from './interfaces';
import { CellChange } from '@silevis/reactgrid';
import { Variable } from './models';
export declare const getVariableModel: (groupAttributes: any, dates: Date[], span: string, variables: Variable[]) => any;
export declare const updateValues: (changes: CellChange[], values: Value[]) => Value[];
export declare const groupBy: <T extends { [x in K]: string | number | symbol; }, K extends keyof T>(array: T[], key: K) => Record<T[K], T[]>;
