import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.css';
import FeatherIcon from 'feather-icons-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { gql, useSubscription } from '@apollo/client'

const TRACES = gql`
subscription traces {
	traces{
    	utilisateur{nom, prenom, cin}, action, createdAt
  	}
}`

const TraceTable = React.forwardRef((props, ref) => {

    const [datatable, setDatatable] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [tracesINFO, setTraces] = React.useState([]);


    const { data: traces, error: messageError } = useSubscription(
		TRACES
	)


    React.useEffect(() => {
        if(traces){
            let tracesData = [];
        for(const trace of traces.traces){
            tracesData.push({
                cin: trace.utilisateur.cin,
                nom: trace.utilisateur.nom,
                prenom: trace.utilisateur.prenom,
                action: trace.action,
                date: new Date(trace.createdAt).toLocaleString()
            });
        }
    
        setDatatable({
          columns: [
            {
              label: 'Cin',
              field: 'cin',
            },
            {
              label: 'Nom',
              field: 'nom',
            },
            {
              label: 'Prenom',
              field: 'prenom',
            },
            {
              label: 'Action',
              field: 'action',
            },
            {
              label: 'Date',
              field: 'date',
              sort: 'desc'
            },
          ],
          rows: tracesData,
        });
        }
    },[traces]);

  const fetchTraces = async () => {
    try {
		const url ='http://priqh2server.herokuapp.com/api/v1/traces/';
		const res = await axios({
			headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			method: 'get',
			url,
		});

        let tracesData = [];
        for(const trace of res.data.traces){
            tracesData.push({
                cin: trace.utilisateur ? trace.utilisateur.cin : null,
                nom: trace.utilisateur ? trace.utilisateur.nom : null,
                prenom: trace.utilisateur ? trace.utilisateur.prenom : null,
                action: trace.action,
                date: new Date(trace.createdAt).toLocaleString()
            });
        }
    
        setDatatable({
          columns: [
            {
              label: 'Cin',
              field: 'cin',
            },
            {
              label: 'Nom',
              field: 'nom',
            },
            {
              label: 'Prenom',
              field: 'prenom',
            },
            {
              label: 'Action',
              field: 'action',
            },
            {
              label: 'Date',
              field: 'date',
              sort: 'desc'
            },
          ],
          rows: tracesData,
        });
    
        setLoading(false);

		} catch (err) {
			console.log(err);
		}
  }

  React.useEffect(() => {
    fetchTraces();
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
            order={['date', 'desc' ]}
            barReverse />
        }
        </div>
      
      </>
    )
});

export default TraceTable;