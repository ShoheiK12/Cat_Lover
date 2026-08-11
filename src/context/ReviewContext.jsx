import { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

const initialReviews = [
  {
    id: 1,
    name: 'Emily R.',
    rating: 5,
    comment: 'My cat absolutely loves the hammock! Great quality and super cozy.',
    date: '2026-07-15',
  },
  {
    id: 2,
    name: 'Mark T.',
    rating: 5,
    comment: 'Fast shipping and eco-friendly packaging. Highly recommended!',
    date: '2026-08-01',
  },
  {
    id: 3,
    name: 'Sophia L.',
    rating: 4,
    comment: 'The organic cat grass sprouted in just 3 days. My cat enjoys it very much.',
    date: '2026-08-08',
  },
];

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(initialReviews);

  const addReview = (newReview) => {
    setReviews((prev) => [
      { ...newReview, id: Date.now(), date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}