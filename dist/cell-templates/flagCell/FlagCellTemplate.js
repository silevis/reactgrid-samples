import * as React from 'react';
import { keyCodes, isTextInput, isNavigationKey } from '@silevis/reactgrid';
import './flag-cell-style.scss';
var FlagCellTemplate = (function () {
    function FlagCellTemplate() {
        this.renderContent = function (props) {
            if (!props.isInEditMode) {
                var flagISO = props.cellData.toLowerCase();
                var flagURL = "https://restcountries.eu/data/" + flagISO + ".svg";
                return React.createElement("div", { className: "rg-flag-wrapper", style: { backgroundImage: 'url("' + flagURL + '"), url("https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg")',
                    } });
            }
            return React.createElement("input", { type: 'text', className: "rg-flag-input", ref: function (input) {
                    input && input.focus();
                }, defaultValue: props.cellData, onChange: function (e) { return props.onCellDataChanged(e.currentTarget.value, false); }, onCopy: function (e) { return e.stopPropagation(); }, onCut: function (e) { return e.stopPropagation(); }, onPaste: function (e) { return e.stopPropagation(); }, onPointerDown: function (e) { return e.stopPropagation(); }, onKeyDown: function (e) {
                    if (isTextInput(e.keyCode) || isNavigationKey(e))
                        e.stopPropagation();
                    if (e.keyCode == keyCodes.ESC)
                        e.currentTarget.value = props.cellData;
                } });
        };
    }
    FlagCellTemplate.prototype.isValid = function (data) {
        return (typeof (data) === 'string');
    };
    FlagCellTemplate.prototype.textToCellData = function (text) {
        return text;
    };
    FlagCellTemplate.prototype.cellDataToText = function (cellData) {
        return cellData;
    };
    FlagCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt, props) {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cellData: '', enableEditMode: true };
        return { cellData: cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER };
    };
    return FlagCellTemplate;
}());
export { FlagCellTemplate };
