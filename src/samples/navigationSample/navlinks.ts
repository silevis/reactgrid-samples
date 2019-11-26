import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import {
  FrozensSample,
  // BudgetPlannerSample, 
  ColumnReorderSample,
  ResizeColumnSample,
  MultiUserSample,
  StockMarketDataSample
} from '../../samples';

export interface ISampleNavLink extends INavLink {
  component?: any;
}

export const navLinks: ISampleNavLink[] = [
  {
    name: 'Frozens Sample',
    key: '/FrozensSample',
    url: '/FrozensSample',
    component: FrozensSample
  },
  // {
  //   name: 'Budget Planner',
  //   key: '/BudgetPlannerSample',
  //   url: '/BudgetPlannerSample',
  //   component: BudgetPlannerSample
  // },
  {
    name: 'Column Reorder Sample',
    key: '/ColumnReorderSample',
    url: '/ColumnReorderSample',
    component: ColumnReorderSample
  },
  {
    name: 'Resize Column Sample',
    key: '/ResizeColumnSample',
    url: '/ResizeColumnSample',
    component: ResizeColumnSample
  },
  {
    name: 'Multi User Sample',
    key: '/MultiUserSample',
    url: '/MultiUserSample',
    component: MultiUserSample
  },
  {
    name: 'Stock Market Data Sample',
    key: '/StockMarketDataSample',
    url: '/StockMarketDataSample',
    component: StockMarketDataSample
  },
];