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
  //console.log('api');
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
        { type: 'number', data: item.current_price },
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
    rows: []
  };

  intervalId?: number;



  private async findRow() {
    console.log('findrow');
    const newRows: RowProps[] = await api();
    const statRows: RowProps[] = [...this.state.rows]




    let callback = newRows.map((item: RowProps, idx) => {

      if (statRows.length > 0 && item.cells[2].data !== statRows[idx].cells[2].data) {

        console.log(item.cells[2], statRows[idx].cells[2])
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
      }
    });
    // this.setState(
    //   {
    //     rows: callback
    //   })

  }


  componentDidMount() {
    const renderValue = async () => {
      const newRows: RowProps[] = await api();
      this.setState(
        {
          rows: newRows
        }
      )
    }
    renderValue();

    this.intervalId = setInterval(
      () => { renderValue() }
      , 1000);
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  // zapisuje dane, poprzednie przenosze do buuforra czyli tablicy, wyciagnac z aktulnej tablicy (state) liste wysztkich krypto walut ( (nazwa i id) jej nr w kolejnosci ), porownac obecny stan z poprzednim wyciagajac idetyfiaktory wierszy,
  // mamy liste wierszy ktora ulegay zmieninie, dla tych wierszy zminic typ komory na styleInside, 


  render() {
    { this.findRow() }
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

