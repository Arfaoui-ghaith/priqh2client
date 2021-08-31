import React from 'react';
import axios from 'axios';
import { useAuthDispatch } from '../../context/auth';
import { useAuthState } from '../../context/auth';
import { Button, Spinner } from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useKeypress from 'react-use-keypress';

export default function Login() {

	useKeypress(['Enter'], (event) => {
		if(event.key === 'Enter'){
			login(event);
		}
	  });
	
	const { user } = useAuthState();
	const [loading, setLoading] = React.useState(false);

	/*if(user && window.history){
		window.history.back();
	}*/

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const dispatch = useAuthDispatch();

	const login = async (e) => {
		setLoading(true);
		e.preventDefault();
		const data = { email, password };
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/utilisateurs/login';
			const res = await axios({
			  method: 'post',
			  url,
			  data,
			});
	
			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
			
			dispatch({ type:'LOGIN', payload: res.data.token });
			
			window.location.replace('/');
			
			} catch (err) {
				setLoading(false);
				
				toast.error(err.response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					draggable: true
				});
				  
			}
	}

	if(!user){
    return (
        <main className="d-flex w-100">
		<ToastContainer />
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Bienvenue</h1>
							<p className="lead">
								connecter pour acceder à votre compte
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										<img src="img/photos/priqh.png" alt="ARRU" className="img-fluid " width="132" height="132" />
									</div>
									<form>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Entrer votre email" />
										</div>
										<div className="mb-3">
											<label className="form-label">Mot de passe </label>
											<input className="form-control form-control-lg" type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Entrer votre mot de passe" />
											<small>
            									<a href="#">oublier mot de passe ?</a>
          									</small>
										</div>
											
										<div className="text-center mt-3">
											 <Button variant="primary" block onClick={login} disabled={loading}>{
											 loading ?
											 <Spinner
												as="span"
												animation="border"
												size="sm"
												role="status"
												aria-hidden="true"
												/>
												:
											 `Sign in`
											 }</Button> 

										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>

    )}
	else{
		return (
			<React.Fragment></React.Fragment>
		)
	}
}
