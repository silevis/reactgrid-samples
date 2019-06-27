import * as React from "react";
import { State, keyCodes, Location, CellMatrix } from "../Common";

interface CellEditorProps {
    state: State;
}

export const CellEditor: React.FunctionComponent<CellEditorProps> = props => {

    React.useEffect(() => setPosition(calculateEditorPosition(location, props.state)), [])

    const [cellData, setCellData] = React.useState(props.state.editedCellData!)
    const [position, setPosition] = React.useState({ left: 0, top: 0 })
    const location = props.state.focusedLocation!;
    let lastKeyCode = props.state.lastKeyCode;

    return (
        <div
            style={{ boxSizing: 'border-box', position: 'fixed', top: position.top, left: position.left, height: location.row.height, width: location.col.width, border: '2px #3579f8 solid', boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)' }}
            onBlur={() => { if (lastKeyCode != keyCodes.ESC) props.state.cellMatrix.rows[location.row.idx].cells[location.col.idx] = cellData }}
            onKeyDown={e => {
                lastKeyCode = e.keyCode
                if (e.keyCode !== keyCodes.ENTER && e.keyCode !== keyCodes.ESC) {
                    e.stopPropagation()
                }
            }}
        >
            {props.state.cellTemplates[cellData.type].renderContent({
                cellData: props.state.cellTemplates[cellData.type].validate(cellData.data),
                isInEditMode: true,
                lastKeyCode: lastKeyCode,
                onCellDataChanged: (cd) => { setCellData({ data: cd, type: cellData.type }) }
            })}
        </div>
    )
}

const calculateEditorPosition = (location: Location, state: State) => {
    let x_offset = 0;
    let y_offset = 0;
    if (location.col.idx >= state.cellMatrix.frozenRightRange.first.col.idx) {
        x_offset = Math.min(state.cellMatrix.width, state.viewportElement.clientWidth) - state.cellMatrix.frozenRightRange.width
    } else if (location.col.idx > state.cellMatrix.frozenLeftRange.last.col.idx) {
        x_offset = state.cellMatrix.frozenLeftRange.width - state.viewportElement.scrollLeft;
    }

    if (location.row.idx >= state.cellMatrix.frozenBottomRange.first.row.idx) {
        y_offset = Math.min(state.cellMatrix.height, state.viewportElement.clientHeight) - state.cellMatrix.frozenBottomRange.height
    } else if (location.row.idx > state.cellMatrix.frozenTopRange.last.row.idx) {
        y_offset = state.cellMatrix.frozenTopRange.height - state.viewportElement.scrollTop;
    }
    return { left: location.col.left + x_offset, top: location.row.top + y_offset }
}