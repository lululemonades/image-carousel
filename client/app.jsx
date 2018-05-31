class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: '',
      imageStyle: {
        top: '0'
      }
    }
    this.updateImage = this.updateImage.bind(this)
  }
  updateImage(id) {
    this.setState({imagePosition: {top: '-700px'}})
  }
  render() {
    return(
      <div>
        <Thumbnails imageUrls={this.props.images} imageSelect={this.updateImage} />
        <img style={this.state.imagePosition} src={this.state.imageUrl} width="500px" height="700px" />
      </div>
    )
  }
}


ReactDOM.render(<Carousel images={[]}/>, document.getElementById('carousel'))
