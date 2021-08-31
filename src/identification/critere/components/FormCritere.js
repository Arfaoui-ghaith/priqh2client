import React from 'react'

export default function FormCritere({ title, critere }) {

    	
	const [critereEdit, setCritereEdit] = React.useState({});

	const update = async() => {

		/*try{
			const url = `http://priqh2server.herokuapp.com/api/v1/criteres/${id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data
			});

			console.log()

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			//window.location.replace("/Critéres d'éligibilité");

		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}*/
	}

    return (
        <div className="modal fade" key={title} id="modif" tabIndex="-1" role="dialog" aria-hidden="true">
			<div className="modal-dialog" role="document">

						<div className="modal-content">
							<div className="modal-header">
								<div className="col-12 col-xl-12">
									
										<div className="modal-header">
											<h5 className="modal-title">Modifier le critére {title}</h5>
											<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="card-body">
										<div className="row">
											<label className="col-form-label col-sm-3 text-sm-left">le minimum</label>
											<div className="col-sm-9">
												<input type="number" className="form-control" defaultValue={critere} onChange={ (e) => title === "Nombre de logements" ? console.log("dfgdfg",{ nombre_logements_totale: e.target.value }) : setCritereEdit(e.target.value ? e.target.value : e.target.defaultValue) } />
											</div>
										</div>
										<div className="mb-3 row mt-3">
											<div className="col-2">
												<span  className="btn btn-primary" onClick={() => { update(); }}>Submit</span>
											</div>
										</div>
										</div>
										
								</div>
							</div>
						</div>
			</div>
		</div>
    )
}
