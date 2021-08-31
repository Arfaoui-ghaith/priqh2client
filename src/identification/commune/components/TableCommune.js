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

const COMMUNES = gql`
subscription communes {
  communes {
    id
    nom_fr
    nom_ar
    code
    gouvernorat{id nom_fr nom_ar}
  }
}`

const TableCommune = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();
  const [commune, setCommune] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { data: communesINFO, error: messageError } = useSubscription(
		COMMUNES
	)

  const deleteCommune = async () => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/communes/${commune.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

			if (res.status === 203) {
				toast.success('Success', {
					position: 'top-right',
					autoClose: 5000,
					draggable: false
				});
				window.location.replace('/communes');
			}

			} catch (err) {
				toast.error(err.response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					draggable: true
				});
				setShow(false);
			}
	}

  const fetchCommunes = async () => {
  
    try {
			const url ='http://priqh2server.herokuapp.com/api/v1/communes/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			if (res.status === 200) {
				console.log(res.data.communes);

        let communes = [];
        for(const commune of res.data.communes){
          communes.push({
              code: commune.code,
              gouvernorat: commune.gouvernorat.nom_fr,
              nom_fr: commune.nom_fr,
              nom_ar: commune.nom_ar,
              modifier :<span onClick={() => dispatch({ type:'communeEdit', payload: commune })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
              supprimer : <span onClick={() => { setCommune(commune); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
          });
        }

        setDatatable({
          columns: [
            {
              label: 'Code',
              field: 'code',
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'code',
              },
            },
            {
              label: 'Gouvernorat',
              field: 'gouvernorat',
            },
            {
              label: 'Nom en francais',
              field: 'nom_fr',
            },
            {
              label: 'Nom en arabe',
              field: 'nom_ar',
            },
            {
                label: 'Modifier',
                field: 'modifier',
                sort : 'disabled',
                width: 100,
            },
            {
                label: 'Supprimer',
                field: 'supprimer',
                sort : 'disabled',
                width: 100,
            },
          ],
          rows: communes,
        });

      }
      setLoading(false);

			} catch (err) {
				console.log(err.response.data.message);
			}
  }

  React.useEffect(() => {
    if(communesINFO) {
      let communes = [];
        for(const commune of communesINFO.communes){
          communes.push({
              code: commune.code,
              gouvernorat: commune.gouvernorat.nom_fr,
              nom_fr: commune.nom_fr,
              nom_ar: commune.nom_ar,
              modifier :<span onClick={() => dispatch({ type:'communeEdit', payload: commune })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
              supprimer : <span onClick={() => { setCommune(commune); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
          });
        }

        setDatatable({
          columns: [
            {
              label: 'Code',
              field: 'code',
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'code',
              },
            },
            {
              label: 'Gouvernorat',
              field: 'gouvernorat',
            },
            {
              label: 'Nom en francais',
              field: 'nom_fr',
            },
            {
              label: 'Nom en arabe',
              field: 'nom_ar',
            },
            {
                label: 'Modifier',
                field: 'modifier',
                sort : 'disabled',
                width: 100,
            },
            {
                label: 'Supprimer',
                field: 'supprimer',
                sort : 'disabled',
                width: 100,
            },
          ],
          rows: communes,
        });
    }
  },[communesINFO]);

  React.useEffect(() => {
    fetchCommunes();
  },[]);


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
          <Modal.Body>Are you sure you want delete {commune.nom_fr}!</Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { deleteCommune() }}>
            Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
});

export default TableCommune;