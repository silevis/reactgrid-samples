import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell } from '@silevis/reactgrid';
import './rate-cell-style.scss';

export interface RateCell extends Cell {
  type: 'rate';
  value: number;
}

export class RateCellTemplate implements CellTemplate<RateCell> {

  STARS: number = 6
  MIN_VAL: number = 1

  validate(cell: RateCell): CompatibleCell<RateCell> {
    return { ...cell, text: cell.value.toString() }
  }

  textToCellData(cellvalue: number): number {
    if (isNaN(cellvalue) || cellvalue < this.MIN_VAL)
      return this.MIN_VAL
    else if (cellvalue > this.STARS)
      return this.STARS
    else 
      return cellvalue
  }

  handleKeyDown(cell: RateCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: RateCell, enableEditMode: boolean }  {
    return { cell, enableEditMode: false }
  }

  update(cell: RateCell, newCell: RateCell | CompatibleCell): RateCell {
    if (newCell.value !== undefined && newCell.value !== NaN)
      return { ...cell, value: newCell.value } as RateCell;

    const parsed = parseFloat((newCell as CompatibleCell).text);
    return { ...cell, value: parsed > 0 || parsed < 0 ? parsed : 0 }
}

  render(cell: RateCell, isInEditMode: boolean, onCellChanged: (cell: RateCell, commit: boolean) => void): React.ReactNode {
    let stars: any[] = [];
    const randNumber = Math.floor(Math.random() * 100000); // TODO get unique ID in grid
    for(let i = 1; i <= this.STARS; i++) {
      stars.push(
        <React.Fragment key={i}>
          <input type="radio" id={`star_${i}_input_${randNumber}`} name={`rate_${randNumber}`} value={i} 
            checked={this.textToCellData(cell.value) === i} onChange={()=> null}
          />
          <label htmlFor={`star_${i}_input_${randNumber}`} title="text" onClick={(e) => { onCellChanged({ ...cell, value: i}, true)}}/>
        </React.Fragment>
      )
    }
    return (
      <div className="rate">
        {stars.reverse()}
      </div>
    )
  } 
}