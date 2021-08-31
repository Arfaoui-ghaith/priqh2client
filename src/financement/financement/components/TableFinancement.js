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


const TableFinancement = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const dispatch = useStoreDispatch();
  const [financementEdit, setFinancementEdit] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchFinancements = async () => {
  
    try {
		const url =`http://priqh2server.herokuapp.com/api/v1/memoires/${props.id}`;
		const res = await axios({
			headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			method: 'get',
			url,
		});

		if (res.status === 200) {
		console.log(res.data.memoire);

        let financements = [];
       
        for(const f of res.data.memoire){
        financements.push({
            bailleur: f.nom,
            previsionnel: f.financements.filter((f) => f.type === 'prévisionnel')[0].montant,
            deblocage: f.financements.filter((f) => f.type === 'deblocage')[0].montant,
            reliquat: f.financements.filter((f) => f.type === 'reliquat')[0].montant,
            modifier :  <span onClick={() => dispatch({ type:'financementEdit', payload: f.financements })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
        });
        }
        setDatatable({
          columns: [
            {
              label: 'Bailleur de fonds',
              field: 'bailleur',
            },
            {
              label: 'Prévisionnel',
              field: 'previsionnel',
            },
            {
              label: 'Deblocage',
              field: 'deblocage',
            },
            {
              label: 'Reliquat',
              field: 'reliquat',
            },
            {
                label: 'Modifier',
                field: 'modifier',
                sort : 'disabled',
            },
          ],
          rows: financements,
        });

      }
      setLoading(false);

	} catch (err) {
		console.log(err);
	}
  }

  React.useEffect(() => {
    fetchFinancements();
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
        
      </>
    )
});

export default TableFinancement;