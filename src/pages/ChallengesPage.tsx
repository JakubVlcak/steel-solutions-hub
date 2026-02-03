import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import ChallengesGrid from '@/components/sections/ChallengesGrid';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  const { language, t } = useLanguage();
  
  const homePath = language === 'en' ? '/en' : '/';
  
  return (
    <Layout>
      <HeroBanner
        title={t('Riešenia drvenia podľa typu materiálu', 'Shredding Solutions by Material Type')}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: 'Challenges' },
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
                'Každý typ odpadu vyžaduje špecifický prístup. Prezentujeme overené riešenia pre najčastejšie spracovávané materiály.',
                'Every type of waste requires a specific approach. We present proven solutions for the most commonly processed materials.'
              )}
            </p>
          </motion.div>
        </div>
      </section>
      
      <ChallengesGrid large showAll />
    </Layout>
  );
};

export default ChallengesPage;
