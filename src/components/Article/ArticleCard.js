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
    read_time
  } = article.article;
  return (
    <div className="col m4" id={slug} key={id} data-test="card-test">
      <Link className="black-text darken-3" to={`/articles/${slug}`}>
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img width="10" height="200" src={image_url} alt="None to show" />
          </div>
          <div className="card-content left-align">
            <span className="card-title">{title}</span>
            <p className="article-desc">
              <span>{description}</span>
            </p>
            <span className="left-align articles-stats">
              <span className="read-time">{read_time}</span>
              <br />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
