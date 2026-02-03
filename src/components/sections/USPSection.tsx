import { motion } from 'framer-motion';
import { Clock, Globe, Factory, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const USPSection = () => {
  const { t } = useLanguage();
  
  const usps = [
    {
      icon: Clock,
      valueSk: '15+',
      valueEn: '15+',
      labelSk: 'rokov skúseností',
      labelEn: 'years of experience',
    },
    {
      icon: Globe,
      valueSk: '10+',
      valueEn: '10+',
      labelSk: 'krajín',
      labelEn: 'countries',
    },
    {
      icon: Factory,
      valueSk: '100%',
      valueEn: '100%',
      labelSk: 'Vlastná výroba',
      labelEn: 'In-house manufacturing',
    },
    {
      icon: Headphones,
      valueSk: '24/7',
      valueEn: '24/7',
      labelSk: 'Servis',
      labelEn: 'Service',
    },
  ];
  
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container-industrial">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-sm mb-4">
                <usp.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {t(usp.valueSk, usp.valueEn)}
              </div>
              <div className="text-muted-foreground">
                {t(usp.labelSk, usp.labelEn)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
