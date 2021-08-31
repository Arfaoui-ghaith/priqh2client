import * as React from 'react';
import { ListViewComponent  } from '@syncfusion/ej2-react-lists';
import axios from 'axios';
import './listBox.css';

export default function TrancheList({ setProjet }) {

    const [tranches, setTranches] = React.useState([]);

    const fetchTranches= async () => {
		try {
			const url ='http://priqh2server.herokuapp.com/api/v1/tranches/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

            let data = [];
            for(const tranche of res.data.tranches){
                let obj = { id: tranche.numero, text: `Tranche ${tranche.numero}`, icon: "folder" }
                let i = 0;
                let child = [];
                for(const projet of tranche.projets){
                    child.push({ id: i+'-'+tranche.numero, text: projet.code, icon: "file", value: projet });
                    i++;
                }
                obj.child = child;
                data.push(obj);
            }

            console.log(data);
			setTranches(data);

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchTranches();
    },[]);

        const fields = { iconCss: "icon", tooltip: "text" };
    
        function onSelect (state){
            if(!state.text.startsWith('Tranche')){
                console.log(state);
                setProjet(state.data.value);
            }
        }

        return (
        <div>
            <ListViewComponent id="listview" dataSource={tranches} fields={fields} headerTitle="Lise des Tranches" showIcon={true} showHeader={true} select={onSelect}/>
        </div>
        );
    
}
