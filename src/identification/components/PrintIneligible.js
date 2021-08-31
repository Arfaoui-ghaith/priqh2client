import React from "react";
import ReactToPrint from 'react-to-print-advanced';
import ComponentToPrint from './TableProjetIneligible';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Button } from 'react-bootstrap';
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

function PrintIneligible() {

  const componentRef = React.useRef();

      return (
        <div>
          <ToastContainer />
          <Row className="mt-2">
			<Col>
            </Col>
			<Col md="auto">
                
            </Col>
         
          <Col md="auto">
            <ReactToPrint
                trigger={() => <button className="btn btn-primary mr-5" size="primary"><FeatherIcon icon="printer" /></button>}
                content={() => componentRef.current}
                style={pageStyle}
            />
					</Col>
			</Row>
          
          <ComponentToPrint ref={componentRef}/>
        </div>
      );
    
  }
  
export default PrintIneligible;
  