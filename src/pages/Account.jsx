import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Account() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // In case of not-lgin
  if (!user) {
    return (
      <div className="account-container">
        <h1>Account Settings</h1>
        <p>Please log in to view your account settings.</p>
      </div>
    );
  }

  // State that stores input value during while editting.
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // When clicking edit button
  const handleEditStart = () => {
    setFormData({ ...user });
    setIsEditing(true);
  };

  // When clicking save button
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  // When clicking cancel button
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="account-container">
      <h1>Account Settings</h1>
      <p>Manage your account details and view your recent orders.</p>

      <div className="account-details">
        <h3>Personal Details</h3>

        {isEditing ? (
          /* Edit mode */
          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Preferred Delivery Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions mt-10">
              <button type="submit" className="btn-account">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Normal mode */
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Preferred Delivery Address:</strong> {user.address}</p>
            <button className="btn-account" onClick={handleEditStart}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="account-details">
        <h3>Order History</h3>
        <p>You have no recent orders to display.</p>
      </div>
    </div>
  );
}

export default Account;