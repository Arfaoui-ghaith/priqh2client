import React from 'react'

export default function FormBei(n,i) {
    
	const [selectedImg, setSelectedImg]=React.useState(i);
    function handleChange(event) {
        setSelectedImg( URL.createObjectURL(event.target.files[0]));
        }
    return (
        <div className="row">
        <div className="col-md-8">
        <div className="mb-3 col-md-6">
            <label className="form-label" htmlFor="inputFirstName">Nom</label>
            <input type="text" className="form-control" placeholder={n} />
        </div>
       
        </div>
        <div className="col-md-4">
            <div className="text-center">
                <img src={selectedImg} width="150" height="100" alt="image" />
                <div className="mt-2">
                    <input type="file" id="image" onChange={handleChange}  />
                </div>
            </div>
        </div>
    </div>
    )
}
