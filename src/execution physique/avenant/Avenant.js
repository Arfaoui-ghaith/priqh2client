import React from 'react'
import Print from './components/PrintAvenant'
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

					<h1 className="h3 mb-3">Les Avenants</h1>

					<div className="row">
					
						<div className="col-12">
							<div className="card">
								<Print/>
							</div>
						</div>

					</div>

				</div>
				
			</main>
    )
}
