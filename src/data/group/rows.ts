import { TextCell, NumberCell, GroupCell } from '@silevis/reactgrid';

export const rows = (reorderable: boolean): any[] => [
  {
    rowId: 'header',
    height: 25,
    reorderable,
    cells: [
      { type: 'header', text: 'Id' },
      { type: 'header', text: 'Branch Name' },
      { type: 'header', text: 'Commit Hash' },
      { type: 'header', text: 'Added' },
      { type: 'header', text: 'Removed' },
    ]
  },
  {
    rowId: '1',
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true } as GroupCell,
      { type: 'text', text: 'fix/some-feature' } as TextCell,
      { type: 'text', text: 'e989109363ec42610966f85fe9b065e6017058f7' } as TextCell,
      { type: 'number', value: 500 } as NumberCell,
      { type: 'number', value: 500 } as NumberCell,
    ]
  },
]