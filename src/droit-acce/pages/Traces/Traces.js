import React from 'react'
import '../../../css_folder/style.css'
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { Table } from 'react-bootstrap';
import { gql, useSubscription } from '@apollo/client'
import TraceTable from './components/TraceTable';

const TRACES = gql`
subscription traces {
	traces{
    	utilisateur{nom, prenom, cin}, action, createdAt
  	}
}`
export default function Traces() {
    
    const [tracesINFO, setTraces] = React.useState([]);

	React.useEffect(() => {
		fetchTraces();
	},[]);

    const { data: traces, error: messageError } = useSubscription(
		TRACES
	)

    React.useEffect(() => {
        if(traces){
            setTraces(traces.traces);
        }
    },[traces]);

	const fetchTraces = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/traces/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			if (res.status === 200) {
				setTraces(res.data.traces);
			  	console.log(res);
			}

			} catch (err) {
				console.log(err);
			}
	}
    

    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Gestion des Traces</h1>
                </div>
            </div>

            <div className="row">
						<div className="col-12 col-xl-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Liste des Traces</h5>
								</div>
								<TraceTable />
							</div>
						</div>
            </div>
        </div>
    </main>
    )
}
