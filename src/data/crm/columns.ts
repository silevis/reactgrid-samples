import { Column } from "@silevis/reactgrid";

export const columns = (reorderable: boolean, rezisable: boolean): Column[] => [
  { columnId: 'name', reorderable: reorderable, rezisable: rezisable, width: 100 }, // text
  { columnId: 'surname', reorderable, rezisable, width: 100 }, // text
  { columnId: 'sex', reorderable, rezisable, width: 80 }, // text
  // { columnId: 'email', reorderable, rezisable, width: 170 }, // email
  // { columnId: 'phone', reorderable, rezisable, width: 100 }, // number
  // { columnId: 'city', reorderable, rezisable, width: 100 }, // text
  // { columnId: 'street', reorderable, rezisable, width: 130 }, // text
  // { columnId: 'registered', reorderable, rezisable, width: 100 }, // date
  { columnId: 'country', reorderable, rezisable, width: 70 }, // flag
  // { columnId: 'birth-date', reorderable, rezisable, width: 90 }, // date
  // { columnId: 'position', reorderable, rezisable, width: 130 }, // text
  // { columnId: 'skills', reorderable, rezisable, width: 80 }, // dropdown-number
  // { columnId: 'is-active', reorderable, rezisable, width: 80 }, // checkbox
];

