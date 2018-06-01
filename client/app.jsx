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

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: this.props.images[0],
      imageStyle: {
        top: '0'
      },
      scrollTop: 0,
      imageIndex: 0,
      didScroll: false
    }
    // this.updateImage = this.updateImage.bind(this)
    this.scrollView = this.scrollView.bind(this)
    // this.scrollCarousel = this.scrollCarousel.bind(this)
    $(window).on('scroll', this.scrollView)
  }
  isVisible(el) {
    var scrollTop = $(window).scrollTop()
    var scrollHeight = scrollTop + $(window).height()
    var elOffset = $(el).offset().top - 200
    var elHeight = elOffset + $(window).height()
    if (scrollTop >= elOffset && elHeight <= scrollHeight) return true
  }
  scrollView() {
    this.props.images.forEach((image, index) => {
      var splitUrl = image.split('/')
      var getFileName = splitUrl[splitUrl.length - 1].split('?')
      var getImageName = getFileName[0].split('.')[0]
      if (this.isVisible(`#${getImageName}`)) {
        document.getElementById(this.state.imageIndex).parentNode.style.opacity = 0.4
        document.getElementById(index).parentNode.style.opacity = 1
        this.setState({imageUrl: this.props.images[index]})
        this.setState({imageIndex: index})
      }
    })
  }
  // updateImage(e) {
  //   document.getElementById(this.state.imageIndex).parentNode.style.opacity = 0.4
  //   var selected = parseInt(e.target.id)
  //   this.setState({imageUrl: this.props.images[selected]})
  //   this.setState({imageIndex: selected})
  // }
  // scrollCarousel(e) {
  //   // this.setState({didScroll: true})
  //   // if (this.state.didScroll) {
  //   //   this.setState({imageUrl: this.props.images[this.state.imageIndex + 1]})
  //   //   this.setState({imageIndex: this.state.imageIndex + 1})
  //   // }
  //   if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
  //     this.setState({scrollTop: e.target.scrollTop})
  //     this.setState({imageUrl: this.props.images[this.state.imageIndex + 1]})
  //     this.setState({imageIndex: this.state.imageIndex + 1})
  //   } else if (e.target.scrollTop < this.state.scrollTop) {
  //     if (e.target.scrollTop === 0) {
  //       this.setState({scrollTop: 0})
  //       this.setState({imageUrl: this.props.images[this.state.imageIndex - 1]})
  //       this.setState({imageIndex: this.state.imageIndex - 1})
  //     }
  //   }
  // }
  render() {
    var breadcrumbs = []
    for (var property in this.props.productType) {
      var el = (
        <li key={breadcrumbs.length}><a href="#">{this.props.productType[property]}</a></li>
      )
      breadcrumbs.push(el)
    }
    var images = []
    this.props.images.forEach(image => {
      var splitUrl = image.split('/')
      var getFileName = splitUrl[splitUrl.length - 1].split('?')
      var getImageName = getFileName[0].split('.')[0]
      var el = (
        <img key={images.length} id={getImageName} src={image} width="645px" height="870px" />
      )
      images.push(el)
    })
    return(
      <div>
        <div>
          <ul className="breadcrumb-trail">
            {breadcrumbs}
          </ul>
        </div>
        <Thumbnails imageUrls={this.props.images} imageSelect={this.updateImage} />
        <div id="image-carousel">
          {images}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Carousel productType={{gender: 'Men', general: 'Bottoms', type: 'Pants'}} images={["https://www.dropbox.com/s/ty80w1li690mkt8/Untitled-4.jpg?raw=1","https://www.dropbox.com/s/kx1e7gyqylu1mgh/Untitled-5.jpg?raw=1","https://www.dropbox.com/s/fqa3nkc4owyqqnn/Untitled-6.jpg?raw=1","https://www.dropbox.com/s/8afgs7mh7lwsn6y/Untitled-7.jpg?raw=1","https://www.dropbox.com/s/7yij9oh0c6iw0p0/Untitled-2.jpg?raw=1"]}/>, document.getElementById('carousel'))
