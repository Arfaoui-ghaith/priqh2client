import React from 'react';
import { useStoreDispatch } from '../../../../context/store';
import { useStoreState } from '../../../../context/store';

export default function Step2() {

    const [projet, setProjet] = React.useState({});

    const dispatch = useStoreDispatch();
    const { newProjet } = useStoreState();

	const dispatchData = () => {
		dispatch({type: "newProjet", payload: {...newProjet, projet}});
	}

  return (
    <div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre quartiers</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre quartiers"
					onChange={(e) => {projet.nbr_quartiers= e.target.value * 1;  dispatchData(); }}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Surface Urbanisée (Hectar)</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Surface Urbanisée (Hectar)"
					onChange={(e) => { projet.surface_urbanisee_totale= e.target.value * 1;  dispatchData(); }}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre de logements</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre de logements"
					onChange={(e) => { projet.nombre_logements_totale= e.target.value * 1; dispatchData(); }}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre habitants</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre habitants"
					onChange={(e) => { projet.nombre_habitants_totale= e.target.value * 1; dispatchData(); }}/>
				</div>
			</div>
    </div>
  );
}
