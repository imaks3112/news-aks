import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div>
        <div className="card">
          <div style={{display: 'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
          <span className='text-light badge rounded-pill bg-danger'>
            {source}
          </span>
          </div>
        <img className="card-img-top" src={imageUrl ?? "https://bharatshakti.in/wp-content/uploads/2024/05/bsi-bbb-63.png"} alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
        </div>
        </div>

      </div>
    )
  }
}

export default NewsItem

