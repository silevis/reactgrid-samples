// TODO reordable/resizable properties
export const columns: any = (reorderable: boolean, resizable: boolean) => [
  { id: 'company', reorderable, resizable, width: 120 }, // text
  { id: 'country', reorderable, resizable, width: 70 }, // flag
  { id: 'creation-date', reorderable, resizable, width: 90 }, // date
  { id: 'revenues', reorderable, resizable, width: 110 }, // number
  { id: 'rating', reorderable, resizable, width: 120 }, // rate
  // I don't have idea for checkbox cell
];