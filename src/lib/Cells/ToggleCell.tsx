// import * as React from 'react'
// import { CellProps, Cell, Location } from '../Model'

// export interface ToggleCellProps extends CellProps {
//     isOpen: boolean
//     onToggle: () => void
// }

// export class ToggleCell extends React.Component<ToggleCellProps, {}> {
//     static Create(value: string, status: boolean, onToggle: () => void, setValue: (value: any) => void, onFocusChanged: (location: Location) => void): Cell {
//         return {
//             value,
//             isReadOnly: false,
//             onFocusChanged: (location) => onFocusChanged(location),
//             render: (cellProps: CellProps) => <ToggleCell  {...cellProps} key={cellProps.cellKey} isOpen={status} onToggle={onToggle} />,
//             trySetValue: (v) => { setValue(v); return true },
//         }
//     }

//     render() {
//         return <div ref={ref => this.props.setFocusedCellRef(ref)} {...this.props.attributes, { style: { ...this.props.attributes.style, background: '#29B765', color: '#fff' } }} >
//             {this.props.isOpen && <div><button onClick={() => this.clickOnToggleButton()}><span style={{ fontSize: '10px' }}>&#9658;</span></button>{' ' + this.props.value}</div>}
//             {!this.props.isOpen && <div><button onClick={() => this.clickOnToggleButton()}><span style={{ fontSize: '10px' }}>&#9660;</span></button>{' ' + this.props.value}</div>}</div>
//     }

//     clickOnToggleButton() {
//         this.props.onToggle()
//     }
// }