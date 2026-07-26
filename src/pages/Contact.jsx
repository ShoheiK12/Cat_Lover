import { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have a question or feedback regarding our items? Please send us an enquiry below.</p>

      {submitted ? (
        <div className="success-message">
          <h3>Thank you for your enquiry!</h3>
          <p>We have received your message and will respond as soon as possible.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required placeholder="e.g. Oliver Smith" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="e.g. oliver@example.co.uk" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Enquiry Details</label>
            <textarea id="message" required placeholder="How can we assist you today?"></textarea>
          </div>

          <button type="submit" className="btn-primary">
            Send Enquiry
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;