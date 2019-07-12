import React from "react";
import { Link } from "react-router-dom";
import "./styles/articles.css";

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
  return (
    <div className="container" data-test="card-test">
      <div className="row" id={slug} key={id}>
        <div className="col m12">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img width="20" height="400" src={image_url} alt="None to show" />
            </div>
            <div className="card-content align-right">
              <h3 className="article-title">
                <span>{title}</span>
              </h3>
              <p className="article-desc">
                <span>{description}</span>
              </p>
              <div className="right-align">
                <i>
                  <span>{read_time}</span>
                  <br />
                  <span>Rating: {avg_rating}</span>
                </i>
              </div>
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
