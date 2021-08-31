import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.css';
import FeatherIcon from 'feather-icons-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStoreDispatch } from '../../../context/store';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const TableAvenant = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();
  const [decompteEdit, setDecompte] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchDecomptes = async () => {
  
    try {
			const url ='http://priqh2server.herokuapp.com/api/v1/decomptes/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

		if (res.status === 200) {
		console.log(res.data.decomptes);

        let decomptes = [];
        for(const decompte of res.data.decomptes){
            decomptes.push({
                projet: decompte.memoire.projet.code,
                prestataire: decompte.prestataire.abreviation,
                montant: decompte.montant,
                date: new Date(decompte.date_paiement).toLocaleDateString(),
                modifier :  <span onClick={() => dispatch({ type:'decompteEdit', payload: decompte })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
                supprimer : <span onClick={() => { setDecompte(decompte); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
            });
        }

        setDatatable({
          columns: [
            {
              label: 'Projet',
              field: 'projet',
            },
            {
              label: 'Prestataire',
              field: 'prestataire',
            },
            {
              label: 'Montant',
              field: 'montant',
            },
            {
              label: 'Date Paiement',
              field: 'date',
            },
            {
                label: 'Modifier',
                field: 'modifier',
                sort : 'disabled',
            },
            {
                label: 'Supprimer',
                field: 'supprimer',
                sort : 'disabled',
            },
          ],
          rows: decomptes,
        });

      }
      setLoading(false);

			} catch (err) {
				console.log(err);
			}
  }

  React.useEffect(() => {
    fetchDecomptes();
  },[]);

  const data = {
    columns: [
      {
        label: 'Projet',
        field: 'projet',
      },
      {
        label: 'Actions',
        field: 'action',
      },
      {
        label: 'Justification',
        field: 'justification',
      },
    ],
    rows: [
        {
        projet: 'ARI_RAOU_RAO',
        action: 'la quantité de voirie a changer de 150 a 80',
        justification: ''
        }
    ]
  }
    return (
      <>
      <ToastContainer />
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
            data={data}
            paging
            searchBottom
            barReverse />
        }
        </div>
        
      </>
    )
});

export default TableAvenant;