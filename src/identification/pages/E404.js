import React from 'react'
import './Estyle.css'
import ReactDOM from "react-dom";

export default function E404() {
   
    return (
        <main className="d-flex w-100 h-100">
            
        <div className="container d-flex flex-column">
            <div className="row vh-100">
                <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                    <div className="d-table-cell align-middle">

                        <div className="text-center">
                            <h1 className="display-1 font-weight-bold">404</h1>
                            <p className="h1">Page n'est pas trouvée.</p>
                            <p className="h2 font-weight-normal mt-3 mb-4">La page que vous recherchez a peut-être été supprimée.</p>
                          
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>

    )
}
