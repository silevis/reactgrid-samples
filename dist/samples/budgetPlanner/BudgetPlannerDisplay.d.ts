import React from 'react';
import { Value } from './interfaces';
import { Variable } from './models';
export interface BudgetPlannerDisplayProps {
    values: Value[];
    variables: Variable[];
    dates: Date[];
    span: string;
}
export declare const BudgetPlannerDisplay: React.FunctionComponent<BudgetPlannerDisplayProps>;
export default BudgetPlannerDisplay;
