import * as React from "react";
import { State, CellData, keyCodes } from "../Common";

interface CellEditorProps {
    state: State;
}

export const CellEditor: React.FunctionComponent<CellEditorProps> = props => {
    const [cellData, setCellData] = React.useState(props.state.editedCell!)
    const location = props.state.focusedLocation!;
    let lastKeyCode = props.state.lastKeyCode;
    return (
        <div
            style={{ boxSizing: 'border-box', position: 'fixed', top: 100, left: 240, height: location.row.height, width: location.col.width, border: '2px red solid' }}
            onBlur={() => { props.state.cellMatrix.rows[location.row.idx].cells[location.col.idx] = cellData }}
            onKeyDownCapture={e => lastKeyCode = e.keyCode}
            onKeyDown={e => {
                if (e.keyCode !== keyCodes.ENTER && e.keyCode !== keyCodes.ESC) {
                    e.stopPropagation()
                }
            }}
        >
            {props.state.cellTemplates[cellData.type].renderContent({
                cellData: cellData,
                isInEditMode: true,
                lastKeyCode: lastKeyCode,
                onCellDataChanged: (cd: CellData) => { setCellData(cd) }
            })}
        </div>
    )
}