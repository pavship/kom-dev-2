import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Section, Caret } from './styled-semantic'

const SIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		width: calc(35px - 1em);
		margin: 0 0.5em;
	}
`
const SCaret = styled(Caret)`
	&&& {
		box-sizing: content-box;
		width: calc(35px - 1em);
		margin: 0 0.5em;
	}
`

const DetailsHeaderContainer = ({ closeDetails, expanded, onClick, children }) => {
	const headerType = !!closeDetails ? 'main' : 'expandable'
	return (
		<Section
			head
			noIndent
			bottomBorder
			minor
			onClick={onClick}
		>
			{headerType === 'main'
				?	<SIcon link
						size='big'
						name='cancel'
						onClick={closeDetails}
					/>
				:	<SCaret
						size='large'
						active={expanded ? 1 : 0}
					/>
			}
			{children}
		</Section>
	)
}

export default DetailsHeaderContainer
