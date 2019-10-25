import { ColumnProps } from '@silevis/reactgrid';

export const columns = (reorderable: boolean, resizable: boolean): ColumnProps[] => [
  { id: 'name',       reorderable: reorderable, resizable: resizable, width: 100 }, // text
  { id: 'surname',    reorderable, resizable, width: 100 }, // text
  { id: 'country',    reorderable, resizable, width: 70 }, // flag
  { id: 'birth-date', reorderable, resizable, width: 90 }, // date
  { id: 'position',   reorderable, resizable, width: 130 }, // text
  { id: 'skills',     reorderable, resizable, width: 140 }, // dropdown-number
  { id: 'is-active',  reorderable, resizable, width: 140 }, // checkbox
];

