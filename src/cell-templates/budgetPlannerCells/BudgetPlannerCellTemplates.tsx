import React from 'react';
// import { CellTemplate, isNumberInput, keyCodes, CellRenderProps, isNavigationKey, isTextInput, Cell } from '@silevis/reactgrid';
// import { BudgetPlannerNumberCellData, BudgetPlannerTextCellData } from './../../samples/budgetPlannerSample/BudgetPlannerSampleTypes';

// export class BudgetPlannerNumberCellTemplate implements CellTemplate<BudgetPlannerNumberCellData, any> {

//     isValid(cellData: BudgetPlannerNumberCellData): boolean {
//         return typeof (cellData.value) === 'number';
//     }

//     textToCellData(text: string): BudgetPlannerNumberCellData {
//         return { value: parseFloat(text), isCollapsed: false };
//     }

//     cellDataToText(cellData: BudgetPlannerNumberCellData): string {
//         return isNaN(cellData.value) ? '' : cellData.value.toString();
//     }

//     handleKeyDown(cellData: BudgetPlannerNumberCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
//         if (!ctrl && !alt && !shift && isNumberInput(keyCode))
//             return { cellData: { ...cellData, value: NaN }, enableEditMode: true }
//         return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
//     }

//     renderContent: (props: CellRenderProps<BudgetPlannerNumberCellData, any>) => React.ReactNode = (props) => {
//         if (!props.isInEditMode) {
//             let ret = this.cellDataToText(props.cellData);
//             return ret;
//         }

//         return <input
//             style={
//                 {
//                     width: '100%',
//                     height: '100%',
//                     padding: 0,
//                     border: 0,
//                     background: 'transparent',
//                     fontSize: 14,
//                     outline: 'none',
//                 }
//             }
//             ref={input => {
//                 if (input) {
//                     input.focus();
//                     input.setSelectionRange(input.value.length, input.value.length);
//                 }
//             }
//             }
//             value={this.cellDataToText(props.cellData)}
//             onChange={e => props.onCellDataChanged(this.textToCellData(e.currentTarget.value), false)}
//             onKeyDown={e => {
//                 if (isNumberInput(e.keyCode) || isNavigationKey(e)) e.stopPropagation();
//                 if (e.keyCode === keyCodes.ESC) e.currentTarget.value = props.cellData.value.toString(); // reset
//             }}
//             onCopy={e => e.stopPropagation()}
//             onCut={e => e.stopPropagation()}
//             onPaste={e => e.stopPropagation()}
//             onPointerDown={e => e.stopPropagation()}
//         />
//     }
// }

// export class BudgetPlannerTextCellTemplate implements CellTemplate<BudgetPlannerTextCellData, any> {

//     isValid(cellData: BudgetPlannerTextCellData): boolean {
//         return typeof (cellData.value) === 'string';
//     }

//     textToCellData(text: string): BudgetPlannerTextCellData {
//         return { value: text, isCollapsed: false };
//     }

//     cellDataToText(cellData: BudgetPlannerTextCellData) {
//         return cellData.value;
//     }

//     handleKeyDown(cellData: BudgetPlannerTextCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
//         if (!ctrl && !alt && isTextInput(keyCode))
//             return { cellData: { ...cellData, value: '' }, enableEditMode: true }
//         return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
//     }

//     renderContent: (props: CellRenderProps<BudgetPlannerTextCellData, any>) => React.ReactNode = (props) => {
//         if (!props.isInEditMode)
//             return this.cellDataToText(props.cellData);

