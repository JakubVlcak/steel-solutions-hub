import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (sk: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
  const location = useLocation();
  const navigate = useNavigate();
  
  const getLanguageFromPath = (): Language => {
    return location.pathname.startsWith('/en') ? 'en' : 'sk';
  };
  
  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);
  
  useEffect(() => {
    setLanguageState(getLanguageFromPath());
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
        };
        
        // Check for dynamic routes
        if (currentPath.startsWith('/challenges/')) {
          newPath = currentPath.replace('/challenges/', '/en/challenges/');
        } else if (currentPath.startsWith('/produkty/')) {
          newPath = currentPath.replace('/produkty/', '/en/products/');
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
        } else if (currentPath.startsWith('/en/shafts/')) {
          newPath = currentPath.replace('/en/shafts/', '/hriadele/');
        } else {
          newPath = pathMap[currentPath] || currentPath.replace('/en', '');
        }
      }
    }
    
    navigate(newPath);
    setLanguageState(lang);
  };
  
  const t = (sk: string, en: string): string => {
    return language === 'en' ? en : sk;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
