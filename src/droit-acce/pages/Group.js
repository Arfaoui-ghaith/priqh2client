import React from 'react'
import '../../css_folder/style.css'
import GroupForm from '../components/GroupForm'
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { Table } from 'react-bootstrap';

export default function Group() {

	const [roles, setRoles] = React.useState([]);
	const [role, setRole] = React.useState({});

	React.useEffect(() => {
		fetchRoles();
	},[])

	const fetchRoles = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/roles/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
		
			if (res.status === 200) {
			  
				setRoles(res.data.roles);
			  	console.log(res);

			}
			} catch (err) {
				console.log(err);
				console.log("Alert");
			}
	}

	

    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Gestion des groupes</h1>
                </div>

            </div>
            <div className="row">
						<div className="col-12 col-xl-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Liste des groupes</h5>
								</div>
								<Table responsive>
									<thead>
										<tr>
											<th style={{"width":"30%"}}>Titre</th>
											<th style={{"width":"60%"}}>Specifications</th>										
											<th style={{"width":"10%"}}></th>
										</tr>
									</thead>
									<tbody>
									{roles.map((role,index) => (
										<tr key={index}>
											<td>{role.titre}</td>
											<td>
                                            	<Table responsive>
													<tbody>
														{role.specification.map((specification,i) => (
														<tr key={i}>
															<td key={i}>{specification.titre}</td>
														</tr>
														))}
													</tbody>
												</Table>
                                            </td>
								
											<td className="table-action">
												<span style={{ "cursor": "pointer" }} onClick={() => setRole(role)} data-toggle="modal" data-target="#ModalMod"><FeatherIcon icon="edit-2" /></span>
												
											</td>
										</tr>
										))}
										
									</tbody>
								</Table>
               

				<div className="modal fade" id="ModalMod" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        
                        <div className="modal-content">
                            <div className="modal-header">
                                
                                <div className="col-12 col-xl-12">
                                
							         <div className="card">
                                         
									 <div className="modal-header">
													<h5 className="modal-title">Modifier role</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
												</div>
								        <div className="card-body">
									        <GroupForm role={role}/>
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
