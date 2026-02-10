import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './InteractiveCard.css';

interface InteractiveCardProps {
  title: string;
  subtitle?: string;
  path: string;
  showArrow?: boolean;
}

const InteractiveCard = ({ title, subtitle, path, showArrow = true }: InteractiveCardProps) => {
  return (
    <div className="interactive-card-container" style={{ width: '100%', maxWidth: '26em', height: '6em' }}>
      {/* Directional hover areas */}
      <div className="directional-hover-area hover-top-left" />
      <div className="directional-hover-area hover-top-right" />
      <div className="directional-hover-area hover-bottom-left" />
      <div className="directional-hover-area hover-bottom-right" />

      {/* Card */}
      <Link to={path} className="interactive-card">
        {/* Glow layer */}
        <div className="interactive-card__glow-layer">
          <div className="interactive-card__glow interactive-card__glow--purple" />
          <div className="interactive-card__glow interactive-card__glow--pink" />
          <div className="interactive-card__glow interactive-card__glow--teal" />
        </div>

        {/* Noise overlay */}
        <div className="interactive-card__noise-overlay" />

        {/* Content */}
        <div className="interactive-card__inner">
          <div className="interactive-card__content">
            <div className="interactive-card__title">{title}</div>
            {subtitle && <div className="interactive-card__subtitle">{subtitle}</div>}
          </div>
          {showArrow && (
            <div className="interactive-card__icon">
              <ArrowRight />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default InteractiveCard;
