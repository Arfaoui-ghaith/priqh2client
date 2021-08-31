import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormMemoireUpdate() {
	const {memoire} = useStoreState();

    const [memoireEdit, setMemoireEdit] = React.useState({
		htva: memoire ? memoire.htva : 0,
		montant_exonere: memoire ? memoire.montant_exonere : 0,
		frais_gestion: memoire ? memoire.frais_gestion : 0,
		tva: memoire ? memoire.htva : 0,
		gestion_frais_tva: memoire ? memoire.gestion_frais_tva : 0,
		timbre_fiscale: memoire ? memoire.timbre_fiscale : 0
	});
    

	console.log(memoire);

    const updateMemoire = async() => {
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/memoires/${memoire.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: memoireEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Memoire');

		} catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

	React.useEffect(() => {
		memoireEdit.tva= memoireEdit.htva*0.19
		memoireEdit.frais_gestion= (memoireEdit.htva+memoireEdit.montant_exonere)*0.08
		memoireEdit.gestion_frais_tva= memoireEdit.frais_gestion*0.19
		console.log(memoireEdit);
	},[memoireEdit.htva, memoireEdit.montant_exonere]);

	React.useEffect(() => {
		if(memoire){
			
			memoireEdit.htva= memoire.htva;
			memoireEdit.montant_exonere= memoire.montant_exonere;
			memoireEdit.frais_gestion= memoire.frais_gestion;
			memoireEdit.tva= memoire.tva;
			memoireEdit.gestion_frais_tva= memoire.gestion_frais_tva;
			memoireEdit.timbre_fiscale= memoire.timbre_fiscale;
			console.log(memoireEdit);
		}
	},[memoire])

    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">HTVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoireEdit ? memoireEdit.htva : 0}
					onChange={(e) => setMemoireEdit({...memoireEdit, htva: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant Exonere</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoireEdit.montant_exonere}
					onChange={(e) => setMemoireEdit({...memoireEdit, montant_exonere: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Frais Gestion</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoireEdit ? memoireEdit.frais_gestion : 0}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoireEdit.tva}/>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gestion Frais TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" value={memoireEdit.gestion_frais_tva}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Timbre Fiscale</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoireEdit.timbre_fiscale}
					onChange={(e) => setMemoireEdit({...memoireEdit, timbre_fiscale: e.target.value * 1})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateMemoire()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}