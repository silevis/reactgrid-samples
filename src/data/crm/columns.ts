import { ColumnProps } from '@silevis/reactgrid';

export const columns = (reorderable: boolean, resizable: boolean): ColumnProps[] => [
  { id: 'name',       reorderable: reorderable, resizable: resizable, width: 100 }, // text
  { id: 'surname',    reorderable, resizable, width: 100 }, // text
  { id: 'sex',        reorderable, resizable, width: 80 }, // text
  { id: 'email',      reorderable, resizable, width: 170 }, // email
  { id: 'phone',      reorderable, resizable, width: 100 }, // number
  { id: 'city',       reorderable, resizable, width: 100 }, // text
  { id: 'street',     reorderable, resizable, width: 130 }, // text
  { id: 'registered', reorderable, resizable, width: 100 }, // date
  { id: 'country',    reorderable, resizable, width: 70 }, // flag
  { id: 'birth-date', reorderable, resizable, width: 90 }, // date
  { id: 'position',   reorderable, resizable, width: 130 }, // text
  { id: 'skills',     reorderable, resizable, width: 80 }, // dropdown-number
  { id: 'is-active',  reorderable, resizable, width: 80 }, // checkbox
];

