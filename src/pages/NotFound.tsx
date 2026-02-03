import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const homePath = language === 'en' ? '/en' : '/';

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-padding bg-background">
        <div className="container-industrial text-center">
          <h1 className="font-display text-8xl font-bold text-accent mb-4">404</h1>
          <h2 className="headline-lg text-foreground mb-4">
            {t('Stránka nenájdená', 'Page Not Found')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            {t(
              'Ospravedlňujeme sa, ale stránka, ktorú hľadáte, neexistuje.',
              "Sorry, the page you're looking for doesn't exist."
            )}
          </p>
          <Link to={homePath} className="btn-accent">
            {t('Späť na domovskú stránku', 'Back to Homepage')}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
