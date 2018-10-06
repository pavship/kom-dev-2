import React, { Component } from 'react'
import _ from 'lodash'

import { graphql, compose } from 'react-apollo'
import { allDepts } from '../graphql/dept'
// import { moveProds } from '../graphql/prod'

import { Container } from 'semantic-ui-react'

import NavBar from './NavBar'
import DeptList from './DeptList'
import DataLoadErrorMessage from './common/DataLoadErrorMessage'

import gql from 'graphql-tag'
const moveProds = gql`
  mutation moveProds ( $to: ID!, $prodIds: [ID!]!) {
    moveProds (
      to: $to,
      prodIds: $prodIds
    ) { success }
  }
`

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
    const result = await this.props.moveProds({
     variables: {
       to: deptId,
       prodIds: selectedProds
     }
    })
    console.log(result)
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
      refetchQueries: ['allDepts']
    }
  })
) (Store)
