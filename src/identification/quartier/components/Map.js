import React from "react";
import { MapContainer , Marker, Popup, TileLayer, Polygon, Tooltip, LayersControl, ZoomControl} from "react-leaflet3";
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import "./map.css";
import MapFormUpdate from './MapFormUpdate';
import { Spinner } from 'react-bootstrap'

import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./SearchControl";

const {BaseLayer} = LayersControl;

export default function Map({ quartiers, loading, setLoading }) {

  const prov = OpenStreetMapProvider();

  const [show, setShow] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [quartier, setQuartier] = React.useState({});
  
  const deleteQuartier = async (id) => {
    console.log(id);
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/quartiers/${id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

      console.log(res.data);

			if (res.status === 203) {
				window.location.replace('/Quartiers');
			}

			} catch (err) {
				console.log(err);
			}
	}

  const multiPolygon = (limites) => {
    let polys = [];
    for(const limite of limites){
      polys.push([limite.lat, limite.lng]);
    }

    return polys;
  }

  return (
    <Container>
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
				/> </Col></div> : 
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

        <SearchControl
          provider={prov}
          showMarker={false}
          showPopup={false}
          popupFormat={({ query='tunis', result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={true}
        />
    
        {
        quartiers.map((quartier, index) => (
              <Marker position={[quartier.center.lat,quartier.center.lng]} key={index}>
                <Popup>
                  Nom: {quartier.nom_fr} <br />
                  <Row className="justify-content-md-center">
                    <Col md="auto">
                    <Button variant="danger" onClick={() => { setQuartier(quartier); setShow(true)}}>
                        <FeatherIcon icon="trash" />
                    </Button>
                
                    <Button variant="success" onClick={() => { setQuartier(quartier); setShowEdit(true)}}>
                      <FeatherIcon icon="edit" />
                    </Button>
                    </Col>
                  </Row>
                </Popup>
              </Marker>
          ))
        }
      
      { 
      quartiers.map((quartier, index) => ( 
      <Polygon key={index} pathOptions={{ color: 'blue' }} positions={multiPolygon(quartier.latlngs)}>
        <Tooltip sticky>{quartier.nom_fr}</Tooltip>
      </Polygon> ))
      }
      
      </MapContainer>
      }
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want delete {quartier.nom_fr}!</Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { deleteQuartier(quartier.id) }}>
            Save Changes
          </Button>
          </Modal.Footer>
        </Modal>

        <Modal
        show={showEdit}
        size="lg"
        onHide={() => setShowEdit(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        >
        <Modal.Header >
          <Modal.Title id="example-custom-modal-styling-title">
            Modifier Quartier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
         <MapFormUpdate quartier={quartier}/>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
