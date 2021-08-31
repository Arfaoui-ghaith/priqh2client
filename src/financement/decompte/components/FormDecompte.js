import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormDecompte() {

    const animatedComponents = makeAnimated();
	const [decompte, setDecompte] = React.useState({});
	const [memoires, setMemoires] = React.useState([]);
    const [prestataires, setPrestataires] = React.useState([]);

	const fetchPrestataires = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/prestataires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			let prestataires_options = [];
			for(const prestataire of res.data.prestataires){
				let obj = { value: prestataire.id, label: prestataire.abreviation }
				prestataires_options.push(obj);
			}
			setPrestataires(prestataires_options);

		} catch(err) {
			console.log(err.response.data.message);
		}
	}

    const fetchMemoires = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/memoires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			let memoires_options = [];
			for(const memoire of res.data.memoires){
                console.log(memoire.decompte === null,memoire.decompte)
                if(memoire.decompte === null){
					let obj = { value: memoire.id, label: memoire.projet.code }
					memoires_options.push(obj);
                }
			}
			setMemoires(memoires_options);
		} catch(err) {
			console.log(err.response.data.message);
		}
	}

    const addDecompte = async () => {
		console.log(decompte);
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/decomptes/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: decompte
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Decompte');

		} catch (err) {
			console.log(err.response.data.message);
		}
	}

	React.useEffect(() => {
		fetchMemoires();
        fetchPrestataires();
	},[]);

    return (
        <div>
			<ToastContainer/>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">
					Projet
				</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							placeholder="Select Projet ..."
							components={animatedComponents}
							options={memoires}
							onChange={(e) => decompte.memoire_id = e.value}
						/>
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">
					Prestataire
				</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							placeholder="Select Projet ..."
							components={animatedComponents}
							options={prestataires}
							onChange={(e) => decompte.prestataire_id = e.value}
						/>
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => decompte.montant= e.target.value  * 1}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Date Paiement</label>
                <div className="col-sm-9">
					<input type="date" className="form-control" 
					onChange={(e) => decompte.date_paiement= e.target.value}/>
				</div>
			</div>
         
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addDecompte()}>Submit</span>
				</div>
			</div>
			
		</div>
    )
}
