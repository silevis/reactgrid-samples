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
    for(let i = this.MIN_VAL ; i <= this.STARS; i++) {
      stars.push(
        <span key={i} onClick={() => { props.onCellDataChanged(i, true)}}>
          {this.textToCellData(props.cellData.toString()) < i ? '☆' : '★' }
        </span>
      )
    }
    return (
      <div className="rating">
        {stars.reverse()}
      </div>
    )
  } 
}