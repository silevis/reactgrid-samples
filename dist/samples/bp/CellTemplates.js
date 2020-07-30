import { NumberCellTemplate } from "@silevis/reactgrid";
export var nonEditableNumberCellTemplate = new NumberCellTemplate();
nonEditableNumberCellTemplate.handleKeyDown = function (cell, keyCode, ctrl, shift, alt) {
    return { cell: cell, enableEditMode: false };
};
