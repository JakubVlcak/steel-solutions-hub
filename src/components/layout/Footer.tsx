import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { companyInfo } from '@/data/translations';

const Footer = () => {
  const { language, t, getLocalizedPath } = useLanguage();

  const quickLinks = [
    { label: t('Výzvy', 'Challenges'), path: getLocalizedPath('/challenges', '/en/challenges') },
    { label: t('Produkty', 'Products'), path: getLocalizedPath('/produkty', '/en/products') },
    { label: t('Hriadele', 'Shafts'), path: getLocalizedPath('/hriadele', '/en/shafts') },
    { label: t('Galéria', 'Gallery'), path: getLocalizedPath('/galeria', '/en/gallery') },
    { label: t('Kontakt', 'Contact'), path: getLocalizedPath('/kontakt', '/en/contact') },
  ];

  const homePath = language === 'en' ? '/en' : '/';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-industrial py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Logo & Description */}
          <div className="lg:col-span-1">
            <Link to={homePath} className="inline-block mb-4">
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
              <span className="hover:text-accent transition-colors cursor-pointer">
                {t('Ochrana osobných údajov', 'Privacy Policy')}
              </span>
              <span className="hover:text-accent transition-colors cursor-pointer">
                Cookies
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
