import React, { Profiler } from 'react';
import SidebarItem from './SidebarItem';
import { useAuthState } from '../../context/auth';

export default function Sidebar(props) {

	const { user } = useAuthState();
	
	const [selectedItem, setSelectedItem]=React.useState(window.location.href.slice(22,window.location.href.length));

	
	if(user !== null && user !== undefined){
    return (
        <nav id="sidebar" className="sidebar">
			<div className="sidebar-content js-simplebar">
				<span className="sidebar-brand" href="index.html">
                    <span className="px-4">
                        <img src="img/photos/priqh.png" alt="priqh2" style={{ "height": "80px" }}/>
                    </span>
                </span>

				<ul className="sidebar-nav">
					
					{ user.payload.interfaces.filter((el) => ["gestion des utilisateurs", "gestion des roles", "gestion des groupes", "gestion des fonctionalites", "gestion des interfaces", "gestion des tracabilites"].indexOf(el.titre) > -1).length > 0 ? 
					<li className="sidebar-header">
						Droits d'accès
					</li> : ""}

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des utilisateurs").length > 0 ?  
					<SidebarItem title="Utilisateurs" icon="users" l="/Utilisateurs" selecteditem={selectedItem} setselecteditem={setSelectedItem}/>
					: ""}

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des roles").length > 0 ?
					<SidebarItem title="Roles" icon="briefcase" l="/Roles" selecteditem={selectedItem} setselecteditem={setSelectedItem}/>
					: "" }

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des groupes").length > 0 ?
					<SidebarItem title="Groupes" icon="book" l="/Groupes" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des fonctionalites").length > 0 ?
					<SidebarItem title="Fonctionalites" icon="book" l="/Fonctionalites" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" } 
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des interfaces").length > 0 ?
					<SidebarItem title="Interfaces" icon="layout" l="/Interfaces" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" } 
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des tracabilites").length > 0 ?
					<SidebarItem title="Tracabilites" icon="search" l="/Traces" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" } 
						
					
					{ user.payload.interfaces.filter((el) => ["gestion des communes", "gestion des quartiers", "gestion des criteres", "gestion des projets", "gestion des tranches"].indexOf(el.titre) > -1).length > 0 ? 
					<li className="sidebar-header">
						Identification des projets
					</li> : ""}

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des communes").length > 0 ? 
					<SidebarItem title="Communes" icon="list" l="/communes" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des quartiers").length > 0 ? 
					<SidebarItem title="Quartiers" icon="map-pin" l="/Quartiers" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des criteres").length > 0 ? 
					<SidebarItem title="Critéres d'éligibilité" icon="filter" l="/Critéres d'éligibilité" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des projets").length > 0 ? 
					<SidebarItem title="Projets" icon="clipboard" l="/Projets" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des tranches").length > 0 ? 
					<SidebarItem title="Tranches" icon="pie-chart" l="/Tranches" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					

					{ user.payload.interfaces.filter((el) => ["gestion des bailleurs", "gestion des memoires"].indexOf(el.titre) > -1).length > 0 ? 
					<li className="sidebar-header">
						Financement
					</li> : ""}
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des bailleurs").length > 0 ? 
					<SidebarItem title="Beilleurs de fond" icon="users" l="/beilleurs" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des memoires").length > 0 ? 
					<SidebarItem title="Memoire" icon="dollar-sign" l="/Memoire" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
	
					{ user.payload.interfaces.filter((el) => ["gestion des avancements", "gestion des decomptes", "gestion des prestataires"].indexOf(el.titre) > -1).length > 0 ? 
					<li className="sidebar-header">
						Suivi de Travaux
					</li> : ""}
				
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des avancements").length > 0 ? 
					<SidebarItem title="Avancement" icon="trending-up" l="/Avancement" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des decomptes").length > 0 ? 
					<SidebarItem title="Decompte" icon="dollar-sign" l="/Decompte" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }
					{ user.payload.interfaces.filter((el) => el.titre === "gestion des prestataires").length > 0 ? 
					<SidebarItem title="Prestataire" icon="dollar-sign" l="/Prestataire" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }

					<li className="sidebar-header">
						profile
					
					</li>
					<SidebarItem title="Mon profile" title2="settings" icon="user" l="/Profile" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="deconnection" icon="log-out" l="/login" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					
				</ul>

				
			</div>
		</nav>
    ) } else {
		return(
			<React.Fragment></React.Fragment>
		);
	}
}
