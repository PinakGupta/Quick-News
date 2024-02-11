import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
                        {source}
                    </span>
                    <img src={imageUrl?imageUrl:"https://feeds.abplive.com/onecms/images/uploaded-images/2023/10/26/b07fe5e468c475feb0065619dc94cae01698301971607402_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
