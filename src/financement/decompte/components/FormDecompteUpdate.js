import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormDecompteUpdate() {

	const { decompte } = useStoreState();
	console.log(decompte);
	const animatedComponents = makeAnimated();

	const [decompteEdit, setDecompteEdit] = React.useState({});

	console.log(decompteEdit);
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
                
                if(memoire.decompte === null){
					let obj = { value: memoire.id, label: memoire.projet.code }
					memoires_options.push(obj);
                }
			}
			setMemoires(memoires_options);
			console.log(memoires_options);
		} catch(err) {
			console.log(err.response.data.message);
		}
	}

    const updateDecompte = async () => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/decomptes/${decompte.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data: decompteEdit
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

	React.useEffect(() => {
		if(decompte){
			setDecompteEdit({
				memoire_id: decompte.memoire.id,
				prestataire_id: decompte.prestataire.id,
				date_paiement: new Date(decompte.date_paiement),
				montant: decompte.montant
			});
		}
	},[decompte]);

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
							onChange={(e) => decompteEdit.memoire_id = e.value}
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
							onChange={(e) => decompteEdit.prestataire_id = e.value}
						/>
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompteEdit.montant}
					onChange={(e) => decompteEdit.montant= e.target.value  * 1}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Date Paiement</label>
                <div className="col-sm-9">
					<input type="date" className="form-control" defaultValue={new Date(decompteEdit.date_paiement)}
					onChange={(e) => decompteEdit.date_paiement= new Date(e.target.value)}/>
				</div>
			</div>
         
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateDecompte()}>Submit</span>
				</div>
			</div>
			
		</div>
    );
}