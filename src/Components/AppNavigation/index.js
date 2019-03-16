import React from "react"
import styled from "styled-components"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SideNav, Nav as BaseNav, NavIcon } from "react-sidenav"
import { Icon as BaseIcon } from "react-icons-kit"
// import { dashboard } from "react-icons-kit/fa/dashboard"
// import { users } from "react-icons-kit/fa/users"
import { shoppingCart } from "react-icons-kit/fa/shoppingCart"
// import { cubes } from "react-icons-kit/fa/cubes"
import {key} from 'react-icons-kit/iconic/key'
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
  ExampleBody as Body
} from "../../containers"

import {setNav } from '../../actions/facebook-actions'

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1.2em;
  letter-spacing: 2px;
  width: 150px;
  line-height: 22px;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20",
  selectionBgColor: "#00BCD4"
};

const Text = styled.div`
  font-size: 0.72em;
  text-transform: uppercase;
`;

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class AppNavigation extends React.Component {

  state = { selectedPath: "Licenses" };

  onItemSelection = arg => {
    this.setState({ selectedPath: arg.path });
    this.props.setNav({value:arg.path})
  };

  render() {
    return (
      <Navigation>
          <SideNav
            defaultSelectedPath="Licenses"
            theme={theme}
            onItemSelection={this.onItemSelection}
          >
            {/* <Nav id="Dashboard">
              <IconCnt>
                <Icon icon={dashboard} />
              </IconCnt>
              <Text>Dashboard</Text>
            </Nav> */}
            {/* <Nav id="Users">
              <IconCnt>
                <Icon icon={users} />
              </IconCnt>
              <Text>Users</Text>
            </Nav> */}
            <Nav id="Licenses">
              <IconCnt>
                <Icon icon={key} />
              </IconCnt>
              <Text>Licenses</Text>
            </Nav>
            <Nav id="Products">
              <IconCnt>
                <Icon icon={shoppingCart} />
              </IconCnt>
              <Text>Products</Text>
            </Nav>
          </SideNav>
        </Navigation>
    );
  }
}


AppNavigation.propTypes = {
  setNav: PropTypes.func,
}

const mapStateToProps = ({ licMan }) => {
  return {
      licMan
    }
}

export default connect(
  mapStateToProps,
  {
    setNav,
  }
)(AppNavigation)