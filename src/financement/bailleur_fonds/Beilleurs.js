import React from 'react'
import Bei from './components/Beilleur'
import FeatherIcon from 'feather-icons-react'
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useSubscription } from '@apollo/client'

const BAILLEURS = gql`
subscription bailleurs {
  bailleurs{
    id
    nom
    image
  }
}`

export default function Beilleurs() {

    const { data: bailleurs, error: messageError } = useSubscription(
		BAILLEURS
	)

    const [selectedImg, setSelectedImg]=React.useState("img/photos/deflogo.png");

    function handleChange(event) {
        setSelectedImg( URL.createObjectURL(event.target.files[0]));
    }

    const [nom, setNom] = React.useState('');
    const [tab, setTab] = React.useState([]);

	const [show, setShow] = React.useState(false);
    
    const fetchBailleurs = async() => {
        try {
			const url =`http://priqh2server.herokuapp.com/api/v1/bailleurs/`;

			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			setTab(res.data.bailleur_fonds);
            console.log(res.data.bailleur_fonds);

			} catch (err) {
				console.log(err);
			}
    }

    const addBailleur = async() => {

        const form = new FormData();

        form.append('nom', nom);
        form.append('image', document.getElementById('image').files[0]);

        try{
            const url = `http://priqh2server.herokuapp.com/api/v1/bailleurs`;

            const res = await axios({
                headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
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
            toast.success(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
        }
    }

    React.useEffect(() => {
        fetchBailleurs();
    },[]);

    React.useEffect(() => {
        if(bailleurs){
            console.log(bailleurs.bailleurs);
            setTab(bailleurs.bailleurs);
        }
    },[bailleurs]);

    return (
        <main className="content">
            <ToastContainer/>
        <div className="container-fluid p-0">
            <div>
                <h1 className="h3 mb-3">Gestion des beilleurs</h1>
                <Col md="auto" className="d-flex flex-row-reverse" >
                    <Button className="btn btn-primary" size="primary" onClick={() => {  setShow(true); }}>
                        <FeatherIcon icon="plus"/>
                    </Button>
                </Col>
            </div>
            <div className="row">
				{  
                    tab.map((b,index)=>(
                        <Bei key={index} name={b.nom} img={b.image} id={b.id}/>
                    ))
                }	
			</div>
        </div>
       
    	        <Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header>
					<Modal.Title>Ajouter Beilleur</Modal.Title>
					</Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    
                                        <label className="form-label" htmlFor="inputFirstName">Nom</label>
                                        <input type="text" className="form-control" placeholder="nom bailleur"
                                        onChange= {(e) => setNom(e.target.value)} />
                                      
                                </div>
                                <div className="col-md-6">
                                    <div className="text-center">
                                        <img src={selectedImg} width="150" height="100" alt="image" />
                                        <div className="mt-2">
                                            <input type="file" id="image" onChange={handleChange}  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShow(false)}>
                                Fermer
                            </Button>
                            <Button variant="success" onClick={() => { addBailleur() }}>
                                Enregistrer
                            </Button>
                        </Modal.Footer>
				</Modal>

            
        </main>
    )
}
