import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import { companyInfo } from '@/data/translations';

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
      <div className="container-industrial">
        <div className="flex items-center justify-between">
          {/* Left side - Company info */}
          <div className="flex items-center gap-6">
            <span className="font-semibold">{companyInfo.name}</span>
            <a
              href={companyInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{companyInfo.address}, {companyInfo.city}</span>
            </a>
          </div>
          
          {/* Right side - Contact & Social */}
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{companyInfo.phone}</span>
            </a>
            <a 
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{companyInfo.email}</span>
            </a>
            
            {/* Social icons */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-primary-foreground/20">
              <a 
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
