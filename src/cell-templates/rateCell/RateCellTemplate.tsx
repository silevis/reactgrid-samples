import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell } from '@silevis/reactgrid';
import './rate-cell-style.scss';

export interface RateCell extends Cell {
  type: 'rate',
  text: string
}
export class RateCellTemplate implements CellTemplate<RateCell> {

  STARS: number = 6
  MIN_VAL: number = 1

  validate(cell: RateCell): CompatibleCell<RateCell> {
    if (cell.text === undefined || cell.text === null)
      throw 'TextCell is missing text property'
    return cell;
  }

  // isValid(cellData: number): boolean {
  //     return typeof (cellData) === 'number';
  // }

  textToCellData(text: string): number {
    let result = parseFloat(text)
    if (isNaN(result) || result < this.MIN_VAL)
      return this.MIN_VAL
    else if (result > this.STARS)
      return this.STARS
    else
      return result
  }

  cellDataToText(cellData: number) {
    return isNaN(cellData) ? '' : cellData.toString();
  }

  // handleKeyDown(cellData: RateCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
  //   return { cellData, enableEditMode: false }
  // }

  render(cell: RateCell, isInEditMode: boolean, onCellChanged: (cell: RateCell, commit: boolean) => void): React.ReactNode {
    let stars: any[] = [];
    const randNumber = Math.floor(Math.random() * 100000); // TODO get unique ID in grid
    for (let i = 1; i <= this.STARS; i++) {
      stars.push(
        <React.Fragment key={i}>
          <input type="radio" id={`star_${i}_input_${randNumber}`} name={`rate_${randNumber}`} value={i}
            checked={this.textToCellData(cell.toString()) === i} onChange={() => { }}
          />
          <label htmlFor={`star_${i}_input_${randNumber}`} title="text" onClick={(e) => { }} />
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