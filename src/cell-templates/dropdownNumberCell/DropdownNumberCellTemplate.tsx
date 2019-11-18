import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell, CellStyle } from '@silevis/reactgrid';
import './number-dropdown-cell-style.scss';


export interface DropdownNumberCell extends Cell {
  type: 'dropdownNumber';
  value: number;
  isOpened?: boolean | undefined;
}

export class DropdownNumberCellTemplate implements CellTemplate<DropdownNumberCell> {

  MIN_VAL: number = 0
  MAX_VAL: number = 100
  STEP: number = 10

  validate(cell: DropdownNumberCell): CompatibleCell<DropdownNumberCell> {
    return { ...cell, text: cell.value.toString() }
  }

  // textToCellData(text: string): IDropdownNumberCell {
  //   let result = parseInt(text)
  //   if (isNaN(result) || result < this.MIN_VAL)
  //     return {value: this.MIN_VAL, isOpened: false}
  //   else if (result > this.MAX_VAL)
  //     return {value: this.MAX_VAL, isOpened: false}
  //   else 
  //     return {value: result, isOpened: false}
  // }

  handleKeyDown(cell: DropdownNumberCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: DropdownNumberCell, enableEditMode: boolean } {
    return { cell, enableEditMode: false }
  }

  update(cell: DropdownNumberCell, newCell: DropdownNumberCell | CompatibleCell): DropdownNumberCell {

    if (newCell.value !== undefined && newCell.value !== NaN)
      return { ...cell, value: newCell.value } as DropdownNumberCell;

    const parsed = parseFloat((newCell as CompatibleCell).text);
    return { ...cell, value: parsed > 0 || parsed < 0 ? parsed : 0 }
  }

  getStyle(cell: DropdownNumberCell, isInEditMode: boolean): CellStyle {
    return { ...cell.style, className: "siemanko" }
  }

  // TODO 
  // getCustomStyle(cellData: IDropdownNumberCell, isInEditMode: boolean, props?: any): React.CSSProperties {
  //   return {overflow: 'unset'}
  // };

  render(cell: DropdownNumberCell, isInEditMode: boolean, onCellChanged: (cell: DropdownNumberCell, commit: boolean) => void): React.ReactNode {
    return (
      <>
        <div
          className="rg-dropdown-number-cell"
        >
          <div className="rg-dropdown-number-cell-wrapper">
            <div className="rg-dropdown-number-cell-value"><span>{cell.value}</span></div>
            <div className="rg-dropdown-number-cell-chevron">
              <div
                style={{ transform: !cell.isOpened ? 'rotate(0deg)' : 'rotate(90deg)', transitionDuration: '200ms' }}
                onClick={() => {
                  onCellChanged({ ...cell, isOpened: !cell.isOpened }, true)
                }}
              > ❯
              </div>
            </div>
          </div>
          {cell.isOpened &&
            <div className="rg-dropdown-number-cell-dropdown">
              <input
                type="range"
                min={this.MIN_VAL}
                max={this.MAX_VAL}
                step={this.STEP}
                className="rg-dropdown-number-cell-dropdown-input"
                defaultValue={cell.value.toString()}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  onCellChanged({ ...cell, value: parseInt(e.currentTarget.value, 10) }, true)
                }}
              />
            </div>}
        </div>
      </>
    )
  }
}