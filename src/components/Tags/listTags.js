import React from "react";

export const ListTags = ({ getArticlesByTags, tags }) => (
  <div data-test="list-tags">
    <ul>
      {tags.map((tag, i) => (
        <h2
          className="chip hoverable"
          data-test={`${tag}-${i}`}
          key={`${tag}-${i}`}
          onClick={() => getArticlesByTags(tag)}
        >
          {tag}
        </h2>
      ))}
    </ul>
  </div>
);

export default ListTags;
