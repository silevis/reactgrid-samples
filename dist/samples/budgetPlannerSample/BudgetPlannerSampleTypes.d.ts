import { Cell } from '@silevis/reactgrid';
export interface BudgetPlannerNumberCellData {
    value: number;
    isCollapsed: boolean;
    parent?: Cell;
}
export interface BudgetPlannerTextCellData {
    value: string;
    isCollapsed: boolean;
    parent?: Cell;
}
export declare type MonthIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export interface MonthOfYear {
    month: MonthIdx;
    year: number;
}
export interface Entry {
    year: number;
    month: MonthIdx;
    value: number;
}
export interface SubCategory {
    subcategory: string;
    id: string;
    entries: Entry[];
}
export interface DataRow {
    id: string;
    category: string;
    subcategories: SubCategory[];
    isCollapsed: boolean;
}
export interface DateRange {
    start: MonthOfYear;
    end: MonthOfYear;
}
export interface BudgetPlannerProps {
    budgetData: DataRow[];
    dateRange: DateRange;
}
