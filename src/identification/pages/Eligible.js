import React, { useRef } from 'react';
import Carte from '../critere/components/Carte';
import Form from '../projet/components/FormProjet'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-smart-data-table/dist/react-smart-data-table.css';
import PrintEligible from '../components/PrintEligible';
import PrintIneligible from '../components/PrintIneligible';
import LoadingBar from 'react-top-loading-bar';

export default function Eligible() {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
		setProgress(100);
		return () => setProgress(0);
	},[]);

    return (
    <main className="content">
        <LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Gestion des projets</h1>

            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Liste des projets éligibles</h5>
                        </div>
                        <PrintEligible />
                    </div>
                </div>

                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Liste des projets non éligibles</h5>
                        </div>
                        <PrintIneligible />
                    </div>
                </div>
            </div>

        </div>
    </main>
    )
}
