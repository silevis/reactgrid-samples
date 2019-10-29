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
  const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  const myJsonData = await data.json();
  const newRows: RowProps[] = [{
    id: 'header',
    reorderable: false,
    height: 30,
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
      height: 30,
      cells: [
        { type: 'text', data: item.name },
        { type: 'text', data: item.symbol },
        { type: 'number', data: item.current_price },
        { type: 'number', data: item.low_24h },
        { type: 'number', data: item.high_24h },
        { type: 'styleInside', data: item.high_24h }
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
      , 500);
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  render() {

    const findRow = async () => {
      const newRows: RowProps[] = await api();


      // return console.log(newRows)
    }

    { findRow() }

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

