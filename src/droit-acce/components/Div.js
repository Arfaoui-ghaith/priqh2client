import React from 'react'

export default function Div() {
    return (
        <div>
			<input type="checkbox" id="box-r1" value="admin" />
			<label for="box-r1">role 1 </label>

			<input type="checkbox" id="box-r2" value="directeur" />
			<label for="box-r2">role 2</label>

			<input type="checkbox" id="box-r3" value="g1" />
			<label for="box-r3">role 3</label>

			<input type="checkbox" id="box-r4" value="g2" />
			<label for="box-r4">role 4</label>
        </div>
    )
}
