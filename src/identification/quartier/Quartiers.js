import React from 'react'
import Map from './components/Map'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'

import FeatherIcon from 'feather-icons-react';
import MapFormAdd from './components/MapFormAdd'

import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { gql, useSubscription } from '@apollo/client'

const QUARTIERS = gql`
subscription quartiers {
  quartiers{
    id
    code
    nom_fr
    nom_ar
    center{lat lng}
    latlngs{lat lng}
    surface
  }
}`

const GOUVERNORATS = gql`
subscription gouvernorats {
    gouvernorats{
    id
    code
    nom_fr
    nom_ar
    communes{
      id
      code
      nom_fr
      nom_ar
      quartiers{
        id
        code
        nom_fr
        nom_ar
        center{lat lng}
        latlngs{lat lng}
        surface
      }
    }
  }
}`

export default function Quartiers() {
    const animatedComponents = makeAnimated();

    const [show, setShow] = React.useState(false);
    const [gouvernorat, setGouvernorat] = React.useState(false);
    const [commune, setCommune] = React.useState("");
    const [gouvernorats, setGouvernorats] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [quartiers, setQuartiers] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const { data: quartiersINFO, error: messageError } = useSubscription(
		QUARTIERS
	)

    const { data: gouvernoratsINFO, error: messageError1 } = useSubscription(
		GOUVERNORATS
	)

    console.log("gouvernoratsINFO",gouvernoratsINFO);

    const handlesChangeGouvernorat = (e) => {

        //document.getElementsByClassName('glass')[0].value = e.label
        console.log("fgdfgdfg",document.getElementsByClassName('geosearch leaflet-bar leaflet-control leaflet-control-geosearch leaflet-geosearch-button')[0].onclick = true);

        setLoading(true);
        console.log(e);
        let communes_options = [];
        let allQuartiers = [];
		for(const commune of e.value.communes){
			let obj = { value: commune, label: commune.nom_fr+" - "+ commune.nom_ar }
			communes_options.push(obj);
            allQuartiers.push(...commune.quartiers)
		}
        console.log(allQuartiers);
        setCommunes(communes_options);
        setGouvernorat(e.value);
        setQuartiers(allQuartiers);
        setLoading(false);
    }

    const handlesChangeCommune = (e) => {
        setLoading(true);
		setCommune(e.value);
        setQuartiers(e.value.quartiers);
        setLoading(false);
	}

    const fetchGouvernorats = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/gouvernorats/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log(res.data.gouvernorats);

			if (res.status === 200) {
				let gouvernorats_options = [];
				for(const gouvernorat of res.data.gouvernorats){
					let obj = { value: gouvernorat, label: gouvernorat.nom_fr+" - "+ gouvernorat.nom_ar }
					gouvernorats_options.push(obj);
				}
				setGouvernorats(gouvernorats_options);
			}

			} catch (err) {
				console.log(err);
			}
	}

    const fetchQuartiers = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/quartiers/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log("fetchQuartiers",res.data.quartiers);

		
			setQuartiers(res.data.quartiers);
		

            console.log(quartiers);

            setLoading(false);

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        if(quartiersINFO){
            console.log(quartiersINFO);
            setQuartiers(quartiersINFO.quartiers);
        }
        
    },[quartiersINFO]);

    React.useEffect(() => {
        if(gouvernoratsINFO){
            let gouvernorats_options = [];
			for(const gouvernorat of gouvernoratsINFO.gouvernorats){
				let obj = { value: gouvernorat, label: gouvernorat.nom_fr+" - "+ gouvernorat.nom_ar }
				gouvernorats_options.push(obj);
			}
			setGouvernorats(gouvernorats_options);
        }
    },[gouvernoratsINFO]);

    React.useEffect(() => {
        setProgress(20);
        fetchQuartiers();
        setProgress(50);
        fetchGouvernorats();
        setProgress(100);
        return () => setProgress(0);
    },[]);

    return (
        <main className="content">
            <LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Gestion des quartiers</h1>

            <div className="row">
                <div className="col-12 col-lg-12" >
                   
                    <Container>
                        <Row>
                           
                            <Col xs={12} md={9} >
                            <Card>
                                <Card.Body>
                                    <Map quartiers={quartiers} loading={loading} />
                                </Card.Body>
                            </Card>
                            </Col>

                            <Col xs={12} md={3}>
                            <Card>
                                <Card.Header>
                                    <Button variant="primary" size="primary" block onClick={() => setShow(true)}>
                                        <FeatherIcon icon="map" /><FeatherIcon icon="plus" />
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                
                                <div className="mb-3 row">
                                    
                                    <div className="col-sm-12">
                                        <div className="boxes" >
                                        <Select className="py-2"
                                            placeholder="Select Gouvernorat ..."
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={gouvernorats}
                                            onChange={handlesChangeGouvernorat}
                                            defaultValue={gouvernorats[0]}
                                        />							
                                        </div>
                                    </div>
                                </div>

                                { gouvernorat ?
                                <div className="mb-3 row">
                                    
                                    <div className="col-sm-12">
                                        <div className="boxes" >
                                        <Select className="py-2"
                                            placeholder="Select Commune ..."
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={communes}
                                            
                                            onChange={handlesChangeCommune}
                                        />					
                                        </div>
                                    </div>
                                </div> : ''
                                }

                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                   </Container>         
                </div> 
            </div>

            <div className="modal fade" id="ModalMod" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                        
                    <div className="modal-content">
                        <div className="modal-header">
                                
                            <div className="col-12 col-xl-12">
                                
							    <div className="card">
                                         
									<div className="modal-header">
													<h5 className="modal-title">Ajouter Quartier</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
									</div>
								    <div className="card-body">
									        
								    </div>
							    </div>
                           
						    </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        >
        <Modal.Header >
          <Modal.Title id="example-custom-modal-styling-title">
            Ajouter Quartier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
         <MapFormAdd />
        </Modal.Body>
      </Modal>

    </main>
    )
}
