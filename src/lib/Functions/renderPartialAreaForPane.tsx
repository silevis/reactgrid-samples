import * as React from "react";
import { GridContext, Range } from "../Common";
import { PartialArea } from "../Components/PartialArea";

export function renderMultiplePartialAreasForPane(gridContext: GridContext, area: Range[], pane: Range, style: React.CSSProperties) {
    let result: Array<any> = [];
    area.forEach((range, index) => {
        if (range.first && range.last) {
            if (
                !(
                    range.first.col.idx === gridContext.state.focusedLocation!.col.idx &&
                    range.first.row.idx === gridContext.state.focusedLocation!.row.idx &&
                    range.last.col.idx === gridContext.state.focusedLocation!.col.idx &&
                    range.last.row.idx === gridContext.state.focusedLocation!.row.idx
                )
            ) {
                let partialPane = <PartialArea key={index} range={range} pane={pane} style={style} />
                partialPane && result.push([partialPane]);
            }
        }
    });
    return result;
}