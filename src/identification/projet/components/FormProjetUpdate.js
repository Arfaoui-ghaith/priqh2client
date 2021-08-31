import React from 'react'
import axios from 'axios';
import {ToastContainer as TContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormProjetUpdate() {

    const {projet} = useStoreState();

    const loadValues = () => {

        const drainage = {
            type: "drainage des eaux pluviales", 
            quantite: projet ? projet.infrastructures.filter((infra) => infra.type === "drainage des eaux pluviales")[0].quantite : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "drainage des eaux pluviales")[0].cout : ''}
        
        const eau = {
            type: "eau potable",
            quantite: projet ? projet.infrastructures.filter((infra) => infra.type === "eau potable")[0].quantite : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "eau potable")[0].cout : ''}

        const assainissement = {
            type: "assainissement",
            quantite: projet ? projet.infrastructures.filter((infra) => infra.type === "assainissement")[0].quantite : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "assainissement")[0].cout : ''
        }

        const eclairage = {
            type: "eclairage public",
            quantite: projet ? projet.infrastructures.filter((infra) => infra.type === "eclairage public")[0].quantite : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "eclairage public")[0].cout : ''}
        
        const voirie = {
            type: "voirie",
            quantite: projet ? projet.infrastructures.filter((infra) => infra.type === "voirie")[0].quantite : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "voirie")[0].cout : ''}
        
        const etude = {
            bureau_etude: projet && projet.bureau_etude ? projet.bureau_etude : '',
            cout_etude: projet && projet.cout_etude ? projet.cout_etude : 0}

        return {drainage,eau,assainissement,eclairage,voirie,etude};
    }

    const [drainage, setDrainage] = React.useState(loadValues().drainage);

    const [eau, setEau] = React.useState(loadValues().eau);

    const [assainissement, setAssainissement] = React.useState(loadValues().assainissement);

    const [eclairage, setEclairage] = React.useState(loadValues().eclairage);

    const [voirie, setVoirie] = React.useState(loadValues().voirie);

    const [etude, setEtude] = React.useState(loadValues().etude);

    const updateProjet = async() => {

        console.log({projet: {...etude}, infrastructures: [drainage, eau, assainissement, eclairage, voirie]});
		try{
			const url = `http://priqh2server.herokuapp.com/api/v1/projets/${projet.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: {projet: {...etude}, infrastructures: [drainage, eau, assainissement, eclairage, voirie]}
			});

			 toast.success('Success', {
				position: 'top-right',
				autoClose: 3000,
				draggable: false
			});

            window.location.replace('/Projets');
            
		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

  React.useEffect(() => {
    if(projet !== null){
        const p = loadValues();
        setDrainage(p.drainage);
        setEau(p.eau);
        setEclairage(p.eclairage);
        setVoirie(p.voirie);
        setAssainissement(p.assainissement);
        setEtude(p.etude);
    }
  },[projet]);

    return (
        <div>
            <TContainer />
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Drainage</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantite (km)" onChange={(e) => drainage.quantite= e.target.value * 1}
                    defaultValue={drainage.quantite}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => drainage.cout= e.target.value * 1}
                    defaultValue={drainage.cout}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Voirie</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantite (km)" onChange={(e) => voirie.quantite= e.target.value * 1}
                    defaultValue={voirie.quantite}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => voirie.cout= e.target.value * 1}
                    defaultValue={voirie.cout}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Assainissement</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantite (km)" onChange={(e) => assainissement.quantite= e.target.value * 1}
                    defaultValue={assainissement.quantite}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => assainissement.cout= e.target.value * 1}
                    defaultValue={assainissement.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eclairage Public</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="p.lumineux (km)" onChange={(e) => eclairage.quantite= e.target.value * 1}
                    defaultValue={eclairage.quantite}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => eclairage.cout= e.target.value * 1}
                    defaultValue={eclairage.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eau potable</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantite (km)" onChange={(e) => eau.quantite= e.target.value * 1}
                    defaultValue={eau.quantite}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => eau.bureaucout= e.target.value * 1}
                    defaultValue={eau.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Etude</label>
                <div className="col-sm-4">
					<input type="text" className="form-control" placeholder="Bureau" onChange={(e) => etude.bureau_etude= e.target.value}
                    defaultValue={etude.bureau_etude}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => etude.cout_etude= e.target.value * 1}
                    defaultValue={etude.cout_etude}/>
				</div>
            </div>
            <div className="mb-3 row">
				<div className="col-sm-9">
					<span onClick={(e) => updateProjet()}  className="btn btn-primary">Submit</span>
				</div>
			</div>
        </div>
    )
}
