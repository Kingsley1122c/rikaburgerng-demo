import React, { useState } from 'react';
import { reviews as initialReviews } from '../data/adminMockData';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const updateReview = (id, updates) => {
    setReviews((previous) => previous.map((review) => (review.id === id ? { ...review, ...updates } : review)));
  };

  const deleteReview = (id) => {
    setReviews((previous) => previous.filter((review) => review.id !== id));
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Reviews Management</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.customer}</td>
                <td>{review.rating}/5</td>
                <td>{review.text}</td>
                <td>{review.status}</td>
                <td>{review.featured ? 'Yes' : 'No'}</td>
                <td>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn secondary" onClick={() => updateReview(review.id, { status: 'Approved' })}>Approve</button>
                    <button type="button" className="admin-btn secondary" onClick={() => updateReview(review.id, { status: 'Hidden' })}>Hide</button>
                    <button type="button" className="admin-btn secondary" onClick={() => updateReview(review.id, { featured: !review.featured })}>Feature</button>
                    <button type="button" className="admin-btn danger" onClick={() => deleteReview(review.id)}>Delete</button>
                  </div>
                  <div className="admin-control-row" style={{ marginTop: 8 }}>
                    <input className="admin-input" placeholder="Respond to review (mock)" />
                    <button type="button" className="admin-btn secondary">Reply</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminReviewsPage;
