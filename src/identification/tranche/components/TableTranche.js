import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.css';
import FeatherIcon from 'feather-icons-react';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap'



const TableTranche = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const [projet, setProjet] = React.useState({});
  const [show, setShow] = React.useState(false);
  

  const fetchProjets = async () => {

        let projets = [];
        for(const projet of props.projets){
            
          let nomProjet = '';
          for(const q of projet.quartiers){
            nomProjet = nomProjet + q.nom_fr + ' - '
          }
          projets.push({
              nom: nomProjet.slice(0,nomProjet.length - 3),
              quartier:
              <ul className="ml-n4" key={projet.id} style={{"listStyleType":"none"}}>
                {
                  projet.quartiers.map((quartier, index) => (
                    <div key={index}><p> {quartier.nom_fr} </p>{projet.quartiers.length - 1 > index ? <hr/> : ''}</div>
                  ))
                }
              </ul>,
              Nombre: projet.nbr_quartiers,
              Surfaces: projet.surface_totale,
              Surface: projet.surface_urbanisee_totale,
              logement: projet.nombre_logements_totale,
              habitant: projet.nombre_habitants_totale,
              qd: projet.infrastructures.filter((infra)=> infra.type === "drainage des eaux pluviales")[0].quantite,
              cd: projet.infrastructures.filter((infra)=> infra.type === "drainage des eaux pluviales")[0].cout,
              qv: projet.infrastructures.filter((infra)=> infra.type === "voirie")[0].quantite,
              cv: projet.infrastructures.filter((infra)=> infra.type === "voirie")[0].cout,
              qep: projet.infrastructures.filter((infra)=> infra.type === "eau potable")[0].quantite,
              cep: projet.infrastructures.filter((infra)=> infra.type === "eau potable")[0].cout,
              npl: projet.infrastructures.filter((infra)=> infra.type === "eclairage public")[0].quantite,
              cpl: projet.infrastructures.filter((infra)=> infra.type === "eclairage public")[0].cout,
              qa: projet.infrastructures.filter((infra)=> infra.type === "assainissement")[0].quantite,
              ca: projet.infrastructures.filter((infra)=> infra.type === "assainissement")[0].cout,
              be: projet.bureau_etude,
              ce: projet.cout_etude,
              action : <span onClick={() => { setProjet(projet); setShow(true); }}><FeatherIcon icon="tool" /></span>,
          });
        
        }

        setDatatable({
          columns: [
            {
              label: 'Nom',
              field: 'nom',
              width: 200,
            },
            {
              label: 'quantite drainage',
              field: 'qd',
            },
            {
              label: 'coût drainage',
              field: 'cd',
            },
            {
              label: 'quantite voirie',
              field: 'qv',
            },
            {
              label: 'coût voirie',
              field: 'cv',
            },
            {
              label: 'quantite eau potable',
              field: 'qep',
            },
            {
              label: 'coût eau potable',
              field: 'cep',
            },
            {
              label: 'Nombre de poteaux lumineux',
              field: 'npl',
            },
            {
              label: 'coût éclairage public',
              field: 'cpl',
            },
            {
              label: 'quantite assainissement',
              field: 'qa',
            },
            {
              label: 'coût assainissement',
              field: 'ca',
            },
            {
              label: 'bureau d\'étude',
              field: 'be',
            },
            {
              label: 'coût d\'étude',
              field: 'ce',
            },
      
           
          ],
          rows: projets,
        });

        setLoading(false);
  }


  
  React.useEffect(() => {
    fetchProjets();
  },[]);
 
    return (
      <div className="p-3">
        {
            loading ?
            <div className="d-flex justify-content-center">
            <Col md="auto" >
            <Spinner
							as="span"
							animation="border"
							size="lg"
              variant="primary"
							role="status"
							aria-hidden="true"
						/> </Col></div>: 
            <MDBDataTableV5
            ref={ref}
            style={{"marginLeft":"1%"}}
            responsive
            hover
            entriesOptions={[5, 20, 25]}
            striped
            pagesAmount={5}
            data={datatable}
            paging
            searchBottom
            barReverse />
        }

      
      </div>
    )
});

export default TableTranche;
  