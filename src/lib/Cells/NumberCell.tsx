// import * as React from 'react';
// import { CellProps, Cell, Location } from '../Model';

// import { keyCodes } from '../Common/Constants';
// import { handleKeyDown, isItLastRowOrCol, handleCopy, handleCut, handlePaste } from './handleEvents';
// export interface NumberCellProps extends CellProps {
//     customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
//     precision?: number;
// }

// export class NumberCell extends React.Component<NumberCellProps, {}> {
//     enteredValue: string = undefined;
//     static Create(
//         value: string,
//         setValue: (value: any, deleteKeyPress: boolean) => void,
//         readOnly: boolean,
//         onFocusChanged: (lcoation: Location) => void,
//         precision?: number,
//         customCSS?: React.CSSProperties
//     ): Cell {
//         return {
//             value,
//             isReadOnly: readOnly,
//             onFocusChanged: location => onFocusChanged(location),
//             render: cellProps => (
//                 <NumberCell {...cellProps} key={cellProps.cellKey} precision={precision} customCss={customCSS} />
//             ),
//             trySetValue: (v, deleteKeyPress) => {
//                 const newValue = Number(v);
//                 if (v === '' || v === undefined || isNaN(v)) {
//                     setValue(undefined, deleteKeyPress);
//                 } else {
//                     setValue(newValue, deleteKeyPress);
//                 }
//                 return true;
//             },
//             validateValue: keyCode => {
//                 if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 190) {
//                     return true;
//                 }
//                 return false;
//             }
//         };
//     }

//     trySetValue(value: any) {
//         this.props.trySetValue(value);
//         this.props.grid.commitChanges();
//     }

//     render() {
//         let zero: number = 0;
//         let numberStyle: React.CSSProperties = { justifyContent: 'flex-end' };
//         let mergedStyle = Object.assign({}, this.props.attributes.style, numberStyle, this.props.customCss);
//         return (
//             <div
//                 ref={ref => this.props.setFocusedCellRef(ref)}
//                 {...(this.props.attributes, { style: mergedStyle })}
//                 className="cell"
//             >
//                 {this.props.isInEditMode && (
//                     <input
//                         style={{
//                             textAlign: 'left',
//                             width: this.props.attributes.style.width,
//                             height: this.props.attributes.style.height,
//                             border: 0,
//                             fontSize: 16,
//                             outline: 'none'
//                         }}
//                         ref={input => {
//                             if (input) {
//                                 input.focus();
//                                 input.setSelectionRange(input.value.length, input.value.length);
//                                 if (input.value === zero.toString()) {
//                                     input.value = input.value.substring(1);
//                                 }
//                             }
//                         }}
//                         onChange={input => {
//                             this.enteredValue = input.target.value;
//                         }}
//                         defaultValue={this.props.value}
//                         onBlur={e => {
//                             const value = Number(e.target.value);
//                             this.props.setEditMode(false);
//                             if (!isNaN(value)) {
//                                 if (
//                                     (e.target.value && Number(e.target.value) !== this.props.value) ||
//                                     (this.props.value && Number(e.target.value) !== this.props.value)
//                                 ) {
//                                     this.props.trySetValue(e.target.value);
//                                     this.props.grid.commitChanges();
//                                 }
//                             }
//                         }}
//                         onCopy={handleCopy}
//                         onCut={handleCut}
//                         onPaste={handlePaste}
//                         onKeyDown={e => {
//                             handleKeyDown(e, this.props, 'number');
//                             if (
//                                 (this.enteredValue === undefined || this.enteredValue.length === 0) &&
//                                 (e.keyCode === keyCodes.ENTER && isItLastRowOrCol(this.props, 'row'))
//                             ) {
//                                 this.props.trySetValue(this.enteredValue);
//                                 this.props.grid.commitChanges();
//                             }
//                         }}
//                     />
//                 )}
//                 {isNaN(Number(this.props.value)) || this.props.value === undefined
//                     ? ''
//                     : !this.props.isInEditMode &&
//                     (this.props.precision !== undefined
//                         ? Number(this.props.value).toFixed(this.props.precision)
//                         : this.props.value)}
//             </div>
//         );
//     }
// }
