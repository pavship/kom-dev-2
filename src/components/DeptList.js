import React, { Component } from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { Accordion, Icon, Segment, Header } from 'semantic-ui-react'
import { Caret } from './shared/styled-semantic'

import ModelList from './ModelList'

const Title = styled(Accordion.Title)`
  &&&& {
    padding-bottom: 0;
  }
`

const SIcon = styled(Icon)`
  i {
    font-size: 1.5rem !important;
  }
`

const Span = styled.span`
  &&&& {
    font-size: 1.25rem;
  }
`

class DeptList extends Component {

  state = { activeIndex: [] }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const { depts: propDepts } = this.props
    const depts = _.cloneDeep(propDepts).map(d => ({
      ...d,
      prodsCount: d.prods.length,
      deptModels: _(d.prods).groupBy('model.id').reduce(
        function (dMs, prods, key) {
          dMs.push({
            model: { ...prods[0].model },
            prods: prods.map(p => {
              delete p.model
              return p
            })
          })
          return dMs
        }, []
      ),
      prods: 'cleared'
    }))
    console.log('depts > ', depts)
    return (
      <Accordion fluid>
        {depts.map((dept, i) => {
          const active = _.includes(activeIndex, i)
          return (
            <Segment
              key={dept.id}
              color={
                dept.type === 'TRANSPORT' ? 'green' :
                dept.type === 'PARTNER' ? 'blue' :
                dept.type === 'CLIENT' ? 'purple' :
                'black'
              }>
              <Title
                active={active}
                index={i}
                onClick={this.handleClick}
              >
                {/* <SIcon name='dropdown' size='large' /> */}
                <Caret
                  size='large'
                  active={1}
                />
                <Header size='large' as='span'>
                  {dept.name} <Span>
                    ({dept.prodsCount})
                  </Span>
                </Header>
                {/* <Button icon='plus' size='small' floated='right' /> */}
              </Title>
              { active &&
                <Accordion.Content active>
                  <ModelList deptModels={dept.deptModels} selectProd={this.props.selectProd}/>
                </Accordion.Content>
              }
            </Segment>
          )}
        )}
      </Accordion>
    )
  }

}

export default DeptList
