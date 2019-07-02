import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = article => {
  const {
    id,
    title,
    slug,
    description,
    image_url,
    avg_rating,
    read_time
  } = article.article;
  console.log(article.article);
  return (
    <div className="container">
      <div className="row" id={slug} key={id}>
        <div className="col m7">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                width="20"
                height="400"
                src="https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg?cs=srgb&dl=architecture-building-chicago-1662159.jpg&fm=jpg"
                alt="None to show"
              />
              <span className="card-title">{title}</span>
            </div>
            <div className="card-content">
              <h4>{description}</h4>
              <span>Read Time: {read_time}</span>
              <br />
              <span>Ratings: {avg_rating}</span>
            </div>
            <div className="card-action">
              <Link
                className="waves-effect waves-light btn"
                to={`/articles/${slug}`}
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
