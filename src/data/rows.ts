// TODO reordable property
export const rows = [
  {
    id: 'header',
    height: 25,
    reorderable: true,
    cells: [
      { type: 'header', data: 'Player' },
      { type: 'header', data: 'Date of birth' },
      { type: 'header', data: 'Goals' },
      { type: 'header', data: 'Popularity' },
    ]
  },
  {
    id: '1',
    height: 25,
    reorderable: true,
    cells: [
      { type: 'text', data: 'Lionel Messi' },
      { type: 'number', data: 32 },
      { type: 'rating', data: 5 },
      { type: 'text', data: 'Barcelona' },
    ]
  },
  {
    id: '2',
    height: 25,
    reorderable: true,
    cells: [
      { type: 'text', data: 'Cristiano Ronaldo' },
      { type: 'number', data: 32 },
      { type: 'rating', data: 5 },
      { type: 'text', data: 'Juventus' },
    ]
  },
  {
    id: '3',
    height: 25,
    reorderable: true,
    cells: [
      { type: 'text', data: 'Robert Lewandowski' },
      { type: 'number', data: 32 },
      { type: 'rating', data: 5 },
      { type: 'text', data: 'Bayern Munich' },
    ]
  },
  {
    id: '4',
    height: 25,
    reorderable: true,
    cells: [
      { type: 'text', data: 'Diego Costa' },
      { type: 'number', data: 32 },
      { type: 'rating', data: 4 },
      { type: 'text', data: 'Atletico Madrid' },
    ]
  },
]