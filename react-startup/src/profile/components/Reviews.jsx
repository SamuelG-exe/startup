import React from 'react';

const Reviews = () => {
  const dummyReviews = [
    { id: 1, rating: 5, comment: "Great user!" },
    { id: 2, rating: 4, comment: "Very helpful" }
  ];

  const averageRating = dummyReviews.reduce((sum, review) => sum + review.rating, 0) / dummyReviews.length;

  const roundedAverage = Math.round(averageRating * 2) / 2;

  return (
    <div className="reviews-box">
      <div>
        <span>{"⭐".repeat(Math.floor(roundedAverage))}</span>
        {/* Optional: Show half star */}
        {/* {roundedAverage % 1 !== 0 && "½"} */}
        <span> ({roundedAverage.toFixed(1)})</span>
      </div>
    </div>
  );
};


export default Reviews;