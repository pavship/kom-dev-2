import React, { Component } from 'react'
import _ from 'lodash'

import { graphql, compose } from 'react-apollo'
import { allDepts } from '../graphql/dept'
import { moveProds } from '../graphql/prod'

import { Container } from 'semantic-ui-react'

import NavBar from './NavBar'
import DeptList from './DeptList'
import DataLoadErrorMessage from './common/DataLoadErrorMessage'

class Store extends Component {
  state={
    selectedProds: [],
    visibleDeptTypes: ['OWNED', 'TRANSPORT']
  }
  selectProd = (prodId) => {
    const { selectedProds } = this.state
    const newList = _.includes(selectedProds, prodId) ? _.without(selectedProds, prodId) : [...selectedProds, prodId]
    this.setState({ selectedProds: newList })
  }
  filterDeptType = (type) => {
    console.log('type > ', type)
    const {visibleDeptTypes} = this.state
    const newList = _.includes(visibleDeptTypes, type) ? _.without(visibleDeptTypes, type) : [...visibleDeptTypes, type]
    this.setState({ visibleDeptTypes: newList })
  }
  moveProds = async (deptId) => {
    const { selectedProds } = this.state
    await this.props.moveProds({
      variables: {
        to: deptId,
        prodIds: selectedProds
      }
    })
  }
  render() {
    const {visibleDeptTypes} = this.state
    const { refreshToken, allDepts: { loading, error, depts } } = this.props
    return (
      <Container text>
        <NavBar
          refreshToken={refreshToken}
          visibleDeptTypes={visibleDeptTypes}
          filterDeptType={this.filterDeptType}
          moveProds={this.moveProds}
        />
        { loading ? <div>Загрузка</div> :
          error ? <DataLoadErrorMessage dataTitle='DeptList' /> :
          <DeptList
            depts={depts.filter(dept => _.includes(visibleDeptTypes, dept.type) ? true : false)}
            selectProd={this.selectProd}
          />
        }
      </Container>
    )
  }
}

export default compose (
  graphql( allDepts, { name: 'allDepts' }),
  graphql( moveProds, {
    name: 'moveProds',
    options: {
      update: (cache, { data: reponseData }) => {
        const { prods, to }= reponseData.moveProds
        const query = allDepts
        const data = cache.readQuery({ query })
        const allMovedProds = _(prods).groupBy('dept.id').reduce(
          function(allMovedProds, prods, deptId) {
            const dept = data.depts.find(d => d.id === deptId)
            const deptMovedProds = _.intersectionBy(dept.prods, prods, 'id')
            dept.prods = _.differenceBy(dept.prods, prods, 'id')
            return [...allMovedProds, ...deptMovedProds]
          }, []
        )
        console.log('allMovedProds > ', allMovedProds)
        const dept = data.depts.find(d => d.id === to)
        dept.prods = [...dept.prods, ...allMovedProds]
        cache.writeQuery({ query, data })
      },
      // refetchQueries: ['allDepts']
    }
  })
) (Store)
