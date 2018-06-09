import Carousel from './Carousel.jsx'
import ReactDOM from 'react-dom'
import React from 'react'

ReactDOM.render(<Carousel productType={['Men','Bottoms','Pants']} images={["https://www.dropbox.com/s/ty80w1li690mkt8/Untitled-4.jpg?raw=1","https://www.dropbox.com/s/kx1e7gyqylu1mgh/Untitled-5.jpg?raw=1","https://www.dropbox.com/s/fqa3nkc4owyqqnn/Untitled-6.jpg?raw=1","https://www.dropbox.com/s/8afgs7mh7lwsn6y/Untitled-7.jpg?raw=1","https://www.dropbox.com/s/7yij9oh0c6iw0p0/Untitled-2.jpg?raw=1"]}/>, document.getElementById('carousel'))
