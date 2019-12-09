import { TextCell, NumberCell, GroupCell, HeaderCell } from '@silevis/reactgrid';

export const rows = (reorderable: boolean): any[] => [
 {
    rowId: 'header',
    height: 25,
    reorderable,
    cells: [
      { type: 'header', text: 'Id' } as HeaderCell,
      { type: 'header', text: 'Branch Name' } as HeaderCell,
      { type: 'header', text: 'Commit Hash' } as HeaderCell,
      { type: 'header', text: 'Added' } as HeaderCell,
      { type: 'header', text: 'Removed' } as HeaderCell,
    ]
  },
  {
    rowId: 1,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', isExpanded: true, hasChildrens: true} as GroupCell,
      { type: 'text', text: 'fix/some-feature' } as TextCell,
      { type: 'text', text: 'e989109363ec42610966f85fe9b065e6017058f7' } as TextCell,
      { type: 'number', value: 890 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
    ]
  },
  {
    rowId: 2,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 1 } as GroupCell,
      { type: 'text', text: 'fix/some-feature' } as TextCell,
      { type: 'text', text: 'ey5seefv1o8soch1q50ztl30bzhubtb1xg6oklup' } as TextCell,
      { type: 'number', value: 310 } as NumberCell,
      { type: 'number', value: 490 } as NumberCell,
    ]
  },
  {
    rowId: 3,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'u61x66unzgl9xd5gre3bj7g8za8cb7ve4t7otz0e' } as TextCell,
      { type: 'number', value: 280 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
    ]
  },
  {
    rowId: 4,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 3 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'v2dwm51y0k874x596axt4uz1if5qcv7etavg76va' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 350 } as NumberCell,
    ]
  },
  {
    rowId: 5,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 3 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'jqk6nn3wktt2nwituttafuvpv7hlzo2grelvs7vo' } as TextCell,
      { type: 'number', value: 150 } as NumberCell,
      { type: 'number', value: 900 } as NumberCell,
    ]
  },
  {
    rowId: 6,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 3 } as GroupCell,
      { type: 'text', text: 'fix/my-sample' } as TextCell,
      { type: 'text', text: 'ppsqily4doxz27uw6tznvc3qfvfhc37500k59jw9' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 200 } as NumberCell,
    ]
  },
  {
    rowId: 7,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'uc75daha01rnk3dfcghvkgav13igsb87b0w1jzft' } as TextCell,
      { type: 'number', value: 600 } as NumberCell,
      { type: 'number', value: 500 } as NumberCell,
    ]
  },
  {
    rowId: 8,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'bmwz5y30ypjgixzh3aic3vpjlnh1q1hrie2pv5mg' } as TextCell,
      { type: 'number', value: 800 } as NumberCell,
      { type: 'number', value: 120 } as NumberCell,
    ]
  },
  {
    rowId: 9,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: 'rc3hmvkwh4to6iq8mo68ju9vyx2zcmqbgn73zrw9' } as TextCell,
      { type: 'number', value: 220 } as NumberCell,
      { type: 'number', value: 110 } as NumberCell,
    ]
  },
  {
    rowId: 10,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 7 } as GroupCell,
      { type: 'text', text: 'fix/other-feature' } as TextCell,
      { type: 'text', text: '1ooxkvmvwotxicvawyh0wb1ur8jtin12egyayee8' } as TextCell,
      { type: 'number', value: 190 } as NumberCell,
      { type: 'number', value: 70 } as NumberCell,
    ]
  },
  {
    rowId: 11,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'fvgiizz61ysmiv2gn9por6izio575u557jyxz4xs' } as TextCell,
      { type: 'number', value: 120 } as NumberCell,
      { type: 'number', value: 70 } as NumberCell,
    ]
  },
  {
    rowId: 12,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 11, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'rbicj7u5qxvkpqv2ti2bkthlw4yg1by4ht4c1wom' } as TextCell,
      { type: 'number', value: 400 } as NumberCell,
      { type: 'number', value: 250 } as NumberCell,
    ]
  },
  {
    rowId: 13,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 11, hasChildrens: true } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'cunj4bkbl2gow91atjtfcwko1zmqp6813l8x626v' } as TextCell,
      { type: 'number', value: 15 } as NumberCell,
      { type: 'number', value: 60 } as NumberCell,
    ]
  },
  {
    rowId: 14,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 13} as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: 'iwpnwef8mtzsjyu1srihdwispyrjxvb5197ey6cz' } as TextCell,
      { type: 'number', value: 800 } as NumberCell,
      { type: 'number', value: 300 } as NumberCell,
    ]
  },
  {
    rowId: 15,
    height: 25,
    reorderable,
    cells: [
      { type: 'group', text: 'is', depth: 0, isExpanded: true, parentId: 13 } as GroupCell,
      { type: 'text', text: 'update/some-feature' } as TextCell,
      { type: 'text', text: '6wawna3wf02eggw27v8kgyclhla2c82apmdemay4' } as TextCell,
      { type: 'number', value: 200 } as NumberCell,
      { type: 'number', value: 40 } as NumberCell,
    ]
  },

]