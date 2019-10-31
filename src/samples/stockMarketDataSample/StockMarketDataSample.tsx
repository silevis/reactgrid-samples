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
        { type: 'number', data: item.current_price, props: { backgroundColor: 'none' } },
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
    newRows: []
  };

  intervalId?: number;

<<<<<<< HEAD
  componentDidMount() {
    const renderValue = async () => {
      const dataApi: RowProps[] = await api();
      const dataState: RowProps[] = [...this.state.rows]

      const changedIdx = Math.floor(Math.random() * 10 + 1);


      const returnRandom = () => {
        let randomValue = 0
        dataState.forEach((item, idx) => {
          if (idx == changedIdx) {
            const min = item.cells[3].data;
            const max = item.cells[4].data;
            randomValue = (Math.random() * (+max - +min) + +min);
            Number(randomValue).toFixed(8);
          }
        })
        return randomValue
=======
  private async findRow() {
    const newRows: RowProps[] = await api();
    const statRows: RowProps[] = [...this.state.rows]

    let callback = newRows.map((item: RowProps, idx) => {

      // console.log(item.cells[2].data)
      // console.log(statRows[idx])
      if (statRows.length > 0 && item.cells[2].data !== statRows[idx].cells[2].data) {

        // console.log('WESZLo')
        // console.log(item)
        // console.log('test', item.cells[2], statRows[idx].cells[2])
        return {
          id: item.id,
          reorderable: false,
          height: 25,
          cells: [...item.cells, (item.cells[2].type = "styleInside")]
        };

      }
      else {
        return {
          id: item.id,
          reorderable: false,
          height: 25,
          cells: [...item.cells]
        };
>>>>>>> bbdfe8fda78545fce591ab61cf17c0a5fcd2303b
      }

      dataState.forEach((data, ids) => {
        dataApi.forEach((api, idt) => {
          if (returnRandom() !== dataState[changedIdx].cells[2].data) {
            dataApi[changedIdx].cells[2].data = returnRandom()
          }
          if (dataState.length > 0 && api.cells[2].data !== data.cells[2].data && ids == idt) {

            api.cells[2].props.backgroundColor = 'red'
            // api.cells[2].type = 'styleInside'
          }

<<<<<<< HEAD

        })
      })
      this.setState({ rows: dataApi })
    }

    renderValue();
    this.intervalId = setInterval(
      () => { renderValue() }
      , 3000);
=======
  componentDidMount() {
    api().then(data => {
      this.setState({ rows: data });
      const renderInterval = () => {
        const state: any = { ...this.state };
        const changedIdx = Math.floor(Math.random() * 10);
        const randomValue = Math.random() * 10;

        if (randomValue.toString() !== state.rows[changedIdx].cells[2].data.toString()) {
          data[changedIdx].cells[2] = {
            ...data[changedIdx].cells[2],
            data: randomValue,
            type: "styleInside"
          }
        }
        this.setState({ rows: data })
      }

      this.intervalId = setInterval(() => renderInterval(), 1000);
    });
>>>>>>> bbdfe8fda78545fce591ab61cf17c0a5fcd2303b
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  // zapisuje dane, poprzednie przenosze do buuforra czyli tablicy, wyciagnac z aktulnej tablicy (state) liste wysztkich krypto walut ( (nazwa i id) jej nr w kolejnosci ), porownac obecny stan z poprzednim wyciagajac idetyfiaktory wierszy,
  // mamy liste wierszy ktora ulegay zmieninie, dla tych wierszy zminic typ komory na styleInside, 

  render() {
<<<<<<< HEAD
=======
    // { this.findRow() }
>>>>>>> bbdfe8fda78545fce591ab61cf17c0a5fcd2303b
    return (
      <>
        <ReactGridContainer className="resize-cell-sample">
          {this.intervalId != 0 ? <ReactGrid
            cellMatrixProps={{ columns: this.state.columns, rows: this.state.rows }}
            cellTemplates={{ 'styleInside': new StyleCellTemplate }}
            license={'non-commercial'}
          /> : 'Ładowanie...'}
        </ReactGridContainer>
      </>
    )
  }
}

