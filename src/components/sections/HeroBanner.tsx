import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-main.jpg';

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
  
  return (
    <section className={`relative ${small ? 'py-16 md:py-24' : 'py-24 md:py-32 lg:py-40'} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image || heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
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
            <div className="flex flex-wrap gap-4">
              {ctaPrimary && (
                <Link to={ctaPrimary.path} className="btn-accent inline-flex items-center gap-2">
                  {ctaPrimary.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {ctaSecondary && (
                <Link to={ctaSecondary.path} className="btn-outline-accent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary inline-flex items-center gap-2">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
