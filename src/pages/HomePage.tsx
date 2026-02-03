import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import ChallengesGrid from '@/components/sections/ChallengesGrid';
import ProductsShowcase from '@/components/sections/ProductsShowcase';
import ShaftsSection from '@/components/sections/ShaftsSection';
import CTASection from '@/components/sections/CTASection';

const HomePage = () => {
  const { language, t } = useLanguage();
  
  const challengesPath = language === 'en' ? '/en/challenges' : '/challenges';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  return (
    <Layout>
      <HeroBanner
        title={t('Výroba drviacich strojov a hriadeľov na mieru', 'Custom Manufacturing of Shredders and Shafts')}
        ctaPrimary={{
          label: t('Pozrieť riešenia', 'View Solutions'),
          path: challengesPath,
        }}
        ctaSecondary={{
          label: t('Kontaktovať nás', 'Contact Us'),
          path: contactPath,
        }}
      />
      
      <ChallengesGrid />
      
    
      
      <ShaftsSection />
      
      <ProductsShowcase />
      
      <CTASection />
    </Layout>
  );
};

export default HomePage;
