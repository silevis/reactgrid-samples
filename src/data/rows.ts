// import { Row } from '@silevis/reactgrid';
// TODO reordable property

export const rows = (reorderable: boolean): any[] => [
  {
    id: 'header',
    height: 25,
    reorderable,
    cells: [
      { type: 'header', text: 'Company' },
      { type: 'header', text: 'Country' },
      // { type: 'header', text: 'Creation date' },
      { type: 'header', text: 'Revenues ($ Mil.)' },
      { type: 'header', text: 'Rating' }
    ]
  },
  {
    id: '1',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Walmart' },
      { type: 'flag', text: 'USA' },
      // { type: 'date', text: '1962-09-04' },
      { type: 'number', value: 514.405 },
      { type: 'rating', value: 2 }
    ]
  },
  {
    id: '2',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Sinopec Group' },
      { type: 'flag', text: 'CHN' },
      // { type: 'date', text: '2000-06-25' },
      { type: 'number', value: 414.649 },
      { type: 'rating', value: 3.5 }
    ]
  },
  {
    id: '3',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Royal Dutch Shell' },
      { type: 'flag', text: 'NLD' },
      // { type: 'date', data: '1907-04-19' },
      { type: 'number', value: 396.556 },
      { type: 'rating', value: 4.5 }
    ]
  },
  {
    id: '4',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'ExxonMobil' },
      { type: 'flag', text: 'USA' },
      // { type: 'date', data: '1999-02-12' },
      { type: 'number', value: 343.427 },
      { type: 'rating', value: 3.5 }
    ]
  },
  {
    id: '5',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Saudi Aramco' },
      { type: 'flag', text: 'SAU' },
      // { type: 'date', data: '1933-11-09' },
      { type: 'number', value: 355.905 },
      { type: 'rating', value: 5 }
    ]
  },
  {
    id: '6',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Volkswagen' },
      { type: 'flag', text: 'DEU' },
      // { type: 'date', data: '1937-05-28' },
      { type: 'number', value: 278.342 },
      { type: 'rating', value: 5 }
    ]
  },
  {
    id: '7',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Toyota' },
      { type: 'flag', text: 'JPN' },
      // { type: 'date', data: '1937-08-28' },
      { type: 'number', value: 192.724 },
      { type: 'rating', value: 3 }
    ]
  },

  {
    id: '8',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Visa' },
      { type: 'flag', text: 'USA' },
      // { type: 'date', data: '1958-06-15' },
      { type: 'number', value: 351.913 },
      { type: 'rating', value: 4 }
    ]
  },
  {
    id: '9',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Taiwan Semiconductor' },
      { type: 'flag', text: 'CHN' },
      // { type: 'date', data: '1987-11-17' },
      { type: 'number', value: 264.256 },
      { type: 'rating', value: 5 }
    ]
  },
  {
    id: '10',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Samsung Electronics' },
      { type: 'flag', text: 'KOR' },
      // { type: 'date', data: '1969-01-13' },
      { type: 'number', value: 221.569 },
      { type: 'rating', value: 5 }
    ]
  },
  {
    id: '11',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Glencore' },
      { type: 'flag', text: 'CHE' },
      // { type: 'date', data: '1974-07-17' },
      { type: 'number', value: 219.754 },
      { type: 'rating', value: 4 }
    ]
  },
  {
    id: '12',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Total' },
      { type: 'flag', text: 'FRA' },
      // { type: 'date', data: '1924-03-28' },
      { type: 'number', value: 184.106 },
      { type: 'rating', value: 3 }
    ]
  },
  {
    id: '13',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Trafigura' },
      { type: 'flag', text: 'SGP' },
      // { type: 'date', data: '1993-06-15' },
      { type: 'number', value: 180.744 },
      { type: 'rating', value: 3 }
    ]
  },
  {
    id: '14',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Daimler' },
      { type: 'flag', text: 'DEU' },
      // { type: 'date', data: '1926-06-28' },
      { type: 'number', value: 197.515 },
      { type: 'rating', value: 4 }
    ]
  },
  {
    id: '15',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Exor' },
      { type: 'flag', text: 'ITA' },
      // { type: 'date', data: '1927-07-27' },
      { type: 'number', value: 175.009 },
      { type: 'rating', value: 4 }
    ]
  },
  {
    id: '16',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'Chevron' },
      { type: 'flag', text: 'USA' },
      // { type: 'date', data: '1879-09-10' },
      { type: 'number', value: 166.339 },
      { type: 'rating', value: 4 }
    ]
  },
  {
    id: '17',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', text: 'BP' },
      { type: 'flag', text: 'GBR' },
      // { type: 'date', data: '1909-04-14' },
      { type: 'number', value: 303.738 },
      { type: 'rating', value: 5 }
    ]
  },


]