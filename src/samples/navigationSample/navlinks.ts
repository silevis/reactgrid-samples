import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import AllInOneSample from '../allInOneSample/AllInOneSample';
import RateCellDemo from '../rateCellSample/RateCellSample';
import ReorderCellDemo from '../reorderSample/ReorderCellSample';
import NavigationSample from '../navigationSample/NavigationSample';

export interface ISampleNavLink extends INavLink {
  component?: any;
}

export const navLinks: ISampleNavLink[] = [
  {
    name: 'AllInOneSample',
    key: '/AllInOneSample',
    url: '/AllInOneSample',
    component: AllInOneSample
  },
  {
    name: 'RateCellDemo',
    key: '/RateCellDemo',
    url: '/RateCellDemo',
    component: RateCellDemo
  },
  {
    name: 'ReorderCellDemo',
    key: '/ReorderCellDemo',
    url: '/ReorderCellDemo',
    component: ReorderCellDemo
  },
];