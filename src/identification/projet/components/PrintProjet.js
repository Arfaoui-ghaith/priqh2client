import React from "react";
import ReactToPrint from 'react-to-print-advanced';
import ComponentToPrint from './TableProj';
import DataTable1 from './DataTable1';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap'

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

export default function PrintProjet(props) {

      const componentRef = React.useRef();
      const [loading, setLoading] = React.useState(true);

      const test_eligible = async() => {
        try{
          const url = `http://priqh2server.herokuapp.com/api/v1/criteres/test_eligible`;
          const res = await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
              method: 'get',
              url,
          });
    
          toast.success('Success', {
            position: 'top-right',
            autoClose: 5000,
            draggable: false
          });
    
          window.location.replace("/Eligible");
    
        }catch(err){
          console.log(err.response.data.message);
          
          toast.error(err.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            draggable: true
          });
        }
      }

      return (
        <div>
          <ToastContainer />
          <Row className="mt-2">
						<Col>
         
            </Col>
            <Col md="auto">
              <Button  className="btn btn-primary" size="primary" onClick={() => test_eligible()}>
                <FeatherIcon icon="filter"/>
							</Button>
            </Col>
            
					</Row>
        
          {
            loading ?
            <div className="d-flex justify-content-center">
            <Col md="auto" >
            <Spinner
							as="span"
							animation="border"
							size="lg"
              variant="primary"
							role="status"
							aria-hidden="true"
						/> </Col></div>: ''}
            <ComponentToPrint loading={loading} setLoading={setLoading} setShow={props.setShow}/>
          
        </div>
      );
}

  