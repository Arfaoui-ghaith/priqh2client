import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios';

export default function RoleForm({ role }) {
	
	const animatedComponents = makeAnimated();

	const [fonctionalites, setFonctionalites] = React.useState([]);
	const [titre, setTitre] = React.useState('');
	const [interfaces,setInterfaces] = React.useState([]);
	const [specifications,setSpecifications] = React.useState([]);
	const [showDiv, setShowDiv]= React.useState(false);
	const [fonctionalitesDefault, setFonctionalitesDefault] = React.useState([]);
	const [interfacesDefault, setInterfacesDefault] = React.useState([]);

	const addRole = async () => {
		
		if(titre === "") return console.log('titre obligatoire !!');
		if(selectedFonctionalites.length === 0) return console.log('fonctionalite obligatoire !!');
		if(selectedInterfaces.length === 0) return console.log('interface obligatoire !!');
		const data = { titre, relations:{fonctionalites: selectedFonctionalites, interfaces: selectedInterfaces} }
		try{
			const url ='http://priqh2server.herokuapp.com/api/v1/roles/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data
			});

			console.log(res);
			window.location.replace('/Roles');

		}catch(err){
			console.log(err);
		}
	}

	const updateRole = async () => {

		const data = { titre, relations:{fonctionalites: selectedFonctionalites, interfaces: selectedInterfaces} }
		
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/roles/${role.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data
			});

			console.log(res);
			window.location.replace('/Roles');

		}catch(err){
			console.log(err);
		}
	}


	const fetchFonctionalites = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/fonctionalites/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			//console.log(res.data.fonctionalites);

			if (res.status === 200) {
				let fonctionalites_options = [];
				for(const fonctionalite of res.data.fonctionalites){
					let obj = { value: fonctionalite.id, label: fonctionalite.titre }
					fonctionalites_options.push(obj);
				}
				setFonctionalites(fonctionalites_options);
			}

			} catch (err) {
				console.log(err);
			}
	}

	const fetchInterfaces = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/interfaces/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			//console.log(res.data.fonctionalites);

			if (res.status === 200) {
				let interfaces_options = [];
				for(const interfac of res.data.interfaces){
					let obj = { value: interfac.id, label: interfac.titre }
					interfaces_options.push(obj);
				}
				setInterfaces(interfaces_options);
			}

			} catch (err) {
				console.log(err);
			}
	}

	React.useEffect(() => {
		fetchFonctionalites();
		fetchInterfaces();
	},[]);

	const [selectedFonctionalites, setSelectedFonctionalites] = React.useState([]);
	const [selectedInterfaces, setSelectedInterfaces] = React.useState([]);

	const handleFonctionalitesChange = (e) => {
		setSelectedFonctionalites(Array.isArray(e) ? e.map(x => x.value) : []);
	}

	const handleInterfacesChange = (e) => {
		setSelectedInterfaces(Array.isArray(e) ? e.map(x => x.value) : []);
	}
	

	const makeArray = async() => {
		console.log(role);
		let defaultsF = [];
		for(const fonctionalite of fonctionalites){
			for(const fonctionaliteRole of role.fonctionalites){
				if(fonctionalite.label === fonctionaliteRole.titre){
					defaultsF.push(fonctionalite);
				}
			}
		}

		let defaultsI = [];
		for(const interf of interfaces){
			for(const interfRole of role.interfaces){
				if(interf.label === interfRole.titre){
					defaultsI.push(interf);
				}
			}
		}

		setFonctionalitesDefault(defaultsF);
		handleFonctionalitesDefault(defaultsF);

		setInterfacesDefault(defaultsI);
		handleInterfacesDefault(defaultsI);
	}

	const handleFonctionalitesDefault = (fonctionalites) => {
		setSelectedFonctionalites(fonctionalites.map( x => x.value ));
  	}

	const handleInterfacesDefault = (interfaces) => {
		setSelectedInterfaces(interfaces.map( x => x.value ));
  	}

    return (
        <React.Fragment>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Titre</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" onChange={(e) => setTitre(e.target.value)} placeholder={ role ? role.titre : "Titre" }/>
				</div>
			</div>

			{ role ? "" :
			<div>							
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Fonctionalites</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							isMulti
							options={fonctionalites}
							onChange={handleFonctionalitesChange}
						/>				
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Interfaces</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							isMulti
							options={interfaces}
							onChange={handleInterfacesChange}
						/>				
					</div>
				</div>
			</div></div>
			}

			<hr/>
			{ role ? 
			<div>
			<div className="mb-3 row">
				<div className="col-sm-9">
                    <button className="btn btn-danger" onClick={() => { setShowDiv(!showDiv); makeArray() }}>{ !showDiv ? "Réinitialiser les interfaces & fonctionalites" : "cancel"}</button>
                </div>
			</div>

			{ showDiv ? (
			<div>
			<hr/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">fonctionalites</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							defaultValue={fonctionalitesDefault}
							isMulti
							options={fonctionalites}
							onChange={handleFonctionalitesChange}
						/>				
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Interfaces</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							defaultValue={interfacesDefault}
							isMulti
							options={interfaces}
							onChange={handleInterfacesChange}
						/>				
					</div>
				</div>
			</div>
			</div>) : "" } </div> : "" }
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span onClick={() => { if (role){ updateRole() } else { addRole() }}} className="btn btn-primary">Submit</span>
				</div>
			</div>
	
	</React.Fragment>	
    );
}