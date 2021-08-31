import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from '@syncfusion/ej2-react-layouts';
import * as React from 'react';
import Infrastructures from './Infrastructures';
import TrancheList from './TrancheList';
import AreaChartInfra from './AreaChartInfra';
import TauxTotale from './TauxTotale';

export default function Index() {

    const [projet, setProjet] = React.useState(null);

    const cellSpacing = [10, 10];

    function lise() {
        return <TrancheList setProjet={setProjet} />
    }

    function voirie(){
        return (<AreaChartInfra  projet={projet}/>);
    }

    function eau(){
        return (<AreaChartInfra  projet={projet}/>);
    }

    function eclairage(){
        return (<AreaChartInfra  projet={projet}/>);
    }

    function drainage(){
        return (<AreaChartInfra  projet={projet}/>);
    }

    function assainissement(){
        return (<AreaChartInfra  projet={projet}/>);
    }

    function infrastructures(){
        
        return (<Infrastructures  projet={projet}/>);
    }

    React.useEffect(() => {
        console.log(projet);
    },[projet])
   
    return (
    <div>
     <div className="control-section">
        <DashboardLayoutComponent id='defaultLayout' cellSpacing={cellSpacing} columns={5}>
        <PanelsDirective>
            <PanelDirective sizeX={1} sizeY={1} row={0} col={0} header='<div>Voirie</div>' content={voirie}></PanelDirective>
            <PanelDirective sizeX={3} sizeY={2} row={0} col={1} header='<div>Infrastructures</div>' content={infrastructures}></PanelDirective>
            <PanelDirective sizeX={1} sizeY={2} row={0} col={4} content={lise}></PanelDirective>
            <PanelDirective sizeX={1} sizeY={1} row={1} col={0} header='<div>Eau potable</div>' content={eau}></PanelDirective>
            <PanelDirective sizeX={1} sizeY={1} row={2} col={0} header='<div>Eclairage Public</div>' content={eclairage}></PanelDirective>
            <PanelDirective sizeX={1} sizeY={1} row={2} col={1} header='<div>Drainage des eaux pluviales</div>' content={drainage}></PanelDirective>
            <PanelDirective sizeX={1} sizeY={1} row={2} col={2} header='<div>Assainissement</div>' content={assainissement}></PanelDirective>
            <PanelDirective sizeX={2} sizeY={1} row={2} col={3} header='<div>Assainissement</div>' content={TauxTotale}></PanelDirective>
        </PanelsDirective>
        </DashboardLayoutComponent>
      </div>
    </div>
    );
    
}