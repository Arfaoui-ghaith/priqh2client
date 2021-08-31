import React from 'react'
import { useAuthState } from '../../context/auth';
import axios from 'axios';

export default function Settings() {

    const { user } = useAuthState();

    const [nomprenom, setNomPrenom] = React.useState({});
    
    const [email, setEmail] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');


    const updateNomPrenom = async (e) => {
        if(nomprenom.nom === "") delete nomprenom.nom;
        if(nomprenom.prenom === "") delete nomprenom.prenom;

        console.log(nomprenom);

        const form = new FormData();

        if( nomprenom.nom ) form.append('nom', nomprenom.nom);
        if( nomprenom.prenom ) form.append('nom', nomprenom.prenom);
        if( document.getElementById('image').files[0] !== undefined ) form.append('image', document.getElementById('image').files[0]);

        console.log(form.get('image'));
        
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/modifierProfile';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data: form
			});
            console.log(res);
			if (res.status === 200) {
				console.log(res);
			}
			} catch (err) {
				console.log("Alert",err);
			}
	}

    const updateInfo = async (e) => {
        const data = {};

        if(email !== "") data.email = email;
        if(telephone !== "") data.telephone = telephone;

        console.log(data)
        try {
            
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/modifierProfile';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data
			});
            console.log(res);
			if (res.status === 200) {
				console.log(res);
			}
			} catch (err) {
				console.log("Alert",err);
			}
    }

    const updatePassword = async (e) => {

        if(currentPassword === "" ){
            console.log('Please fill your current password!');
        } else if ( password == "" && confirmPassword == "" ){
            console.log('Please tell us your new password and confirm it!');
        } else if ( password !== confirmPassword ) {
            console.log('Your passwords didnt match up ! Please try again.');
        } else{

        const data = {};

        if(currentPassword !== "") data.currentPassword = currentPassword;
        if(password !== "") data.password = password;

        console.log(data)
        try {
            
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/modifierMotDePasse';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
                data
			});
            console.log(res);
			if (res.status === 200) {
				console.log(res);
			}
			} catch (err) {
				console.log("Alert",err);
			}
        }
    }

    const [selectedImg, setSelectedImg]=React.useState("img/photos/user-01.png");

    function handleChange(event) {
    setSelectedImg( URL.createObjectURL(event.target.files[0]));
    }
    return (
        <main className="content">
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Modifier profile</h1>

            <div className="row">
                <div className="col-md-3 col-xl-2">

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Profile </h5>
                        </div>

                        <div className="list-group list-group-flush" role="tablist">
                            <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account" role="tab">
                                S'identifier
                            </a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#info" role="tab">
                                Mes informations
                            </a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#password" role="tab">
                                Mot de passe 
                            </a> 
                        </div>
                    </div>
                </div>

                <div className="col-md-9 col-xl-10">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="account" role="tabpanel">

                            <div className="card">
                                <div className="card-header">

                                    <h5 className="card-title mb-0">S'identifier</h5>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-8">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="inputFirstName">Nom</label>
                                                <input type="text" className="form-control" onChange={(e) => setNomPrenom({...nomprenom ,nom: e.target.value})} id="inputFirstName" placeholder={user.payload.nom} />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="inputLastName">Prenom</label>
                                                <input type="text" className="form-control" onChange={(e) => setNomPrenom({...nomprenom ,prenom: e.target.value})} id="inputLastName" placeholder={user.payload.prenom} />
                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center">
                                                    <img src={selectedImg} className="rounded-circle img-responsive mt-2" width="128" height="128" alt="image" />
                                                    <div className="mt-2">
                                                        <input type="file" id="image" onChange={handleChange}  />
                                                    </div>
                                                    <small>Pour une meilleur resultat, utiliser une image d'au moins 128px  avec .jpg format</small>
                                                </div>
                                            </div>
                                        </div>

                                        <span onClick={updateNomPrenom}  className="btn btn-primary">Enregistrer</span>
                                    </form>

                                </div>
                           
                        </div>

                        </div>
                        <div className="tab-pane fade" id="info" role="tabpanel">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Mes informations</h5>
                    </div>
                <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="inputEmail4" placeholder={user.payload.email} />
                    </div>
                    
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="inputCity">Telephone</label>
                            <input type="phone" className="form-control" placeholder={user.payload.telephone} onChange={(e) => setTelephone(e.target.value)} id="inputCity" />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label" htmlFor="inputState">role</label>
                    <select id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                        
                    </div>
                    <span onClick={updateInfo} className="btn btn-primary">Enregistrer</span>
                </form>

                </div>
            </div>
        </div>

                        <div className="tab-pane fade" id="password" role="tabpanel">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Mot de passe </h5>

                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="inputPasswordCurrent">Mot de passe actuel</label>
                                            <input type="password" onChange={ (e) => setCurrentPassword(e.target.value) } className="form-control" id="inputPasswordCurrent" />
                                            <small><a href="#">Oublier mot de passe?</a></small>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="inputPasswordNew">Nouveau mot de passe</label>
                                            <input type="password" onChange={ (e) => setPassword(e.target.value) } className="form-control" id="inputPasswordNew" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="inputPasswordNew2">Comfirmer mot de passe</label>
                                            <input type="password" onChange={ (e) => setConfirmPassword(e.target.value) } className="form-control" id="inputPasswordNew2" />
                                        </div>
                                        <span onClick={ updatePassword } className="btn btn-primary">Enregistrer</span>
                                    </form>

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
