import React from 'react'

class ModalThumbnails extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var images = []
    this.props.imageUrls.forEach((image, index) => {
      var splitUrl = image.split('/')
      var getFileName = splitUrl[splitUrl.length - 1].split('?')
      var getImageName = getFileName[0].split('.')[0]
      var el = (
        <img key={index} className={index} style={{opacity: '0.4', transition: '0.2s', padding: '6px 27px'}} src={image} onClick={this.props.imageSelect} width="67px" height="83px" />
      )
      images.push(el)
    })
    return(
      <div className="thumbnails">
        {images}
      </div>
    )
  }
}

export default ModalThumbnails
