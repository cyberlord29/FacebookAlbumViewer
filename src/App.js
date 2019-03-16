import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import {
  PageHeader,
} from 'react-bootstrap'
import {
} from './actions/facebook-actions'
import Albums from './Components/Albums'
import { HeaderWrapper, AppContainer, Body } from "./containers";
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
          <div style={{fontFamily:'sans-serif', fontSize:'16px' ,color:'grey',display:'inline',letterSpacing:'1px'}}>Facebook SDK</div>
        </PageHeader>
        <AppContainer>
          <Body>
           {facebook.page==='albums' && <Albums/>}
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