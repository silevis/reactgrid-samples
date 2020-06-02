export interface IVariable {
    [key: string]: string | number | Date;
    name: string;
}
export interface Variable extends IVariable {
    _id: string;
}