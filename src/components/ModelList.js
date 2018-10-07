import React, { Component } from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { Accordion, Icon, Label, Header } from 'semantic-ui-react'
import ProdList from './ProdList'

const AccordionTitle = styled(Accordion.Title)`
  &&&& {
    margin-top: 0;
    padding-top: 0;
    ${props => props.active && `{
      padding-bottom: 0;
    }`}
  }
`
const AccordionContent = styled(Accordion.Content)`
  &&&& {
    padding-top: 0;
  }
`

class ModelList extends Component {

  state = { activeIndex: [] }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]

    this.setState({ activeIndex: newIndex })
  }

  render() {

    const { activeIndex } = this.state

    const deptModels = this.props.deptModels.map((deptModel, i) => {
      const prods = deptModel.prods
      const allProdsCount = prods.length
      const prodsReadyCount = prods.filter(p => p.progress === 100).length
      const prodsDefectCount = prods.filter(p => p.hasDefect).length
      const prodsSpoiledCount = prods.filter(p => p.isSpoiled).length
      const prodsInProgressCount = allProdsCount - prodsReadyCount - prodsSpoiledCount

      const active = _.includes(activeIndex, i)

      return (
        <div key={deptModel.model.id} >
          <AccordionTitle
            active={active}
            index={i}
            onClick={this.handleClick}
          >
            <Icon name='dropdown' />
            <Header size='small' as='span'>{deptModel.model.name}
              <Label color='grey'>
                {allProdsCount}
                <Label.Detail>шт</Label.Detail>
              </Label>
            </Header>
            <Label.Group className='komz-ml-21px'>
              {(prodsReadyCount > 0) &&
                <Label basic>
                  <Icon name='checkmark' color='green' />
                  {prodsReadyCount}
                  <Label.Detail>ГП</Label.Detail>
                </Label>
              }
              {(prodsInProgressCount > 0) &&
                <Label basic>
                  {prodsInProgressCount}
                  <Label.Detail>НЗП</Label.Detail>
                </Label>
              }
              {(prodsDefectCount > 0) &&
                <Label basic>
                  <Icon name='warning sign' color='orange' />
                  {prodsDefectCount}
                  <Label.Detail>ОТКЛОН</Label.Detail>
                </Label>
              }
              {(prodsSpoiledCount > 0) &&
                <Label basic>
                  <Icon name='broken chain' color='red' />
                  {prodsSpoiledCount}
                  <Label.Detail>БРАК</Label.Detail>
                </Label>
              }
            </Label.Group>
          </AccordionTitle>
          {active &&
            <AccordionContent active>
              <ProdList prods={deptModel.prods} selectProd={this.props.selectProd} />
            </AccordionContent>
          }
        </div>
      )
    })

    return (
      <Accordion>
        {deptModels}
      </Accordion>
    )
  }
}

export default ModelList
