import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cog, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import CTASection from '@/components/sections/CTASection';

import manufacturingImage from '@/assets/shafts/manufacturing.jpg';
import serviceImage from '@/assets/shafts/service.jpg';

const ShaftsPage = () => {
  const { language, t } = useLanguage();
  
  const homePath = language === 'en' ? '/en' : '/';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  const manufacturingFeatures = language === 'en' ? [
    'Custom designs according to specifications',
    'High-quality materials',
    'Precision CNC machining',
    'Quality control at every stage',
    'Express delivery possible',
  ] : [
    'Zákazkové návrhy podľa špecifikácií',
    'Vysokoqualitné materiály',
    'Presné CNC obrábanie',
    'Kontrola kvality v každej fáze',
    'Možnosť expresnej dodávky',
  ];
  
  const serviceFeatures = language === 'en' ? [
    'Diagnostics and inspection',
    'Segment replacement',
    'Surface renovation',
    'Balancing and calibration',
    'Preventive maintenance',
  ] : [
    'Diagnostika a inšpekcia',
    'Výmena segmentov',
    'Renovácia povrchu',
    'Vyvažovanie a kalibrácia',
    'Preventívna údržba',
  ];
  
  return (
    <Layout>
      <HeroBanner
        title={t('Výroba a servis hriadeľov', 'Shaft Manufacturing and Service')}
        subtitle={t(
          'Komplexné riešenia pre drviace hriadele',
          'Complete solutions for shredder shafts'
        )}
        image={manufacturingImage}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Hriadele', 'Shafts') },
        ]}
      />
      
      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground">
              {t(
                'Okrem výroby drviacich strojov sa špecializujeme na výrobu a servis hriadeľov. Ponúkame kompletné riešenia od návrhu až po renováciu existujúcich hriadeľov.',
                'In addition to manufacturing shredders, we specialize in shaft production and service. We offer complete solutions from design to renovation of existing shafts.'
              )}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Manufacturing Section */}
      <section id="vyroba" className="section-padding bg-surface scroll-mt-24">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                  <Cog className="w-6 h-6 text-accent" />
                </div>
                <h2 className="headline-md text-foreground">
                  {t('Výroba hriadeľov', 'Shaft Manufacturing')}
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                {t(
                  'Vyrábame hriadele presne podľa vašich špecifikácií. Používame najkvalitnejšie materiály a moderné výrobné technológie pre dosiahnutie maximálnej presnosti a životnosti.',
                  'We manufacture shafts exactly according to your specifications. We use the highest quality materials and modern manufacturing technologies to achieve maximum precision and durability.'
                )}
              </p>
              
              <ul className="space-y-3 mb-8">
                {manufacturingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`${contactPath}?type=${encodeURIComponent(t('Výroba hriadeľov', 'Shaft Manufacturing'))}`}
                className="btn-accent inline-flex items-center gap-2"
              >
                {t('Dopyt na výrobu', 'Manufacturing Inquiry')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
                <img
                  src={manufacturingImage}
                  alt={t('Výroba hriadeľov', 'Shaft Manufacturing')}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Service Section */}
      <section id="servis" className="section-padding bg-background scroll-mt-24">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
                <img
                  src={serviceImage}
                  alt={t('Servis hriadeľov', 'Shaft Service')}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <h2 className="headline-md text-foreground">
                  {t('Servis a opravy', 'Service and Repairs')}
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                {t(
                  'Predĺžte životnosť vašich hriadeľov prostredníctvom našich servisných služieb. Ponúkame komplexné riešenia od diagnostiky po kompletné renovácie.',
                  'Extend the life of your shafts through our service offerings. We offer comprehensive solutions from diagnostics to complete renovations.'
                )}
              </p>
              
              <ul className="space-y-3 mb-8">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`${contactPath}?type=${encodeURIComponent(t('Servis hriadeľov', 'Shaft Service'))}`}
                className="btn-accent inline-flex items-center gap-2"
              >
                {t('Dopyt na servis', 'Service Inquiry')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Gallery */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Galéria hriadeľov', 'Shaft Gallery')}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[manufacturingImage, serviceImage, manufacturingImage, serviceImage].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-sm overflow-hidden shadow-card cursor-pointer hover:shadow-hover transition-shadow"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
};

export default ShaftsPage;
