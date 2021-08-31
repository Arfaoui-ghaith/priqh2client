import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPrestataire() {

    const animatedComponents = makeAnimated();
	const [prestataire, setPrestataire] = React.useState({});

    const addPrestataire = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/prestataires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: prestataire
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/prestataire');

		} catch (err) {
			console.log(err.response.data.message);
		}
	}

    return (
        <div>
			<ToastContainer/>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom</label>
                <div className="col-sm-9">
					<input type="text" className="form-control"
					onChange={(e) => setPrestataire({...prestataire, nom: e.target.value})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Abreviation</label>
                <div className="col-sm-9">
					<input type="text" className="form-control"
					onChange={(e) => setPrestataire({...prestataire, abreviation: e.target.value})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addPrestataire()}>Submit</span>
				</div>
			</div>
			
		</div>
    )
}
