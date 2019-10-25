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
      { type: 'text', data: 'Jacob' },
      { type: 'text', data: 'Sandberg' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1962-09-04' },
      { type: 'text', data: 'Director' },
      { type: 'dropdownNumber', data: { value: 20, isOpened: false } },
      { type: 'checkbox', data: true }
    ]
  },
  {
    id: '2',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Fred' },
      { type: 'text', data: 'Schulz' },
      { type: 'flag', data: 'chn' },
      { type: 'date', data: '1975-01-12' },
      { type: 'text', data: 'CEO' },
      { type: 'dropdownNumber', data: { value: 50, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '3',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Robin' },
      { type: 'text', data: 'Lasgo' },
      { type: 'flag', data: 'rus' },
      { type: 'date', data: '1985-12-28' },
      { type: 'text', data: 'QA' },
      { type: 'dropdownNumber', data: { value: 100, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '4',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Elizabeth' },
      { type: 'text', data: 'Hudson' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1973-07-11' },
      { type: 'text', data: 'IT Support' },
      { type: 'dropdownNumber', data: { value: 90, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '5',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Lee' },
      { type: 'text', data: 'Aaker ' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1943-09-25' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 100, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '6',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Willie' },
      { type: 'text', data: 'Aames ' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1960-09-15' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 22, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '7',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Quinton' },
      { type: 'text', data: 'Aaron' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1984-08-15' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 84, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '8',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Omid' },
      { type: 'text', data: 'Abtahi' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1979-07-12 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 88, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '9',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Jason' },
      { type: 'text', data: 'Adams' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1964-02-07 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 67, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '10',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Frank' },
      { type: 'text', data: 'Alesia' },
      { type: 'flag', data: 'usa' },
      { type: 'date', data: '1944-01-04 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 35, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '11',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Alan' },
      { type: 'text', data: 'Bennion' },
      { type: 'flag', data: 'GBR' },
      { type: 'date', data: '1930-04-18 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 50, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '12',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Josiane' },
      { type: 'text', data: 'Balasko ' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1950-04-15 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 10, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '13',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Daniel' },
      { type: 'text', data: 'Auteuil' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1950-01-24 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 90, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '14',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Suzanne' },
      { type: 'text', data: 'Bianchetti' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1889-02-24 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 30, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '15',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Darry ' },
      { type: 'text', data: 'Cowl ' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1925-08-27 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 60, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '16',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Laetitia' },
      { type: 'text', data: 'Casta' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1978-05-11 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 50, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },
  {
    id: '17',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Serge' },
      { type: 'text', data: 'Gainsbourg' },
      { type: 'flag', data: 'FRA' },
      { type: 'date', data: '1928-04-02 ' },
      { type: 'text', data: 'Actor' },
      { type: 'dropdownNumber', data: { value: 40, isOpened: false } },
      { type: 'checkbox', data: false }
    ]
  },


]