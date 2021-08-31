import React from 'react'
import '../../css_folder/style.css'
import GroupSpecification from '../components/GroupSpecification'
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { Table } from 'react-bootstrap';

export default function Specification() {
    
    const [specifications, setSpecifications] = React.useState([]);
	const [specification, setSpecification] = React.useState({});

	React.useEffect(() => {
		fetchSpecifications();
	},[])

	const fetchSpecifications = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/specifications/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			if (res.status === 200) {
				setSpecifications(res.data.specifications);
			  	console.log(res);
			}

			} catch (err) {
				console.log(err);
			}
	}

    const deleteSpecification = async (specification) => {
      // eslint-disable-next-line no-restricted-globals
		var del=confirm("Are you sure you want to delete this specification "+specification.titre+"?");
		if (del){
		   try{
			   const url =`http://priqh2server.herokuapp.com/api/v1/specifications/${specification.id}`;
			   const res = await axios({
				   headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
					 method: 'delete',
					 url
			   });
			   
			   alert (specification.titre+" deleted.");
			   window.location.replace('/Specifications');

		   }catch(err){
			   console.log(err);
		   }
			
		} else {
		   alert(specification.titre+" not deleted");
		}
    }

    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Gestion des specifications</h1>
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
											<th style={{"width":"90%"}}>Titre</th>
																				
											<th style={{"width":"10%"}}><span data-toggle="modal" data-target="#defaultModalPrimary" style={{ "cursor": "pointer" }}><FeatherIcon icon="folder-plus"/></span></th>
										</tr>
									</thead>
									<tbody>
									{specifications.map((specification,index) => (
										<tr>
											<td>{specification.titre}</td>
								
											<td className="table-action">
												<span style={{ "cursor": "pointer" }} onClick={() => setSpecification(specification)} data-toggle="modal" data-target="#ModalMod"><FeatherIcon icon="edit-2" /></span>
												<span style={{ "cursor": "pointer" }} onClick={() => deleteSpecification(specification)}><FeatherIcon icon="trash" /></span>
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
													<h5 className="modal-title">Ajouter specification</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
												</div>
								        <div className="card-body">
									        <GroupSpecification/>
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
													<h5 className="modal-title">Modifier specicifation</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
												</div>
								        <div className="card-body">
									        <GroupSpecification specification={specification}/>
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
