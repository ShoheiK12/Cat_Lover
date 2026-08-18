import React from 'react';
import { useReviews } from '../context/ReviewContext';

export const ReviewHeader = () => {
  const { totalCount, averageRating, sortBy, setSortBy, resetReviews } = useReviews();

  return (
    <div className="review-header">
      <div className="review-summary">
        <span className="review-average-score">
          ★ {averageRating}
        </span>
        <span className="review-total-count">
          ({totalCount} reviews)
        </span>
      </div>

      <div className="review-controls">
        <div>
          <label htmlFor="sort-select" className="review-sort-label">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="review-sort-select"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        <button
          onClick={resetReviews}
          className="review-reset-button"
        >
          Reset to sample
        </button>
      </div>
    </div>
  );
};