import * as React from 'react';
import { ReactGrid, DropPosition, Id, ColumnProps, CellMatrixProps } from '@silevis/reactgrid';
import styled from 'styled-components';
import { RowProps } from '@silevis/reactgrid';
import { StyleCellTemplate } from '../../cell-templates/styleCellTemplate/StyleCellTemplate';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  height: 1200px;
  min-height: 400px;
`
const fields: ColumnProps[] = [{
  id: 'name',
  reorderable: false,
  resizable: false,
  width: 150,
},
{
  id: 'Symbol',
  reorderable: false,
  resizable: false,
  width: 150,
},
{
  id: 'Current value',
  reorderable: false,
  resizable: false,
  width: 150,
},
{
  id: 'Low_24',
  reorderable: false,
  resizable: false,
  width: 150,
},
{
  id: 'High_24',
  reorderable: false,
  resizable: false,
  width: 150,
},
]

const api = async () => {
  const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  const myJsonData = await data.json();
  const newRows: RowProps[] = [{
    id: 'header',
    reorderable: false,
    height: 25,
    cells: [
      { type: 'header', data: 'Name' },
      { type: 'header', data: 'Symbol' },
      { type: 'header', data: 'Current value' },
      { type: 'header', data: 'Low 24h' },
      { type: 'header', data: 'High 24h' },
    ],
  }].concat(myJsonData.map((item: any) => {
    return {
      id: item.id,
      reorderable: false,
      height: 25,
      cells: [
        { type: 'text', data: item.name },
        { type: 'text', data: item.symbol },
        { type: 'styleInside', data: item.current_price, props: { className: 'stockMarketBaseStyle' } },
        { type: 'number', data: item.low_24h },
        { type: 'number', data: item.high_24h },
      ]
    }
  }));
  return newRows;

}

export default class StockMarketDataSample extends React.Component {
  columns = fields.map((field) => ({
    id: field.id,
    reorderable: field.reorderable,
    resizable: field.resizable,
    width: field.width,
  })
  )
  state = {
    columns: this.columns,
    rows: [],
  };
  intervalId?: number;
  array = new Array()

  returnRandomWith = (numberOfRows: number) => {
    return Math.floor(Math.random() * numberOfRows + 1);
  }

  currentValueRandom = (dataState: RowProps[], numberOfRows: number): number => {
    const row: RowProps | undefined = dataState.find((row: RowProps, idx: number) => {
      return idx === numberOfRows
    })
    if (!row) return 0;
    const min = row.cells[3].data;
    const max = row.cells[4].data;
    const randomValue = (Math.random() * (+max - +min) + +min)
    return parseFloat(randomValue.toFixed(6))

  }

  findIdsCheanged = (itemID: number | string, dataApi: RowProps[]) => {
    dataApi.forEach((item, idx) => {
      if (item.id === itemID) {
        this.array.push(idx)
      }
    })
    return this.array
  }

  findCheangesRows = (dataState: RowProps[], dataApi: RowProps[]): RowProps[] => {
    if (!dataState) return []
    const changedRows: RowProps[] = dataState.filter((data: RowProps, idx: number) => {
      return idx != 0 && data.cells[2].data !== dataApi[idx].cells[2].data
    });
    return changedRows
  }

  renderValue = async () => {
    const dataApi: RowProps[] = await api();
    const dataState: RowProps[] = [...this.state.rows]
    const changedIdx = this.returnRandomWith(10)
    const randomvalue = this.currentValueRandom(dataApi, changedIdx)

    dataApi[changedIdx].cells[2].data = randomvalue

    const cheangeRows: RowProps[] = this.findCheangesRows(dataState, dataApi)
    if (cheangeRows.length !== 0) {
      cheangeRows.forEach((row) => {
        let idsToCheanges: number[] = this.findIdsCheanged(row.id, dataApi)
        idsToCheanges.forEach(id => {
          dataApi[id].cells[2].data > dataState[id].cells[2].data ? dataApi[id].cells[2].props.className = 'stockMarketBaseStyle greenyellow' : dataApi[id].cells[2].props.className = 'stockMarketBaseStyle red'
        })
        idsToCheanges.length = 0
      })
    }
    this.setState({ rows: dataApi })
  }

  componentDidMount() {
    this.renderValue();
    this.intervalId = setInterval(
      () => { this.renderValue() }
      , 3000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
        <ReactGridContainer className="stock-market-cell-sample">
          {this.intervalId != 0 ? <ReactGrid
            cellMatrixProps={{ columns: this.state.columns, rows: this.state.rows }}
            cellTemplates={{ 'styleInside': new StyleCellTemplate }}
            license={'non-commercial'}
          /> : 'Loading...'}
        </ReactGridContainer>
      </>
    )
  }
}

