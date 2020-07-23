import { IMultiUserState } from './VirtualEnv';
import { DatagridDataGenerator } from '../datagridSample/VirtualUser';


export class VirtualUser {

  constructor(public borderColor: string) {
    this.borderColor = borderColor;
  }

  private count: number = 0;
  private highlightColumnIdx: number = 1;
  private highlightRowIdx: number = 1;
  private currectLetterCount = -1;
  private drawData: string = '';
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
    const moveFactor = 3;
    this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(Math.max(0, this.highlightColumnIdx - moveFactor), Math.min(this.highlightColumnIdx + moveFactor, state.columns.length));
    this.highlightRowIdx = DatagridDataGenerator.getRandomInt(Math.max(1, this.highlightRowIdx - moveFactor), Math.min(this.highlightRowIdx + moveFactor, state.rows.length));
  }

  updateHighlightsState(state: IMultiUserState): IMultiUserState {
    const highlightLocations = [...state.highlights].filter(highlight => highlight.borderColor !== this.borderColor);

    if (state.rows.length > 0 && this.getHighlightedColumn(state)) {
      const highlight = {
        columnId: this.getHighlightedColumn(state).columnId,
        rowId: this.getHighlightedRow(state).rowId,
        borderColor: this.borderColor
      };
      return { ...state, highlights: [...highlightLocations, highlight] };
    }
    return { ...state }
  }

  makeChanges(state: IMultiUserState): IMultiUserState {

    if (this.currectLetterCount === -1) {
      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId) as string;
      this.drawHighlight(state);
      state = this.updateHighlightsState(state);
    }

    this.currectLetterCount += 1;

    state = this.updateHighlightsState(state);

    if (this.drawData && this.drawData.length < this.currectLetterCount) {
      this.currectLetterCount = 0;
      this.drawHighlight(state);
      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId) as string;
    }

    const removeChars = DatagridDataGenerator.getRandomInt(0, 1);

    for (let i = 0; i < this.currectLetterCount; i++) {

      if (removeChars) {
        // this.currectLetterCount -= removeChars;
        break;
      }

      state = {
        ...state,
        rows: state.rows.map((row, rIdx) => {
          if (rIdx === this.highlightRowIdx) {
            return {
              ...row,
              cells: row.cells.map((cell, cIdx) => {
                if (cIdx === this.highlightColumnIdx) {
                  return { ...cell, text: this.drawData.slice(0, this.currectLetterCount), value: parseInt(this.drawData.slice(0, this.currectLetterCount), 10) };
                }
                return cell;
              })
            }
          }
          return row;
        })
      }

    }

    this.count++;
    return state;
  }

}