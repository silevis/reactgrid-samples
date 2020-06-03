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
      "_id": "5ece7cd19542be0001b1044h",
      "project": "Teamspot",
      "job position": "Programmer",
      "name": "Krzysztof"
    },
    {
      "_id": "5ece7cd19542be0001b104yy",
      "project": "Teamspot",
      "job position": "Programmer",
      "name": "Adrian"
    },
    {
      "_id": "5ece7cd19542be0001b104nn",
      "project": "Teamspot",
      "job position": "Project manager",
      "name": "Arek"
    },
    {
      "_id": "5ece7cd19542be0001b104rr",
      "project": "ReactGrid",
      "job position": "Programmer",
      "name": "Kamil"
    },
    {
      "_id": "5ece7cd42542be0001b104rr",
      "project": "ReactGrid",
      "job position": "Programmer",
      "name": "Patryk"
    },
    {
      "_id": "5ece7cd19542be0001b10ww",
      "project": "ReactGrid",
      "job position": "Project manager",
      "name": "Arek"
    },
    {
      "_id": "5ece7cd19542be0dcv1b10ww",
      "project": "CallCenter",
      "job position": "Project manager",
      "name": "Arek"
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