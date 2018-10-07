import React, { Component } from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { Accordion, Segment } from 'semantic-ui-react'

import ModelList from './ModelList'
import CollapsableSection from './shared/CollapsableSection';

const SSegment = styled(Segment)`
  &&&& {
    padding: 0;
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
        function (dMs, prods) {
          dMs.push({
            model: { ...prods[0].model },
            prods: _.sortBy(prods.map(p => {
              console.log('a.progress > ', p.fullnumber, p.progress, parseFloat(p.progress))
              delete p.model
              return p
            }), function(o) { return -(o.progress || !o.progress); })
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
            <SSegment
              key={dept.id}
              color={
                dept.type === 'TRANSPORT' ? 'green' :
                dept.type === 'PARTNER' ? 'blue' :
                dept.type === 'CLIENT' ? 'purple' :
                'black'
            }>
              <CollapsableSection
                size='large'
                title={dept.name}
                subtitle={`(${dept.prodsCount})`}
              >
                <ModelList deptModels={dept.deptModels} selectProd={this.props.selectProd}/>
              </CollapsableSection>
            </SSegment>
          )}
        )}
      </Accordion>
    )
  }

}

export default DeptList
