import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (sk: string, en: string) => string;
  getLocalizedPath: (skPath: string, enPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Base path for GitHub Pages deployment
const BASE_PATH = '/steel-solutions-hub';

// Helper to get path without basename
const getAppPath = () => {
  const fullPath = window.location.pathname;
  if (fullPath.startsWith(BASE_PATH)) {
    return fullPath.slice(BASE_PATH.length) || '/';
  }
  return fullPath;
};

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
  const [language, setLanguageState] = useState<Language>(() => {
    // Check initial path for language
    if (typeof window !== 'undefined') {
      const appPath = getAppPath();
      return appPath.startsWith('/en') ? 'en' : 'sk';
    }
    return 'sk';
  });

  // Listen for URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const appPath = getAppPath();
      const isEnglish = appPath.startsWith('/en');
      setLanguageState(isEnglish ? 'en' : 'sk');
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  
  const setLanguage = (lang: Language) => {
    const currentPath = getAppPath();
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
        };

        // Check for dynamic routes
        if (currentPath.startsWith('/challenges/')) {
          newPath = currentPath.replace('/challenges/', '/en/challenges/');
        } else if (currentPath.startsWith('/produkty/')) {
          newPath = currentPath.replace('/produkty/', '/en/products/');
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
        };

        // Check for dynamic routes
        if (currentPath.startsWith('/en/challenges/')) {
          newPath = currentPath.replace('/en/challenges/', '/challenges/');
        } else if (currentPath.startsWith('/en/products/')) {
          newPath = currentPath.replace('/en/products/', '/produkty/');
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

    // Construct full URL with basename
    const fullNewPath = BASE_PATH + newPath;
    const fullCurrentPath = window.location.pathname;

    // Use window.location for navigation to avoid hook issues
    if (fullNewPath !== fullCurrentPath) {
      window.history.pushState({}, '', fullNewPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
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
