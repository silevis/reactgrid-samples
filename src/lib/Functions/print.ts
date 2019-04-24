print = (title: string) => {
    let printIframe = document.createElement('iframe');
    const printTable = this.generatePrintTable();
    document.body.appendChild(printIframe);
    printIframe.contentWindow.document.open();
    printIframe.contentWindow.document.write(printTable);
    printIframe.contentDocument.title = title;
    printIframe.contentWindow.onafterprint = () => {
        printIframe.contentWindow.document.close();
        document.body.removeChild(printIframe);
    };
    printIframe.style.display = 'none';
    printIframe.contentWindow.print();
};

    private generatePrintTable() {
    let cells = this.props.cellMatrix.cells;
    let borderStyle = '1px solid';
    let table = document.createElement('table');
    table.style.border = borderStyle;
    table.style.borderCollapse = 'collapse';
    cells.forEach((row, rIdx) => {
        if (rIdx < cells.length - 1) {
            let td = table.insertRow();
            td.style.height = this.props.cellMatrix.rows[rIdx].height.toString();
            row.forEach((col, cIdx) => {
                if (cIdx < row.length - 1) {
                    let cell = td.insertCell();
                    cell.style.wordBreak = 'break-all';
                    cell.style.border = borderStyle;
                    cell.textContent = col.value;
                    if (col.type) {
                        cell.style.background = '#eee';
                    }
                    cell.width = this.props.cellMatrix.cols[cIdx].width.toString();
                }
            });
        }
    });
    return table.outerHTML;
}