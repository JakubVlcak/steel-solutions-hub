import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { challenges } from '@/data/translations';

// Challenge images
import commercialWaste from '@/assets/challenges/commercial-waste.jpg';
import rubberTires from '@/assets/challenges/rubber-tires.jpg';
import automotiveScrap from '@/assets/challenges/automotive-scrap.jpg';
import cfrpGfrp from '@/assets/challenges/cfrp-gfrp.jpg';
import woodWaste from '@/assets/challenges/wood-waste.jpg';
import paperCardboard from '@/assets/challenges/paper-cardboard.jpg';
import constructionWaste from '@/assets/challenges/construction-waste.jpg';

const challengeImages: Record<string, string> = {
  'commercial-waste': commercialWaste,
  'rubber-tires': rubberTires,
  'automotive-scrap': automotiveScrap,
  'cfrp-gfrp': cfrpGfrp,
  'wood-waste': woodWaste,
  'paper-cardboard': paperCardboard,
  'construction-waste': constructionWaste,
};

interface ChallengeCardProps {
  challenge: typeof challenges[0];
  index: number;
  large?: boolean;
}

const ChallengeCard = ({ challenge, index, large = false }: ChallengeCardProps) => {
  const { language } = useLanguage();
  
  const path = language === 'en' 
    ? `/en/challenges/${challenge.slugEn}` 
    : `/challenges/${challenge.slugSk}`;
  
  const name = language === 'en' ? challenge.nameEn : challenge.nameSk;
  const description = language === 'en' ? challenge.descriptionEn : challenge.descriptionSk;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={path} className="challenge-card block group">
        <div className={`relative overflow-hidden ${large ? 'aspect-[4/3]' : 'aspect-square'}`}>
          <img
            src={challengeImages[challenge.id]}
            alt={name}
            className="challenge-image w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground uppercase tracking-wide mb-2">
              {name}
            </h3>
            {large && (
              <p className="text-primary-foreground/80 text-sm line-clamp-2 mb-3">
                {description}
              </p>
            )}
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
              {language === 'en' ? 'More information' : 'Viac informácií'}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

interface ChallengesGridProps {
  large?: boolean;
  showAll?: boolean;
}

const ChallengesGrid = ({ large = false, showAll = true }: ChallengesGridProps) => {
  const { t } = useLanguage();
  
  const displayChallenges = showAll ? challenges : challenges.slice(0, 6);
  
  return (
    <section className="section-padding bg-surface watermark-pattern">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="headline-lg text-foreground mb-4">
            {t('Riešenia podľa typu materiálu', 'Solutions by Material Type')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              'Vyberte typ odpadu a nájdite vhodné riešenie',
              'Select waste type and find the right solution'
            )}
          </p>
        </motion.div>
        
        <div className={`grid gap-4 md:gap-6 ${
          large 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {displayChallenges.map((challenge, index) => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              index={index}
              large={large}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesGrid;
