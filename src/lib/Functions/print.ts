import { GridContext } from "../Common/GridContext";

export function print(gridContext: GridContext, title: string) {
    // let printIframe = document.createElement('iframe');
    // const printTable = generatePrintTable(gridContext);
    // document.body.appendChild(printIframe);
    // if (printIframe.contentWindow && printIframe.contentDocument) {
    //     printIframe.contentWindow.document.open();
    //     printIframe.contentWindow.document.write(printTable);
    //     printIframe.contentDocument.title = title;
    //     printIframe.contentWindow.onafterprint = () => {
    //         printIframe.contentWindow && printIframe.contentWindow.document.close();
    //         document.body.removeChild(printIframe);
    //     };
    //     printIframe.style.display = 'none';
    //     printIframe.contentWindow.print();
    // }
};

function generatePrintTable(gridContext: GridContext) {
    // const cellMatrix = gridContext.cellMatrix;
    // const borderStyle = '1px solid';
    // const table = document.createElement('table');
    // table.style.border = borderStyle;
    // table.style.borderCollapse = 'collapse';
    // cells.forEach((row, rIdx) => {
    //     if (rIdx < cells.length - 1) {
    //         let td = table.insertRow();
    //         td.style.height = cellMatrix.rows[rIdx].height.toString();
    //         row.forEach((col, cIdx) => {
    //             if (cIdx < row.length - 1) {
    //                 let cell = td.insertCell();
    //                 cell.style.wordBreak = 'break-all';
    //                 cell.style.border = borderStyle;
    //                 cell.textContent = col.cellData.text;
    //                 cell.style.background = '#eee';
    //                 cell.width = cellMatrix.cols[cIdx].width.toString();
    //             }
    //         });
    //     }
    // });
    //return table.outerHTML;
}