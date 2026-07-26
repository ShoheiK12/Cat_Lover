function Account() {
  return (
    <div className="account-container">
      <h1>Account Settings</h1>
      <p>Manage your account details and view your recent orders.</p>

      <div className="account-details">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> Oliver Smith</p>
        <p><strong>Email:</strong> oliver@example.co.uk</p>
        <p><strong>Preferred Delivery Address:</strong> 10 High Street, London, SW1A 1AA</p>
        <button className="btn-detail" className="btn-detail mt-10">
          Edit Profile
        </button>
      </div>

      <div className="account-details">
        <h3>Order History</h3>
        <p>You have no recent orders to display.</p>
      </div>
    </div>
  );
}

export default Account;