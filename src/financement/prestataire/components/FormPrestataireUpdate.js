import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormPrestataireUpdate() {

    const [prestataireEdit, setPrestataireEdit] = React.useState({});
    const {prestataire} = useStoreState();


    const updatePrestataire = async() => {
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/prestataires/${prestataire.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: prestataireEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Prestataire');

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
        <div>
			<ToastContainer/>
		
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom" defaultValue={prestataire ? prestataire.nom: ''}
					onChange={(e) => setPrestataireEdit({...prestataire, nom: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Abreviation</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en arabe" defaultValue={prestataire ? prestataire.abreviation : ''}
					onChange={(e) => setPrestataireEdit({...prestataire, abreviation: e.target.value})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updatePrestataire()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}