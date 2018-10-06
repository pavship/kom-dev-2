import React from 'react'
import _ from 'lodash'

import { Menu, Icon, Dropdown} from 'semantic-ui-react'
import CRUProdModal from './CRUProdModal'
import MoveModal from './MoveModal'

const allTypes = [{
  type: 'OWNED',
  title: 'Наши'
},{
  type: 'TRANSPORT',
  title: 'Транспорт'
},{
  type: 'PARTNER',
  title: 'Подрядчики'
},{
  type: 'CLIENT',
  title: 'Клиенты'
}]

const NavBar = ({ refreshToken, visibleDeptTypes, filterDeptType, moveProds }) => {
  return (
    <Menu size='huge' inverted >
      <Menu.Item header>KOMZ</Menu.Item>
      <Menu.Menu>
        {/* <Menu.Item icon name='home' as={ NavLink } exact to='/' color='grey'>
          <Icon name='home' />
        </Menu.Item> */}
        <CRUProdModal mode='create' id='' trigger={
          <Menu.Item icon link name='create' color='grey'>
            <Icon name='plus' />
          </Menu.Item>
        } />
        <MoveModal moveProds={moveProds} trigger={
          <Menu.Item icon link name='move' color='grey'>
            <Icon name='arrow right' />
          </Menu.Item>
        } />
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Dropdown item icon='setting' simple className='komz-navBarSettingsItem'>
          <Dropdown.Menu>
            <Dropdown.Header>Участки</Dropdown.Header>
            {allTypes.map(({ type, title }) => {
              const active = _.includes(visibleDeptTypes, type)
              return (
                <Dropdown.Item
                  key={type}
                  type={type}
                  active={_.includes(visibleDeptTypes, type)}
                  onClick={(e, t) => filterDeptType(t.type)}
                >
                  <Icon name={active ? 'checkmark box' : 'square outline'} />
                  {title}
                </Dropdown.Item>
            )})}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          icon
          onClick={() => refreshToken(null)}
        >
          <Icon name='sign out' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
