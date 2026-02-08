import React from 'react'

const NewsItem = (props) => {
    let categoryClassMap = {
        domestic: "bg-primary",
        technology: "bg-info",
        sports: "bg-success",
        entertainment: "bg-danger",
    };

    let {title, description, imageUrl, newsUrl, creator, pubDate, source, category} = props;
    const firstCategory = category.split(",")[0].trim().toLowerCase();
    const badgeClass = categoryClassMap[firstCategory] || "bg-secondary";

    return (
        <div className="card">
            <div style={{display: "flex", right: "0px", justifyContent: "flex-end", position: "absolute"}}>
                <span className={`badge rounded-pill ${badgeClass}`}>{source}</span>
            </div>
            <img src={!imageUrl? "https://img.freepik.com/free-photo/network-connection-graphic-overlay-background-computer-screen_53876-120776.jpg?semt=ais_hybrid&w=740&q=80" : imageUrl } className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By : <strong>{!creator? "Unknown" : creator}</strong> on <strong>{new Date(pubDate).toGMTString()}</strong></small></p>
                <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
    )
}

export default NewsItem