import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ReviewContext = createContext();

const LOCAL_STORAGE_KEY = 'user_reviews_data';

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

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialReviews;
    } catch (error) {
      console.error('Failed to load reviews:', error);
      return initialReviews;
    }
  });

  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error('Failed to save reviews:', error);
    }
  }, [reviews]);

  // Add review
  const addReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [reviewWithId, ...prev]);
  };

  // Delete review
  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  // Reset data to sample one
  const resetReviews = () => {
    setReviews(initialReviews);
  };

  // Calculation of average ratings
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // Sorted review
  const sortedReviews = useMemo(() => {
    const list = [...reviews];
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (sortBy === 'highest') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'lowest') {
      return list.sort((a, b) => a.rating - b.rating);
    }
    return list;
  }, [reviews, sortBy]);

  return (
    <ReviewContext.Provider
      value={{
        reviews: sortedReviews,
        totalCount: reviews.length,
        averageRating,
        sortBy,
        setSortBy,
        addReview,
        deleteReview,
        resetReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};