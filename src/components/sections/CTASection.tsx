import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { language, t } = useLanguage();
  
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  return (
    <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container-industrial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="headline-lg text-primary-foreground mb-4">
            {t('Potrebujete riešenie na mieru?', 'Need a Custom Solution?')}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            {t(
              'Kontaktujte nás a spoločne nájdeme optimálne riešenie pre vaše potreby.',
              "Contact us and we'll find the optimal solution together for your needs."
            )}
          </p>
          <Link to={contactPath} className="btn-accent inline-flex items-center gap-2">
            {t('Kontaktovať nás', 'Contact Us')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
