import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormCommune() {

    const animatedComponents = makeAnimated();
	const [commune, setCommune] = React.useState({});
	const [gouvernorats, setGouvernorats] = React.useState([]);

	

    const fetchGouvernorats = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/gouvernorats/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

				
				let gouvernorat_options = [];
				for(const gouvernorat of res.data.gouvernorats){
					let obj = { value: [gouvernorat.id,gouvernorat.code], label: gouvernorat.nom_fr+" "+gouvernorat.nom_ar }
					gouvernorat_options.push(obj);
				}
				setGouvernorats(gouvernorat_options);

			} catch (err) {
				console.log(err.response.data.message);
			}
	}

    const addCommune = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/communes/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: commune
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Communes');

			} catch (err) {
				console.log(err.response.data.message);
			}
	}

	React.useEffect(() => {
		fetchGouvernorats();
	});

    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gouvernorat</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={gouvernorats}
							onChange={(e) => setCommune({...commune, gouvernorat_id: e.value[0], gouvernorat_code: e.value[1]})}
						/>							
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en francais</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en francais"
					onChange={(e) => setCommune({...commune, nom_fr: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en arabe</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en arabe"
					onChange={(e) => setCommune({...commune, nom_ar: e.target.value})}/>
				</div>
			</div>


			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addCommune()}>Submit</span>
				</div>
			</div>

			
		</div>
    )
}
