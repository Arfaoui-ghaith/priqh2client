import React from 'react'

export default function Footer() {
    return (
        <footer className="footer">
			<div className="container">
				<div className="row text-muted">
					<div className="text-center">
						<p className="mb-0">
                            &copy; {new Date().getFullYear()} L'ARRU -  
							<a href="https://www.linkedin.com/in/sarra-garbouj-9136101bb/" target="_blank" className="text-muted"><strong> Sarra Garbouj </strong></a> 
                             &  
                            <a href="https://www.linkedin.com/in/ghaith-arfaoui-%F0%9F%9A%80-7501aa180/" target="_blank" className="text-muted"><strong> Ghaith Arfaoui</strong></a>
						</p>
					</div>
					
				</div>
			</div>
		</footer>
    )
}
