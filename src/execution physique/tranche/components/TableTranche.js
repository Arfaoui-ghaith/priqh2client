import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.css';
import FeatherIcon from 'feather-icons-react';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap'
import Progress from './Progress'

const TableTranche = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const [projet, setProjet] = React.useState({});
  

  const fetchProjets = async () => {

        let projets = [];
        for(const projet of props.projets){
            
          let nomProjet = '';
          for(const q of projet.quartiers){
            nomProjet = nomProjet + q.nom_fr + ' - '
          }  
          projets.push({
              code: projet.code,
              nom: nomProjet.slice(0,nomProjet.length - 4),
              qd: <Progress  infra={projet.infrastructures.filter((infra)=> infra.type === "drainage des eaux pluviales")[0]} />,
              qv: <Progress  infra={projet.infrastructures.filter((infra)=> infra.type === "voirie")[0]} />,
              qep: <Progress  infra={projet.infrastructures.filter((infra)=> infra.type === "eau potable")[0]} />,
              npl: <Progress  infra={projet.infrastructures.filter((infra)=> infra.type === "eclairage public")[0]} />,
              qa: <Progress  infra={projet.infrastructures.filter((infra)=> infra.type === "assainissement")[0]} />,
              action : <span></span>,
          });
        
        }

        setDatatable({
          columns: [
            {
              label: 'Code',
              field: 'code',
              width: 400,
            },
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
              label: 'quantite voirie',
              field: 'qv',
            },
            {
              label: 'quantite eau potable',
              field: 'qep',
            },
            {
              label: 'Nombre de poteaux lumineux',
              field: 'npl',
            },
            {
              label: 'quantite assainissement',
              field: 'qa',
            },
            {
              label: 'Projet',
              field: 'action',
            }
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
  