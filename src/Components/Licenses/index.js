import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../index.css'

import {
  setParams,
} from '../../actions/facebook-actions'
import {
  Card,
  Button
} from 'reactstrap'
import cx from 'classnames'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


class Licenses extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreate:false,
      selectedRow:[],
      auth:''
    }
    this.FB={}
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  initializeFacebookLogin = () => {
    this.FB = window.FB;
    this.FB.getLoginStatus((response) => {
      this.props.setParams({id:'auth' , value:response.authResponse})
      this.props.setParams({id:'status' , value:response.status})
      if(response.status==='connected')
      this.getPage1()
      
    }) 
  }

  getPage1=()=>{
    this.FB = window.FB;
    this.FB.getLoginStatus((response) => {
      this.FB.api('/me?fields=albums.limit(100){name,count,cover_photo{picture}}', response => {
        console.log('albums',response);
        this.props.setParams({id:'albums',value:response.albums.data})
      });
      this.FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(150).height(150)'}, response => {
        console.log(response);
        this.props.setParams({id:'name',value:response.name})
        this.props.setParams({id:'profilePic',value:response.picture.data.url})

			});          

    })
 
  }


  isValid = () => {
    var a =Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}).length === 0
    // console.log( Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}))
    return a 
  }

  login = () => {
    this.FB = window.FB;
    this.FB.login((response) => {
      if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ',response);
        this.props.setParams({id:'auth' , value:response.authResponse})
        this.props.setParams({id:'status' , value:response.status})
        this.getPage1()
      } else {
      console.log('User cancelled login or did not fully authorize.');
      }
    },{scope: 'public_profile,email,user_photos',return_scopes:"true"}); 
   
  }

  logout = () => {
    this.FB = window.FB;
    this.FB.getLoginStatus((response)=> {
      if (response && response.status === 'connected') {
        this.FB.logout((response)=>{
          this.props.setParams({id:'auth' , value:response.authResponse})
          this.props.setParams({id:'status' , value:response.status})
        });
      }
    });
  }

  renderheading = () => {
    if(this.state.selectedRow.length>0)
      return(
        <div>License Details</div>
      )
    else
      return(
        <div>Create License</div>
      )
  }
  
  nextPage=(e)=>{
    this.props.setParams({id:'selectedAlbum',value:e.target.id})
    this.props.setParams({id:'page',value:'photos'})
  }

  renderCovers = () => {
    const {
      facebook
    } = this.props
    return (
      <div className='albums'>
    {facebook.albums.map(album => {
        console.log(album)
          return (
            album.cover_photo && 
            <Card className={cx('coverCard')} itemRef={album.id} >
              {
                  <div>
                    <div className='info'>
                      <div>{album.name}</div>
                      <div>{album.count} pictures</div>
                    </div>
                    <img
                      id={album.id}
                      onClick={(e)=>this.nextPage(e)}
                      className='coverImage'
                      src={album.cover_photo.picture}
                      alt=''
                    />
                  </div>
    
              }
            </Card>

          )
        })
    }
      </div>
    )
  }

  
  render () {
    const {
      facebook
    } = this.props
    return (
      <div className='albumPage'>
      <div className='flexrow'>
        <Card><img src={facebook.profilePic}></img></Card>
        <div className='control'> 
          {facebook.status!=='connected' && <Button size='lg' onClick={this.login}>Login</Button>}
          {facebook.status==='connected' && <Button size='lg' onClick={this.logout}>Logout</Button>}
        </div>
      </div>
        {facebook.status==='connected' && this.renderCovers()}
      </div>
    )
  }
}

Licenses.propTypes = {
  setParams: PropTypes.func,
}

const mapStateToProps = ({ facebook }) => {
  return {
      facebook
    }
}

export default connect(
  mapStateToProps,
  {
    setParams,
  }
)(Licenses)