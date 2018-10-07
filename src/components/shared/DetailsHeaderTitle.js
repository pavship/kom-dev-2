import React from 'react'

import { Header } from './styled-semantic'
import DetailsHeaderSubitle from './DetailsHeaderSubitle'

const DetailsHeaderTitle = ({ title, subtitle, titleSize }) => {
	return (
		<Header
			m='0'
			size={titleSize || 'medium'}
		>
			{title}
			{subtitle &&
				<DetailsHeaderSubitle
					text={subtitle}
				/>
			}
		</Header>
	)
}

export default DetailsHeaderTitle
