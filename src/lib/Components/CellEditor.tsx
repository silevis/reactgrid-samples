import * as React from "react";
import { State, keyCodes, Location, CellMatrix } from "../Common";
import { trySetDataAndAppendChange } from "../Functions/trySetDataAndAppendChange";

interface CellEditorProps {
    state: State;
}

export const CellEditor: React.FunctionComponent<CellEditorProps> = props => {
    const [cellData, setCellData] = React.useState(props.state.currentlyEditedCell!)
    const location = props.state.focusedLocation!;
    const [position, setPosition] = React.useState(calculatedEditorPosition(location, props.state))
    let lastKeyCode = props.state.lastKeyCode;

    React.useEffect(() => setPosition(calculatedEditorPosition(location, props.state)), [])

    return (
        <div
            style={{
                boxSizing: 'border-box',
                position: 'fixed',
                top: position.top + props.state.viewportElement.offsetTop,
                left: position.left + props.state.viewportElement.offsetLeft,
                height: location.row.height,
                width: location.col.width,
                border: '2px #3579f8 solid',
                boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)',
                zIndex: 5,
            }}
            onBlur={() => { if (lastKeyCode != keyCodes.ESC) props.state.updateState(state => trySetDataAndAppendChange(state, location, cellData.type, cellData.data, cellData.text)) }}
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

const calculatedXAxisOffset = (location: Location, state: State) => {
    if (location.col.idx >= state.cellMatrix.frozenRightRange.first.col.idx) {
        return Math.min(state.cellMatrix.width, state.viewportElement.clientWidth) - state.cellMatrix.frozenRightRange.width
    } else if (location.col.idx > state.cellMatrix.frozenLeftRange.last.col.idx) {
        return state.cellMatrix.frozenLeftRange.width - state.viewportElement.scrollLeft;
    } else {
        return 0;
    }
}

const calculatedYAxisOffset = (location: Location, state: State) => {
    if (location.row.idx >= state.cellMatrix.frozenBottomRange.first.row.idx) {
        return Math.min(state.cellMatrix.height, state.viewportElement.clientHeight) - state.cellMatrix.frozenBottomRange.height
    } else if (location.row.idx > state.cellMatrix.frozenTopRange.last.row.idx) {
        return state.cellMatrix.frozenTopRange.height - state.viewportElement.scrollTop;
    } else {
        return 0;
    }
}

const calculatedEditorPosition = (location: Location, state: State) => {
    return { left: location.col.left + calculatedXAxisOffset(location, state), top: location.row.top + calculatedYAxisOffset(location, state) }
}