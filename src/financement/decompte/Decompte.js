import React from 'react'
import FormDecompte from './components/FormDecompte';
import FormDecompteUpdate from './components/FormDecompteUpdate';
import Print from './components/PrintDecompte'
import LoadingBar from 'react-top-loading-bar';

export default function Decompte(props) {

	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		setProgress(100);
		return () => setProgress(0);
	},[]);

    return (
        <main className="content">
			<LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
				<div className="container-fluid p-0">

					<h1 className="h3 mb-3">Gestion des Decomptes</h1>

					<div className="row">
					
						<div className="col-12">
							<div className="card">
								<Print/>
							</div>
						</div>

					</div>

                    <div className="modal fade" id="ajout" tabIndex="-1" role="dialog" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<div className="col-12 col-xl-12">
										<div className="card">
											<div className="modal-header">
												<h5 className="modal-title">Ajouter Decompte</h5>
												<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="card-body">
												<FormDecompte />
											</div>
										</div>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>

					<div className="modal fade" id="modif" tabIndex="-1" role="dialog" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<div className="col-12 col-xl-12">
										<div className="card">
											<div className="modal-header">
												<h5 className="modal-title">Modifier le Decompte</h5>
												<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="card-body">
												<FormDecompteUpdate />
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
