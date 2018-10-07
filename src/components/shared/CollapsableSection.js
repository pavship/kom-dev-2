import React, { Component } from 'react'

import styled from 'styled-components'
import { Section } from './styled-semantic'

import DetailsHeader from './DetailsHeader'

const OuterSection = styled(Section)`
  &&&& { 
    padding: 0;
    ${props => props.expanded && `{
      margin-top: -1px;
      border-bottom-color: rgba(34, 36, 38, 0.15);
    }`}
  }
`
const SSection = styled(Section)`
  &&&& { 
    padding-top: 0;
  }
`

class CollapsableSection extends Component {
  state = {
    expanded: false
  }
  render() {
    const { expanded } = this.state
    const { title, subtitle, children, size } = this.props
    return (
      <OuterSection
        expanded={expanded ? 1 : 0}
        topBorder={expanded}
        bottomBorder={expanded}
      >
        <DetailsHeader
          expanded={expanded}
          title={title}
          subtitle={subtitle}
          titleSize={size || 'small'}
          onClick={() => this.setState({ expanded: !expanded})}
        />
          {expanded &&
            <SSection>
              {children}
            </SSection>
          }
      </OuterSection>
    )
  }
}

export default CollapsableSection
