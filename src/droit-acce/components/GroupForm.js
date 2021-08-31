import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios';

export default function GroupForm({ role }) {

	const animatedComponents = makeAnimated();
    
	const [specifications, setSpecifications] = React.useState([]);
	const [specificationsDefault, setSpecificationsDefault] = React.useState([]);
	const [selectedSpecifications, setSelectedSpecifications] = React.useState([]);
	const [showDiv, setShowDiv] = React.useState(false);

	const fetchSpecifications = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/specifications/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			//console.log(res.data.fonctionalites);

			if (res.status === 200) {
				let Specification_options = [];
				for(const specification of res.data.specifications){
					let obj = { value: specification.id, label: specification.titre }
					Specification_options.push(obj);
				}
				setSpecifications(Specification_options);
				
			}

			} catch (err) {
				console.log(err);
			}
	}

	const updateRole = async () => {
		const data = { relations:{specifications: selectedSpecifications} }
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/roles/${role.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data
			});

			console.log(res);
			window.location.replace('/Groupes');

		}catch(err){
			console.log(err.response);
		}
	}

	const handleSpecificationsChange = (e) => {
		setSelectedSpecifications(Array.isArray(e) ? e.map(x => x.value) : []);
	}

	const makeArray = async () => {
		
		const defaults = [];
		for(const specification of specifications){
			for(const specificationRole of role.specification){
				if(specification.label === specificationRole.titre){
					defaults.push(specification);
				}
			}
		}
		setSpecificationsDefault(defaults);
		handleSpecificationsDefault(defaults);
	}

	const handleSpecificationsDefault = (specifications) => {
		setSelectedSpecifications(specifications.map( x => x.value ));
  	}

	React.useEffect(() => {
		fetchSpecifications();
		
	},[])
	
    return (
		<div>
			<div className="mb-3 row">
				<div className="col-sm-9">
                    <button className="btn btn-danger" onClick={() => { setShowDiv(!showDiv); makeArray() }}>{ !showDiv ? "Réinitialiser les specifications" : "cancel"}</button>
                </div>
			</div>	
			{ showDiv ?	
			<div>				
			<div className="mb-3 row">
				<label className="col-form-label col-sm-3 text-sm-left">Specifications</label>
				<div className="col-sm-9">
					<div className="boxes" >
					<Select 
						closeMenuOnSelect={false} 
						components={animatedComponents}
						defaultValue={specificationsDefault}
						isMulti
						options={specifications}
						onChange={handleSpecificationsChange}
					/>						
					</div>
				</div>
			</div> 
			
			<div className="mb-3 row">
				<div className="col-sm-10">
					<button type="submit" onClick={updateRole} className="btn btn-primary">Submit</button>
				</div>
			</div> </div> : ""
			}
		</div>
    );
}