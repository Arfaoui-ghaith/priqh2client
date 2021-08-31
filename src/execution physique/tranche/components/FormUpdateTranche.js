import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormUpdateTranche(props) {

    const animatedComponents = makeAnimated();
	const [tranche, setTranche] = React.useState({ numero: props.tranche.numero });

    const updateTranche = async () => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/tranches/${props.tranche.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: tranche
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Tranches');

			} catch (err) {
				console.log(err.response.data.message);
			}
	}

    return (
        <div>
			<ToastContainer/>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Numero</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nombre quartiers" defaultValue={tranche.numero}
					onChange={(e) => setTranche({...tranche, numero: e.target.value * 1})}/>
				</div>
			</div>

			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateTranche()}>Submit</span>
				</div>
			</div>

		</div>
    )
}
