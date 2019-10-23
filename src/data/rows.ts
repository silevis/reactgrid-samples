// TODO reordable property
export const rows: any = (reorderable: boolean) => [
  {
    id: 'header',
    height: 25,
    reorderable,
    cells: [
      { type: 'header', data: 'Company' },
      { type: 'header', data: 'Country' },
      { type: 'header', data: 'Creation date' },
      { type: 'header', data: 'Revenues ($ Mil.)' },
      { type: 'header', data: 'Rating' }
    ]
  },
  {
    id: '1',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Walmart' },
      { type: 'flag', data: 'USA' },
      { type: 'date', data: '1962-09-04' },
      { type: 'number', data: 514.405 },
      { type: 'rating', data: 2 }
    ]
  },
  {
    id: '2',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Sinopec Group' },
      { type: 'flag', data: 'CHN' },
      { type: 'date', data: '2000-06-25' },
      { type: 'number', data: 414.649 },
      { type: 'rating', data: 3.5 }
    ]
  },
  {
    id: '3',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Royal Dutch Shell' },
      { type: 'flag', data: 'NLD' },
      { type: 'date', data: '1907-04-19' },
      { type: 'number', data: 396.556 },
      { type: 'rating', data: 4.5 }
    ]
  },
  {
    id: '4',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Saudi Aramco' },
      { type: 'flag', data: 'SAU' },
      { type: 'date', data: '1933-11-09' },
      { type: 'number', data: 355.905 },
      { type: 'rating', data: 5 }
    ]
  },
  {
    id: '5',
    height: 25,
    reorderable,
    cells: [
      { type: 'text', data: 'Volkswagen' },
      { type: 'flag', data: 'DEU' },
      { type: 'date', data: '1937-05-28' },
      { type: 'number', data: 278.342 },
      { type: 'rating', data: 5 }
    ]
  }
]