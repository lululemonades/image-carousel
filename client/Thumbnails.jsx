import React from 'react'

class Thumbnails extends React.Component {
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
        <a key={index} href={`#${getImageName}`}><img id={index} src={image} width="67px" height="83px" /></a>
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

export default Thumbnails
