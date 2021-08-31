import React from 'react'
import FeatherIcon from 'feather-icons-react'
import 'react-dropdown/style.css';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Beilleur({name,img,id}) {

	const [selectedImg, setSelectedImg]=React.useState(`http://priqh2server.herokuapp.com/img/bailleurs/${img}`);
	const [nom, setNom] = React.useState(null);

	function handleChange(event) {
    	setSelectedImg( URL.createObjectURL(event.target.files[0]));
    }

	const updateBailleur = async() => {

        const form = new FormData();

        if( nom ) form.append('nom', nom);
        if( document.getElementById('image').files[0] !== undefined ) form.append('image', document.getElementById('image').files[0]);

        try{
            const url = `http://priqh2server.herokuapp.com/api/v1/bailleurs/${id}`;

            const res = await axios({
                headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data: form
            });

            toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/beilleurs');

        }catch(err){
            console.log(err.response.data.message);
            toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
        }
    }

	const deleteBailleur = async() => {
		
        try{
            const url = `http://priqh2server.herokuapp.com/api/v1/bailleurs/${id}`;

            const res = await axios({
                headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url
            });

            toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/beilleurs');

        }catch(err){
            console.log(err.response.data.message);
            toast.success(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
        }
    }

	const [show, setShow] = React.useState(false);
	const [show1, setShow1] = React.useState(false);

    return (
            	<div className="col-12 col-md-6 col-lg-3">
					<ToastContainer/>
							<div className="card">

								<img className="card-img-top" src={`http://priqh2server.herokuapp.com/img/bailleurs/${img}`} alt="image" style={{"height": "150px"}}/>

								<div className="card-header px-4 pt-4">
									<h3 className=" mb-0">{name}</h3>
								
								</div>
								<div className="card-body px-4 pt-2">
								<div className="d-flex flex-row-reverse">
				<div>
					<span  className="btn btn-danger ml-1" onClick={() => setShow1(true)}><FeatherIcon icon="trash-2" /></span>
				</div>
				<div >
				<span  className="btn btn-primary " onClick={() => {  setShow(true); }}><FeatherIcon icon="edit-2" /></span>
				</div>
			</div>
                                </div>
							</div>
															
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header >
						<Modal.Title>Modifier Beilleur</Modal.Title>
					</Modal.Header>
					<Modal.Body><div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="inputFirstName">Nom</label>
                                                <input type="text" className="form-control" placeholder={name} 
												 onChange= {(e) => setNom(e.target.value)}/>
                                            </div>
                                           
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-center">
                                                    <img src={selectedImg} width="150" height="100" alt="image" />
                                                    <div className="mt-2">
                                                        <input type="file" id="image" onChange={handleChange}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div></Modal.Body>
						<Modal.Footer>
                            <Button variant="primary" onClick={() => setShow(false)}>
                                Fermer
                            </Button>
                            <Button variant="success" onClick={() => { updateBailleur() }}>
                                Enregistrer
                            </Button>
                        </Modal.Footer>
				</Modal>

				<Modal show={show1} onHide={() => setShow1(false)}>
					<Modal.Header>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want delete {name}!</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={() => setShow1(false)}>
							Close
						</Button>
						<Button variant="danger" onClick={() => { deleteBailleur() }}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
											
			</div>
    )
}
