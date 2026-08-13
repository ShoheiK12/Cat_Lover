import { createContext, useContext, useState, useEffect } from 'react';

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

const LOCAL_STORAGE_KEY = 'user_reviews_data';

export const ReviewProvider = ({ children }) => {
  // Obtain data from localStorage when initialised.
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        // if saved data is more than one and array, use them
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // If no data or empty array [], use initial sample.
      return initialReviews;
    } catch (error) {
      console.error('Failed to load reviews from localStorage:', error);
      return initialReviews;
    }
  });

  // Save reviews in localStorage everytime they are changed.
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error('Failed to save reviews to localStorage:', error);
    }
  }, [reviews]);

  const addReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    setReviews((prevReviews) => [reviewWithId, ...prevReviews]);
  };

  const deleteReview = (id) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, deleteReview }}>
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