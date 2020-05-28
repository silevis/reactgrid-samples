var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getCellProperty } from '@silevis/reactgrid';
import './css-class-style.scss';
var CssClassCellTemplate = (function () {
    function CssClassCellTemplate() {
    }
    CssClassCellTemplate.prototype.getCompatibleCell = function (uncertainCell) {
        var value = getCellProperty(uncertainCell, 'value', 'number');
        var text = value.toString();
        return __assign(__assign({}, uncertainCell), { value: value, text: text });
    };
    CssClassCellTemplate.prototype.handleKeyDown = function (cell, keyCode, ctrl, shift, alt) {
        return { cell: cell, enableEditMode: false };
    };
    CssClassCellTemplate.prototype.getClassName = function (cell, isInEditMode) {
        return cell.className ? cell.className : '';
    };
    CssClassCellTemplate.prototype.render = function (cell, isInEditMode, onCellChanged) {
        if (!isInEditMode)
            return cell.value;
    };
    return CssClassCellTemplate;
}());
export { CssClassCellTemplate };
