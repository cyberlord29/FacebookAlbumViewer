import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../index.css'

import {
  setParams,
} from '../../actions/facebook-actions'

import './index.css'

class Viewer extends Component {
  constructor(props){
    super(props)
    this.FB={}
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getSource = (i) => {   
      return this.props.facebook.albumPhotos[i].pictureBig ;
  }

  switchImage = (i) => {
    const {
        facebook
      } = this.props
      if(i>-1 && i<facebook.albumPhotos.length)
        this.props.setParams({id:'currentImage',value:i})
  }
  
  close = () => {
    this.props.setParams({id:'showViewer' , value:false})
  }

  render () {
    const {
        facebook
      } = this.props
      let src = this.getSource(facebook.currentImage)
    return (
        
      <div className='viewer'>
        <span class="close cursor" onClick={()=>this.close()}>&times;</span>

      {facebook.currentImage>0 && <a className='prev' onClick={()=>this.switchImage(facebook.currentImage-1)}>&#10094;</a>}
      <img
        className='imageModal'
        src={src}
        alt=''
        />
     { facebook.currentImage!==facebook.albumPhotos.length-1 && <a className='next' onClick={()=>this.switchImage(facebook.currentImage+1)}>&#10095;</a>}

      </div>
    )
  }
}

Viewer.propTypes = {
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
)(Viewer)