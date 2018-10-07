import React from 'react'

import { Div, Button } from './styled-semantic'


const DetailsHeaderButtons = ({ loading, refresh, editMode, edit }) => {
	return (
		<Div
			ml='auto'
		>
			<Button
				icon='edit'
				activeColor='blue'
				active={editMode}
				onClick={edit}
			/> 
		</Div>
	)
}

export default DetailsHeaderButtons
