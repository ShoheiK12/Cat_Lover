function About() {
  return (
    <div className="about-container">
      <h1>About Cat Lover</h1>
      <p>
        Welcome to <strong>Cat Lover</strong>! We specialise in providing premium quality products tailored for your feline companions.
      </p>
      <p>
        Founded with a passion for animal welfare, our mission is to deliver items that promote the health, comfort, and happiness of every cat. From organic cat grass to cozy hammocks, all our items are carefully selected to ensure your pet receives the very best.
      </p>
      <p>
        Thank you for choosing us as your favoured online pet shop!
      </p>
      <h2 className="info-title">Company Information</h2>
        <div>
          <dl className="info">
            <dt>Company name</dt>
            <dd>CAT LIFE Inc.</dd>
            <dt>Address</dt>
            <dd>123 George Street, Sydeny NSW, 2000</dd>
            <dt>Establishment</dt>
            <dd>05.2026</dd>
            <dt>Capital</dt>
            <dd>$10000</dd>
            <dt>Workforce</dt>
            <dd>100</dd>
            <dt>Business</dt>
            <dd>
              Manufacture and sale of cat food and toys<br />
              Operate cat item stores<br />
              Research on improving cats' quality of life
            </dd>
          </dl>
          <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.142634770993!2d151.20575417601063!3d-33.86021477322989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae42eef4f0a9%3A0xcf63fa8bff6e9a3e!2s123%20George%20St%2C%20Sydney%20NSW%202000!5e0!3m2!1sja!2sau!4v1778305360912!5m2!1sja!2sau" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
    </div>
  );
}

export default About;