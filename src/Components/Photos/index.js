import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../index.css'
import Viewer from '../../Components/ImageViewer'
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
const ResponsiveGridLayout = WidthProvider(Responsive);

class Photos extends Component {
  constructor(props){
    super(props)
    this.state = {
      showViewer:false,
      selectedRow:[],
      auth:''
    }
    this.FB={}
  }

  componentDidMount() {
      this.getPhotos()
  }

  componentWillUnmount() {
  }

  getPhotos = () => {
    const {
        facebook
      } = this.props
    let albumId = facebook.selectedAlbum
    this.FB = window.FB;
    this.FB.getLoginStatus((response) => {
      this.props.setParams({id:'auth' , value:response.authResponse})
      this.props.setParams({id:'status' , value:response.status})
      this.FB.api(albumId + '/?fields=photos.limit(100){picture,images}', response => {
        response.photos.data.forEach(photo => {
            photo.pictureBig = photo.images[0].source;
            delete photo.images; 
          });
          console.log(response)
          this.props.setParams({id:'albumPhotos',value:response.photos.data})
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
        this.props.setParams({id:'auth' , value:response.authResponse})
        this.props.setParams({id:'status' , value:response.status})
        this.FB.api('/me?fields=albums.limit(5){name,count,cover_photo{picture}}', response => {
          this.props.setParams({id:'albums',value:response.albums.data})
        });
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

  renderThumbs = () => {
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
    {facebook.albumPhotos.map((album,i) => {
        console.log(album.picture)
          return (
            album.picture &&                            
             <div key={i} style={{padding:'2px'}} data-grid={{x: i%9, y: 0, w: 1, h: 2, static: false}}>

            <Card className={cx('coverCard')}>
              {
                  <img
                    className='coverImage'
                    src={album.picture}
                    onClick={(e)=>{this.props.setParams({id:'currentImage',value:parseInt(e.target.id)});this.props.setParams({id:'showViewer',value:true})}}
                    alt=''
                    id={i}
                  />
    
              }
            </Card>
</div>
          )
        })
    }
    </ResponsiveGridLayout>
      </div>
    )
  }

  back = () => {
      this.props.setParams({id:'page',value:'albums'})
  }
  
  render () {
    const {
      facebook
    } = this.props
    return (
      <div class='albumPage'>
        <div className='control'> 
          {<Button size='lg' onClick={this.back}>Back</Button>}
        </div>
        {facebook.albumPhotos.length>0 && this.renderThumbs()}
        {facebook.showViewer && <Viewer/>}
      </div>
    )
  }
}

Photos.propTypes = {
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
)(Photos)