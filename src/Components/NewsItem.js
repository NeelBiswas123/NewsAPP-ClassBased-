import React, { Component } from 'react'

export class NewsItem extends Component {

  
  render() {
    let {Title,Description,Imageurl,newsUrl,publishedAt} = this.props

    return (
      <div className='my-3'>
        <div className="card" >
          <img src={Imageurl} className="card-img-top" alt="not found" />
            <div className="card-body">
              <h5 className="card-title">{Title}...</h5>
              <p className="card-text">{Description}...</p>
              <a href={newsUrl} target='_black' className="btn btn-sm btn-primary">Read more</a>  {/* target use to open website in new tab  */}
              <p style={{fontSize : "12px", marginTop : "0.5rem"}}> Published on : {new Date(publishedAt).toGMTString()}</p>
            </div>
        </div>

      </div>
    )
  }
}

export default NewsItem
