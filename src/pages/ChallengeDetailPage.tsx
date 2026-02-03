import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { challenges, products } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import CTASection from '@/components/sections/CTASection';

// Challenge images
import commercialWaste from '@/assets/challenges/commercial-waste.jpg';
import rubberTires from '@/assets/challenges/rubber-tires.jpg';
import automotiveScrap from '@/assets/challenges/automotive-scrap.jpg';
import cfrpGfrp from '@/assets/challenges/cfrp-gfrp.jpg';
import woodWaste from '@/assets/challenges/wood-waste.jpg';
import paperCardboard from '@/assets/challenges/paper-cardboard.jpg';
import constructionWaste from '@/assets/challenges/construction-waste.jpg';

// Product images
import hps15Image from '@/assets/products/hps-1-5.jpg';
import dualShaftImage from '@/assets/products/dual-shaft-2-2.jpg';

const challengeImages: Record<string, string> = {
  'commercial-waste': commercialWaste,
  'rubber-tires': rubberTires,
  'automotive-scrap': automotiveScrap,
  'cfrp-gfrp': cfrpGfrp,
  'wood-waste': woodWaste,
  'paper-cardboard': paperCardboard,
  'construction-waste': constructionWaste,
};

const productImages: Record<string, string> = {
  'hps-1-5': hps15Image,
  'dual-shaft-2-2': dualShaftImage,
};

const challengeDetails: Record<string, { challengeSk: string; challengeEn: string; solutionSk: string; solutionEn: string }> = {
  'commercial-waste': {
    challengeSk: 'Komerčný odpad je jednou z najrozšírenejších výziev v odpadovom hospodárstve. Zahŕňa široké spektrum materiálov od plastov, cez textil až po zmiešané materiály. Vyžaduje flexibilné riešenia schopné spracovať rôzne typy vstupov.',
    challengeEn: 'Commercial waste is one of the most widespread challenges in waste management. It includes a wide range of materials from plastics, textiles to mixed materials. It requires flexible solutions capable of processing various types of inputs.',
    solutionSk: 'Naše drviče sú navrhnuté pre maximálnu flexibilitu a spoľahlivosť pri spracovaní komerčného odpadu. Hydraulický pohon zaručuje konštantný výkon aj pri premenlivom zložení materiálu.',
    solutionEn: 'Our shredders are designed for maximum flexibility and reliability in processing commercial waste. Hydraulic drive ensures constant performance even with variable material composition.',
  },
  'rubber-tires': {
    challengeSk: 'Gumové pneumatiky predstavujú špecifickú výzvu vďaka svojej elasticite a odolnosti. Správne spracovanie umožňuje získať cenný granulát pre ďalšie využitie v stavebníctve, športe a priemysle.',
    challengeEn: 'Rubber tires pose a specific challenge due to their elasticity and durability. Proper processing allows obtaining valuable granulate for further use in construction, sports and industry.',
    solutionSk: 'Špeciálne nože a optimalizovaný design drviča zabezpečujú efektívne spracovanie pneumatík na požadovanú frakciu. Robustná konštrukcia zaručuje dlhú životnosť aj pri náročnom používaní.',
    solutionEn: 'Special knives and optimized shredder design ensure efficient processing of tires to the required fraction. Robust construction guarantees long life even with heavy use.',
  },
  'automotive-scrap': {
    challengeSk: 'Automobilový šrot obsahuje rôzne materiály od kovov po plasty a textil. Efektívne spracovanie vyžaduje výkonné stroje schopné zvládnuť tvrdé aj mäkké materiály.',
    challengeEn: 'Automotive scrap contains various materials from metals to plastics and textiles. Efficient processing requires powerful machines capable of handling both hard and soft materials.',
    solutionSk: 'Naše drviče disponujú vysokým krútiacim momentom a robustnou konštrukciou pre spracovanie automobilového odpadu. Modulárny design umožňuje prispôsobenie pre konkrétne požiadavky.',
    solutionEn: 'Our shredders feature high torque and robust construction for processing automotive waste. Modular design allows customization for specific requirements.',
  },
  'cfrp-gfrp': {
    challengeSk: 'Kompozitné materiály z uhlíkových a sklenených vlákien vyžadujú špeciálny prístup kvôli ich vlastnostiam a potenciálnym zdravotným rizikám pri nesprávnom spracovaní.',
    challengeEn: 'Composite materials from carbon and glass fibers require a special approach due to their properties and potential health risks if improperly processed.',
    solutionSk: 'Ponúkame riešenia s uzavretým systémom a odsávaním prachu pre bezpečné spracovanie kompozitov. Špeciálne nože minimalizujú opotrebenie a zabezpečujú čistý rez.',
    solutionEn: 'We offer solutions with a closed system and dust extraction for safe composite processing. Special knives minimize wear and ensure a clean cut.',
  },
  'wood-waste': {
    challengeSk: 'Drevený odpad zahŕňa široké spektrum od čerstvého dreva po spracovaný materiál. Výstupom môže byť biomasa, štiepka alebo materiál pre ďalšie priemyselné využitie.',
    challengeEn: 'Wood waste includes a wide spectrum from fresh wood to processed material. The output can be biomass, chips or material for further industrial use.',
    solutionSk: 'Naše drviče sú optimalizované pre rôzne typy dreva s nastaviteľnou veľkosťou výstupnej frakcie. Vysoká priepustnosť zabezpečuje efektívnu prevádzku.',
    solutionEn: 'Our shredders are optimized for various types of wood with adjustable output fraction size. High throughput ensures efficient operation.',
  },
  'paper-cardboard': {
    challengeSk: 'Papier a kartón sú jedny z najrecyklovanejších materiálov. Správne drvenie je kľúčové pre efektívnu recykláciu a opätovné spracovanie.',
    challengeEn: 'Paper and cardboard are among the most recycled materials. Proper shredding is key to efficient recycling and reprocessing.',
    solutionSk: 'Ponúkame riešenia pre veľkoobjemové spracovanie papiera a kartónu s vysokou priepustnosťou. Systém je navrhnutý pre kontinuálnu prevádzku s minimálnymi prestojmi.',
    solutionEn: 'We offer solutions for high-volume paper and cardboard processing with high throughput. The system is designed for continuous operation with minimal downtime.',
  },
  'construction-waste': {
    challengeSk: 'Stavebný a demolačný odpad obsahuje betón, tehly, drevo a rôzne zmiešané materiály. Vyžaduje robustné riešenia schopné zvládnuť abrazívne materiály.',
    challengeEn: 'Construction and demolition waste contains concrete, bricks, wood and various mixed materials. It requires robust solutions capable of handling abrasive materials.',
    solutionSk: 'Naše drviče sú konštruované pre najnáročnejšie podmienky s vysoko odolnými komponenty. Modulárny design umožňuje rýchlu výmenu opotrebovaných častí.',
    solutionEn: 'Our shredders are constructed for the most demanding conditions with highly durable components. Modular design allows quick replacement of worn parts.',
  },
};

const ChallengeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const challenge = challenges.find(c => 
    language === 'en' ? c.slugEn === slug : c.slugSk === slug
  );
  
  if (!challenge) {
    return (
      <Layout>
        <div className="section-padding container-industrial text-center">
          <h1 className="headline-lg">
            {t('Stránka nenájdená', 'Page not found')}
          </h1>
        </div>
      </Layout>
    );
  }
  
  const homePath = language === 'en' ? '/en' : '/';
  const challengesPath = language === 'en' ? '/en/challenges' : '/challenges';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  const name = language === 'en' ? challenge.nameEn : challenge.nameSk;
  const details = challengeDetails[challenge.id];
  const challengeText = language === 'en' ? details.challengeEn : details.challengeSk;
  const solutionText = language === 'en' ? details.solutionEn : details.solutionSk;
  
  // Find recommended products
  const recommendedProducts = products.filter(p => 
    p.suitableFor.includes(challenge.id)
  );
  
  return (
    <Layout>
      <HeroBanner
        title={name}
        image={challengeImages[challenge.id]}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: 'Challenges', path: challengesPath },
          { label: name },
        ]}
      />
      
      {/* Challenge Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="headline-md text-foreground mb-6">
                {t('Výzva', 'The Challenge')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {challengeText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="headline-md text-foreground mb-6">
                {t('Naše riešenie', 'Our Solution')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {solutionText}
              </p>
              <ul className="space-y-3">
                {[
                  t('Vysoký výkon a spoľahlivosť', 'High performance and reliability'),
                  t('Nízke prevádzkové náklady', 'Low operating costs'),
                  t('Jednoduchá údržba', 'Easy maintenance'),
                  t('Prispôsobiteľné riešenia', 'Customizable solutions'),
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Odporúčané produkty', 'Recommended Products')}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  'Tieto produkty sú ideálne pre spracovanie tohto typu materiálu.',
                  'These products are ideal for processing this type of material.'
                )}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedProducts.map((product, index) => {
                const productPath = language === 'en' 
                  ? `/en/products/${product.slugEn}` 
                  : `/produkty/${product.slugSk}`;
                const productName = language === 'en' ? product.nameEn : product.nameSk;
                const productDesc = language === 'en' ? product.shortDescEn : product.shortDescSk;
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={productPath} className="card-industrial flex gap-4 p-4 group">
                      <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                        <img
                          src={productImages[product.id]}
                          alt={productName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-foreground uppercase tracking-wide mb-1">
                          {productName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {productDesc}
                        </p>
                        <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                          {t('Pozrieť produkt', 'View Product')}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-industrial text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="headline-md text-primary-foreground mb-4">
              {t(`Máte otázky k spracovaniu ${name.toLowerCase()}?`, `Have questions about processing ${name.toLowerCase()}?`)}
            </h2>
            <Link 
              to={`${contactPath}?type=${encodeURIComponent(name)}`}
              className="btn-accent inline-flex items-center gap-2"
            >
              {t('Kontaktovať nás', 'Contact Us')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ChallengeDetailPage;
