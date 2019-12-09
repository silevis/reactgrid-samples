import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import {
  FrozensSample,
  ColumnReorderSample,
  ResizeColumnSample,
  DatagridSample,
  CryptocurrencyMarketSample,
  GroupCellSample,
  ContextMenuSample,
} from '../../samples';

export interface ISampleNavLink extends INavLink {
  component?: any;
}

export const navLinks: ISampleNavLink[] = [
  {
    name: 'Group Cell Sample',
    key: '/GroupCellSample',
    url: '/GroupCellSample',
    component: GroupCellSample
  },
  {
    name: 'Frozens Sample',
    key: '/FrozensSample',
    url: '/FrozensSample',
    component: FrozensSample
  },
  {
    name: 'Context Menu Sample',
    key: '/ContextMenuSample',
    url: '/ContextMenuSample',
    component: ContextMenuSample
  },
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
    name: 'Datagrid Sample',
    key: '/DatagridSample',
    url: '/DatagridSample',
    component: DatagridSample
  },
  {
    name: 'Cryptocurrency Market Sample',
    key: '/CryptocurrencyMarketSample',
    url: '/CryptocurrencyMarketSample',
    component: CryptocurrencyMarketSample
  },
];