import * as React from 'react';
import { CellRenderProps, CellTemplate } from '../../lib/Common';
import './rate-cell-style.css';

export class RateCellTemplate implements CellTemplate<number, any> {

  STARS: number = 6
  MIN_VAL: number = 1

  isValid(cellData: number): boolean {
      return typeof (cellData) === 'number';
  }

  textToCellData(text: string): number {
    let result = parseFloat(text)
    return isNaN(result) ? this.MIN_VAL : result;
  }

  cellDataToText(cellData: number) {
    return isNaN(cellData) ? '' : cellData.toString();
  }

  handleKeyDown(cellData: number, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
    return { cellData, enableEditMode: false }
  }

  renderContent: (props: CellRenderProps<number, any>) => React.ReactNode = (props) => {
    let stars: any[] = [];
    for(let i = 1; i <= this.STARS; i++) {
      stars.push(
        <React.Fragment key={i}>
          <input type="radio" id={`star_${i}_input`} name="rate" value={i} 
            checked={this.textToCellData(props.cellData.toString()) == i} onChange={()=>{}}
          />
          <label htmlFor={`star_${i}_input`} title="text" onClick={() => { props.onCellDataChanged(i, true)}}>
            {i} stars
          </label>
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