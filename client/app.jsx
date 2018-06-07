class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrls: this.props.urlsList,
      imageZoomStyles: {
        position: 'absolute',
        top: '-300px',
        left: '-300px',
      },
      imageContainerStyles: {
        width: '81%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      },
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0
    }
    this.selectFunction = this.selectFunction.bind(this)
    this.dragMouseDown = this.dragMouseDown.bind(this)
    this.closeDragElement = this.closeDragElement.bind(this)
    this.elementDrag = this.elementDrag.bind(this)
  }
  selectFunction(e) {
    document.getElementById('zoom-view').setAttribute('src', e.target.src)
  }
  dragMouseDown(e) {
    e = e || window.event
    this.setState({pos3: e.clientX, pos4: e.clientY})
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }
  elementDrag(e) {
    e = e || window.event
    this.setState({pos1: this.state.pos3 - e.clientX, pos2: this.state.pos4 - e.clientY, pos3: e.clientX, pos4: e.clientY})
    document.getElementById('zoom-view').style.top = (document.getElementById('zoom-view').offsetTop - this.state.pos2) + 'px'
    document.getElementById('zoom-view').style.left = (document.getElementById('zoom-view').offsetLeft - this.state.pos1) + 'px'
  }
  closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
  handleDragStart(e) {
    e.preventDefault()
  }
  render() {
    return(
      <div style={this.props.styles}>
        <div id="modal">
          <div id="window">
            <span onClick={this.props.closeModal} id="close-modal">&#10005;</span>
            <ModalThumbnails imageUrls={this.props.urlsList} imageSelect={this.selectFunction}/>
            <div style={this.state.imageContainerStyles}>
              <img onDragStart={this.handleDragStart} onMouseDown={this.dragMouseDown} id="zoom-view" style={this.state.imageZoomStyles} src={this.state.imageUrls[this.props.imageIndex]} width="1290px" height="1740px" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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
        top: '0',
      },
      scrollTop: 0,
      imageIndex: 0,
      imageSelectIndex: 0,
      didScroll: false,
      modalStyles: {
        display: 'none',
      }
    }
    this.scrollView = this.scrollView.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
  openModal(e) {
    this.setState({imageSelectIndex: e.target.className})
    document.getElementById('modal').style.top = $(window).scrollTop() + 'px'
    this.setState({modalStyles: {display: 'block'}})
    document.body.style.overflow = 'hidden'
  }
  closeModal() {
    this.setState({modalStyles: {display: 'none'}})
    document.body.style.overflow = 'visible'
  }
  render() {
    var breadcrumbs = []
    for (var property in this.props.productType) {
      var el = (
        <li key={breadcrumbs.length}><a href="#">{this.props.productType[property]}</a></li>
      )
      breadcrumbs.push(el)
    }
    var images = []
    this.props.images.forEach((image, index) => {
      var splitUrl = image.split('/')
      var getFileName = splitUrl[splitUrl.length - 1].split('?')
      var getImageName = getFileName[0].split('.')[0]
      var el = (
        <img onClick={this.openModal} className={index} key={images.length} id={getImageName} src={image} width="645px" height="870px" />
      )
      images.push(el)
    })
    return(
      <div>
        <Modal imageIndex={this.state.imageSelectIndex} closeModal={this.closeModal} styles={this.state.modalStyles} urlsList={this.props.images} />
        <div>
          <ul className="breadcrumb-trail">
            {breadcrumbs}
          </ul>
        </div>
        <div id="thumbs"><Thumbnails imageUrls={this.props.images} /></div>
        <div id="image-carousel">
          {images}
        </div>
      </div>
    )
  }
}

$.ajax({
  method: 'GET',
  url: '/products',
  success: function(data) {
    console.log(data)
  }
})

ReactDOM.render(<Carousel productType={{gender: 'Men', general: 'Bottoms', type: 'Pants'}} images={["https://www.dropbox.com/s/ty80w1li690mkt8/Untitled-4.jpg?raw=1","https://www.dropbox.com/s/kx1e7gyqylu1mgh/Untitled-5.jpg?raw=1","https://www.dropbox.com/s/fqa3nkc4owyqqnn/Untitled-6.jpg?raw=1","https://www.dropbox.com/s/8afgs7mh7lwsn6y/Untitled-7.jpg?raw=1","https://www.dropbox.com/s/7yij9oh0c6iw0p0/Untitled-2.jpg?raw=1"]}/>, document.getElementById('carousel'))
