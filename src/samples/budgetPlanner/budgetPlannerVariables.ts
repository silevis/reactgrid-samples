import moment from 'moment';
import { groupBy, GroupAttribute } from './budgetPlannerData';
import { calculateValues, getDefaultValues } from './budgetPlannerValues';
import { Value } from './interfaces';

export interface IVariable {
  [key: string]: string | number | Date;
  name: string
}
export interface Variable extends IVariable {
  _id: string;
}

export const getVariableModel = (groupAttributes: any, dates: Date[], span: string, variables: Variable[]): any => {
  groupAttributes.forEach((groupAttribute: GroupAttribute) => {
    // @ts-ignore
    const variablesChildren = variables.filter((variable: Variable) => (groupAttribute.name === variable[groupAttribute.fieldName]) ||
      (groupAttribute.name === moment(variable.date).format('MM-YYYY')));
    if (groupAttribute.children && groupAttribute.children.length > 0) {
      groupAttribute.values = getDefaultValues([] as Value[], dates, span);
      groupAttribute = getVariableModel(groupAttribute.children, dates, span, variablesChildren);
    } else {
      groupAttribute.values = getDefaultValues([] as Value[], dates, span);
      groupAttribute.variables = Object.keys(groupBy(variablesChildren, 'name')).map(key => (groupBy(variablesChildren, 'name')[key]));

    }
  })
  return groupAttributes;
}