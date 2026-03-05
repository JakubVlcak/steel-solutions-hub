import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { products, challenges } from '@/data/translations';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (sk: string, en: string) => string;
  getLocalizedPath: (skPath: string, enPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Build slug mappings from translations data
const productSlugSkToEn: Record<string, string> = {};
const productSlugEnToSk: Record<string, string> = {};
products.forEach(p => {
  productSlugSkToEn[p.slugSk] = p.slugEn;
  productSlugEnToSk[p.slugEn] = p.slugSk;
});

const challengeSlugSkToEn: Record<string, string> = {};
const challengeSlugEnToSk: Record<string, string> = {};
challenges.forEach(c => {
  challengeSlugSkToEn[c.slugSk] = c.slugEn;
  challengeSlugEnToSk[c.slugEn] = c.slugSk;
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return location.pathname.startsWith('/en') ? 'en' : 'sk';
    }
    return 'sk';
  });

  // Sync language state with URL on location changes
  React.useEffect(() => {
    const isEnglish = location.pathname.startsWith('/en');
    setLanguageState(isEnglish ? 'en' : 'sk');
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    let newPath: string;

    if (lang === 'en') {
      if (currentPath.startsWith('/en')) {
        newPath = currentPath;
      } else if (currentPath === '/') {
        newPath = '/en';
      } else {
        // Map SK paths to EN paths
        const pathMap: Record<string, string> = {
          '/challenges': '/en/challenges',
          '/produkty': '/en/products',
          '/hriadele': '/en/shafts',
          '/galeria': '/en/gallery',
          '/kontakt': '/en/contact',
          '/ochrana-osobnych-udajov': '/en/privacy-policy',
        };

        // Check for dynamic routes with slug translation
        if (currentPath.startsWith('/challenges/')) {
          const skSlug = currentPath.replace('/challenges/', '');
          const enSlug = challengeSlugSkToEn[skSlug] || skSlug;
          newPath = `/en/challenges/${enSlug}`;
        } else if (currentPath.startsWith('/produkty/')) {
          const skSlug = currentPath.replace('/produkty/', '');
          const enSlug = productSlugSkToEn[skSlug] || skSlug;
          newPath = `/en/products/${enSlug}`;
        } else if (currentPath === '/hriadele/vyroba') {
          newPath = '/en/shafts/manufacturing';
        } else if (currentPath === '/hriadele/servis') {
          newPath = '/en/shafts/service';
        } else if (currentPath.startsWith('/hriadele/')) {
          newPath = currentPath.replace('/hriadele/', '/en/shafts/');
        } else {
          newPath = pathMap[currentPath] || `/en${currentPath}`;
        }
      }
    } else {
      if (!currentPath.startsWith('/en')) {
        newPath = currentPath;
      } else if (currentPath === '/en' || currentPath === '/en/') {
        newPath = '/';
      } else {
        // Map EN paths to SK paths
        const pathMap: Record<string, string> = {
          '/en/challenges': '/challenges',
          '/en/products': '/produkty',
          '/en/shafts': '/hriadele',
          '/en/gallery': '/galeria',
          '/en/contact': '/kontakt',
          '/en/privacy-policy': '/ochrana-osobnych-udajov',
        };

        // Check for dynamic routes with slug translation
        if (currentPath.startsWith('/en/challenges/')) {
          const enSlug = currentPath.replace('/en/challenges/', '');
          const skSlug = challengeSlugEnToSk[enSlug] || enSlug;
          newPath = `/challenges/${skSlug}`;
        } else if (currentPath.startsWith('/en/products/')) {
          const enSlug = currentPath.replace('/en/products/', '');
          const skSlug = productSlugEnToSk[enSlug] || enSlug;
          newPath = `/produkty/${skSlug}`;
        } else if (currentPath === '/en/shafts/manufacturing') {
          newPath = '/hriadele/vyroba';
        } else if (currentPath === '/en/shafts/service') {
          newPath = '/hriadele/servis';
        } else if (currentPath.startsWith('/en/shafts/')) {
          newPath = currentPath.replace('/en/shafts/', '/hriadele/');
        } else {
          newPath = pathMap[currentPath] || currentPath.replace('/en', '') || '/';
        }
      }
    }

    if (newPath !== currentPath) {
      navigate(newPath);
    }
    setLanguageState(lang);
  };

  const t = (sk: string, en: string): string => {
    return language === 'en' ? en : sk;
  };

  const getLocalizedPath = (skPath: string, enPath: string): string => {
    return language === 'en' ? enPath : skPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};
