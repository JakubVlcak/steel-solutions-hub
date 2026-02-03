import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Play, Ruler, Weight, Zap, Gauge, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, challenges } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';

import hps15Image from '@/assets/products/hps-1-5.jpg';
import dualShaftImage from '@/assets/products/dual-shaft-2-2.jpg';

const productImages: Record<string, string> = {
  'hps-1-5': hps15Image,
  'dual-shaft-2-2': dualShaftImage,
};

const productSpecs: Record<string, { specs: Array<{ icon: any; labelSk: string; labelEn: string; value: string }> }> = {
  'hps-1-5': {
    specs: [
      { icon: Ruler, labelSk: 'Rozmery (DxŠxV)', labelEn: 'Dimensions (LxWxH)', value: '3500 x 2200 x 2800 mm' },
      { icon: Weight, labelSk: 'Hmotnosť', labelEn: 'Weight', value: '12 000 kg' },
      { icon: Zap, labelSk: 'Výkon motora', labelEn: 'Motor Power', value: '2 x 75 kW' },
      { icon: Gauge, labelSk: 'Kapacita', labelEn: 'Capacity', value: '15-25 t/h' },
    ],
  },
  'dual-shaft-2-2': {
    specs: [
      { icon: Ruler, labelSk: 'Rozmery (DxŠxV)', labelEn: 'Dimensions (LxWxH)', value: '4200 x 2400 x 3100 mm' },
      { icon: Weight, labelSk: 'Hmotnosť', labelEn: 'Weight', value: '18 000 kg' },
      { icon: Zap, labelSk: 'Výkon motora', labelEn: 'Motor Power', value: '2 x 110 kW' },
      { icon: Gauge, labelSk: 'Kapacita', labelEn: 'Capacity', value: '20-35 t/h' },
    ],
  },
};

