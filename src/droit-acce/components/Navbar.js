import React from 'react'
import { useAuthState } from '../../context/auth';
import { useAuthDispatch } from '../../context/auth';
import FeatherIcon from 'feather-icons-react';
import {ToastContainer as TContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { gql, useSubscription } from '@apollo/client'

const NOTIFICATIONS = gql`
subscription notifications {
  notifications{
    message
    type
    interface{titre}
  }
}`
export default function Navbar(props) {

    const { data: notificationsRL, error: messageError } = useSubscription(
		NOTIFICATIONS
	)

    const { user } = useAuthState();
    
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type:'LOGOUT' });
        window.location.href = '/login';
    }


    const [notifications, setNotifications] = React.useState([]);

    const fetchNotifications = async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/notifications/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
			
                let interfaces = [];
                for(const i of user.payload.interfaces){
                    interfaces.push(i.titre);
                }
 
                let notifs = [];
                for(const n of res.data.notifications){
                    if(interfaces.indexOf(n.interface.titre) > -1){
                        notifs.push(n);
                    }
                }
				setNotifications(notifs);
                

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
     
        if(notificationsRL){
        
        let interfaces = [];
        for(const i of user.payload.interfaces){
            interfaces.push(i.titre);
        }
        
            let notifs = [];
            for(const n of notificationsRL.notifications){
                if(interfaces.indexOf(n.interface.titre) > -1){
                    notifs.push(n);
                }
            }
            
            notifs.slice(0,notifs.length-notifications.length).forEach((notif) => {
                toast.success(notif.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    draggable: false
                });
            });
            setNotifications(notificationsRL.notifications);
        }
    },[notificationsRL]);

    React.useEffect(() => {
        fetchNotifications();
    },[]);

    if(user){
    return (
        <>
        <TContainer/>
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle d-flex">
                <i className="hamburger align-self-center"></i>
            </a>


            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-toggle="dropdown">
                            <div className="position-relative">
                                <FeatherIcon icon="bell" />
                                <span className="indicator">{notifications.length}</span>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-left py-0" aria-labelledby="alertsDropdown">
                            <div className="dropdown-menu-header">
                                {notifications.length} Notifications
                            </div>
                            <div className="list-group">
                                {
                                    notifications.map((notification, index) => (
                                        <a key={index} href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-10">
                                                <div className="text-muted small mt-1">{notification.message}</div>
                                                <div className="text-muted small mt-1">{new Date(notification.updatedAt).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        </a>
                                    ))
                                }
                               
                              
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                   
                    <li className="nav-item dropdown">

                        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-toggle="dropdown">
                            <FeatherIcon className="align-middle" icon="settings" />
                        </a>

                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                            { 1 > 0 ? "" : <><img src={user.payload.image === null || user.payload === undefined ? "img/photos/user-01.png" : `http://priqh2server.herokuapp.com/img/utilisateurs/${user.payload.image}`} className="avatar img-fluid rounded mr-1" alt="user" /> <span className="text-dark">{ user.payload.nom+" "+user.payload.prenom }</span></> }
                            <img src="img/photos/user-01.png" className="avatar img-fluid rounded mr-1" alt="user" /> <span className="text-dark">{ user.payload.nom+" "+user.payload.prenom }</span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="/Profile"><FeatherIcon className="align-middle mr-1" icon="user" /> Profile</a>
                          
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/settings"><FeatherIcon className="align-middle mr-1" icon="settings" /> Settings & Privacy</a>
                          
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item" style={{ "cursor": "pointer" }} onClick={logout}><FeatherIcon className="align-middle mr-1" icon="log-out" /> Log out</span>
                        </div>

                    </li>
                </ul>
            </div>
        </nav></>
    ) } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}
