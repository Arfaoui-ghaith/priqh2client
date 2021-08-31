import React from 'react';
import "react-svg-map/lib/index.css";
import Tunisia from '@svg-maps/tunisia';
import { useStoreDispatch } from '../../../context/store';
import { SVGMap } from "react-svg-map";

export default function Carte() {

	const dispatch = useStoreDispatch();

		return (
			<article className="examples__block">
       		<div>
				<div className="examples__block__map">
				<div className="card-body">
					<div id="world_map" style={{"height":"350px"}} className="jvm-container">
						<SVGMap 
							data-for='test'
							map={Tunisia}
							
							onLocationFocus={(e) => dispatch({ type:'gouvernoratEdit', payload: e.target.ariaLabel })}
							
						/>
			
					</div>
				
        		</div>

			</div>
			</div>
			</article>
		);
	
}
