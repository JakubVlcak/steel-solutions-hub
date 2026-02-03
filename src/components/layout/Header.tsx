import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, Mail, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { challenges, products, companyInfo } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const getPath = (skPath: string, enPath: string) => {
    return language === 'en' ? enPath : skPath;
  };

  const navItems = [
    {
      label: t('Challenges', 'Challenges'),
      path: getPath('/challenges', '/en/challenges'),
      dropdown: challenges.map(c => ({
        label: language === 'en' ? c.nameEn : c.nameSk,
        path: getPath(`/challenges/${c.slugSk}`, `/en/challenges/${c.slugEn}`),
      })),
    },
    {
      label: t('Produkty', 'Products'),
      path: getPath('/produkty', '/en/products'),
      dropdown: [
        { label: t('Prehľad produktov', 'Products Overview'), path: getPath('/produkty', '/en/products') },
        ...products.map(p => ({
          label: language === 'en' ? p.nameEn : p.nameSk,
          path: getPath(`/produkty/${p.slugSk}`, `/en/products/${p.slugEn}`),
        })),
      ],
    },
    {
      label: t('Hriadele', 'Shafts'),
      path: getPath('/hriadele', '/en/shafts'),
      dropdown: [
        { label: t('Výroba hriadeľov', 'Shaft Manufacturing'), path: getPath('/hriadele#vyroba', '/en/shafts#manufacturing') },
        { label: t('Servis hriadeľov', 'Shaft Service'), path: getPath('/hriadele#servis', '/en/shafts#service') },
      ],
    },
    {
      label: t('Galéria', 'Gallery'),
      path: getPath('/galeria', '/en/gallery'),
    },
    {
      label: t('Kontakt', 'Contact'),
      path: getPath('/kontakt', '/en/contact'),
    },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/98 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-primary py-4'
      }`}
    >
      <div className="container-industrial">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={language === 'en' ? '/en' : '/'} className="flex items-center">
            <span className={`font-display font-bold text-primary-foreground uppercase tracking-wider transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>
              WORK<span className="text-accent">STEEL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.path} 
                className="nav-item relative group"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.path)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-4 py-2 text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors ${
                    location.pathname.startsWith(item.path.split('#')[0]) ? 'text-accent' : ''
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {item.dropdown && (
                  <div className={`nav-dropdown ${openDropdown === item.path ? 'opacity-100 visible translate-y-0' : ''}`}>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-steel-medium transition-colors border-b border-primary-foreground/10 last:border-b-0"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-steel-medium rounded-sm overflow-hidden">
              <button
                onClick={() => setLanguage('sk')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'sk' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-primary-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10"
          >
            <div className="container-industrial py-4">
              {/* Mobile contact info */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-primary-foreground/10">
                <a 
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{companyInfo.phone}</span>
                </a>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{companyInfo.email}</span>
                </a>
              </div>

              {/* Mobile nav items */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className="block py-2 text-primary-foreground font-medium"
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block py-1.5 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile social */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-primary-foreground/10">
                <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
