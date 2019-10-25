import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { AllInOneSample, RateCellSample, DropdownNumberCellSample, BudgetPlannerSample, ResizeCellSample, MultiUserSample } from '../../samples';

export interface ISampleNavLink extends INavLink {
  component?: any;
}

export const navLinks: ISampleNavLink[] = [
  {
    name: 'All In One Sample',
    key: '/AllInOneSample',
    url: '/AllInOneSample',
    component: AllInOneSample
  },
  {
    name: 'Rate Cell Sample',
    key: '/RateCellDemo',
    url: '/RateCellDemo',
    component: RateCellSample
  },
  {
    name: 'Dropdown Number Cell Sample',
    key: '/DropdownNumberCellSample',
    url: '/DropdownNumberCellSample',
    component: DropdownNumberCellSample
  },
  {
    name: 'Budget Planner',
    key: '/BudgetPlannerSample',
    url: '/BudgetPlannerSample',
    component: BudgetPlannerSample
  },
  {
    name: 'Resize Cell Sample',
    key: '/ResizeCellSample',
    url: '/ResizeCellSample',
    component: ResizeCellSample
  },
  {
    name: 'Multi User Sample',
    key: '/MultiUserSample',
    url: '/MultiUserSample',
    component: MultiUserSample
  },
];