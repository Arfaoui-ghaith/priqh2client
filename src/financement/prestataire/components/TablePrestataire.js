import React from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.css'
import FeatherIcon from 'feather-icons-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStoreDispatch } from '../../../context/store';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap'
import { gql, useSubscription } from '@apollo/client'

const PRESTATAIRES = gql`
subscription prestataires {
  prestataires{
    id
    nom
    abreviation
  }
}`

const TablePrestataire = React.forwardRef((props, ref) => {

  const { data: prestataires, error: messageError } = useSubscription(
		PRESTATAIRES
	)

  const [datatable, setDatatable] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();
  const [prestataire, setPrestataire] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const deletePrestataire = async () => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/prestataires/${prestataire.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
			window.location.replace('/prestataire');

		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
			setShow(false);
		}
	}

  const fetchPrestataires = async () => {
  
    try {
			const url ='http://priqh2server.herokuapp.com/api/v1/prestataires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

		if (res.status === 200) {
		console.log(res.data.prestataires);

        let prestataires = [];
        for(const prestataire of res.data.prestataires){
            prestataires.push({
                abreviation: prestataire.abreviation,
                nom: prestataire.nom,
                modifier :<span onClick={() => dispatch({ type:'prestataireEdit', payload: prestataire })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
                supprimer : <span onClick={() => { setPrestataire(prestataire); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
            });
        }

        setDatatable({
          columns: [
            {
              label: 'Nom',
              field: 'nom',
            },
            {
              label: 'Abreviation',
              field: 'abreviation',
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
          rows: prestataires,
        });

      }
      setLoading(false);

			} catch (err) {
				console.log(err.response.data.message);
			}
  }

  React.useEffect(() => {
    fetchPrestataires();
  },[]);

  React.useEffect(() => {
    if(prestataires){
      let prestatairesInfo = [];
      for(const prestataire of prestataires.prestataires){
        prestatairesInfo.push({
              abreviation: prestataire.abreviation,
              nom: prestataire.nom,
              modifier :<span onClick={() => dispatch({ type:'prestataireEdit', payload: prestataire })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
              supprimer : <span onClick={() => { setPrestataire(prestataire); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
          });
      }

      setDatatable({
        columns: [
          {
            label: 'Nom',
            field: 'nom',
          },
          {
            label: 'Abreviation',
            field: 'abreviation',
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
        rows: prestatairesInfo,
      });
    }
  },[prestataires]);

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
            data={datatable}
            paging
            searchBottom
            barReverse />
        }
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want delete {prestataire.nom}!</Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={() => { deletePrestataire() }}>
            Supprimer
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
});

export default TablePrestataire;