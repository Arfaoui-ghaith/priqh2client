import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormTranche() {

    const animatedComponents = makeAnimated();
	const [tranche, setTranche] = React.useState({});
	const [projets, setProjets] = React.useState([]);
	

    const fetchProjets = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
				
			let projet_options = [];
			for(const projet of res.data.projets){
				let nomProjet = '';
				for(const q of projet.quartiers){
					nomProjet = nomProjet + q.nom_fr + ' - '
				}
				let obj = { value: [projet.id,projet.code], label: nomProjet.slice(0,nomProjet.length-4) }
				projet_options.push(obj);
			}
			setProjets(projet_options);

		} catch (err) {
			console.log(err);
		}
	}

    const addTranche = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/tranches/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
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

	React.useEffect(() => {
		fetchProjets();
	},[]);

    return (
        <div>
			<ToastContainer/>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Numero</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Numero"
					onChange={(e) => setTranche({...tranche, numero: e.target.value * 1})}/>
				</div>
			</div>

            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Projets</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={projets}
							isMulti
							onChange={(e) =>{ setTranche({...tranche, projets: e.map(x => x.value[0])}) }}
						/>							
					</div>
				</div>
			</div>


			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addTranche()}>Submit</span>
				</div>
			</div>

			
		</div>
    )
}
