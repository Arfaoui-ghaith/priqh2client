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

const [show, setShow] = React.useState(false);

const deleteTranche = async () => {
console.log(props.tranche)
  try {
    const url =`http://priqh2server.herokuapp.com/api/v1/tranches/${props.tranche.id}`;
    const res = await axios({
      headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
        method: 'delete',
        url,
    });

    toast.success('Success', {
      position: 'top-right',
      autoClose: 5000,
      draggable: false
    });
    window.location.replace('/Tranches');

  } catch (err) {
    toast.error(err.response.data.message, {
      position: 'top-right',
      autoClose: 5000,
      draggable: true
    });
    setShow(false);
  }
}

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
            <button className="btn btn-danger" onClick={() => setShow(true)} size="primary"><FeatherIcon icon="trash" /></button>
          </Col>

			    <Col md="auto">
          <button className="btn btn-primary" data-toggle="modal" data-target="#modif" size="primary"><FeatherIcon icon="settings" /></button>
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

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want delete decompte of this Tranche {props.tranche.numero} !</Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={() => { deleteTranche() }}>
            Supprimer
          </Button>
          </Modal.Footer>
        </Modal>

        <div className="modal fade" id="modif" tabIndex="-1" role="dialog" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<div className="col-12 col-xl-12">
										<div className="card">
											<div className="modal-header">
												<h5 className="modal-title">Modifier Tranche</h5>
												<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="card-body">
												<FormUpdateTranche tranche={props.tranche} />
											</div>
										</div>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
  }
  
export default PrintTranche;
  