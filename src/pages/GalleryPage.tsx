import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';

// Import all gallery images
import heroMain from '@/assets/hero-main.jpg';

// Products - HPS 1.5
import hps15 from '@/assets/products/hps-1-5.jpg';
import hps151 from '@/assets/products/hps-1-5-gallery/hps-1-51.jpg';
import hps152 from '@/assets/products/hps-1-5-gallery/hps-1-52.jpg';
import hps153 from '@/assets/products/hps-1-5-gallery/hps-1-53.jpg';
import hps154 from '@/assets/products/hps-1-5-gallery/hps-1-54.jpg';
import hps155 from '@/assets/products/hps-1-5-gallery/hps-1-55.jpg';
import hps156 from '@/assets/products/hps-1-5-gallery/hps-1-56.jpg';

// Products - Dual Shaft
import dualShaft from '@/assets/products/dual-shaft-2-2.jpg';
import dualShaftGallery from '@/assets/products/dual-shaft-2-2-gallery/dual-shaft-2-2.jpg';

// Shafts - Manufacturing
import manufacturing from '@/assets/shafts/manufacturing.jpg';
import vyrobaHriadelov1 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov1.jpg';
import vyrobaHriadelov2 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov2.jpg';
import vyrobaHriadelov3 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov3.jpg';
import vyrobaHriadelov4 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov4.jpg';
import vyrobaHriadelov5 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov5.jpg';
import vyrobaHriadelov6 from '@/assets/shafts/manufacturing-gallery/vyroba_hriadelov6.jpg';

// Shafts - Service
import service from '@/assets/shafts/service.jpg';
import servisHriadelov1 from '@/assets/shafts/service-gallery/servis_hriadelov1.jpg';
import servisHriadelov2 from '@/assets/shafts/service-gallery/servis_hriadelov2.jpg';
import servisHriadelov3 from '@/assets/shafts/service-gallery/servis_hriadelov3.jpg';
import servisHriadelov4 from '@/assets/shafts/service-gallery/servis_hriadelov4.jpg';
import servisHriadelov5 from '@/assets/shafts/service-gallery/servis_hriadelov5.jpg';
import servisHriadelov6 from '@/assets/shafts/service-gallery/servis_hriadelov6.jpg';
import servisHriadelov7 from '@/assets/shafts/service-gallery/servis_hriadelov7.jpg';
import servisHriadelov8 from '@/assets/shafts/service-gallery/servis_hriadelov8.jpg';
import servisHriadelov9 from '@/assets/shafts/service-gallery/servis_hriadelov9.jpg';
import servisHriadelov10 from '@/assets/shafts/service-gallery/servis_hriadelov10.jpg';
import servisHriadelov11 from '@/assets/shafts/service-gallery/servis_hriadelov11.jpg';
import servisHriadelov12 from '@/assets/shafts/service-gallery/servis_hriadelov12.jpg';
import servisHriadelov13 from '@/assets/shafts/service-gallery/servis_hriadelov13.jpg';

// Challenges
import commercialWaste from '@/assets/challenges/commercial-waste.jpg';
import rubberTires from '@/assets/challenges/rubber-tires.jpg';
import automotiveScrap from '@/assets/challenges/automotive-scrap.jpg';
import cfrpGfrp from '@/assets/challenges/cfrp-gfrp.jpg';
import woodWaste from '@/assets/challenges/wood-waste.jpg';
import woodWaste1 from '@/assets/challenges/wood-waste1.jpg';
import paperCardboard from '@/assets/challenges/paper-cardboard.jpg';
import paperCardboard1 from '@/assets/challenges/paper-cardboard1.jpg';
import constructionWaste from '@/assets/challenges/construction-waste.jpg';
import constructionWaste1 from '@/assets/challenges/construction-waste1.jpg';

interface GalleryImage {
  src: string;
  category: 'all' | 'machines' | 'shafts' | 'manufacturing';
  alt: string;
}

const galleryImages: GalleryImage[] = [
  // Machines
  { src: heroMain, category: 'machines', alt: 'Industrial shredder' },
  { src: hps15, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps151, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps152, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps153, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps154, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps155, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: hps156, category: 'machines', alt: 'Phoenix Hydro Power Shredder' },
  { src: dualShaft, category: 'machines', alt: 'Dual Shaft Shredder' },
  { src: dualShaftGallery, category: 'machines', alt: 'Dual Shaft Shredder' },

  // Shafts - Manufacturing
  { src: manufacturing, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov1, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov2, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov3, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov4, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov5, category: 'shafts', alt: 'Shaft manufacturing' },
  { src: vyrobaHriadelov6, category: 'shafts', alt: 'Shaft manufacturing' },

  // Shafts - Service
  { src: service, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov1, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov2, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov3, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov4, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov5, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov6, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov7, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov8, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov9, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov10, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov11, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov12, category: 'shafts', alt: 'Shaft service' },
  { src: servisHriadelov13, category: 'shafts', alt: 'Shaft service' },

  // Manufacturing / Challenges
  { src: commercialWaste, category: 'manufacturing', alt: 'Commercial waste processing' },
  { src: rubberTires, category: 'manufacturing', alt: 'Tire recycling' },
  { src: automotiveScrap, category: 'manufacturing', alt: 'Automotive scrap' },
  { src: cfrpGfrp, category: 'manufacturing', alt: 'CFRP/GFRP composites' },
  { src: woodWaste, category: 'manufacturing', alt: 'Wood processing' },
  { src: woodWaste1, category: 'manufacturing', alt: 'Wood processing' },
  { src: paperCardboard, category: 'manufacturing', alt: 'Paper recycling' },
  { src: paperCardboard1, category: 'manufacturing', alt: 'Paper recycling' },
  { src: constructionWaste, category: 'manufacturing', alt: 'Construction waste' },
  { src: constructionWaste1, category: 'manufacturing', alt: 'Construction waste' },
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
