import React from 'react';
import {ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Progress({ infra }) {

    const [show, setShow] = React.useState(false);
    const [quantite, setQuantite] = React.useState(0);

    const calculSum = (infra) => {
        let sum = 0;
        for(const p of infra.progres){
            sum += p.quantite;
        }
        return sum;
    }

    const addAvancement = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/avancements/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: { infrastructure_id: infra.id, quantite }
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Avancement');

		} catch (err) {
			toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                draggable: false
            });
            setShow(false);
		}
	}
    
  return (
<>

<span style={{ "cursor": "pointer" }} onClick={() => setShow(true)}>
<ToastContainer />
<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{`${calculSum(infra)}/${infra.quantite}`}</Tooltip>}>
<ProgressBar>
        <ProgressBar  animated variant="success" label={`${(Math.round(calculSum(infra)* 100) / infra.quantite).toFixed(2)}%`} now={(Math.round((calculSum(infra))* 100) / infra.quantite).toFixed(2)}/>
        <ProgressBar  animated variant="danger" label={`${(Math.round((infra.quantite - calculSum(infra))* 100) / infra.quantite).toFixed(2)}%`} now={(Math.round((infra.quantite - calculSum(infra))* 100) / infra.quantite).toFixed(2)} />
    </ProgressBar>
</OverlayTrigger>
</span>

<Modal show={show} onHide={() => setShow(false)}>
<Modal.Header>
<Modal.Title>Confirmation</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="row">
                  <label className="col-form-label col-sm-3 text-sm-left">la quantité realisé</label>
                  <div className="col-sm-6">
                      <input type="number" className="form-control" onChange={(e) => setQuantite(e.target.value)}/>
                  </div>
                  <div className="col-sm-3">
                        {`${calculSum(infra)}/${infra.quantite}`}
                  </div>
              </div>
</Modal.Body>
<Modal.Footer>
<Button variant="danger" onClick={() => setShow(false)}>
  Fermer
</Button>
<Button variant="primary" onClick={() => addAvancement()}>
  Ajouter
</Button>
</Modal.Footer>
</Modal>

</>
);
}
