import React from 'react'
import { useAuthState } from '../../context/auth';
import FeatherIcon from 'feather-icons-react';


export default function Profile() {

    const { user } = useAuthState();

    return (
        <main className="content">
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Profile</h1>

            <div className="row">
                <div className="col-md-4 col-xl-3">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Mon Profile </h5>
                        </div>
                        <div className="card-body text-center">
                            <img src="img/photos/user-01.png" alt="photo de profile" className="img-fluid rounded-circle mb-2" width="128" height="128" />
                            <h5 className="card-title mb-0">{user.payload.nom+" "+user.payload.prenom}</h5>
                            <div className="text-muted mb-2">{user.payload.email}</div>

                            <div>
                                <a className="btn btn-primary btn-sm" href="/settings">Modifier mon profile</a>
                                </div>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body">
                            <h5 className="h6 card-title">Mes roles </h5>
                            {
                                user.payload.roles.map((role,index) => (
                                    <span key={index} st href="#" data-toggle="modal" data-target="#ModalMod" className="badge btn-primary mr-1 my-1">{role.titre}</span>
                                ))
                            }
                        </div>
                        <hr className="my-0" />
                        <div className="card-body">
                            <h5 className="h6 card-title">plus d'iformations</h5>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-1"><FeatherIcon icon="user-check" /> CIN <span style={{color :"#3B7DDD"}}>{user.payload.cin}</span> </li>

                                <li className="mb-1"><FeatherIcon icon="phone" /> telephone <span style={{color :"#3B7DDD"}}>{user.payload.telephone}</span> </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

                <div className="col-md-8 col-xl-9">
                    <div className="card">
                        <div className="card-header">

                            <h5 className="card-title mb-0">Activities</h5>
                        </div>
                        <div className="card-body h-100">

                            <div className="d-flex align-items-start">
                                <img src="img/photos/user-01.png" width="36" height="36" className="rounded-circle mr-2" alt="Vanessa Tucker" />
                                <div className="flex-grow-1">
                                    <small className="float-right text-navy">5m ago</small>
                                    Activities ....
                                    <small className="text-muted">Today 7:51 pm</small><br />

                                </div>
                            </div>


                            <hr />
                            <a href="#" className="btn btn-primary btn-block">Load more</a>
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
									<h5 className="modal-title">liste des fonctionalités </h5>
									<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Gestion des projets</td>
                                            </tr>
                                            <tr>
                                                <td>Gestion des quartiers</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
