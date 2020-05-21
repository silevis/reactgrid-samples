import { TextCell, NumberCell, GroupCell, HeaderCell, Row, DateCell } from '@silevis/reactgrid';

export const headerRow: Row = {
  rowId: 'header',
  reorderable: false,
  height: 25,
  cells: [
    { type: 'header', text: `Id` } as HeaderCell,
    { type: 'header', text: `Branch Name` } as HeaderCell,
    { type: 'header', text: `Commit Hash` } as HeaderCell,
    { type: 'header', text: `Added` } as HeaderCell,
    { type: 'header', text: `Removed` } as HeaderCell,
    { type: 'header', text: `Author` } as HeaderCell,
    { type: 'header', text: `Date` } as HeaderCell,
  ]
};

export const rows = (reorderable: boolean): Row[] => [
  {
    rowId: 1,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '1', isExpanded: true, } as GroupCell,
      { type: 'text', text: 'fix/some-feature' } as TextCell,
      { type: 'text', text: 'e989109363ec42610966f85fe9b065e6017058f7' } as TextCell,
      { type: 'number', value: 890 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-12') } as DateCell,
    ]
  },
  {
    rowId: 2,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '2', isExpanded: true, parentId: 1 } as GroupCell,
      { type: 'text', text: 'fix/some-feature' } as TextCell,
      { type: 'text', text: 'ey5seefv1o8soch1q50ztl30bzhubtb1xg6oklup' } as TextCell,
      { type: 'number', value: 310 } as NumberCell,
      { type: 'number', value: 490 } as NumberCell,
      { type: 'text', text: 'Mike Ewans' } as TextCell,
      { type: 'date', date: new Date('2018-02-12') } as DateCell,
    ]
  },
  {
    rowId: 3,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '3', isExpanded: true } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'u61x66unzgl9xd5gre3bj7g8za8cb7ve4t7otz0e' } as TextCell,
      { type: 'number', value: 280 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
      { type: 'text', text: 'Stephanie McGregor' } as TextCell,
      { type: 'date', date: new Date('2019-01-11') } as DateCell,
    ]
  },
  {
    rowId: 4,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '4', isExpanded: true, parentId: 3 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'v2dwm51y0k874x596axt4uz1if5qcv7etavg76va' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 350 } as NumberCell,
      { type: 'text', text: 'John Steward' } as TextCell,
      { type: 'date', date: new Date('2019-01-11') } as DateCell,
    ]
  },
  {
    rowId: 5,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '5', isExpanded: true, parentId: 4 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'jqk6nn3wktt2nwituttafuvpv7hlzo2grelvs7vo' } as TextCell,
      { type: 'number', value: 150 } as NumberCell,
      { type: 'number', value: 900 } as NumberCell,
      { type: 'text', text: 'Natalie Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-11') } as DateCell,
    ]
  },
  {
    rowId: 6,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '6', isExpanded: true, parentId: 4 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'ppsqily4doxz27uw6tznvc3qfvfhc37500k59jw9' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 200 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2019-06-12') } as DateCell,
    ]
  },
  {
    rowId: 7,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '7', isExpanded: true, } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'uc75daha01rnk3dfcghvkgav13igsb87b0w1jzft' } as TextCell,
      { type: 'number', value: 600 } as NumberCell,
      { type: 'number', value: 500 } as NumberCell,
      { type: 'text', text: 'Mark Johnson' } as TextCell,
      { type: 'date', date: new Date('2019-06-12') } as DateCell,
    ]
  },
  {
    rowId: 8,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '8', isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'bmwz5y30ypjgixzh3aic3vpjlnh1q1hrie2pv5mg' } as TextCell,
      { type: 'number', value: 800 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2019-02-1') } as DateCell,
    ]
  },
  {
    rowId: 9,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '9', isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'rc3hmvkwh4to6iq8mo68ju9vyx2zcmqbgn73zrw9' } as TextCell,
      { type: 'number', value: 220 } as NumberCell,
      { type: 'number', value: 110 } as NumberCell,
      { type: 'text', text: 'Jane Doe' } as TextCell,
      { type: 'date', date: new Date('2019-03-06') } as DateCell,
    ]
  },
  {
    rowId: 10,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '10', isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: '1ooxkvmvwotxicvawyh0wb1ur8jtin12egyayee8' } as TextCell,
      { type: 'number', value: 190 } as NumberCell,
      { type: 'number', value: 70 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-21') } as DateCell,
    ]
  },
  {
    rowId: 11,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '11', isExpanded: true, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'fvgiizz61ysmiv2gn9por6izio575u557jyxz4xs' } as TextCell,
      { type: 'number', value: 120 } as NumberCell,
      { type: 'number', value: 70 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-21') } as DateCell,
    ]
  },
  {
    rowId: 12,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '12', isExpanded: true, parentId: 11 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'rbicj7u5qxvkpqv2ti2bkthlw4yg1by4ht4c1wom' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 250 } as NumberCell,
      { type: 'text', text: 'Tommy Venitti' } as TextCell,
      { type: 'date', date: new Date('2019-03-11') } as DateCell,
    ]
  },
  {
    rowId: 13,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '13', isExpanded: true, parentId: 11 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'cunj4bkbl2gow91atjtfcwko1zmqp6813l8x626v' } as TextCell,
      { type: 'number', value: 15 } as NumberCell,
      { type: 'number', value: 60 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2018-12-21') } as DateCell,
    ]
  },
  {
    rowId: 14,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '14', isExpanded: true, parentId: 13 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'iwpnwef8mtzsjyu1srihdwispyrjxvb5197ey6cz' } as TextCell,
      { type: 'number', value: 800 } as NumberCell,
      { type: 'number', value: 300 } as NumberCell,
      { type: 'text', text: 'John Doe' } as TextCell,
      { type: 'date', date: new Date('2018-02-21') } as DateCell,
    ]
  },
  {
    rowId: 15,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '15', isExpanded: true, parentId: 13 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: '6wawna3wf02eggw27v8kgyclhla2c82apmdemay4' } as TextCell,
      { type: 'number', value: 200 } as NumberCell,
      { type: 'number', value: 40 } as NumberCell,
      { type: 'text', text: 'Jane Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-22') } as DateCell,
    ]
  },
  {
    rowId: 16,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: '16', isExpanded: true, parentId: 13 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'iwpnwef8mtzsjyu1srihdwispyrjxvb5197ey6cz' } as TextCell,
      { type: 'number', value: 100 } as NumberCell,
      { type: 'number', value: 90 } as NumberCell,
      { type: 'text', text: 'Jane Doe' } as TextCell,
      { type: 'date', date: new Date('2019-01-23') } as DateCell,
    ]
  },

]