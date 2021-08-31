import React from "react";
import ReactToPrint from 'react-to-print-advanced';
import ComponentToPrint from './TableTranche';
import FeatherIcon from 'feather-icons-react';
import FormUpdateTranche from './FormUpdateTranche';
import { Row, Col, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pageStyle = `
  @page {
    size: 80mm 50mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

function PrintTranche(props) {

  const componentRef = React.useRef();

      return (
        <div>
          <ToastContainer />
          <Row className="mt-2">
          <Col>
          
          </Col>

          <Col>
          
          </Col>

			    <Col md="auto">
          
          </Col>

			    <Col md="auto">
         
          </Col>
         
          <Col md="auto">
            <ReactToPrint
                trigger={() => <button className="btn btn-primary" size="primary"><FeatherIcon icon="printer" /></button>}
                content={() => componentRef.current}
                style={pageStyle}
            />
					</Col>
			</Row>
          
          <ComponentToPrint projets={props.tranche.projets} ref={componentRef}/>

        </div>
      );
    
  }
  
export default PrintTranche;
  