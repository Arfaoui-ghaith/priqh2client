import React from 'react'
import axios from 'axios';

import '../../css_folder/style.css'

export default function Interface() {

    const [interfaces, setInterfaces] = React.useState([]);

	React.useEffect(() => {
		fetchInterfaces();
	},[])

	  
	const fetchInterfaces = async (e) => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/fonctionalites/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
		
			if (res.status === 200) {
				setInterfaces(res.data.fonctionalites);
			}
			} catch (err) {
				console.log("Alert",err);
			}
	}

    return (
        <main className="content">
        <div className="container-fluid p-0">

            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
				<h1 className="h3 mb-3">Les Fonctionalites</h1>
                </div>

            </div>
            <div className="row">
					<div className="col-12 col-xl-12">
						<div className="card">
								<div className="card-header">
									<h5 className="card-title">Liste des Fonctionalites</h5>
								</div>
                            <table className="table">
									<thead>
										<tr>
											<th style={{"width":"100%"}}>titre</th>
										</tr>
									</thead>

									<tbody>
                                    {interfaces.map((fonctionalite,index) => (
										<tr key={index}>
											<td key={index}>{fonctionalite.titre}</td>
										
                                        </tr>
                                    ))}		
									</tbody>
                                  
                            </table>
										
										
					    </div>
                    </div>
                </div>
                </div>
                    </main>
    )
}

