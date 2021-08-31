import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { Map as MapContainer  , Marker, Popup, TileLayer, Polygon, FeatureGroup, LayersControl, ZoomControl} from "react-leaflet2";
import * as turf from '@turf/turf'
import { EditControl } from "react-leaflet-draw19"
import axios from 'axios'

const {BaseLayer} = LayersControl;

export default function MapFormAdd() {
    const animatedComponents = makeAnimated();
    
    const [show, setShow] = React.useState(false);
    const [commune, setCommune] = React.useState(null);
    const [nom_fr, setNomFr] = React.useState("");
    const [nom_ar, setNomAr] = React.useState("");
    const [gouvernorats, setGouvernorats] = React.useState([]);
    const [gouvernorat, setGouvernorat] = React.useState(null);
    const [communes, setCommunes] = React.useState([]);

    const handlesChangeCommune = (e) => {
		setCommune(e.value);
	}

    const handlesChangeGouvernorat = (e) => {
        console.log(e);
        let communes_options = [];
		for(const commune of e.value.communes){
			let obj = { value: commune, label: commune.nom_fr+" - "+ commune.nom_ar }
			communes_options.push(obj);
		}
        setCommunes(communes_options);
        setGouvernorat(e.value);
        console.log(communes_options, gouvernorat);
    }
    

    const [mapLayers, setMapLayers] = React.useState([]);


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

    const addQuartier = async () => {
        console.log(mapLayers);
		 try {
			const url =`http://priqh2server.herokuapp.com/api/v1/quartiers/`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data:{ quartiers: mapLayers }
			});

			if (res.status === 201) {
				console.log(res.data);
                window.location.replace('/Quartiers');
			}

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchGouvernorats()
    },[]);

    const _onCreate = (e) => {
        console.log(e);
    
        const { layerType, layer } = e;

        if (layerType === "polygon") {
          const { _leaflet_id } = layer;

          mapLayers.push({ id: _leaflet_id, commune_id: commune.id, commune_code: commune.code, quartier: {nom_fr: "", nom_ar: "", surface: turf.area(layer.toGeoJSON())}, center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
        }

        setShow(true);
        console.log(mapLayers);
    };
    
    const _onEdited = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1,{ id: layer._leaflet_id, commune_id: commune.id, quartier: {nom_fr: mapLayers[i].quartier.nom, nom_ar: mapLayers[i].quartier.nom_ar}, center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
            }
        }
    }

        console.log(mapLayers);
    };
    
    const _onDeleted = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
    console.log(Object.values(_layers));
        
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1);
            }
        }
    }
        console.log("delete",mapLayers);
    };

    return (
        <React.Fragment>
        <Container>
                { commune ?
                    <Card>
                        <Card.Body>
                            <MapContainer  center={[34.886917, 9.537499]} zoom={7} zoomControl={false}>
                            <LayersControl position="bottomright">
                            <BaseLayer checked name="osm">
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </BaseLayer>
                            <BaseLayer name="satellite">
                                <TileLayer
                                attribution='&copy; <a href="server.arcgisonline.com">arcgisonline Maps</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                />
                            </BaseLayer>
                            </LayersControl>
                            <ZoomControl position="bottomleft" zoomInText="+" zoomOutText="-" />
                            
                            
                            <FeatureGroup>
                                <EditControl
                                position='topright'
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                click={(e) => console.log(e)}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polyline: false
                                }}
                                />
                                
                            </FeatureGroup>
                                
                            </MapContainer >
                        </Card.Body>
                    </Card> : ""
                }
                    <Card>
                        <Card.Header>
                        <Select className="py-2"
                            placeholder="Select Gouvernorat ..."
							closeMenuOnSelect={false}
							components={animatedComponents}
							options={gouvernorats}
                            onChange={handlesChangeGouvernorat}
                            defaultValue={gouvernorats[0]}
						/>	
                        { gouvernorat ?
                        <Select className="py-2"
                            placeholder="Select Commune ..."
							closeMenuOnSelect={false}
							components={animatedComponents}
							options={communes}
                            
                            onChange={handlesChangeCommune}
						/> : ''}
                        </Card.Header>
                        <Card.Body>	  
                            
                            <Button variant="primary" onClick={addQuartier}>
                                Enregistrer
                            </Button>
                            
                        </Card.Body>
                    </Card>

        </Container>

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header >
            <Modal.Title>Nom quartier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row mb-3">
                <label className="col-form-label col-sm-3 text-sm-left">nom en francais</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e) => setNomFr(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <label className="col-form-label col-sm-3 text-sm-left">nom en arabe</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e) => setNomAr(e.target.value)} />
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
           
            <Button variant="primary" onClick={() => { mapLayers[mapLayers.length - 1].quartier.nom_fr = nom_fr; mapLayers[mapLayers.length - 1].quartier.nom_ar = nom_ar; setNomFr(""); setNomAr(""); setShow(false); }}>
                Enregistrer
            </Button>
            <Button variant="danger" onClick={() => setShow(false)}>
                Fermer
            </Button> 
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}
