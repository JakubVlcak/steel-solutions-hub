import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cog, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import manufacturingImage from '@/assets/shafts/manufacturing.jpg';
import serviceImage from '@/assets/shafts/service.jpg';

const ShaftsSection = () => {
  const { language, t } = useLanguage();
  
  const shaftsPath = language === 'en' ? '/en/shafts' : '/hriadele';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  const services = [
    {
      icon: Cog,
      titleSk: 'Výroba hriadeľov',
      titleEn: 'Shaft Manufacturing',
      descSk: 'Kompletná výroba hriadeľov podľa špecifikácií zákazníka. Od návrhu po finálny produkt.',
      descEn: 'Complete shaft manufacturing to customer specifications. From design to final product.',
      image: manufacturingImage,
      link: `${shaftsPath}#vyroba`,
      ctaSk: 'Dopyt na výrobu',
      ctaEn: 'Manufacturing Inquiry',
    },
    {
      icon: Wrench,
      titleSk: 'Servis a opravy',
      titleEn: 'Service and Repairs',
      descSk: 'Renovácie, opravy a výmena segmentov existujúcich hriadeľov. Predĺžte životnosť vašich strojov.',
      descEn: 'Renovations, repairs and segment replacement of existing shafts. Extend the life of your machines.',
      image: serviceImage,
      link: `${shaftsPath}#servis`,
      ctaSk: 'Dopyt na servis',
      ctaEn: 'Service Inquiry',
    },
  ];
  
  return (
    <section className="section-padding bg-surface">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="headline-lg text-foreground mb-4">
            {t('Výroba a servis hriadeľov', 'Shaft Manufacturing and Service')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              'Komplexné služby od návrhu po renováciu',
              'Complete services from design to renovation'
            )}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card-industrial overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={language === 'en' ? service.titleEn : service.titleSk}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-wide">
                    {language === 'en' ? service.titleEn : service.titleSk}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {language === 'en' ? service.descEn : service.descSk}
                </p>
                <Link 
                  to={`${contactPath}?type=${encodeURIComponent(language === 'en' ? service.titleEn : service.titleSk)}`}
                  className="btn-accent inline-flex items-center gap-2"
                >
                  {language === 'en' ? service.ctaEn : service.ctaSk}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShaftsSection;
