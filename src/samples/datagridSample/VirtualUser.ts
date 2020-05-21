import { Highlight, CellChange, CheckboxCell, Cell, Compatible, EmailCell, DateCell, NumberCell } from '@silevis/reactgrid';
import { IDatagridState } from './DatagridSample';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';

export type RandomDataTypes = string | number | Date | undefined;

export class DatagridDataGenerator {

  static nextId: number = 0;
  static data: any = {
    name: ['Jacob', 'Tom', 'John', 'Allie', 'Zoe', 'Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry'],
    surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer'],
    country: ['fra', 'hun', 'lbn', 'mli', 'deu', 'pol', 'prt', 'svk', 'gbr', 'alb', 'aut', 'bra'],
    city: ['Pekin', 'Newark', 'Acapulco', 'El Paso', 'Warsaw', 'Athens', 'Moscow', 'Mexico', 'Toronto', 'Los Angeles'],
    position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner'],
    sex: ['male', 'female'],
    phone: [645654654, 654234987, 305732948, 94740349, 4028343, 543929348, 58473532, 120954368, 432875483, 54385439],
    street: ['Jizhou Qu', 'Calle Oriente', 'Via Blanca', 'Dr. Ricardo Gutiérrez', 'Essex', 'Agar St', 'Boulevard Alexis-Nihon']
  }
  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getDataAttrByKey(key: string): RandomDataTypes {
    const selectedDataArray = DatagridDataGenerator.data[key];
    if (selectedDataArray !== undefined)
      return selectedDataArray[DatagridDataGenerator.getRandomInt(0, selectedDataArray.length)];
    return undefined
  }

  getRandomName(): string {
    const names = DatagridDataGenerator.data.name;
    return names[DatagridDataGenerator.getRandomInt(0, names.length)];
  }

  getRandomEmail(): string {
    const names = DatagridDataGenerator.data.name;
    const surnames = DatagridDataGenerator.data.surname;
    return `${names[DatagridDataGenerator.getRandomInt(0, names.length)][0].toLowerCase()}.${names[DatagridDataGenerator.getRandomInt(0, surnames.length)].toLowerCase()}@gmail.com`
  }

  getRandomSurname(): string {
    const surnames = DatagridDataGenerator.data.surname;
    return surnames[DatagridDataGenerator.getRandomInt(0, surnames.length)];
  }

  getRandomCountry(): string {
    const countries = DatagridDataGenerator.data.country;
    return countries[DatagridDataGenerator.getRandomInt(0, countries.length)];
  }

  getRandomAge(min: number = 10, max: number = 70): number {
    return DatagridDataGenerator.getRandomInt(min, max)
  }

  getRandomDate(start = new Date(1955, 0, 1), end = new Date(1990, 0, 1)): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  getRandomPosition(): any {
    const positions = DatagridDataGenerator.data.position;
    return { name: positions[DatagridDataGenerator.getRandomInt(0, positions.length)], depth: 1 };
  }

  getRandomBoolean(): boolean {
    return Math.random() < .5;
  }
}

export class VirtualEnv {

  private handleData: (data: CellChange[]) => IDatagridState;
  private virtualUsers: VirtualUser[] = [];

  constructor(handleData: (data: CellChange[]) => IDatagridState) {
    this.handleData = handleData;
  }

  addUser(virtualUser: VirtualUser): VirtualEnv {
    this.virtualUsers = [...this.virtualUsers, virtualUser]
    return this;
  }

  updateView = (state: IDatagridState) => {
    let modifiedState: IDatagridState = { ...state };
    this.virtualUsers.forEach(virtualUser => {
      modifiedState = virtualUser.makeChanges(modifiedState, this.handleData);
    });
    return modifiedState
  }
}

export class VirtualUser {

  constructor(public borderColor: string) {
    this.borderColor = borderColor;
  }

  private count: number = 0;
  private highlightColumnIdx: number = 0;
  private highlightRowIdx: number = 0;

  getHighlightedCell(state: IDatagridState) {
    return this.getHighlightedRow(state).cells[this.highlightColumnIdx];
  }

  getHighlightedColumn(state: IDatagridState) {
    return state.columns[this.highlightColumnIdx];
  }

  getHighlightedRow(state: IDatagridState) {
    return state.rows[this.highlightRowIdx];
  }

  updateHighlightsState(state: IDatagridState): IDatagridState {
    this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(0, state.columns.length);
    this.highlightRowIdx = DatagridDataGenerator.getRandomInt(1, state.rows.length);
    const highlightLocations: Highlight[] = [...state.highlights].filter(highlight => highlight.borderColor !== this.borderColor);

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

  getUpdatedFieldState(state: IDatagridState, handleData: (data: CellChange[]) => IDatagridState): any {
    if (state === null || (!this.getHighlightedColumn(state) || !this.getHighlightedRow(state) || !this.getHighlightedCell(state))) {
      return null;
    }
    const cell = this.getHighlightedCell(state);

    const dataGen: DatagridDataGenerator = new DatagridDataGenerator();
    let newFieldData: RandomDataTypes = dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId as string);

    let overridedProperties: Cell = { ...cell };

    if (newFieldData === undefined) {
      switch (cell.type) {
        case 'checkbox': {
          overridedProperties = ({ ...cell, checked: !(cell as CheckboxCell).checked } as CheckboxCell);
          break;
        }
        case 'number': {
          overridedProperties = ({ value: dataGen.getRandomAge(10, 70) } as NumberCell);
          break;
        }
        case 'date': {
          overridedProperties = ({ date: dataGen.getRandomDate() } as DateCell);
          break;
        }
        case 'email': {
          overridedProperties = ({ text: dataGen.getRandomEmail() } as EmailCell);
          break;
        }
        case 'flag': {
          overridedProperties = ({ text: dataGen.getRandomCountry() } as FlagCell);
          break;
        }
        case 'dropdownNumber': {
          overridedProperties = ({ value: DatagridDataGenerator.getRandomInt(0, 100) } as DropdownNumberCell);
          break;
        }
        default:
          break;
      }
    } else {
      overridedProperties = ({ value: newFieldData, text: newFieldData.toString() } as Compatible<any>);
    }

    return {
      ...handleData([{
        columnId: this.getHighlightedColumn(state).columnId,
        rowId: this.getHighlightedRow(state).rowId,
        initialCell: { ...cell },
        newCell: { ...cell, ...overridedProperties },
      }]),
      highlightLocations: state.highlights
    }
  }

  makeChanges(state: IDatagridState, handleData: (data: CellChange[]) => IDatagridState): IDatagridState {
    switch (this.count) {
      case 0: {
        state = this.updateHighlightsState(state);
        break;
      }
      case 1: {
        state = this.getUpdatedFieldState(state, handleData);
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        state = this.updateHighlightsState(state);
        break;
      }
      case 4: {
        state = this.getUpdatedFieldState(state, handleData);
        break;
      }
      case 5: {
        this.count = 0;
        break;
      }
    }
    this.count++;
    return state;
  }

}