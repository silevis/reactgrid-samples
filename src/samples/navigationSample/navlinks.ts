import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import AllInOneSample from '../allInOneSample/AllInOneSample';
import RateCellDemo from '../rateCellSample/RateCellSample';
import DropdownNumberCellSample from '../dropdownNumberCellSample/DropdownNumberCellSample';

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
    component: RateCellDemo
  },
  {
    name: 'Dropdown Number Cell Sample',
    key: '/DropdownNumberCellSample',
    url: '/DropdownNumberCellSample',
    component: DropdownNumberCellSample
  },
];