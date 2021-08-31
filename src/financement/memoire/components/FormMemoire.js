import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormMemoire() {

    const animatedComponents = makeAnimated();
	const [memoire, setMemoire] = React.useState({
		htva: 0, 
		montant_exonere: 0,
		frais_gestion: 0,
		tva: 0,
		gestion_frais_tva: 0,
		timbre_fiscale: 0.6
		});
	const [projets, setProjets] = React.useState([]);

	const fetchProjets = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/projets/sans_memoire';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			let projets_options = [];
			for(const projet of res.data.projets){
				let obj = { value: projet.id, label: projet.code }
				projets_options.push(obj);
			}
			setProjets(projets_options);
		} catch(err) {
			console.log(err.response.data.message);
		}
	}

	const handlesChangeProjet = (e) => {
		memoire.projet_id= e.value;
	}

    const addMemoire = async () => {
		console.log(memoire);
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/memoires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: memoire
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Memoire');

		} catch (err) {
			console.log(err.response.data.message);
		}
	}

	React.useEffect(() => {
		fetchProjets();
	},[]);

	React.useEffect(() => {
	
		memoire.tva= memoire.htva*0.19
		memoire.frais_gestion= (memoire.htva+memoire.montant_exonere)*0.08
		memoire.gestion_frais_tva= memoire.frais_gestion*0.19
		console.log(memoire);
	},[memoire.htva, memoire.montant_exonere]);

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
							options={projets}
							onChange={(e) => memoire.projet_id = e.value}
						/>
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">HTVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, htva: e.target.value  * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant Exonere</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, montant_exonere: e.target.value  * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Frais Gestion</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoire.frais_gestion}
					onChange={(e) => setMemoire({...memoire, frais_gestion: e.target.value  * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoire.tva}
					onChange={(e) => setMemoire({...memoire, tva: e.target.value  * 1})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gestion Frais TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoire.gestion_frais_tva}
					onChange={(e) => setMemoire({...memoire, gestion_frais_tva: e.target.value  * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Timbre Fiscale</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoire.timbre_fiscale}
					onChange={(e) => setMemoire({...memoire, timbre_fiscale: e.target.value  * 1})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addMemoire()}>Submit</span>
				</div>
			</div>
			
		</div>
    )
}
