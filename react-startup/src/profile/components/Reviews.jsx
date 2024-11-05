import React from 'react';

const Reviews = () => {
  const dummyReviews = [
    { id: 1, rating: 5, comment: "Great user!" },
    { id: 2, rating: 4, comment: "Very helpful" }
  ];

  return (
    <div className="reviews-box">
      <h3>Reviews</h3>
      {dummyReviews.map(review => (
        <div key={review.id}>
          <span>{"⭐".repeat(review.rating)}</span>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;