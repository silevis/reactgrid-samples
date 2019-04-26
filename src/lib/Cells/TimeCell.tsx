export const x = 1;
// import * as React from 'react';
// import { CellProps, Cell, Location } from '../Model';
// import { keyCodes } from '../Common/Constants';
// import { handleKeyDown, isItLastRowOrCol, handleCopy, handleCut, handlePaste } from './handleEvents';

// export interface TimeCellProps extends CellProps {
//     customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
// }
// export class TimeCell extends React.Component<TimeCellProps, {}> {
//     enteredValue: string = undefined;
//     static Create(
//         value: string,
//         setValue: (value: any, deleteKeyPress: boolean) => void,
//         readOnly: boolean,
//         onFocusChanged: (location: Location, reset?: boolean) => void,
//         customHtml?: any,
//         customCSS?: React.CSSProperties
//     ): Cell {
//         return {
//             value,
//             isReadOnly: readOnly,
//             onFocusChanged: location => onFocusChanged(location),
//             render: cellProps => (
//                 <TimeCell {...cellProps} key={cellProps.cellKey} customCss={customCSS}>
//                     {customHtml}
//                 </TimeCell>
//             ),
//             trySetValue: (v, deleteKeyPress) => {
//                 const time_regex = /^\d{2}\:\d{2}$/;
//                 let value = v ? v.toString() : v;
//                 value = value ? value.replace(/\s+/g, '') : value;
//                 if (time_regex.test(value) || !value) {
//                     setValue(value, deleteKeyPress);
//                     return true;
//                 }
//             }
//         };
//     }

//     render() {
//         let mergedStyle = Object.assign({}, this.props.attributes.style, this.props.customCss);
//         return (
//             <div
//                 ref={ref => this.props.setFocusedCellRef(ref)}
//                 {...(this.props.attributes, { style: mergedStyle })}
//                 className="cell"
//             >
//                 {this.props.isInEditMode && (
//                     <input
//                         type="time"
//                         style={{
//                             width: this.props.attributes.style.width,
//                             height: this.props.attributes.style.height,
//                             border: 0,
//                             fontSize: 16,
//                             outline: 'none'
//                         }}
//                         ref={input => {
//                             if (input) {
//                                 input.focus();
//                             }
//                         }}
//                         defaultValue={this.props.value}
//                         onChange={input => (this.enteredValue = input.target.value)}
//                         onBlur={e => {
//                             this.props.setEditMode(false);
//                             if (
//                                 (e.target.value && e.target.value !== this.props.value) ||
//                                 (this.props.value && e.target.value !== this.props.value)
//                             ) {
//                                 this.props.trySetValue(e.target.value);
//                                 this.props.grid.commitChanges();
//                             }
//                         }}
//                         onCopy={handleCopy}
//                         onCut={handleCut}
//                         onPaste={handlePaste}
//                         onKeyDown={e => {
//                             handleKeyDown(e, this.props);
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
//                 {this.props.children}
//                 {!this.props.isInEditMode && this.props.value}
//             </div>
//         );
//     }
// }
