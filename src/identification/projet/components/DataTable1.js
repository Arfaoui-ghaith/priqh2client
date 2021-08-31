import * as React from "react";
import { 
    GridComponent, 
    Grid, 
    Inject, 
    ColumnsDirective, 
    ColumnDirective, 
    Sort, 
    DetailRow, 
    Toolbar, 
    PdfExport, 
    ExcelExport,
    Edit,
    EditSettingsModel,
    ToolbarItems,
    Page } from '@syncfusion/ej2-react-grids';

import axios from 'axios';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';


export default function DataTable1(props) {

    const [projets, setProjets] = React.useState([]);
    const [infrastructures, setInfra] = React.useState([]);

    const fetchProjets = async () => {
        try {
            const url ='http://priqh2server.herokuapp.com/api/v1/projets/';
            const res = await axios({
                headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
                method: 'get',
                url,
            });
            
            let projets = [];
            let infras = [];
          
            for(const projet of res.data.projets){
              let nomProjet = '';
              for(const q of projet.quartiers){
                nomProjet = nomProjet + q.nom_fr + ', '
              }
              projets.push({
                  id: projet.id,
                  projet_id: projet.id,
                  code: projet.code,
                  nom: nomProjet.slice(0,nomProjet.length-2).trim(),
                  quartier:
                  <ul className="ml-n4" key={projet.id} style={{"listStyleType":"none"}}>
                    {
                      projet.quartiers.map((quartier, index) => (
                        <div key={index}><p> {quartier.nom_fr} </p>{projet.quartiers.length - 1 > index ? <hr/> : ''}</div>
                      ))
                    }
                  </ul>,
                  nbr_q: projet.nbr_quartiers,
                  surface_t: projet.surface_totale,
                  surface_u: projet.surface_urbanisee_totale,
                  logement: projet.nombre_logements_totale,
                  habitant: projet.nombre_habitants_totale,
                  infrastructures: projet.infrastructures,
                  be: projet.bureau_etude,
                  ce: projet.cout_etude,
              });
              infras.push(...projet.infrastructures);
            }
    
            setInfra(infras);
            setProjets(projets);
            console.log(projets,infras);
            props.setLoading(false);
    
        } catch (err) {
            console.log(err);
        }
      }

    const month = ((new Date()).getMonth().toString()) + '/';
    const date = ((new Date()).getDate().toString()) + '/';
    const year = ((new Date()).getFullYear().toString());
    const toolbarOptions = ['ExcelExport', 'PdfExport', 'Edit', 'Delete', 'Cancel', 'Update', 'Search'];

    const editOptions = { allowDeleting: true, allowEditing: true, mode: 'Normal', showDeleteConfirmDialog: true }
    let grid = Grid | null ;

    const getExcelExportProperties = () => {
        return {
            header: {
                headerRows: 7,
                rows: [
                    {
                        index: 1,
                        cells: [
                            /* tslint:disable-next-line:max-line-length */
                            { index: 1, colSpan: 5, value: 'PRIQH2', style: { fontColor: 'blue', fontSize: 25, hAlign: 'Center', bold: true } }
                        ]
                    },
                    {
                        index: 3,
                        cells: [
                            { index: 1, colSpan: 2, value: 'Liste des Projets', style: { fontColor: 'black', fontSize: 15, bold: true } },
                        ]
                    },
                    {
                        index: 4,
                        cells: [
                            { index: 5, value: (month + date + year).toString(), width: 150 }
                        ]
                    },

                ]
            },
            fileName: "projets.xlsx"
        };
    }

    const getPdfExportProperties = () => {
        return {
            header: {
                fromTop: 0,
                height: 120,
                contents: [
                    {
                        type: 'Text',
                        value: 'PRIQH2',
                        position: { x: 280, y: 0 },
                        style: { textBrushColor: '#4285f4', fontSize: 25 },
                    },
                    {
                        type: 'Text',
                        value: 'Date',
                        position: { x: 600, y: 30 },
                        style: { textBrushColor: '#4285f4', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: (month + date + year).toString(),
                        position: { x: 600, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Liste des Projets',
                        position: { x: 20, y: 30 },
                        style: { textBrushColor: '#4285f4', fontSize: 20 }
                    },
                ]
            },
           
            fileName: "projets.pdf"
        };
    }


    const toolbarClick = (args) => {
        if(grid){
            switch (args.item.text) {
                case 'PDF Export':
                    grid.pdfExport(getPdfExportProperties());
                    break;
                case 'Excel Export':
                    grid.excelExport(getExcelExportProperties());
                    break;
                default: console.log("error :)");
            }
        }
    }

    React.useEffect(() => {
        fetchProjets();
    },[]);

    function rowSelected(state){
        console.log(state);
    }

    const dataSourceChanged = (args) => {
        console.log("gdfgdfg");
        console.log(args);
    }

    const childGrid = {
        dataSource: infrastructures,
        queryString: 'projet_id',
        toolbar: ["Edit", "Update", "Cancel"], 
        editSettings: {
          allowEditing: true, 
        },
        dataSourceChanged: dataSourceChanged,
        columns: [
            { field: 'type', headerText: '', isPrimaryKey: true },
            { field: 'quantite', headerText: 'quantité' },
            { field: 'cout', headerText: 'coût' },
        ]
    };

    return (
    <>
        { !props.loading ?
            <div className='control-pane'>
            <div className='control-section'>
            <GridComponent 
            id="Grid" 
            dataSource={projets} 
            childGrid={childGrid} 
            ref={g => grid = g} 
            toolbar={toolbarOptions}
            allowExcelExport={true} 
            allowPdfExport={true} 
            toolbarClick={toolbarClick} 
            allowPaging={true}
            pageSettings={{ pageCount: 4, pageSize: 5 }}
            editSettings={editOptions}
            rowSelected={rowSelected}>
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' width='110' isPrimaryKey/>
                    <ColumnDirective field='code' headerText='Code' width='110' isPrimaryKey/>
                    <ColumnDirective field='nom' headerText='Zone Intervention' width='180' isPrimaryKey/>
                    <ColumnDirective field='surface_t' headerText='Surface Totale (hectar)' width='90' editType='numericedit' edit={{ params: { decimals: 2 } }} />
                    <ColumnDirective field='surface_u' headerText='Surface Urbanisée (hectar)' width='90' editType='numericedit'/>
                    <ColumnDirective field='logement' headerText='Logements Totale' width='90' editType='numericedit'/>
                    <ColumnDirective field='habitant' headerText='Habitants Totale' width='90' editType='numericedit'/>
                </ColumnsDirective>
                <Inject services={[DetailRow, Toolbar, Edit, ExcelExport, PdfExport, Sort, Page]}/>
            </GridComponent>
            </div>
        </div> : ''
        }
    </>
    );
    
}