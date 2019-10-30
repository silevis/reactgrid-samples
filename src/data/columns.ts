import { ColumnProps } from '@silevis/reactgrid';
// TODO reordable/resizable properties
export const columns = (reorderable: boolean, resizable: boolean): ColumnProps[] => [
  { id: 'company', reorderable, resizable, width: 130 }, // text
  { id: 'country', reorderable, resizable, width: 70 }, // flag
  { id: 'creation-date', reorderable, resizable, width: 130 }, // date
  { id: 'revenues', reorderable, resizable, width: 110 }, // number
  { id: 'rating', reorderable, resizable, width: 140 }, // rate
  //I don't have idea for checkbox cell
];

