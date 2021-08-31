import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { useStoreDispatch } from '../../../../context/store';
import { useStoreState } from '../../../../context/store';

export default function Step1() {

    const dispatch = useStoreDispatch();
    const { newProjet } = useStoreState();

	console.log(newProjet);

    const animatedComponents = makeAnimated();
    
    
	const [gouvernorats, setGouvernorats] = React.useState(null);
	const [gouvernorat, setGouvernorat] = React.useState(null);
	const [communes, setCommunes] = React.useState(null);
	const [commune, setCommune] = React.useState(null);
    const [quartiers, setQuartiers] = React.useState([]);
    const [selectedQuartiers, setSelectedQuartiers] = React.useState([]);
	const [nom, setNom] = React.useState('');

    const [disabled, setDisabled] = React.useState(false);

	const handlesChangeCommune = (e) => {
        dispatch({ type: "newProjet", payload: { ...newProjet, commune_code: e.value.code } });
        setCommune(e.value);
		let quartiers_options = [];
        
		for(const quartier of e.value.quartiers){
			let obj = { value: quartier, label: quartier.nom_fr+" - "+ quartier.nom_ar }
			quartiers_options.push(obj);
		}
		setQuartiers(quartiers_options);
        console.log(quartiers_options);
	}

    const handlesChangeGouvernorat = (e) => {
        let communes_options = [];
        console.log(e)
		for(const commune of e.value.communes){
			let obj = { value: commune, label: commune.nom_fr+" - "+ commune.nom_ar }
			communes_options.push(obj);
		}
        setCommunes(communes_options);
        setGouvernorat(e.value);
        console.log(communes_options, gouvernorat);
    }

	const handlesChangeQuartier = (e) => {
		let nomProjet = '';
		for(const n of e){
			nomProjet = nomProjet + n.label.split('-')[0] + ' '
		}

		let surface_totale = 0;
		for(const q of e){
			surface_totale+=q.value.surface
		}

		console.log(nomProjet);
		dispatch({ type: "newProjet", payload: { ...newProjet, projet: { ...(newProjet.projet), nom: nomProjet.trim(), surface_totale }, quartiers: e.map(x => x.value.id) } });
       /* if(e.map(x => x.value).length === newProjet.projet.nbr_qaurtiers){
			setSelectedQuartiers(quartiers);
			setQuartiers([]);
        }else{
			dispatch({ type: "newProjet", payload: { ...newProjet, quartiers: e.map(x => x.value) } });
			setQuartiers(selectedQuartiers);
		}*/
	}

	const fetchQuartiers = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/quartiers/sans_projet';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			let gouvernorats_options = [];
			for(const gouvernorat of res.data.gouvernorats){
				let obj = { value: gouvernorat, label: gouvernorat.nom_fr+" "+gouvernorat.nom_ar }
				gouvernorats_options.push(obj);
			}
			setGouvernorats(gouvernorats_options);
            console.log(gouvernorats_options);
			
		} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        if(!disabled){
            fetchQuartiers();
        }
    },[disabled]);

  return (
    <div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">
					Gouvernorat
				</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							placeholder="Select Gouvernorat ..."
							components={animatedComponents}
							options={gouvernorats}
							onChange={handlesChangeGouvernorat}
						/>
					</div>
				</div>
			</div>

			{ gouvernorat ?
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">
					Commune
				</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							placeholder="Select Commune ..."
							defaultValue={communes[0]}
							components={animatedComponents}
							options={communes}
							onChange={handlesChangeCommune}
						/>
					</div>
				</div>
			</div> : '' }

			{ commune ?
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">
					Quartiers
				</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							placeholder="Select Quartiers ..."
							components={animatedComponents}
							isMulti
							options={quartiers}
							onChange={handlesChangeQuartier}
						/>
					</div>
				</div>
			</div> : '' }
    </div>
  );
}
