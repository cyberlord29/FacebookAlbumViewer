import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../index.css'
import {Responsive , WidthProvider } from 'react-grid-layout'
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
const ResponsiveGridLayout = WidthProvider(Responsive);


class Albums extends Component {
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
        this.props.setParams({id:'albums',value:response.albums.data})
      });
      this.FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(150).height(150)'}, response => {
        this.props.setParams({id:'name',value:response.name})
        this.props.setParams({id:'profilePic',value:response.picture.data.url})

			});          

    })
 
  }


  isValid = () => {
    var a =Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}).length === 0
    return a 
  }

  login = () => {
    this.FB = window.FB;
    this.FB.login((response) => {
      if (response.authResponse) {
        this.props.setParams({id:'auth' , value:response.authResponse})
        this.props.setParams({id:'status' , value:response.status})
        this.getPage1()
      } else {
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
            <ResponsiveGridLayout 
        className='layout' rowHeight={80} width={1500}
        breakpoints={{lg: 1600, md: 1200, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 9, sm: 2 ,  xs: 1, xxs: 1}}
        isDraggable={ false }
        style={{background:'#f7f7f7', marginBottom: '10px'}}
    >
    {facebook.albums.map((album,i) => {

          return (
            <div key={i}  data-grid={{x: i%9, y: 0, w: 1, h: 2, static: false}}>
            <Card className={cx('coverCard')} >

              {  album.cover_photo && 

                    <img
                      id={album.id}
                      onClick={(e)=>this.nextPage(e)}
                      className='coverImage'
                      src={album.cover_photo.picture}
                      alt=''
                    />
    
              }
                          <div className='info'>
                      <div>{album.name}</div>
                      <div>{album.count} pictures</div>
                    </div>
            </Card>
            
            </div>

          )
        })
    }
    </ResponsiveGridLayout>
      </div>
    )
  }

  
  render () {
    const {
      facebook
    } = this.props
    return (
      <div className='albumPage'>
        <div className='control'> 
          {facebook.status!=='connected' && <Button style={{fontSize:'2em'}}  onClick={this.login}>Login</Button>}
          {facebook.status==='connected' && <Button style={{fontSize:'2em'}} onClick={this.logout}>Logout</Button>}
        </div>
        {facebook.status==='connected' &&
          <div className='profile' style={{display:'flex',flexDirection:'column',width:'160px'}}>
          <img src={facebook.profilePic} alt=''></img>
          <a className = 'name' style={{fontSize:'14px'}}>{facebook.name}</a>
          </div>
        }
        {facebook.status==='connected' && this.renderCovers()}
      </div>
    )
  }
}

Albums.propTypes = {
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
)(Albums)