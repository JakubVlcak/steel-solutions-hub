import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import CTASection from '@/components/sections/CTASection';

import serviceImage from '@/assets/shafts/service.jpg';

// Service gallery images - dynamically import all images from folder
const imageModules = import.meta.glob('@/assets/shafts/service-gallery/*.jpg', { eager: true, import: 'default' });

// Sort images by number in filename
const galleryImages = Object.entries(imageModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)\.jpg$/)?.[1] || '0');
    const numB = parseInt(b.match(/(\d+)\.jpg$/)?.[1] || '0');
    return numA - numB;
  })
  .map(([, url]) => url as string);

const ShaftServicePage = () => {
  const { language, t, getLocalizedPath } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const homePath = language === 'en' ? '/en' : '/';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  const shaftsPath = getLocalizedPath('/hriadele', '/en/shafts');

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));

  const serviceFeatures = language === 'en' ? [
    'Diagnostics and inspection',
    'Segment replacement',
    'Surface renovation',
    'Balancing and calibration',
    'Preventive maintenance',
  ] : [
    'Diagnostika a inšpekcia',
    'Výmena segmentov',
    'Renovácia povrchu',
    'Vyvažovanie a kalibrácia',
    'Preventívna údržba',
  ];

  return (
    <Layout>
      <HeroBanner
        title={t('Servis hriadeľov', 'Shaft Service')}
        subtitle={t(
          'Kompletný servis a opravy vašich hriadeľov',
          'Complete service and repairs for your shafts'
        )}
        image={serviceImage}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Hriadele', 'Shafts'), path: shaftsPath },
          { label: t('Servis', 'Service') },
        ]}
      />

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
                <img
                  src={serviceImage}
                  alt={t('Servis hriadeľov', 'Shaft Service')}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <h2 className="headline-md text-foreground">
                  {t('Servis a opravy', 'Service and Repairs')}
                </h2>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {t(
                  'Predĺžte životnosť vašich hriadeľov prostredníctvom našich servisných služieb. Ponúkame komplexné riešenia od diagnostiky po kompletné renovácie.',
                  'Extend the life of your shafts through our service offerings. We offer comprehensive solutions from diagnostics to complete renovations.'
                )}
              </p>

              <ul className="space-y-3 mb-8">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={`${contactPath}?type=${encodeURIComponent(t('Servis hriadeľov', 'Shaft Service'))}`}
                className="btn-accent inline-flex items-center gap-2"
              >
                {t('Dopyt na servis', 'Service Inquiry')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="headline-md text-foreground mb-6">
              {t('Prečo zvoliť náš servis?', 'Why choose our service?')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t(
                'Náš tím skúsených technikov dokáže diagnostikovať a opraviť akýkoľvek problém s vašimi hriadeľmi. Používame originálne náhradné diely a najmodernejšie technológie pre zabezpečenie dlhej životnosti opravených hriadeľov.',
                'Our team of experienced technicians can diagnose and repair any issue with your shafts. We use original spare parts and state-of-the-art technology to ensure long-lasting repairs.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Gallery */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Galéria servisných prác', 'Service Work Gallery')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Pozrite si ukážky našich servisných prác a renovácií hriadeľov.',
                'View examples of our service work and shaft renovations.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="aspect-square rounded-sm overflow-hidden shadow-card cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image}
                  alt={`${t('Servis hriadeľov', 'Shaft Service')} ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[selectedImage]}
              alt={`${t('Servis hriadeľov', 'Shaft Service')} ${selectedImage + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </Layout>
  );
};

export default ShaftServicePage;
