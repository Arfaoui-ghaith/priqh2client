import React from 'react';
import '../../css_folder/style.css';
import Form from '../components/Form'
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { gql, useSubscription } from '@apollo/client'
import { Table } from 'react-bootstrap';


const UTILISATEURS = gql`
subscription utilisateurs {
  utilisateurs{
    nom
    prenom
	email
    telephone
    roles{role{titre}}
  }
}`

export default function Dashboard() {
	const [users,setUsers]= React.useState([]);

	const [userEdit, setUserEdit] = React.useState({});

	const { data: utilisateurs, error: messageError } = useSubscription(
		UTILISATEURS
	)
	

	//console.log(utilisateurs.utilisateurs);
	  //console.log('messageError', messageError);
	
	React.useEffect(() => {
		fetchUsers();
	},[]);


	React.useEffect(() => {
		if(utilisateurs !== undefined){
			setUsers(utilisateurs.utilisateurs);
		}
	},[utilisateurs]);
	  
	const fetchUsers = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			if (res.status === 200) {
			  
				setUsers(res.data.utilisateurs);
			  	console.log(res);

			}

			} catch (err) {
				console.log(err);
				console.log("Alert");
			}
	}

	const updateUser = async (id) => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/utilisateurs/${id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
			});
	
			if (res.status === 200) {
				setUsers(res.data.utilisateurs);
			}
			} catch (err) {
				console.log(err);
				console.log("Alert");
			}
	}

	const deleteUser = async (user) => {
		// eslint-disable-next-line no-restricted-globals
		var del=confirm("Are you sure you want to delete this user "+user.nom+" "+user.prenom+"?");
		if (del){
		   try{
			   const url =`http://priqh2server.herokuapp.com/api/v1/utilisateurs/${user.id}`;
			   const res = await axios({
				   headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
					 method: 'delete',
					 url
			   });
			   
			   alert (user.nom+" "+user.prenom+" deleted.");
			   window.location.replace('/Utilisateurs');

		   }catch(err){
			   console.log(err);
		   }
			
		} else {
		   alert(user.nom+" "+user.prenom+" not deleted");
		}
   }
	
    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Gestion des utilisateurs </h1>
                </div>

            </div>
            <div className="row">
						<div className="col-12 col-xl-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Liste des utilisateurs</h5>
								</div>
								<Table responsive>
									<thead>
										<tr>
											<th style={{"width":"13%"}}>Nom</th>
											<th style={{"width":"13%"}}>Email</th>
											<th style={{"width":"13%"}}>Telephone</th>
											<th style={{"width":"13%"}}>Role</th>
											<th style={{"width":"10%"}}><span data-toggle="modal" data-target="#defaultModalPrimary" style={{ "cursor": "pointer" }}><FeatherIcon icon="user-plus"/></span></th>
										</tr>
									</thead>
									<tbody>
									{
										users.map((utilisateur, index) => (
											<tr key={index}>
												<td>{ utilisateur.nom+" "+utilisateur.prenom }</td>
												<td>{ utilisateur.email }</td>
												<td>{utilisateur.telephone}</td>
												<td><ul className="px-0">{utilisateur.roles.map((role, index) => (
														
														<li style={{ listStyleType: "none" }} key={index}>{role.role.titre}</li>
													
													))}</ul> </td>
												<td className="table-action">
														<span style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#ModalMod" onClick={(e) => setUserEdit(utilisateur)}><FeatherIcon icon="edit-2" /></span>
														<span style={{ "cursor": "pointer" }} onClick={() => deleteUser(utilisateur)}><FeatherIcon icon="trash" /></span>
												</td>
											</tr>
										))
									}
									</tbody>
								</Table>

									<div className="modal fade" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<div className="col-12 col-xl-12">
														<div className="card">
															<div className="modal-header">
																<h5 className="modal-title">Ajouter utilisateur</h5>
																<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
															</div>
															<div className="card-body">
																<Form   />
															</div>
														</div>
													</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

				<div className="modal fade" id="ModalMod" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        
                        <div className="modal-content">
                            <div className="modal-header">
                                
                                <div className="col-12 col-xl-12">
                                
							         <div className="card">
                                         
									 <div className="modal-header">
													<h5 className="modal-title">Modifier utilisateur</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
												</div>
								        <div className="card-body">
									        <Form user={userEdit} />
								</div>
							</div>
                           
						</div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
							</div>
						</div>
                        </div>

        </div>
		
    </main>
    )
}
