import { DefaultCellTypes } from '@silevis/reactgrid';
import { IMultiUserState, VirtualEnvCellChange } from './VirtualEnv';
import { DatagridDataGenerator } from '../datagridSample/VirtualUser';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';


export class VirtualUser {

  constructor(public borderColor: string) {
    this.borderColor = borderColor;
  }

  private count: number = 0;
  private highlightColumnIdx: number = 1;
  private highlightRowIdx: number = 1;
  private currectLetterCount = -1;
  private drawData: any;

  private dataGen = new DatagridDataGenerator();


  getHighlightedCell(state: IMultiUserState) {
    return this.getHighlightedRow(state).cells[this.highlightColumnIdx];
  }

  getHighlightedColumn(state: IMultiUserState) {
    return state.columns[this.highlightColumnIdx];
  }

  getHighlightedRow(state: IMultiUserState) {
    return state.rows[this.highlightRowIdx];
  }

  drawHighlight(state: IMultiUserState) {
    this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(0, state.columns.length);
    this.highlightRowIdx = DatagridDataGenerator.getRandomInt(1, state.rows.length);
  }

  updateHighlightsState(state: IMultiUserState): IMultiUserState {
    const highlightLocations = [...state.highlights].filter(highlight => highlight.borderColor !== this.borderColor);

    if (state.rows.length > 0 && state.columns[this.highlightColumnIdx]) {
      const highlight = {
        columnId: this.getHighlightedColumn(state).columnId,
        rowId: this.getHighlightedRow(state).rowId,
        borderColor: this.borderColor
      };
      return { ...state, highlights: [...highlightLocations, highlight] };
    }
    return { ...state }
  }

  /* 
   getUpdatedFieldState(state: IDatagridState, handleData: (data: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]) => IDatagridState): any {
     if (state === null || (!this.getHighlightedColumn(state) || !this.getHighlightedRow(state) || !this.getHighlightedCell(state))) {
       return null;
     }
     const cell = this.getHighlightedCell(state);
  
     const dataGen: DatagridDataGenerator = new DatagridDataGenerator();
     const newFieldData: RandomDataTypes = dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId as string);
  
     let overridedProperties: DefaultCellTypes | FlagCell | DropdownNumberCell = { ...cell };
  
     if (newFieldData === undefined) {
       switch (cell.type) {
         case 'checkbox': {
           overridedProperties = { ...cell, checked: !cell.checked };
           break;
         }
         case 'number': {
           overridedProperties = { ...cell, value: dataGen.getRandomAge(10, 70) };
           break;
         }
         case 'date': {
           overridedProperties = { ...cell, date: dataGen.getRandomDate() };
           break;
         }
         case 'email': {
           overridedProperties = { ...cell, text: dataGen.getRandomEmail() };
           break;
         }
         case 'flag': {
           overridedProperties = { ...cell, text: dataGen.getRandomCountry() };
           break;
         }
         case 'dropdownNumber': {
           overridedProperties = { ...cell, value: DatagridDataGenerator.getRandomInt(0, 100) };
           break;
         }
         default:
           break;
       }
     } else {
       const text = newFieldData.toString();
       overridedProperties = { ...cell, value: parseInt(text, 10), text } as Compatible<DefaultCellTypes | FlagCell | DropdownNumberCell>;
     }
  
     return {
       ...handleData([{
         columnId: this.getHighlightedColumn(state).columnId,
         rowId: this.getHighlightedRow(state).rowId,
         type: cell.type,
         initialCell: { ...cell },
         newCell: { ...overridedProperties },
       } as CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>]),
       highlightLocations: state.highlights
     }
   }
  */

  makeChanges(state: IMultiUserState, handleData: (data: VirtualEnvCellChange[]) => void): IMultiUserState {

    const cell = this.getHighlightedCell(state);

    if (this.currectLetterCount === -1) {
      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId);
      this.drawHighlight(state);
      state = this.updateHighlightsState(state);
    }

    this.currectLetterCount += 1;
    state = this.updateHighlightsState(state);

    if (this.drawData && this.drawData.length < this.currectLetterCount) {
      this.currectLetterCount = 0;
      console.log('losuje');
      this.drawHighlight(state);

      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId);
    }

    let overridedProperties: DefaultCellTypes | FlagCell | DropdownNumberCell = { ...cell };

    console.log(this.drawData, this.currectLetterCount, this.getHighlightedColumn(state).columnId, cell);

    // switch (this.count) {
    //     case 0: {
    //         state = this.updateHighlightsState(state);
    //         break;
    //     }
    //     case 1: {
    //         state = this.getUpdatedFieldState(state, handleData);
    //         break;
    //     }
    //     case 2: {
    //         break;
    //     }
    //     case 3: {
    //         state = this.updateHighlightsState(state);
    //         break;
    //     }
    //     case 4: {
    //         state = this.getUpdatedFieldState(state, handleData);
    //         break;
    //     }
    //     case 5: {
    //         this.count = 0;
    //         break;
    //     }
    // }
    this.count++;
    return state;
  }

}