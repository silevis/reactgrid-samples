import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import {
  StickySample,
  ColumnReorderSample,
  ResizeColumnSample,
  DatagridSample,
  CryptocurrencyMarketSample,
  GroupCellSample,
  ContextMenuSample,
  GettingStartedSample,
  FlagCellTemplateSample,
  CustomStylingSample,
  HighlightsSample,
  AdvancedContextMenuHandlingSample,
  SimpleContextMenuHandlingSample,
  StickyPanesSample,
  ColumnsAndRowsReorderSample,
  ColumnResizingSample,
  HandlingChangesSample,
  LimitedHeightByParentSample,
  NotLimitedHeightByParentSample,
  MultiUserSample,
} from '../../samples';
import { BudgetPlannerSample } from '../budgetPlanner/BudgetPlannerSample';

export interface ISampleNavLink extends INavLink {
  component?: any;
}

export const navLinks: ISampleNavLink[] = [
  {
    name: 'Multi User Sample',
    key: '/MultiUserSample',
    url: '/MultiUserSample',
    component: MultiUserSample
  },
  {
    name: 'Group Cell Sample',
    key: '/GroupCellSample',
    url: '/GroupCellSample',
    component: GroupCellSample
  },
  {
    name: 'Sticky Sample',
    key: '/StickySample',
    url: '/StickySample',
    component: StickySample
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
  {
    name: 'Getting Started Sample',
    key: '/GettingStartedSample',
    url: '/GettingStartedSample',
    component: GettingStartedSample
  },
  {
    name: 'Flag Cell Template',
    key: '/FlagCellTemplateSample',
    url: '/FlagCellTemplateSample',
    component: FlagCellTemplateSample
  },
  {
    name: 'Custom Styling',
    key: '/CustomStylingSample',
    url: '/CustomStylingSample',
    component: CustomStylingSample
  },
  {
    name: 'Highlights',
    key: '/HighlightsSample',
    url: '/HighlightsSample',
    component: HighlightsSample
  },
  {
    name: 'Advanced ContextMenu Handling',
    key: '/AdvancedContextMenuHandlingSample',
    url: '/AdvancedContextMenuHandlingSample',
    component: AdvancedContextMenuHandlingSample
  },
  {
    name: 'Simple ContextMenu Handling',
    key: '/SimpleContextMenuHandlingSample',
    url: '/SimpleContextMenuHandlingSample',
    component: SimpleContextMenuHandlingSample
  },
  {
    name: 'Sticky Panes Sample',
    key: '/StickyPanesSample',
    url: '/StickyPanesSample',
    component: StickyPanesSample
  },
  {
    name: 'Columns And Row Reorder Sample',
    key: '/ColumnsAndRowReorderSample',
    url: '/ColumnsAndRowReorderSample',
    component: ColumnsAndRowsReorderSample
  },
  {
    name: 'Column Resize Sample',
    key: '/ColumnResizingSample',
    url: '/ColumnResizingSample',
    component: ColumnResizingSample
  },
  {
    name: 'Handling Changes Sample',
    key: '/HandlingChangesSample',
    url: '/HandlingChangesSample',
    component: HandlingChangesSample
  },
  {
    name: 'Limited Height By Parent Sample',
    key: '/LimitedHeightByParentSample',
    url: '/LimitedHeightByParentSample',
    component: LimitedHeightByParentSample
  },
  {
    name: 'Not Limited Height By Parent Sample',
    key: '/NotLimitedHeightByParentSample',
    url: '/NotLimitedHeightByParentSample',
    component: NotLimitedHeightByParentSample
  },
  {
    name: 'Budget Planner Sample',
    key: '/BudgetPlannerSample',
    url: '/BudgetPlannerSample',
    component: BudgetPlannerSample
  },
];