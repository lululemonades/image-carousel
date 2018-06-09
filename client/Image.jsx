import React from 'react'

var Image = (props) => {
  var splitUrl = props.imageSrc.split('/')
  var getFileName = splitUrl[splitUrl.length - 1].split('?')
  var getImageName = getFileName[0].split('.')[0]
  return(
    <img onClick={props.openModal} className={props.ind} id={getImageName} src={props.imageSrc} width="645px" height="870px" />
  )
}

export default Image
