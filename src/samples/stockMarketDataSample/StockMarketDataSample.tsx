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

const Background = styled.div`
background-color: red;
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
      { type: 'header', data: 'High 20h' }
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
        { type: 'number', data: item.high_24h }
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




  returnRandomWith = (numberOfRows: number) => {
    return Math.floor(Math.random() * numberOfRows + 1);
  }

  currentRandomValue = (dataState: RowProps[], numberOfRows: number): number => {

    const row: RowProps | undefined = dataState.find((row: RowProps, idx: number) => {
      return idx === numberOfRows
    })

    if (!row) return 0;
    const min = row.cells[3].data;
    const max = row.cells[4].data;
    const randomValue = (Math.random() * (+max - +min) + +min);
    return randomValue
  }


  finndCheangeRow = (dataState: RowProps[], dataApi: RowProps[]): RowProps[] => {
    if (!dataState) return []
    const changedRows: RowProps[] = dataState.filter((data: RowProps, idx: number) => {
      return idx != 0 && data.cells[2].data !== dataApi[idx].cells[2].data
    });
    return changedRows
  }


  renderValue = async () => {
    const dataApi: RowProps[] = await api();
    const dataState: RowProps[] = [...this.state.rows]


    const changedIdx = this.returnRandomWith(5)
    const randomvalue = this.currentRandomValue(dataState, changedIdx)

    dataApi[changedIdx].cells[2].data = randomvalue

    // console.log(randomvalue) //zmieniona wartosc


    // if (this.finndCheangeRow(dataState, dataApi) !== null) {
    //   console.log('nadeszla zmiana')
    //   dataApi[changedIdx].cells[2].props.className = 'stockMarketBaseStyle greenyellow'
    //   // }
    // }
    //potrzeba wczesniejszej wartosci

    const cheangeRows = this.finndCheangeRow(dataState, dataApi)

    // console.log(cheangeRows.map(item => item.cells[2].data))


    // cheangeRows.map((item, idx) => {
    //   if (item.cells[2].data <= randomvalue) {
    //     dataApi[changedIdx].cells[2].props.className = 'stockMarketBaseStyle greenyellow'
    //   }
    //   if (item.cells[2].data >= randomvalue) {
    //     dataApi[changedIdx].cells[2].props.className = 'stockMarketBaseStyle red'
    //   }
    // }
    // )

    // dataApi[changedIdx].cells[2].props.className = 'stockMarketBaseStyle greenyellow'

    dataState.forEach((data, ids) => {
      dataApi.forEach((api, idt) => {
        if (dataState.length > 0 && api.cells[2].data !== data.cells[2].data && ids == idt) {
          if (randomvalue >= data.cells[2].data) {
            api.cells[2].props.className = 'stockMarketBaseStyle greenyellow'
          }
          if (randomvalue <= data.cells[2].data) {
            api.cells[2].props.className = 'stockMarketBaseStyle red'
          }
        }
      })
    })
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
    console.log('end')
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

