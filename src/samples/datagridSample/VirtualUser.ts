import { IDatagridState } from './VirtualEnv';
import { DatagridDataGenerator } from './DatagridDataGenerator';
import { DataGridSampleRow } from '..';
import { Column, Highlight } from '@silevis/reactgrid';


export class VirtualUser {

  constructor(public borderColor: string, private highlightColumnIdx: number, private highlightRowIdx: number) {
    this.borderColor = borderColor;
    this.highlightColumnIdx = highlightColumnIdx;
    this.highlightRowIdx = highlightRowIdx;
  }

  private currectLetterCount = -1;
  private drawData: string = '';
  private dataGen = new DatagridDataGenerator();

  getHighlightedCell(rows: DataGridSampleRow[]) {
    return this.getHighlightedRow(rows).cells[this.highlightColumnIdx];
  }

  getHighlightedColumn(columns: Column[]) {
    return columns[this.highlightColumnIdx];
  }

  getHighlightedRow(rows: DataGridSampleRow[]) {
    return rows[this.highlightRowIdx];
  }

  drawHighlight(columns: Column[], rows: DataGridSampleRow[]) {
    const moveFactor = 2;
    this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(Math.max(0, this.highlightColumnIdx - moveFactor), Math.min(this.highlightColumnIdx + moveFactor, columns.length));
    this.highlightRowIdx = DatagridDataGenerator.getRandomInt(Math.max(1, this.highlightRowIdx - moveFactor), Math.min(this.highlightRowIdx + moveFactor, rows.length));
  }

  updateHighlightsState(columns: Column[], rows: DataGridSampleRow[], highlights: Highlight[]): Highlight[] {
    const highlightLocations = [...highlights].filter(highlight => highlight.borderColor !== this.borderColor);

    const highlightRow = this.getHighlightedRow(rows);
    const highlightColumn = this.getHighlightedColumn(columns);
    if (rows.length > 0 && highlightColumn && highlightRow) {
      const highlight = {
        columnId: highlightColumn.columnId,
        rowId: highlightRow.rowId,
        borderColor: this.borderColor
      };
      return [...highlightLocations, highlight];
    }
    return [...highlights];
  }

  makeChanges(columns: Column[], rows: DataGridSampleRow[], highlights: Highlight[]): IDatagridState {

    if (this.currectLetterCount === -1) {
      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(columns).columnId) as string;
      this.drawHighlight(columns, rows);
      highlights = this.updateHighlightsState(columns, rows, highlights);
    }

    this.currectLetterCount += 1;

    highlights = this.updateHighlightsState(columns, rows, highlights);

    if (this.drawData && this.drawData.length < this.currectLetterCount) {
      this.currectLetterCount = 0;
      this.drawHighlight(columns, rows);
      this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(columns).columnId) as string;
    }

    for (let i = 0; i < this.currectLetterCount; i++) {
      rows = rows.map((row, rIdx) => {
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
      });
    }

    return { rows, highlights };
  }

}