import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormCommuneUpdate() {

    const [communeEdit, setCommuneEdit] = React.useState({});

    const {commune} = useStoreState();


    const updateCommune = async() => {
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/communes/${commune.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: communeEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/communes');

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
                <label className="col-form-label col-sm-3 text-sm-left">Nom en francais</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en francais" defaultValue={commune ? commune.nom_fr: ''}
					onChange={(e) => setCommuneEdit({...commune, nom_fr: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en arabe</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en arabe" defaultValue={commune ? commune.nom_ar : ''}
					onChange={(e) => setCommuneEdit({...commune, nom_ar: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateCommune()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}

