import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cog, Wrench, ArrowRight, Settings, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import manufacturingImage from '@/assets/shafts/manufacturing.jpg';
import serviceImage from '@/assets/shafts/service.jpg';

const ShaftsSection = () => {
  const { language, t } = useLanguage();

  const shaftsPath = language === 'en' ? '/en/shafts' : '/hriadele';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';

  const services = [
    {
      icon: Cog,
      titleSk: 'Výroba nových hriadeľov na mieru',
      titleEn: 'Custom manufacturing of new shafts',
      descSk: 'Kompletná výroba hriadeľov podľa špecifikácií zákazníka. Od návrhu po finálny produkt.',
      descEn: 'Complete shaft manufacturing to customer specifications. From design to final product.',
      image: manufacturingImage,
    },
    {
      icon: Settings,
      titleSk: 'Optimalizácia geometrie nožov a hákov',
      titleEn: 'Optimization of knife and hook geometry',
      descSk: 'Prispôsobenie geometrie pre špecifický typ materiálu a požadovanú frakciu.',
      descEn: 'Geometry adaptation for specific material type and desired fraction.',
      image: manufacturingImage,
    },
    {
      icon: Wrench,
      titleSk: 'Repas a servis existujúcich hriadeľov',
      titleEn: 'Refurbishment and service of existing shafts',
      descSk: 'Renovácie, opravy a výmena segmentov existujúcich hriadeľov.',
      descEn: 'Renovations, repairs and segment replacement of existing shafts.',
      image: serviceImage,
    },
    {
      icon: CheckCircle2,
      titleSk: 'Technická konzultácia k existujúcemu stroju',
      titleEn: 'Technical consultation for existing machine',
      descSk: 'Odborné poradenstvo pre optimalizáciu výkonu vášho stroja.',
      descEn: 'Expert advice to optimize your machine performance.',
      image: serviceImage,
    },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-industrial">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="headline-lg text-foreground mb-4">
            {t('HRIADELE PRE DVOJHRIADEĽOVÉ DRVIČE', 'SHAFTS FOR DUAL-SHAFT SHREDDERS')}
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            {t(
              'Konfigurované presne podľa materiálu a požadovanej frakcie',
              'Configured precisely according to material and desired fraction'
            )}
          </p>
        </motion.div>

        {/* Solution Not Universal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-background p-8 md:p-12 rounded-sm mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-wide mb-6">
            {t('RIEŠENIE, NIE UNIVERZÁL', 'SOLUTION, NOT UNIVERSAL')}
          </h3>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              {t(
                'Každý hriadeľ navrhujeme individuálne podľa konkrétnej aplikácie.',
                'We design each shaft individually for the specific application.'
              )}
            </p>
            <p>
              {t(
                'Cieľom je optimálny výkon, kontrolovaná frakcia a dlhá životnosť.',
                'The goal is optimal performance, controlled fraction and long service life.'
              )}
            </p>
            <p>
              {t(
                'Hriadele konfigurujeme podľa typu spracovávaného materiálu, požadovanej výstupnej frakcie, výkonu a krútiaceho momentu stroja, ako aj podľa požiadaviek na agresivitu záberu.',
                'We configure shafts according to the type of material being processed, the desired output fraction, machine power and torque, as well as the requirements for grip aggressiveness.'
              )}
            </p>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-wide text-center mb-12">
            {t('NAŠE SLUŽBY', 'OUR SERVICES')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-sm"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wide">
                  {language === 'en' ? service.titleEn : service.titleSk}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' ? service.descEn : service.descSk}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background p-8 md:p-12 rounded-sm mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-wide mb-6">
            {t('TECHNICKÉ RIEŠENIE OVERENÉ PRAXOU', 'TECHNICALLY PROVEN SOLUTION')}
          </h3>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              {t(
                'Používame konštrukčné riešenia vyvíjané pre náročné materiály, ako sú kov, C&D odpad, komunálny odpad a biomasa.',
                'We use design solutions developed for demanding materials such as metal, C&D waste, municipal waste and biomass.'
              )}
            </p>
            <p>
              {t(
                'Geometria hriadeľov je navrhnutá s ohľadom na smer výstupu a tok materiálu, čím sa dosahuje stabilná prevádzka a predvídateľná výstupná frakcia.',
                'The geometry of the shafts is designed with regard to the output direction and material flow, achieving stable operation and predictable output fraction.'
              )}
            </p>
            <p>
              {t(
                'Technický výkres hriadeľa je súčasťou finálnej špecifikácie riešenia.',
                'Technical drawing of the shaft is part of the final solution specification.'
              )}
            </p>
          </div>
        </motion.div>

        {/* Why WorkSteel + Phoenix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-accent/5 p-8 md:p-12 rounded-sm text-center"
        >
          <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-wide mb-6">
            {t('PREČO WORKSTEEL + PHOENIX', 'WHY WORKSTEEL + PHOENIX')}
          </h3>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed mb-6">
            {t(
              '🇸🇰 Slovenská výroba hriadeľov s rýchlou komunikáciou a servisom, postavená na 🇩🇪 nemeckom know-how a viac než 20-ročných skúsenostiach s vývojom drviacich technológií.',
              '🇸🇰 Slovak shaft manufacturing with fast communication and service, built on 🇩🇪 German know-how and more than 20 years of experience in crushing technology development.'
            )}
          </p>
          <Link
            to={contactPath}
            className="btn-accent inline-flex items-center gap-2"
          >
            {t('Kontaktovať nás', 'Contact Us')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShaftsSection;
