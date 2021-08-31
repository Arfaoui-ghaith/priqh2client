import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const animatedComponents = makeAnimated();
export default function Form({ user }) {
const [selectedLabels,setSelectedLabels]=React.useState([]);
const [roles, setRoles] = React.useState([]);
const [roles_specifications, setRoles_specifications] = React.useState([]);
const [relations, setRelations] = React.useState([]);
const [utilisateur, setUtilisateur] = React.useState({});
const [showDiv, setShowDiv]= React.useState(false);
const [rolesDefault, setRolesDefault] = React.useState([]);

	const fetchRoles = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/roles/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			setRoles_specifications(res.data.roles);

			if (res.status === 200) {
				
				let roles_options = [];
				for(const role of res.data.roles){
					let obj = { value: role.id, label: role.titre }
					roles_options.push(obj);
				}
				setRoles(roles_options);
				
			}

			console.log('roles_specifications',roles_specifications);
			} catch (err) {
				console.log(err);
			}
	}
	function checkedSp (value,id,role) {
		for(let i =0 ; i< user.roles.length; i++)
		{if(user.roles[i].specification === value){
			const roleSelected = roles_specifications.filter((el) => {return el.titre === role});
			console.log(roleSelected);
			for(let i=0; i<relations.length; i++){
				if(relations[i].role_id === roleSelected[0].id){
					relations[i].specification_id = id;
				}
			}
			return true;
		}}
		 return false ;
	}

	React.useEffect(() => {
		fetchRoles()
	},[]);

  	const handleChange = (e) => {
		setRelations(Array.isArray(e) ? e.map(x => { return {role_id: x.value, specification_id: null}}) : []);
		setSelectedLabels(Array.isArray(e) ? e.map(x => { return {label: x.label, value: x.value}}) : []);
  	}

	const handleRolesDefault = (roles) => {
		setRelations(roles.map(x => { return {role_id: x.value, specification_id: null}}));
		setSelectedLabels(roles.map(x => { return {label: x.label, value: x.value}}));
  	}

	const handleRelations = (e,index) => {
		relations[index].specification_id = e.target.value;
	}

	const addUser = async() => {
		console.log({utilisateur, relations});
		try{
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: {utilisateur, relations}
			});

			window.location.replace('/Utilisateurs');

		}catch(err){
			console.log(err.response.data.message);
		}
	}

	const updateUser = async() => {
		console.log({utilisateur, relations});
		try{
			const url =`http://priqh2server.herokuapp.com/api/v1/utilisateurs/${user.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: {utilisateur, relations}
			});

			window.location.replace('/Utilisateurs');

		}catch(err){
			console.log(err.response.data.message);
		}
	}

	const makeArray = async() => {
		const defaults = [];
		for(const role of roles){
			for(const roleUser of user.roles){
				if(role.label === roleUser.titre){
					defaults.push(role);
					
				}
			}
		}
		setRolesDefault(defaults);
		handleRolesDefault(defaults);
	}


    return (
        <div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Cin :</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" onChange={(e) => setUtilisateur({ ...utilisateur, cin: e.target.value })} placeholder={user ? user.cin : "CIN"}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom :</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" onChange={(e) => setUtilisateur({ ...utilisateur, nom: e.target.value })} placeholder={user ? user.nom : "Nom"}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Prénom :</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" onChange={(e) => setUtilisateur({ ...utilisateur, prenom: e.target.value })} placeholder={user ? user.prenom : "Prénom"}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Email :</label>
                <div className="col-sm-9">
					<input type="email" className="form-control" onChange={(e) => setUtilisateur({ ...utilisateur, email: e.target.value })} placeholder={user ? user.email : "Email"}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Password :</label>
                <div className="col-sm-9">
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setUtilisateur({ ...utilisateur, password: e.target.value })}/>
                </div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Telephone :</label>
                <div className="col-sm-9">
                    <input type="tel" className="form-control" onChange={(e) => setUtilisateur({ ...utilisateur, telephone: e.target.value })} placeholder={user ? user.telephone : "telephone"}/>
                </div>
			</div>
			<hr/>
			{ user ? 
			<div>
			<div className="mb-3 row">
				<div className="col-sm-9">
                    <button className="btn btn-danger" onClick={() => { setShowDiv(!showDiv); makeArray() }}>{ !showDiv ? "Réinitialiser les roles" : "cancel"}</button>
                </div>
			</div>

			{ showDiv ? (
			<div>
			<hr/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Roles :</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							defaultValue={user ? rolesDefault : []}
							components={animatedComponents}
							isMulti
							options={roles}
							onChange={handleChange}
						/>							
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                
				<div className="col-sm-9">
					<div className="boxes" id="box" >
						{selectedLabels && <div style={{ marginTop: 20, lineHeight: '25px' }}>
							<div>{
									selectedLabels.map((role,index) =>( 
										<div key={index} className="mb-3 row">
											{ `${role.label} :` }
											<div className="row">
											{
												roles_specifications.filter((el) => {
													return el.titre === role.label
												})[0].specification.map((sp,i) => (
													<span key={i}><input className="col" defaultChecked={checkedSp(sp.titre,sp.id,role.label)} type="radio"
													 onClick={(e) => handleRelations(e,index)} name={role.label} value={sp.id} /> { sp.titre}</span>
												))

											}
											</div>
										</div>
									))
							}</div>
						</div>}								
					</div>
				</div>
			</div> </div>) : "" 
			}</div> : (
			<div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">roles</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							closeMenuOnSelect={false}
							defaultValue={user ? rolesDefault : []}
							components={animatedComponents}
							isMulti
							options={roles}
							onChange={handleChange}
						/>							
					</div>
				</div>
			</div>

			<div className="mb-3 row">
                
				<div className="col-sm-9">
					<div className="boxes" id="box" >
						{selectedLabels && <div style={{ marginTop: 20, lineHeight: '25px' }}>
							<div>{
									selectedLabels.map((role,index) =>( 
										<div key={index} className="mb-3 row">
											{ `${role.label} :` }
											<div className="row">
											{
												roles_specifications.filter((el) => {
													return el.titre === role.label
												})[0].specification.map((sp,i) => (
													<span key={i}><input className="col" type="radio" onClick={(e) => handleRelations(e,index)} 
													name={role.label}  value={sp.id} /> { sp.titre}</span>
												))
											}
											</div>
										</div>
									))
							}</div>
						</div>}								
					</div>
				</div>
			</div> </div> )
			}
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span onClick={() => { if (user){ updateUser() } else { addUser(); }}} className="btn btn-primary">Submit</span>
				</div>
			</div>

		</div>
    );
}
