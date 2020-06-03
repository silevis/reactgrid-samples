import React, { useState, useEffect, useCallback } from 'react';
import BudgetPlannerDisplay from './BudgetPlannerDisplay';
import DataFilterOptions, { valuesFilterOptionsState } from './DataFilterOptions';
import { getDates } from './dates';
import { Value } from './interfaces';
import "./budget-planner.scss";
import { Variable } from './models';
import "./budget-planner.scss";

export const BudgetPlannerSample: React.FC = () => {

  const [span] = useState<string>('month')
  const [values, setValues] = useState<Value[]>([])
  const [variables, setVariables] = useState<Variable[]>([])
  const [dates, setDates] = useState<Date[]>([])


  const fetchBudgetPlannerData = useCallback(async () => {
    const budgetPlannerVariable = [{
      "_id": "1",
      "project": "Rocket",
      "job position": "Programmer",
      "name": "Cruz Ballard"
    },
    {
      "_id": "2",
      "project": "Rocket",
      "job position": "Programmer",
      "name": "Salahuddin Mcdowell"
    },
    {
      "_id": "3",
      "project": "Rocket",
      "job position": "Project manager",
      "name": "Marissa Rivera"
    },
    {
      "_id": "4",
      "project": "Rocket",
      "job position": "Tester",
      "name": "Korey Villalobos"
    },
    {
      "_id": "5",
      "project": "Electric car",
      "job position": "Programmer",
      "name": "Masuma Mccarthy"
    },
    {
      "_id": "6",
      "project": "Electric car",
      "job position": "Programmer",
      "name": "Sydney Castaneda"
    },
    {
      "_id": "7",
      "project": "Electric car",
      "job position": "Project manager",
      "name": "Masuma McKenzie"
    },
    {
      "_id": "8",
      "project": "Electric car",
      "job position": "Tester",
      "name": "Simran Roy"
    },
    {
      "_id": "9",
      "project": "Perpetum",
      "job position": "Programmer",
      "name": "Cruz Ballard"
    },
    {
      "_id": "10",
      "project": "Perpetum",
      "job position": "Programmer",
      "name": "Rafferty Whiteley"
    },];
    setVariables(budgetPlannerVariable)
    const dates = getDates(null, 'month');
    setDates(dates)
    setValues(values as Variable[])
  }, []);

  useEffect(() => {
    fetchBudgetPlannerData()
  }, [fetchBudgetPlannerData])


  const onGetValuesFilterOptions = async (valuesFilterOptions: valuesFilterOptionsState) => {
    setValues(values as Variable[])
    setDates(getDates(valuesFilterOptions, 'month'))
  }

  return (
    <div>
      <div id="variable-views-budget-planner">
        <div id="budget-planning-container">
          <h3 className="w100">Values Options</h3>
        </div>
        <div id="budget-planning-container">
          <DataFilterOptions onGetValuesFilterOptions={onGetValuesFilterOptions} />
        </div>
        <BudgetPlannerDisplay
          values={values}
          variables={variables}
          dates={dates}
          span={span} />
      </div>
    </div>
  )
}
export default BudgetPlannerSample;