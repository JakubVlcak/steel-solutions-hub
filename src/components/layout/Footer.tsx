import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { companyInfo } from '@/data/translations';

const Footer = () => {
  const { language, t } = useLanguage();

  const getPath = (skPath: string, enPath: string) => {
    return language === 'en' ? enPath : skPath;
  };

  const quickLinks = [
    { label: t('Challenges', 'Challenges'), path: getPath('/challenges', '/en/challenges') },
    { label: t('Produkty', 'Products'), path: getPath('/produkty', '/en/products') },
    { label: t('Hriadele', 'Shafts'), path: getPath('/hriadele', '/en/shafts') },
    { label: t('Galéria', 'Gallery'), path: getPath('/galeria', '/en/gallery') },
    { label: t('Kontakt', 'Contact'), path: getPath('/kontakt', '/en/contact') },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-industrial py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Logo & Description */}
          <div className="lg:col-span-1">
            <Link to={language === 'en' ? '/en' : '/'} className="inline-block mb-4">
              <span className="font-display font-bold text-2xl uppercase tracking-wider">
                WORK<span className="text-accent">STEEL</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t(
                'Špecialisti na výrobu drviacich strojov a výrobu/servis hriadeľov. Kvalita a spoľahlivosť od roku založenia.',
                'Specialists in manufacturing crushing machines and shaft production/service. Quality and reliability since establishment.'
              )}
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg uppercase tracking-wide mb-4">
              {t('Rýchle odkazy', 'Quick Links')}
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg uppercase tracking-wide mb-4">
              {t('Kontakt', 'Contact')}
            </h4>
            <div className="space-y-3">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address + ', ' + companyInfo.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{companyInfo.address}<br />{companyInfo.city}</span>
              </a>
              <a 
                href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4 className="font-display font-semibold text-lg uppercase tracking-wide mb-4">
              {t('Sledujte nás', 'Follow Us')}
            </h4>
            <div className="flex items-center gap-4">
              <a 
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-medium rounded-sm flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-medium rounded-sm flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-medium rounded-sm flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={companyInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-steel-medium rounded-sm flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-industrial py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} {companyInfo.name}. {t('Všetky práva vyhradené.', 'All rights reserved.')}
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-accent transition-colors">
                {t('Ochrana osobných údajov', 'Privacy Policy')}
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