//         return <input
//             style={
//                 {
//                     position: 'inherit',
//                     width: '100%',
//                     height: '100%',
//                     padding: 0,
//                     border: 0,
//                     background: 'transparent',
//                     fontSize: 14,
//                     outline: 'none',
//                 }
//             }
//             ref={input => {
//                 if (input) {
//                     input.focus();
//                     input.setSelectionRange(input.value.length, input.value.length);
//                 }
//             }}
//             defaultValue={props.cellData.value}
//             onChange={e => props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, false)}
//             onBlur={e => props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, true)} // TODO should it be added to each cell? // additional question, because everything works without that
//             onCopy={e => e.stopPropagation()}
//             onCut={e => e.stopPropagation()}
//             onPaste={e => e.stopPropagation()}
//             onPointerDown={e => e.stopPropagation()}
//             onKeyDown={e => {
//                 if (isTextInput(e.keyCode) || (isNavigationKey(e))) e.stopPropagation();
//                 if (e.keyCode === keyCodes.ESC) e.currentTarget.value = props.cellData.value; // reset
//             }}
//         />
//     }

//     getCustomStyle(cellData: BudgetPlannerTextCellData, isInEditMode: boolean, props?: any): React.CSSProperties {
//         return { backgroundColor: 'transparent' };
//     };
// }

// export class BudgetPlannerColumnHeaderCellTemplate implements CellTemplate<BudgetPlannerTextCellData, any> {

//     isValid(cellData: BudgetPlannerTextCellData): boolean {
//         return typeof (cellData.value) === 'string';
//     }

//     textToCellData(text: string): BudgetPlannerTextCellData {
//         return { value: text, isCollapsed: false };
//     }

//     cellDataToText(cellData: BudgetPlannerTextCellData) {
//         return cellData.value;
//     }

//     renderContent: (props: CellRenderProps<BudgetPlannerTextCellData, any>) => React.ReactNode = (props) => {
//         if (!props.isInEditMode) {
//             let ret = this.cellDataToText(props.cellData);
//             return ret;
//         }

//         return <input
//             style={{
//                 position: 'inherit',
//                 width: '100%',
//                 height: '100%',
//                 padding: 0,
//                 border: 0,
//                 background: 'transparent',
//                 fontSize: 19,
//                 outline: 'none',
//             }}
//             ref={input => {
//                 if (input) {
//                     input.focus();
//                     input.setSelectionRange(input.value.length, input.value.length);
//                 }
//             }}
//             defaultValue={props.cellData.value}
//             onChange={e => props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, false)}
//             onBlur={e => props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, true)} // TODO should it be added to each cell? // additional question, because everything works without that
//             onCopy={e => e.stopPropagation()}
//             onCut={e => e.stopPropagation()}
//             onPaste={e => e.stopPropagation()}
//             onPointerDown={e => e.stopPropagation()}
//             onKeyDown={e => {
//                 if (isTextInput(e.keyCode) || (isNavigationKey(e))) e.stopPropagation();
//                 if (e.keyCode === keyCodes.ESC) e.currentTarget.value = props.cellData.value; // reset
//             }}
//         />
//     }

//     handleKeyDown(cellData: BudgetPlannerTextCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
//         const newCellData = { cellData: cellData, enableEditMode: false }
//         if (keyCode === keyCodes.SPACE || keyCode === keyCodes.END || keyCode === 1) {
//             // console.log('column collapse/expand event');
//             newCellData.cellData = { ...cellData, isCollapsed: !cellData.isCollapsed }
//             // console.log('was', cellData.isCollapsed, 'is', newCellData.cellData.isCollapsed);
//         }
//         return newCellData;
//     }

//     getCustomStyle(cellData: BudgetPlannerTextCellData, isInEditMode: boolean, props?: any): React.CSSProperties {
//         let parentCount = 0;

//         if (cellData.parent) {
//             parentCount++;
//             let parentCell: Cell = cellData.parent;
//             while (parentCell.data.parent) {
//                 parentCount++;
//                 parentCell = parentCell.data.parent;
//             }
//         }

//         const ret = [
//             { // no ancestors
//                 background: '#32325d',
//                 color: 'white'
//             },
//             { // 1 ancestor
//                 background: '#525f7f',
//                 color: 'white',
//             },
//             { // 2 ancestors
//                 color: 'white',
//                 background: '#6c757d',
//             }
//         ]

//         return ret[parentCount];
//     };
// }