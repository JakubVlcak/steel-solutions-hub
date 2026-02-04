import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, Mail, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { challenges, products, companyInfo } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/images/worksteel-logo.png';

const Header = () => {
  const { language, setLanguage, t, getLocalizedPath } = useLanguage();
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

  const navItems = [
    {
      label: t('Výzvy', 'Challenges'),
      path: getLocalizedPath('/challenges', '/en/challenges'),
      dropdown: challenges.map(c => ({
        label: language === 'en' ? c.nameEn : c.nameSk,
        path: getLocalizedPath(`/challenges/${c.slugSk}`, `/en/challenges/${c.slugEn}`),
      })),
    },
    {
      label: t('Produkty', 'Products'),
      path: getLocalizedPath('/produkty', '/en/products'),
      dropdown: [
        { label: t('Prehľad produktov', 'Products Overview'), path: getLocalizedPath('/produkty', '/en/products') },
        ...products.map(p => ({
          label: language === 'en' ? p.nameEn : p.nameSk,
          path: getLocalizedPath(`/produkty/${p.slugSk}`, `/en/products/${p.slugEn}`),
        })),
      ],
    },
    {
      label: t('Hriadele', 'Shafts'),
      path: getLocalizedPath('/hriadele', '/en/shafts'),
      dropdown: [
        { label: t('Výroba hriadeľov', 'Shaft Manufacturing'), path: getLocalizedPath('/hriadele/vyroba', '/en/shafts/manufacturing') },
        { label: t('Servis hriadeľov', 'Shaft Service'), path: getLocalizedPath('/hriadele/servis', '/en/shafts/service') },
      ],
    },
    {
      label: t('Galéria', 'Gallery'),
      path: getLocalizedPath('/galeria', '/en/gallery'),
    },
    {
      label: t('Kontakt', 'Contact'),
      path: getLocalizedPath('/kontakt', '/en/contact'),
    },
  ];

  const homePath = language === 'en' ? '/en' : '/';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-sm shadow-lg py-2'
          : 'bg-white py-4'
      }`}
    >
      <div className="container-industrial">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={homePath} className="flex items-center">
            <img
              src={logo}
              alt="WorkSteel Logo"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-8 opacity-50' : 'h-20 opacity-100'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isContact = item.label === t('Kontakt', 'Contact');

              if (isContact) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group relative w-28 h-12 text-white bg-neutral-800 overflow-hidden ml-2"
                  >
                    <p className="absolute inset-0 flex items-center justify-center font-bold z-10 duration-500">
                      {item.label}
                    </p>
                    <div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 delay-500 right-0"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 right-4"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 delay-500 right-8"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 right-12"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 delay-500 right-16"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 right-20"></div>
                      <div className="absolute duration-500 bg-accent w-4 h-16 -bottom-16 group-hover:-bottom-1 delay-500 right-24"></div>
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={item.path}
                  className="nav-item relative group"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.path)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-accent font-medium transition-colors ${
                      location.pathname.startsWith(item.path.split('#')[0]) ? 'text-accent' : ''
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.dropdown && (
                    <div className={`nav-dropdown bg-white shadow-lg ${openDropdown === item.path ? 'opacity-100 visible translate-y-0' : ''}`}>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-3 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 rounded-sm overflow-hidden">
              <button
                onClick={() => setLanguage('sk')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'sk'
                    ? 'bg-accent text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-accent text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-accent p-2 transition-colors"
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
            className="lg:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <div className="container-industrial py-4">
              {/* Mobile contact info */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{companyInfo.phone}</span>
                </a>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-accent transition-colors text-sm"
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
                      className="block py-2 text-gray-800 font-medium hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block py-1.5 text-gray-600 hover:text-accent transition-colors text-sm"
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
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
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
