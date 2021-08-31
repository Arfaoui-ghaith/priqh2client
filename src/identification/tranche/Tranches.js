import React from 'react'
import { Accordion, Card} from 'react-bootstrap';
import Print from './components/PrintTranche';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import FormTranche from './components/FormTranche'
import { gql, useSubscription } from '@apollo/client'

const TRANCHES = gql`
subscription tranches {
  tranches {
    id
    numero
    projets{
      id
      code
      eligible
      nbr_quartiers
      surface_totale
      surface_urbanisee_totale
      nombre_logements_totale
      nombre_habitants_totale
      infrastructures{
        id
        code
        type
        quantite
        cout
      }
    }
  }
}`

export default function Tranches() {

    const [tranches,setTranches] = React.useState([]);

    const { data: tranchesInfo, error: messageError } = useSubscription(
		TRANCHES
	);

    console.log(tranchesInfo);
    
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

    React.useEffect(() => {
        if(tranchesInfo){
            setTranches(tranchesInfo.tranches);
        }
    },[tranchesInfo]);

    return (
        <main className="content">
        <div className="container-fluid p-0">
            <Row>
                <Col>
                    <h1 className="h3 mb-3">Gestion des tranches</h1>
                </Col>
                <Col>
                    <button className="btn btn-primary float-right" data-toggle="modal" data-target="#ajout" size="primary"><FeatherIcon icon="plus" /></button>
                </Col>
            </Row>
            
            <Accordion defaultActiveKey="0">
                { tranches.map((tranche,index) =>(
                <Card key={index}>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                <Row className="mt-2">
                    <Col>
                        Tranche {tranche.numero}
                    </Col>
                </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Print tranche={tranche}/>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                ))
                }
            </Accordion>
        </div>
                    <div className="modal fade" id="ajout" tabIndex="-1" role="dialog" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<div className="col-12 col-xl-12">
										<div className="card">
											<div className="modal-header">
												<h5 className="modal-title">Ajouter Tranche</h5>
												<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="card-body">
												<FormTranche />
											</div>
										</div>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
        </main>
    )
}
