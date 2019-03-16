import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
import {
  PageHeader,
} from 'react-bootstrap'
import {
} from './actions/facebook-actions'
import cx from 'classnames'
import AppNavigation  from './Components/AppNavigation'
import Licences from './Components/Licenses'
import { HeaderWrapper, AppContainer, FlexBox, Body, Title } from "./containers";
import Photos from './Components/Photos'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    
  }

  componentDidMount(){
  }

  render () {
    const {
      facebook
    } = this.props
    return (
      <HeaderWrapper>
        <PageHeader className='header'>
          <div style={{fontFamily:'Agency FB', fontSize:'16px' ,color:'grey',display:'inline',letterSpacing:'1px'}}>CONSOLE</div>
        </PageHeader>
        <AppContainer>
          <Body>
           {facebook.page==='albums' && <Licences/>}
           {facebook.page==='photos' && <Photos/>}
          </Body>
        </AppContainer>
       </HeaderWrapper>
    )
  }
}

App.propTypes = {

}

const mapStateToProps = ({ facebook }) => {
  return {
      facebook
    }
}

export default connect(
  mapStateToProps,
  {

  }
)(App)