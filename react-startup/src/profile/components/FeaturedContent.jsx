import React from 'react';

const FeaturedContent = () => {
  const dummyContent = [
    { id: 1, title: "Featured Post 1" },
    { id: 2, title: "Featured Post 2" },
    { id: 3, title: "Featured Post 3" }
  ];

  return (
    <div className="featured-content-container">
      <h3>Featured Content</h3>
      <div className="content-box-container">
        {dummyContent.map(content => (
          <div key={content.id} className="content-box">
            <h4>{content.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;