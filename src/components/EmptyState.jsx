import { Link } from 'react-router-dom';

function EmptyState({
  icon = '🐾',
  title = 'Nothing here yet',
  message = 'Explore our collection to find something your feline friends love!',
  buttonText = 'Browse Products',
  buttonLink = '/'
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon" role="img" aria-label="empty icon">
        {icon}
      </div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
      <Link to={buttonLink} className="empty-state-btn">
        {buttonText}
      </Link>
    </div>
  );
}

export default EmptyState;