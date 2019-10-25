import { RowProps } from '@silevis/reactgrid';

export const rows = (reorderable: boolean): RowProps[] => [
  {
    id: 'header',
    height: 25,
    reorderable,
    cells: [
      { type: 'header', data: 'Name' },
      { type: 'header', data: 'Surname' },
      { type: 'header', data: 'Country' },
      { type: 'header', data: 'Birth date' },
      { type: 'header', data: 'Position' },
      { type: 'header', data: 'Skills' },
      { type: 'header', data: 'Is active' },
    ]
  },
  {
    id: '1',
    height: 25,
    reorderable,
    cells: [
      { type: 'text',           data: 'Jacob' },
      { type: 'text',           data: 'Sandberg' },
      { type: 'flag',           data: 'usa' },
      { type: 'date',           data: '1962-09-04' },
      { type: 'text',           data: 'Director' },
      { type: 'dropdownNumber', data: { value: 20, isOpened: false} },
      { type: 'checkbox',       data: true }
    ]
  },
  {
    id: '2',
    height: 25,
    reorderable,
    cells: [
      { type: 'text',             data: 'Fred' },
      { type: 'text',             data: 'Schulz' },
      { type: 'flag',             data: 'chn' },
      { type: 'date',             data: '1975-01-12' },
      { type: 'text',             data: 'CEO' },
      { type: 'dropdownNumber',   data: { value: 50, isOpened: false} },
      { type: 'checkbox',         data: false }
    ]
  },
  {
    id: '3',
    height: 25,
    reorderable,
    cells: [
      { type: 'text',             data: 'Robin' },
      { type: 'text',             data: 'Lasgo' },
      { type: 'flag',             data: 'rus' },
      { type: 'date',             data: '1985-12-28' },
      { type: 'text',             data: 'QA' },
      { type: 'dropdownNumber',   data: { value: 100, isOpened: false} },
      { type: 'checkbox',         data: false }
    ]
  },
  {
    id: '4',
    height: 25,
    reorderable,
    cells: [
      { type: 'text',             data: 'Elizabeth' },
      { type: 'text',             data: 'Hudson' },
      { type: 'flag',             data: 'usa' },
      { type: 'date',             data: '1973-07-11' },
      { type: 'text',             data: 'IT Support' },
      { type: 'dropdownNumber',   data: { value: 100, isOpened: false} },
      { type: 'checkbox',         data: false }
    ]
  },
  // ADD MORE USERS
]