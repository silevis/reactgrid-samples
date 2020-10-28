export interface WorkLog {
    id: number;
    date?: Date;
    project: string;
    employee: string;
    hours: number;
    description: string;
}
export declare const initialWorkhours: WorkLog[];
export declare const projects: string[];
