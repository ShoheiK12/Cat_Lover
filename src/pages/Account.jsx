import { useState } from 'react';

function Account() {
  const [isEditing, setIsEditing] = useState(false);

  // State that keeps user information.
  const [profile, setProfile] = useState({
    name: 'Oliver Smith',
    email: 'oliver@example.co.uk',
    address: '10 High Street, Sydney, NSW 2000',
  });

  // State that stores input value during while editting.
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // When clicking edit button
  const handleEditStart = () => {
    setFormData({ ...profile });
    setIsEditing(true);
  };

  // When clicking save button
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
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
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Preferred Delivery Address:</strong> {profile.address}</p>
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