export const StarRating = ({ rating, onRate, readOnly = false }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star-rating-icon ${readOnly ? 'readonly' : 'interactive'} ${
            star <= rating ? 'filled' : 'empty'
          }`}
          onClick={() => !readOnly && onRate && onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;