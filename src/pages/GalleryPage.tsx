import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';

// Import all gallery images
import heroMain from '@/assets/hero-main.jpg';
import hps15 from '@/assets/products/hps-1-5.jpg';
import dualShaft from '@/assets/products/dual-shaft-2-2.jpg';
import manufacturing from '@/assets/shafts/manufacturing.jpg';
import service from '@/assets/shafts/service.jpg';
import commercialWaste from '@/assets/challenges/commercial-waste.jpg';
import rubberTires from '@/assets/challenges/rubber-tires.jpg';
import automotiveScrap from '@/assets/challenges/automotive-scrap.jpg';
import woodWaste from '@/assets/challenges/wood-waste.jpg';
import paperCardboard from '@/assets/challenges/paper-cardboard.jpg';
import constructionWaste from '@/assets/challenges/construction-waste.jpg';

interface GalleryImage {
  src: string;
  category: 'all' | 'machines' | 'shafts' | 'manufacturing';
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: heroMain, category: 'machines', alt: 'Industrial shredder' },
  { src: hps15, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: dualShaft, category: 'machines', alt: 'Dual Shaft Shredder' },
  { src: manufacturing, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: service, category: 'shafts', alt: 'Shaft service' },
  { src: commercialWaste, category: 'manufacturing', alt: 'Commercial waste processing' },
  { src: rubberTires, category: 'manufacturing', alt: 'Tire recycling' },
  { src: automotiveScrap, category: 'manufacturing', alt: 'Automotive scrap' },
  { src: woodWaste, category: 'manufacturing', alt: 'Wood processing' },
  { src: paperCardboard, category: 'manufacturing', alt: 'Paper recycling' },
  { src: constructionWaste, category: 'manufacturing', alt: 'Construction waste' },
];

const GalleryPage = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const homePath = language === 'en' ? '/en' : '/';
  
  const filters = [
    { id: 'all', labelSk: 'Všetko', labelEn: 'All' },
    { id: 'machines', labelSk: 'Stroje', labelEn: 'Machines' },
    { id: 'shafts', labelSk: 'Hriadele', labelEn: 'Shafts' },
    { id: 'manufacturing', labelSk: 'Výroba', labelEn: 'Manufacturing' },
  ];
  
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);
  
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };
  
  return (
    <Layout>
      <HeroBanner
        title={t('Galéria', 'Gallery')}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Galéria', 'Gallery') },
        ]}
      />
      
      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-industrial">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-surface text-foreground hover:bg-accent/10'
                }`}
              >
                {language === 'en' ? filter.labelEn : filter.labelSk}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square rounded-sm overflow-hidden cursor-pointer shadow-card hover:shadow-hover transition-shadow"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground p-2"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground p-2"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground/70">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default GalleryPage;
