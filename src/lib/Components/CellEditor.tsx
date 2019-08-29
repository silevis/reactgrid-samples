import * as React from "react";
import { State, keyCodes, Location } from "../Common";
import { trySetDataAndAppendChange } from "../Functions/trySetDataAndAppendChange";

// import { isArrowKey } from "../Behaviors/DefaultBehavior/handleKeyDown";

interface CellEditorProps {
    state: State;
}

export const CellEditor: React.FunctionComponent<CellEditorProps> = props => {
    const [cellData, setCellData] = React.useState(props.state.currentlyEditedCell!);
    const location = props.state.focusedLocation!;
    const [position, setPosition] = React.useState(calculatedEditorPosition(location, props.state));
    let lastKeyCode = props.state.lastKeyCode;

    React.useEffect(() => setPosition(calculatedEditorPosition(location, props.state)), []);
    return (
        <div
            style={{
                boxSizing: 'border-box',
                position: 'absolute',
                top: position.top - 1,
                left: position.left - 1,
                height: location.row.height + 1,
                width: location.col.width + 1,
                paddingTop: 1,
                border: '2px #3579f8 solid',
                background: 'white',
                boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)',
                zIndex: 5
            }}
            onBlur={() => { if (lastKeyCode !== keyCodes.ESC) props.state.updateState(state => trySetDataAndAppendChange(state, location, cellData)) }}
            onKeyDown={e => {
                const input: HTMLInputElement = e.target as HTMLInputElement;
                lastKeyCode = e.keyCode;
                if (e.keyCode !== keyCodes.ENTER && e.keyCode !== keyCodes.ESC && e.keyCode !== keyCodes.TAB &&
                    (e.keyCode === keyCodes.RIGHT_ARROW || e.keyCode === keyCodes.DOWN_ARROW) && input.selectionEnd! < input.value.length ||
                    (e.keyCode === keyCodes.LEFT_ARROW || e.keyCode === keyCodes.UP_ARROW) && input.selectionEnd! > 0) {
                    e.stopPropagation();
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
    if (state.cellMatrix.frozenRightRange.first.col && location.col.idx >= state.cellMatrix.frozenRightRange.first.col.idx) {
        return Math.min(state.cellMatrix.width, state.viewportElement.clientWidth) - state.cellMatrix.frozenRightRange.width;
    } else if (location.col.idx > (state.cellMatrix.frozenLeftRange.last.col ? state.cellMatrix.frozenLeftRange.last.col.idx : state.cellMatrix.first.col.idx) ||
        location.col.idx == state.cellMatrix.last.col.idx) {
        return state.cellMatrix.frozenLeftRange.width - state.viewportElement.scrollLeft;
    }
    return 0;
}

const calculatedYAxisOffset = (location: Location, state: State) => {
    if (state.cellMatrix.frozenBottomRange.first.row && location.row.idx >= state.cellMatrix.frozenBottomRange.first.row.idx) {
        return Math.min(state.cellMatrix.height, state.viewportElement.clientHeight) - state.cellMatrix.frozenBottomRange.height;
    } else if (location.row.idx > (state.cellMatrix.frozenTopRange.last.row ? state.cellMatrix.frozenTopRange.last.row.idx : state.cellMatrix.first.row.idx) ||
        location.row.idx == state.cellMatrix.last.row.idx) {
        return state.cellMatrix.frozenTopRange.height - state.viewportElement.scrollTop;
    }
    return 0;
}

const calculatedEditorPosition = (location: Location, state: State) => {
    return {
        left: location.col.left + calculatedXAxisOffset(location, state),
        top: location.row.top + calculatedYAxisOffset(location, state)
    }
}