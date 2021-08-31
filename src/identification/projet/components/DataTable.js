import * as React from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Sort, DetailRow, Toolbar, PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { employeeData, hierarchyOrderdata, customerData } from './data';
import { SampleBase } from './simple-base';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { removeClass, addClass } from '@syncfusion/ej2-base';

export class DataTable extends SampleBase {
    constructor() {
        super(...arguments);
      
        this.childGrid = {
            dataSource: hierarchyOrderdata,
            queryString: 'EmployeeID',
            allowPaging: true,
            pageSettings: { pageSize: 6, pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
        };

        this.month = ((new Date()).getMonth().toString()) + '/';
        this.date = ((new Date()).getDate().toString()) + '/';
        this.year = ((new Date()).getFullYear().toString());
        this.toolbarOptions = ['ExcelExport', 'PdfExport', 'Search'];
    }

    toolbarClick(args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.gridInstance.pdfExport(this.getPdfExportProperties());
                break;
            case 'Excel Export':
                this.gridInstance.excelExport(this.getExcelExportProperties());
                break;
            default: console.log("error :)");
        }
    }

    getExcelExportProperties() {
        return {
            header: {
                headerRows: 7,
                rows: [
                    {
                        index: 1,
                        cells: [
                            /* tslint:disable-next-line:max-line-length */
                            { index: 1, colSpan: 5, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
                        ]
                    },
                    {
                        index: 3,
                        cells: [
                            { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                            { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                            { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
                        ]
                    },
                    {
                        index: 4,
                        cells: [
                            { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
                            { index: 4, value: 2034 },
                            { index: 5, value: (this.month + this.date + this.year).toString(), width: 150 }
                        ]
                    },
                    {
                        index: 5,
                        cells: [
                            { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                            { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
                            { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
                        ]
                    },
                    {
                        index: 6,
                        cells: [
                            { index: 4, value: 564 },
                            { index: 5, value: 'Net 30 days', width: 150 }
                        ]
                    }
                ]
            },
            footer: {
                footerRows: 5,
                rows: [
                    /* tslint:disable-next-line:max-line-length */
                    { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
                    { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
                ]
            },
            fileName: "exceldocument.xlsx"
        };
    }

    getPdfExportProperties = () => {
        return {
            header: {
                fromTop: 0,
                height: 120,
                contents: [
                    {
                        type: 'Text',
                        value: 'INVOICE',
                        position: { x: 280, y: 0 },
                        style: { textBrushColor: '#C25050', fontSize: 25 },
                    },
                    {
                        type: 'Text',
                        value: 'INVOICE NUMBER',
                        position: { x: 500, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Date',
                        position: { x: 600, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    }, {
                        type: 'Text',
                        value: '223344',
                        position: { x: 500, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: (this.month + this.date + this.year).toString(),
                        position: { x: 600, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'CUSTOMER ID',
                        position: { x: 500, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'TERMS',
                        position: { x: 600, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    }, {
                        type: 'Text',
                        value: '223',
                        position: { x: 500, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Net 30 days',
                        position: { x: 600, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Adventure Traders',
                        position: { x: 20, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 20 }
                    },
                    {
                        type: 'Text',
                        value: '2501 Aerial Center Parkway',
                        position: { x: 20, y: 65 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                    {
                        type: 'Text',
                        value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                        position: { x: 20, y: 80 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 250, y: 20 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'Text',
                        value: '! Visit Again !',
                        position: { x: 300, y: 45 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    }
                ]
            },
            fileName: "projets.pdf"
        };
    }

    click(e) {
        let element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.grid.hierarchyPrintMode = this.grid.childGrid.hierarchyPrintMode = element.innerHTML;
    }
    render() {

        this.props.setLoading(false);
        return (
        <div className='control-pane'>
        <div className='control-section'>
        <GridComponent id="Grid" dataSource={employeeData} childGrid={this.childGrid} ref={grid => this.gridInstance = grid} toolbar={this.toolbarOptions} allowExcelExport={true} allowPdfExport={true} toolbarClick={this.toolbarClick.bind(this)} allowPaging={true} pageSettings={{ pageCount: 2, pageSize: 10 }}>
              <ColumnsDirective>
                  <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right'/>
                  <ColumnDirective field='FirstName' headerText='Name' width='125'/>
                  <ColumnDirective field='Title' headerText='Title' width='180'/>
                  <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format='yMd' textAlign='Right'/>
                  <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='Right'/>
              </ColumnsDirective>
              <Inject services={[DetailRow, Toolbar, ExcelExport, PdfExport, Sort]}/>
          </GridComponent>
        </div>
      </div>);
    }
}

export default DataTable;