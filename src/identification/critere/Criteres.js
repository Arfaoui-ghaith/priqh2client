import React from 'react'
import Carte from './components/Carte'
import Critere from './components/Critere'
import axios from 'axios'
import "./styleCarte.css"
import { useStoreState } from './../../context/store';
import LoadingBar from 'react-top-loading-bar';
import { gql, useSubscription } from '@apollo/client'

const CRITERES = gql`
subscription criteres {
    criteres{
        id
        surface_totale
        surface_urbanisee_totale
        nombre_logements_totale
        nombre_habitants_totale
        gouvernorat{code}
  }
}`

export default function Criteres() {
    const {gouvernorat} = useStoreState();

    const [fiche, setFiche] = React.useState({});
    const [progress, setProgress] = React.useState(0);

    const { data: criteres, error: messageError } = useSubscription(
		CRITERES
	)

    console.log(criteres);
    
    const fetchCriteres = async (gouvernorat) => {
		try {
			const url =`http://priqh2server.herokuapp.com/api/v1/criteres/${gouvernorat.slice(0,3).toUpperCase()}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

            console.log(res);
			setFiche(res.data.critere.fiche_criteres);

			} catch (err) {
				console.log(err.response.data.message);
                return {};
			}
	}

    React.useEffect(() => {
        if(criteres){
            criteres.criteres.map((critere) => {
                if(critere.gouvernorat.code === gouvernorat.slice(0,3).toUpperCase()){
                    setFiche(critere);
                }
            });
        }
    },[criteres]);

    React.useEffect(() => {
        setProgress(100);
        fetchCriteres(gouvernorat);
        return () => setProgress(0);
    },[gouvernorat]);

    return (
        <main className="content">
            <LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
			<div className="container-fluid p-0">

				<div className="mb-3">
					<h1 className="h3 d-inline align-middle">Critéres d'éligibilité {gouvernorat}</h1>
				</div>

            <div className="row">

                    <div className="col-3">
                        <Carte />
                    </div>

                <div className="col-9">
                    <div className="row">
                       <Critere title="Nombre de logements" id={fiche.id} critere={fiche.nombre_logements_totale}/>
                       <Critere title="Nombre d'habitant" id={fiche.id} critere={fiche.nombre_habitants_totale}/>
                       <Critere title="Surface totale (hectares)" id={fiche.id} critere={fiche.surface_totale}/>
                       <Critere title="Surface urbanisée totale (hectares)" id={fiche.id} critere={fiche.surface_urbanisee_totale}/>
					</div>
				</div>
            </div>  </div>
		</main>
    )
}
