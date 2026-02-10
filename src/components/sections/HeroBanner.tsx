import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-main.jpg';
import InteractiveCard from '@/components/ui/InteractiveCard';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: {
    label: string;
    path: string;
  };
  ctaSecondary?: {
    label: string;
    path: string;
    subtitle?: string;
  };
  image?: string;
  small?: boolean;
  breadcrumbs?: Array<{ label: string; path?: string }>;
}

const HeroBanner = ({ 
  title, 
  subtitle, 
  ctaPrimary, 
  ctaSecondary, 
  image,
  small = false,
  breadcrumbs,
}: HeroBannerProps) => {
  const { t } = useLanguage();
  
  // Generate spikes for the jagged edge
  const spikeCount = 30;
  const generateSpikePath = (isTop: boolean) => {
    const points: string[] = [];
    const spikeHeight = 10;

    if (isTop) {
      points.push('0,0');
      for (let i = 0; i <= spikeCount; i++) {
        const x = (i / spikeCount) * 100;
        const y = i % 2 === 0 ? spikeHeight : 0;
        points.push(`${x},${y}`);
      }
      points.push('100,0');
    } else {
      points.push('0,100');
      for (let i = 0; i <= spikeCount; i++) {
        const x = (i / spikeCount) * 100;
        const y = i % 2 === 0 ? 100 - spikeHeight : 100;
        points.push(`${x},${y}`);
      }
      points.push('100,100');
    }

    return points.join(' ');
  };

  return (
    <section className={`relative ${small ? 'py-16 md:py-24 pb-24 md:pb-32' : 'py-24 md:py-32 lg:py-40 pb-32 md:pb-40 lg:pb-48'} overflow-visible`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image || heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Top Spikes - cutting into header */}
      {!small && (
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: '30px', marginTop: '-1px' }}>
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            <polygon
              points={generateSpikePath(true)}
              className="fill-background"
            />
          </svg>
        </div>
      )}

      {/* Bottom Spikes - cutting into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ height: '40px', marginBottom: '-1px' }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ display: 'block' }}
        >
          <polygon
            points={generateSpikePath(false)}
            className="fill-background"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container-industrial relative z-10">
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <ol className="flex items-center gap-2 text-sm text-primary-foreground/70">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {crumb.path ? (
                    <Link to={crumb.path} className="hover:text-accent transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={small ? 'max-w-3xl' : 'max-w-4xl'}
        >
          <h1 className={`font-display font-bold text-primary-foreground uppercase tracking-wide mb-4 ${
            small ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-4xl md:text-5xl lg:text-6xl'
          }`}>
            {title}
          </h1>
          
          {subtitle && (
            <p className={`text-primary-foreground/80 mb-8 ${
              small ? 'text-lg' : 'text-xl md:text-2xl'
            }`}>
              {subtitle}
            </p>
          )}
          
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-wrap items-center gap-6">
              {ctaPrimary && (
                <InteractiveCard
                  title={ctaPrimary.label}
                  path={ctaPrimary.path}
                  showArrow={false}
                />
              )}
              {ctaSecondary && (
                <InteractiveCard
                  title={ctaSecondary.label}
                  subtitle={ctaSecondary.subtitle}
                  path={ctaSecondary.path}
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
