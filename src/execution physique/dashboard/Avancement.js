import React from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import Index from './components/index';

export default function Avancements() {

    const [tranches,setTranches] = React.useState([]);

    const fetchTranches= async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/tranches/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

            console.log(res.data.tranches);
			setTranches(res.data.tranches);
			

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchTranches();
    },[])

    return (
        <main className="content">
        <div className="container-fluid p-0">
            <Row>
                <Col>
                    <h1 className="h3 mb-3">Suivi de l'avancement</h1>
                </Col>
            </Row>
            
            <Index />
           
        </div>
            
        </main>
    )
}
