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
            onBlur={() => {
                if (!(lastKeyCode == keyCodes.ESC ||
                    (lastKeyCode >= keyCodes.ZERO && lastKeyCode <= keyCodes.Z) ||
                    (lastKeyCode >= keyCodes.NUM_PAD_0 && lastKeyCode <= keyCodes.DIVIDE) ||
                    (lastKeyCode >= keyCodes.SEMI_COLON && lastKeyCode <= keyCodes.SINGLE_QUOTE) ||
                    lastKeyCode === keyCodes.SPACE)) {
                    props.state.cellMatrix.rows[location.row.idx].cells[location.col.idx] = cellData;
                }
            }
            }
            onKeyDownCapture={e => lastKeyCode = e.keyCode}
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