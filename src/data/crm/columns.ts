import { Column } from '@silevis/reactgrid';

export const columns = (reorderable: boolean, resizable: boolean): Column[] => [
  { columnId: 'name',       reorderable, resizable, width: 100 }, // text
  { columnId: 'surname',    reorderable, resizable, width: 100 }, // text
  { columnId: 'sex',        reorderable, resizable, width: 80 }, // text
  { columnId: 'email',      reorderable, resizable, width: 170 }, // email
  { columnId: 'phone',      reorderable, resizable, width: 100 }, // number
  { columnId: 'city',       reorderable, resizable, width: 100 }, // text
  { columnId: 'street',     reorderable, resizable, width: 130 }, // text
  { columnId: 'registered', reorderable, resizable, width: 100 }, // date
  { columnId: 'country',    reorderable, resizable, width: 70 }, // flag
  { columnId: 'birth-date', reorderable, resizable, width: 90 }, // date
  { columnId: 'position',   reorderable, resizable, width: 130 }, // text
  { columnId: 'skills',     reorderable, resizable, width: 80 }, // dropdown-number
  { columnId: 'is-active',  reorderable, resizable, width: 80 }, // checkbox
];

