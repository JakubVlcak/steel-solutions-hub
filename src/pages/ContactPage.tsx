import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { companyInfo, products } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  
  const homePath = language === 'en' ? '/en' : '/';
  
  // Pre-fill inquiry type from URL params
  useEffect(() => {
    const type = searchParams.get('type');
    const product = searchParams.get('product');
    
    if (product) {
      setFormData(prev => ({ ...prev, inquiryType: product }));
    } else if (type) {
      setFormData(prev => ({ ...prev, inquiryType: type }));
    }
  }, [searchParams]);
  
  const inquiryTypes = language === 'en' ? [
    { value: '', label: 'Select inquiry type' },
    { value: products[0].nameEn, label: products[0].nameEn },
    { value: products[1].nameEn, label: products[1].nameEn },
    { value: 'Shaft Manufacturing', label: 'Shaft Manufacturing' },
    { value: 'Shaft Service', label: 'Shaft Service' },
    { value: 'Other', label: 'Other' },
  ] : [
    { value: '', label: 'Vyberte typ dopytu' },
    { value: products[0].nameSk, label: products[0].nameSk },
    { value: products[1].nameSk, label: products[1].nameSk },
    { value: 'Výroba hriadeľov', label: 'Výroba hriadeľov' },
    { value: 'Servis hriadeľov', label: 'Servis hriadeľov' },
    { value: 'Iné', label: 'Iné' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: t('Dopyt odoslaný', 'Inquiry Sent'),
      description: t(
        'Ďakujeme za váš dopyt. Ozveme sa vám do 24 hodín.',
        "Thank you for your inquiry. We'll get back to you within 24 hours."
      ),
    });
  };
  
  if (isSubmitted) {
    return (
      <Layout>
        <HeroBanner
          title={t('Kontaktujte nás', 'Contact Us')}
          subtitle={t(
            'Sme tu pre vaše otázky a dopyty',
            "We're here for your questions and inquiries"
          )}
          small
          breadcrumbs={[
            { label: t('Domov', 'Home'), path: homePath },
            { label: t('Kontakt', 'Contact') },
          ]}
        />
        
        <section className="section-padding bg-background">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h2 className="headline-md text-foreground mb-4">
                {t('Ďakujeme!', 'Thank you!')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t(
                  'Váš dopyt bol úspešne odoslaný. Ozveme sa vám do 24 hodín.',
                  'Your inquiry has been successfully sent. We will get back to you within 24 hours.'
                )}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
                }}
                className="btn-accent"
              >
                {t('Poslať ďalší dopyt', 'Send another inquiry')}
              </button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <HeroBanner
        title={t('Kontaktujte nás', 'Contact Us')}
        subtitle={t(
          'Sme tu pre vaše otázky a dopyty',
          "We're here for your questions and inquiries"
        )}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Kontakt', 'Contact') },
        ]}
      />
      
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="headline-md text-foreground mb-8">
                {t('Kontaktné údaje', 'Contact Information')}
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground uppercase tracking-wide mb-2">
                    {companyInfo.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    IČO: {companyInfo.ico} | DIČ: {companyInfo.dic}
                  </p>
                </div>
                
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t('Adresa', 'Address')}</p>
                    <p>{companyInfo.address}</p>
                    <p>{companyInfo.city}</p>
                  </div>
                </a>
                
                <a 
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t('Telefón', 'Phone')}</p>
                    <p>{companyInfo.phone}</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p>{companyInfo.email}</p>
                  </div>
                </a>
              </div>
              
              {/* Social Links */}
              <div>
                <p className="font-semibold text-foreground mb-4">
                  {t('Sledujte nás', 'Follow Us')}
                </p>
                <div className="flex items-center gap-3">
                  <a 
                    href={companyInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-surface rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href={companyInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-surface rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={companyInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-surface rounded-sm flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="headline-md text-foreground mb-8">
                {t('Pošlite nám správu', 'Send us a message')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('Meno', 'Name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('Vaše meno', 'Your name')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('vas@email.com', 'your@email.com')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t('Telefón', 'Phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+421 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                    {t('Typ dopytu', 'Inquiry Type')}
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('Správa', 'Message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                    placeholder={t('Vaša správa...', 'Your message...')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      {t('Odosielam...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('Odoslať', 'Send')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="bg-surface">
        <div className="container-industrial py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="headline-md text-foreground mb-6 text-center">
              {t('Kde nás nájdete', 'Where to find us')}
            </h2>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-[400px] md:h-[500px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.8!2d18.5489!3d48.8147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714a0e5c9d5b5c5%3A0x0!2sN%C3%A1dra%C5%BEn%C3%A1%2079%2F28%2C%20972%2013%20Nitrianske%20Pravno!5e0!3m2!1sen!2ssk!4v1700000000000!5m2!1sen!2ssk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('Mapa WORKSTEEL', 'WORKSTEEL Map')}
          />
        </motion.div>
      </section>
    </Layout>
  );
};

export default ContactPage;
