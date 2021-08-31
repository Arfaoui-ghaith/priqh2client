import React from 'react'
import FeatherIcon from 'feather-icons-react'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, InputGroup,FormControl, Col, Row} from 'react-bootstrap';

export default function Critere({title,critere,id}){

	const [show, setShow] = React.useState(false);
	const [critereEdit, setCritereEdit] = React.useState();

	const update = async() => {
		let data;
		if(title === "Nombre de quartiers"){ data = { nbr_quartier: critereEdit } }
		if(title === "Nombre de logements"){ data = { nombre_logements_totale: critereEdit } }
		if(title === "Nombre d'habitant"){ data = { nombre_habitants_totale: critereEdit } }
		if(title === "Surface totale (hectares)"){ data = { surface_totale: critereEdit } }
		if(title === "Surface urbanisée totale (hectares)"){ data = { surface_urbanisee_totale: critereEdit } }

		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/criteres/${id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data
			});

			console.log(res,data);

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace("/Critéres d'éligibilité");

		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

    return (
		<>
        <div className="col-12 col-md-6 col-lg-3">
			<ToastContainer />
            <div className="card-body">
				<div className="row">
					<div className="col mt-0">
						<h5 className="card-title">{title}</h5>
					</div>
													
					<div className="col-auto">
						<div className="avatar">
							<span style={{"cursor": "pointer"}} className="avatar-title" onClick={() => setShow(true)}>
								<div className="avatar-title rounded-circle bg-primary-light">
									<FeatherIcon icon="edit" />
								</div>
							</span>                           
						</div>
					</div>

				</div>
				<h1 className="mt-1 mb-3">{critere}</h1>
				
			</div>
		</div>
		<Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modifier le critére {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
		  	<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text style={{backgroundColor: "#e9ecef", borderColor: "#ced4da"}}>minimum</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl id="inlineFormInputGroupUsername"  defaultValue={critere} onChange={ (e) => setCritereEdit(e.target.value * 1) }/>
      		</InputGroup>
		  </Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { update() }}>
            Save
          </Button>
          </Modal.Footer>
        </Modal>
		</>					
    )
}