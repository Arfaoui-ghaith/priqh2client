import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStoreDispatch } from '../../../../context/store';
import { useStoreState } from '../../../../context/store';

export default function Step4() {

	const { newProjet } = useStoreState();
	console.log(newProjet);
    const [etude, setEtude] = React.useState({ bureau_etude: '', cout_etude: 0 });
	const dispatch = useStoreDispatch();

	console.log(newProjet);

    const AddProjet = async() => {
		
		try{
			const url ='http://priqh2server.herokuapp.com/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: {...newProjet, projet: {...(newProjet.projet), ...etude} }
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 3000,
				draggable: false
			});

			window.location.replace('/Projets');

		}catch(err){
			console.log(err.message);
			
			toast.error(err.message, {
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
                <label className="col-form-label col-sm-3 text-sm-left">Etude</label>
                <div className="col-sm-4">
					<input type="text" className="form-control" placeholder="Bureau"
					onChange={(e) => { etude.bureau_etude= e.target.value;  }}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { etude.cout_etude= e.target.value * 1; }}/>
				</div>
            </div>

            <div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => AddProjet()}>Submit</span>
				</div>
			</div>
    </div>
  );
}
