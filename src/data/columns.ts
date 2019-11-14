import { Column } from '@silevis/reactgrid';
// TODO reordable/rezisable properties
export const columns = (reorderable: boolean, rezisable: boolean): Column[] => [
  { columnId: 'company', reorderable, rezisable, width: 130 }, // text
  { columnId: 'country', reorderable, rezisable, width: 70 }, // flag
  { columnId: 'creation-date', reorderable, rezisable, width: 130 }, // date
  { columnId: 'revenues', reorderable, rezisable, width: 110 }, // number
  { columnId: 'rating', reorderable, rezisable, width: 140 }, // rate
  //I don't have idea for checkbox cell
];

