import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { MapContainer , TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw"
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MapFormAdd({ quartier }) {

    console.log(quartier);
    const [quartierEdit, setQuartier] = React.useState({});

    const editQuartier = async () => {
        console.log({ quartier: quartierEdit })
		 try {
			const url =`http://priqh2server.herokuapp.com/api/v1/quartiers/${quartier.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data:{ quartier: quartierEdit }
			});

            toast.success('Success', {
                position: 'top-right',
                autoClose: 5000,
                draggable: false
              });
			
				console.log(res.data);
                window.location.replace('/Quartiers');
			

			} catch (err) {
				console.log(err);
                toast.error(err.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    draggable: true
                  });
			}
	}

    return (
        <React.Fragment>
        <Container>
        <ToastContainer />
                
                    <Card>
                        <Card.Header>
                        <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-left">Nom en francais</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" placeholder="Nom en francais" defaultValue={quartier.nom_fr}
                                onChange={(e) => setQuartier({...quartierEdit, nom_fr: e.target.value})}/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-left">Nom en arabe</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" placeholder="Nom en arabe" defaultValue={quartier.nom_ar}
                                onChange={(e) => setQuartier({...quartierEdit, nom_ar: e.target.value})}/>
                            </div>
                        </div>

                        
                        <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-left">Surface (Hectar)</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" placeholder="Surface Totale (Hectar)" defaultValue={quartier.surface}
                                onChange={(e) => setQuartier({...quartierEdit, surface: e.target.value * 1})}/>
                            </div>
                        </div>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="primary" onClick={editQuartier}>
                                Enregistrer
                            </Button> 
                        </Card.Body>
                    </Card>

        </Container>

        </React.Fragment>
    )
}
