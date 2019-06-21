import * as React from "react";
import { State, CellData } from "../Common";

interface CellEditorProps {
    state: State;
}

export const CellEditor: React.FunctionComponent<CellEditorProps> = props => {
    const [cellData, setCellData] = React.useState(props.state.editedCell!)
    const lastKeyCode = props.state.lastKeyCode;;
    const location = props.state.focusedLocation!;
    return (
        <div
            style={{ boxSizing: 'border-box', position: 'fixed', top: 100, left: 120, height: location.row.height, width: location.col.width, border: '2px red solid' }}
            onKeyDown={e => {
                if (e.key == "Enter") {
                    props.state.cellMatrix.rows[location.row.idx].cells[location.col.idx] = cellData;
                    return
                } else if (e.key == "Escape") {
                    return
                } else {
                    e.stopPropagation()
                }
            }}
        >
            {props.state.cellTemplates[cellData.type].renderContent({
                cellData: cellData,
                isInEditMode: true,
                lastKeyCode: lastKeyCode,
                onCellDataChanged: (cd: CellData) => { setCellData(cd); console.log(cd) }
            })}
        </div>
    )
}