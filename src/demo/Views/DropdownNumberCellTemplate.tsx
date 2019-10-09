import * as React from 'react';
import { CellRenderProps, CellTemplate } from '../../lib/Common';
import './number-dropdown-cell-style.css';

interface IDropdownNumberCell {
  value: number;
  isOpened: boolean;
}

export class DropdownNumberCellTemplate implements CellTemplate<IDropdownNumberCell, any> {

  MIN_VAL: number = 0
  MAX_VAL: number = 100
  STEP: number  = 10

  isValid(cellData: IDropdownNumberCell): boolean {
      return typeof cellData.value === 'number';
  }

  textToCellData(text: string): IDropdownNumberCell {
    let result = parseInt(text)
    if (isNaN(result) || result < this.MIN_VAL)
      return {value: this.MIN_VAL, isOpened: false}
    else if (result > this.MAX_VAL)
      return {value: this.MAX_VAL, isOpened: false}
    else 
      return {value: result, isOpened: false}
  }

  cellDataToText(cellData: IDropdownNumberCell): string {
    return isNaN(cellData.value) ? '' : cellData.value.toString();
  }

  handleKeyDown(cellData: IDropdownNumberCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
    return { cellData, enableEditMode: false }
  }

  getCustomStyle(cellData: IDropdownNumberCell, isInEditMode: boolean, props?: any): React.CSSProperties {
    return {overflow: 'unset'}
  };

  renderContent: (props: CellRenderProps<IDropdownNumberCell, any>) => React.ReactNode = (props) => {
    return (
      <>
        <div className="rg-dropdown-number-cell">
          <div className="rg-dropdown-number-cell-wrapper">
            <div className="rg-dropdown-number-cell-value"><span>{this.cellDataToText(props.cellData)}</span></div>
            <div className="rg-dropdown-number-cell-chevron">
              <div
                style={{transform: !props.cellData.isOpened ? 'rotate(0deg)' : 'rotate(90deg)', transitionDuration: '200ms'}}
                onClick={() => { props.onCellDataChanged( {value: props.cellData.value, isOpened: !props.cellData.isOpened}, true)
              }}> ❯
              </div>
            </div>
          </div>
          {props.cellData.isOpened && 
            <div className="rg-dropdown-number-cell-dropdown">
              <input 
                type="range" 
                min={this.MIN_VAL}
                max={this.MAX_VAL}
                step={this.STEP}
                defaultValue={props.cellData.value.toString()}
                onChange={(e: React.FormEvent<HTMLInputElement>) => { 
                  props.onCellDataChanged({value: parseInt(e.currentTarget.value), isOpened: props.cellData.isOpened}, true)
                }}
              />
            </div>}
          </div>
      </>
    )
  } 
}