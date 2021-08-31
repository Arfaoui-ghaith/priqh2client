import React from 'react';
import FeatherIcon from 'feather-icons-react';

export default function SidebarItem({title, icon,l, selecteditem,title2, setselecteditem}) {
    
    const refreshPage = (e) => {
        window.location.replace(l);
    }

    return (
        <li className={selecteditem === title || selecteditem === title2 ? "sidebar-item active" : "sidebar-item "} onClick={refreshPage}>
            <span className="sidebar-link" onClick={()=> setselecteditem(title)}>
            <FeatherIcon icon={icon}/>
                <span className="align-middle">{title}</span>
            </span>
       </li>
    )
}
