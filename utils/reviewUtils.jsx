function AverageRating(reviews, itemId) {
  const itemReviews = reviews.filter((r) => String(r.itemId) === String(itemId));
  if (itemReviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const sum = itemReviews.reduce((acc, r) => acc + Number(r.rating), 0);
  const average = (sum / itemReviews.length).toFixed(1);

  return { average: Number(average), count: itemReviews.length };
}

export default AverageRating;