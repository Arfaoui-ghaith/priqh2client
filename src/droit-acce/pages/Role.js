import React from 'react'
import '../../css_folder/style.css'
import RoleForm from '../components/RoleForm'
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { Table } from 'react-bootstrap';

export default function Role() {

	const [roles, setRoles] = React.useState([]);
	const [roleEdit, setRoleEdit] = React.useState({});

	  
	const fetchRoles = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/roles/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			setRoles(res.data.roles);
			console.log(res);
			
			} catch (err) {
				console.log(err);
				console.log("Alert");
			}
	}

	const deleteRole = async (role) => {
		 // eslint-disable-next-line no-restricted-globals
		 var del=confirm("Are you sure you want to delete this role "+role.titre+" ?");
		 if (del){
			try{
				const url =`http://priqh2server.herokuapp.com/api/v1/roles/${role.id}`;
				const res = await axios({
					headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
					  method: 'delete',
					  url
				});
				
				console.log(res);
				alert (role.titre+" deleted.");
				window.location.replace('/Roles');

			}catch(err){
				console.log(err);
			}
			 
		 } else {
			alert(role.titre+" not deleted");
		 }
	}


	React.useEffect(() => {
		fetchRoles();
	},[]);


    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Gestion des roles</h1>
                </div>

            </div>
            <div className="row">
						<div className="col-12 col-xl-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Liste des roles</h5>
								</div>
								<Table responsive>
									<thead>
										<tr>
											<th style={{"width":"20%"}}>Titre</th>
											<th style={{"width":"35%"}}>Fonctionalités</th>
											<th style={{"width":"35%"}}>Interfaces</th>
											<th style={{"width":"10%"}}><span data-toggle="modal" data-target="#defaultModalPrimary" style={{ "cursor": "pointer" }}><FeatherIcon icon="folder-plus"/></span></th>
										</tr>
									</thead>
									<tbody>
										{roles.map((role,index) => (
										<tr key={index}>
											<td>{role.titre}</td>
											<td>
                                            	<table className="table">
													<tbody>
														{role.fonctionalites.map((fonctionalite,index) => (
														<tr key={index}>
															<td>{fonctionalite.titre}</td>
														</tr>
														))}
													</tbody>
												</table>
                                            </td>

											<td>
                                            	<table className="table">
													<tbody>
														{role.interfaces.map((interf,index) => (
														<tr key={index}>
															<td>{interf.titre}</td>
														</tr>
														))}
													</tbody>
												</table>
                                            </td>
								
											<td className="table-action">
												<span style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#ModalMod" onClick={() => setRoleEdit(role)}><FeatherIcon icon="edit-2" /></span>
												<span style={{ "cursor": "pointer" }} onClick={() => deleteRole(role)}><FeatherIcon icon="trash" /></span>
											</td>
										</tr>
										))}
										
									</tbody>
								</Table>
                <div className="modal fade" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        
                        <div className="modal-content">
                            <div className="modal-header">
                                
                                <div className="col-12 col-xl-12">
                                
							         <div className="card">
                                         
									 <div className="modal-header">
													<h5 className="modal-title">Ajouter role</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
												</div>
								        <div className="card-body">
									        <RoleForm />
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
													<h5 className="modal-title">Modifier role</h5>
													<span type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></span>
												</div>
								        <div className="card-body">
									        <RoleForm role={roleEdit} />
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
