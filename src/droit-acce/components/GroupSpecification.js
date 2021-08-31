import React from 'react'
import axios from 'axios'
export default function GroupSpecification({ specification }) {

    const [titre, setTitre] = React.useState('');
    
    const addSpecification = async () => {
		try{
			const url ='http://priqh2server.herokuapp.com/api/v1/Specifications/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: { titre }
			});

			console.log(res);
			window.location.replace('/Specifications');

		}catch(err){
			console.log(err);
		}
	}

	const updateSpecification = async () => {
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/specifications/${specification.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: { titre }
			});

			console.log(res);
			window.location.replace('/Specifications');

		}catch(err){
			console.log(err.response);
		}
	}

   


    return (
        <div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Titre :</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" onChange={(e) => setTitre(e.target.value )} placeholder={specification ? specification.titre : ""}/>
				</div>
			</div>
            <div className="mb-3 row">
				<div className="col-sm-10">
					<button type="submit" onClick={() => {specification ? updateSpecification() : addSpecification()}} className="btn btn-primary">Submit</button>
				</div>
			</div> 
        </div>
    )
}
