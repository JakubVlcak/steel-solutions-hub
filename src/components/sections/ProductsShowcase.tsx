import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/translations';

import hps15Image from '@/assets/products/hps-1-5.jpg';
import dualShaftImage from '@/assets/products/dual-shaft-2-2.jpg';
import phoenixLogo from '@/assets/logos/phoenix.png';
import worksteelLogo from '@/assets/logos/worksteel-logo.png';

const productImages: Record<string, string> = {
  'hps-1-5': hps15Image,
  'dual-shaft-2-2': dualShaftImage,
};

interface ProductsShowcaseProps {
  showTitle?: boolean;
}

const ProductsShowcase = ({ showTitle = true }: ProductsShowcaseProps) => {
  const { language, t } = useLanguage();
  
  return (
    <section className="section-padding bg-background">
      <div className="container-industrial">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Partner Logos */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <img
                src={worksteelLogo}
                alt="WorkSteel"
                className="h-16 md:h-20 object-contain"
              />
              <span className="text-2xl text-muted-foreground font-light">+</span>
              <img
                src={phoenixLogo}
                alt="Phoenix"
                className="h-16 md:h-20 object-contain"
              />
            </div>
            <h2 className="headline-lg text-foreground mb-4">
              {t('Naše produkty', 'Our Products')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t(
                'Ponúkame dva typy drviacich strojov optimalizovaných pre rôzne aplikácie a objemy spracovania.',
                'We offer two types of shredders optimized for different applications and processing volumes.'
              )}
            </p>
          </motion.div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => {
            const path = language === 'en' 
              ? `/en/products/${product.slugEn}` 
              : `/produkty/${product.slugSk}`;
            const name = language === 'en' ? product.nameEn : product.nameSk;
            const desc = language === 'en' ? product.shortDescEn : product.shortDescSk;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link to={path} className="card-industrial block group h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={productImages[product.id]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground uppercase tracking-wide mb-2">
                      {name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                      {t('Detail produktu', 'Product Details')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
