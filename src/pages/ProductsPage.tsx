import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import ProductsShowcase from '@/components/sections/ProductsShowcase';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const { language, t } = useLanguage();
  
  const homePath = language === 'en' ? '/en' : '/';
  
  return (
    <Layout>
      <HeroBanner
        title={t('Naše produkty', 'Our Products')}
        subtitle={t(
          'Spoľahlivé drviace stroje pre každú výzvu',
          'Reliable shredders for every challenge'
        )}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Produkty', 'Products') },
        ]}
      />
      
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-lg text-muted-foreground">
              {t(
                'Ponúkame dva typy drviacich strojov optimalizovaných pre rôzne aplikácie a objemy spracovania.',
                'We offer two types of shredders optimized for different applications and processing volumes.'
              )}
            </p>
          </motion.div>
        </div>
      </section>
      
      <ProductsShowcase showTitle={false} />
    </Layout>
  );
};

export default ProductsPage;