const productDescriptions: Record<string, { overviewSk: string; overviewEn: string; featuresSk: string[]; featuresEn: string[] }> = {
  'hps-1-5': {
    overviewSk: 'Phoenix Hydro Power Schredder HPS 1.5 je výkonný hydraulický drvič navrhnutý pre náročné priemyselné aplikácie. Vďaka dvojhriadeľovej konštrukcii a hydraulickému pohonu poskytuje spoľahlivý a konzistentný výkon pri spracovaní širokého spektra materiálov.',
    overviewEn: 'Phoenix Hydro Power Shredder HPS 1.5 is a powerful hydraulic shredder designed for demanding industrial applications. Thanks to the dual-shaft design and hydraulic drive, it provides reliable and consistent performance when processing a wide range of materials.',
    featuresSk: [
      'Hydraulický pohon pre maximálny krútiaci moment',
      'Robustná dvojhriadeľová konštrukcia',
      'Automatická ochrana proti preťaženiu',
      'Jednoduché nastavenie veľkosti výstupnej frakcie',
      'Nízke prevádzkové náklady',
    ],
    featuresEn: [
      'Hydraulic drive for maximum torque',
      'Robust dual-shaft construction',
      'Automatic overload protection',
      'Easy adjustment of output fraction size',
      'Low operating costs',
    ],
  },
  'dual-shaft-2-2': {
    overviewSk: 'Univerzálny dvojhriadeľový drvič 2.2 je navrhnutý pre maximálnu flexibilitu a výkon. Jeho modulárna konštrukcia umožňuje prispôsobenie pre rôzne typy materiálov a požiadavky na výstupnú frakciu.',
    overviewEn: 'Universal Dual Shaft Shredder 2.2 is designed for maximum flexibility and performance. Its modular design allows customization for various types of materials and output fraction requirements.',
    featuresSk: [
      'Modulárny systém nožov',
      'Vysoká priepustnosť materiálu',
      'Optimalizované pre kontinuálnu prevádzku',
      'Jednoduchá výmena opotrebovaných častí',
      'Inteligentné riadenie prevádzky',
    ],
    featuresEn: [
      'Modular knife system',
      'High material throughput',
      'Optimized for continuous operation',
      'Easy replacement of worn parts',
      'Intelligent operation control',
    ],
  },
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const product = products.find(p => 
    language === 'en' ? p.slugEn === slug : p.slugSk === slug
  );
  
  if (!product) {
    return (
      <Layout>
        <div className="section-padding container-industrial text-center">
          <h1 className="headline-lg">
            {t('Produkt nenájdený', 'Product not found')}
          </h1>
        </div>
      </Layout>
    );
  }
  
  const homePath = language === 'en' ? '/en' : '/';
  const productsPath = language === 'en' ? '/en/products' : '/produkty';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  const name = language === 'en' ? product.nameEn : product.nameSk;
  const tagline = language === 'en' ? product.taglineEn : product.taglineSk;
  const specs = productSpecs[product.id]?.specs || [];
  const descriptions = productDescriptions[product.id];
  const overview = language === 'en' ? descriptions?.overviewEn : descriptions?.overviewSk;
  const features = language === 'en' ? descriptions?.featuresEn : descriptions?.featuresSk;
  
  // Find suitable challenges
  const suitableChallenges = challenges.filter(c => 
    product.suitableFor.includes(c.id)
  );
  
  return (
    <Layout>
      <HeroBanner
        title={name}
        subtitle={tagline}
        image={productImages[product.id]}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Produkty', 'Products'), path: productsPath },
          { label: name },
        ]}
      />
      
      {/* Product Overview */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
                <img
                  src={productImages[product.id]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="headline-md text-foreground mb-6">
                {t('Prehľad', 'Overview')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {overview}
              </p>
              
              <h3 className="font-display font-semibold text-lg text-foreground uppercase tracking-wide mb-4">
                {t('Kľúčové vlastnosti', 'Key Features')}
              </h3>
              <ul className="space-y-3 mb-8">
                {features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`${contactPath}?product=${encodeURIComponent(name)}`}
                className="btn-accent inline-flex items-center gap-2"
              >
                {t('Poslať dopyt', 'Send Inquiry')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Video', 'Video')}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-primary/10 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-accent" />
                </div>
                <p className="text-muted-foreground">
                  {t('YouTube video bude vložené tu', 'YouTube video will be embedded here')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Technical Specifications */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Technické parametre', 'Technical Specifications')}
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? spec.labelEn : spec.labelSk}
                    </p>
                    <p className="font-display font-bold text-lg text-foreground">
                      {spec.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Downloads */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Dokumenty na stiahnutie', 'Downloads')}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <a 
              href="#"
              className="flex items-center gap-4 bg-background p-4 rounded-sm shadow-card hover:shadow-hover transition-shadow"
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {name} - {t('Produktový leták', 'Product Brochure')}
                </p>
                <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
              </div>
              <span className="text-accent font-semibold">
                {t('Stiahnuť', 'Download')}
              </span>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Suitable For */}
      {suitableChallenges.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Vhodné pre', 'Suitable for')}
              </h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {suitableChallenges.map((challenge, index) => {
                const challengePath = language === 'en' 
                  ? `/en/challenges/${challenge.slugEn}` 
                  : `/challenges/${challenge.slugSk}`;
                const challengeName = language === 'en' ? challenge.nameEn : challenge.nameSk;
                
                return (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={challengePath}
                      className="inline-block px-4 py-2 bg-surface text-foreground rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                    >
                      {challengeName}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-industrial text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="headline-md text-primary-foreground mb-4">
              {t('Máte záujem o tento produkt?', 'Interested in this product?')}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {t(
                'Kontaktujte nás pre nezáväznú ponuku a konzultáciu.',
                'Contact us for a non-binding offer and consultation.'
              )}
            </p>
            <Link 
              to={`${contactPath}?product=${encodeURIComponent(name)}`}
              className="btn-accent inline-flex items-center gap-2"
            >
              {t('Poslať dopyt', 'Send Inquiry')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetailPage;
