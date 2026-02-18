import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Ruler, Weight, Zap, Gauge, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, challenges } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';

import hps15Image from '@/assets/products/hps-1-5.jpg';
import dualShaftImage from '@/assets/products/dual-shaft-2-2.jpg';

// Product gallery images - dynamically import for HPS 1.5
const hps15GalleryModules = import.meta.glob('@/assets/products/hps-1-5-gallery/*.jpg', { eager: true, import: 'default' });
const hps15GalleryImages = Object.entries(hps15GalleryModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)\.jpg$/)?.[1] || '0');
    const numB = parseInt(b.match(/(\d+)\.jpg$/)?.[1] || '0');
    return numA - numB;
  })
  .map(([, url]) => url as string);

// Product gallery images - dynamically import for Dual Shaft 2.2
const dualShaft22GalleryModules = import.meta.glob('@/assets/products/dual-shaft-2-2-gallery/*.jpg', { eager: true, import: 'default' });
const dualShaft22GalleryImages = Object.entries(dualShaft22GalleryModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)\.jpg$/)?.[1] || '0');
    const numB = parseInt(b.match(/(\d+)\.jpg$/)?.[1] || '0');
    return numA - numB;
  })
  .map(([, url]) => url as string);

// Product galleries map
const productGalleries: Record<string, string[]> = {
  'hps-1-5': hps15GalleryImages,
  'dual-shaft-2-2': dualShaft22GalleryImages,
};

const productImages: Record<string, string> = {
  'hps-1-5': hps15Image,
  'dual-shaft-2-2': dualShaftImage,
};

// Product PDF brochures - files in public/downloads folder
const productPDFs: Record<string, Array<{ filename: string; labelSk: string; labelEn: string }>> = {
  'hps-1-5': [
    { filename: 'hps-1-5.pdf', labelSk: 'Produktový leták', labelEn: 'Product Brochure' },
    { filename: 'prt_HPS-1.5_technisches_datenblatt_2022-01-10_EN.pdf', labelSk: 'Technický dátový list HPS-1.5 D', labelEn: 'Technical Data Sheet HPS-1.5 D' },
  ],
  'dual-shaft-2-2': [
    { filename: 'dual-shaft-2-2.pdf', labelSk: 'Produktový leták', labelEn: 'Product Brochure' },
  ],
};

const productSpecs: Record<string, { specs: Array<{ icon: any; labelSk: string; labelEn: string; value: string }> }> = {
  'hps-1-5': {
    specs: [
      { icon: Ruler, labelSk: 'Rozmery (DxŠxV)', labelEn: 'Dimensions (LxWxH)', value: '12,5 x 2,48 x 2,7 m' },
      { icon: Weight, labelSk: 'Hmotnosť (bez magnetu / s magnetom / plná výbava)', labelEn: 'Weight (w/o magnet / w/ magnet / all options)', value: '17 t / 18,2 t / 18,5 t' },
      { icon: Zap, labelSk: 'Výkon motora', labelEn: 'Motor Power', value: '294 kW' },
      { icon: Zap, labelSk: 'Točivý moment', labelEn: 'Torque', value: '260 000 Nm' },
      { icon: Gauge, labelSk: 'Kapacita', labelEn: 'Capacity', value: '20-40 t/h' },
    ],
  },
  'dual-shaft-2-2': {
    specs: [
      { icon: Ruler, labelSk: 'Pracovné rozmery (DxŠxV)', labelEn: 'Working Dimensions (LxWxH)', value: '14,5 x 2,8 x 3,3 m' },
      { icon: Weight, labelSk: 'Hmotnosť (plná výbava)', labelEn: 'Weight (full equipment)', value: '3,2 t' },
      { icon: Zap, labelSk: 'Točivý moment', labelEn: 'Torque', value: '460 000Nm' },
      { icon: Gauge, labelSk: 'Kapacita (drevo)', labelEn: 'Capacity (wood)', value: '32-68 t/h' },
    ],
  },
};

// Product YouTube videos
const productVideos: Record<string, string> = {
  'hps-1-5': 'O1RtxATXLmw',
};

const productDescriptions: Record<string, { overviewSk: string; overviewEn: string; featuresSk: string[]; featuresEn: string[]; detailedSk?: string; detailedEn?: string; optionsSk?: string[]; optionsEn?: string[] }> = {
  'hps-1-5': {
    overviewSk: 'Phoenix Hydro Power Shredder – HPS 1.5 je univerzálny drvič, ktorý je univerzálne použiteľný v mobilných, polomobilných a stacionárnych aplikáciách a je jedným z najvýkonnejších dvojhriadeľových drvičov vo svojej triede. Ideálny preddrvič pre takmer všetky materiály.',
    overviewEn: 'Phoenix Hydro Power Shredder – HPS 1.5 is a universal shredder that can be used universally in mobile, semi-mobile and stationary applications and is one of the most powerful dual-shaft shredders in its class. Ideal pre-shredder for almost all materials.',
    detailedSk: `V rôznych aplikáciách, ako je drevný odpad, biomasa, podpníky, odpad, hliníkový a elektronický šrot a mnoho ďalších, drvič Hydro-Power preukazuje svoje jasné výhody a poskytuje vynikajúci výkon s vysokou priepustnosťou a presviedča vysokou kvalitou drvenia, a to aj v najťažších každodenných podmienkach.

Vyspelá koncepcia strojov je založená na moderných a vysoko kvalitných strojových komponentoch, ktoré sa vyznačujú dlhou životnosťou.

Dvojhriadeľový drvič je k dispozícii v 2 požiadavkách na podvozok v závislosti od potrieb mobility. Pre jednoduchý pohyb na mieste recyklácie alebo pre prepravu hákovým nakladačom vo verzii s nápravou kolies a ojom. Alebo s koľajnicovým systémom pre manévrovanie a pohyb v oblasti.

Do nášho dvojhriadeľového drviča inštalujeme dieselové motory najnovšej generácie v súlade s aktuálnymi normami pre výfukové plyny s nízkou spotrebou paliva, obzvlášť tiché a energeticky úsporné.

Prevodovka využíva hydrostatický pohon s regulovaným dvojitým čerpadlom a hydraulické motory so zosilnenou prevodovkou s maximálnym krútiacim momentom až 260 000 Nm.

Drvič Hydro Power má modulárnu konštrukciu a je vybavený pre vaše individuálne požiadavky. Modulárna konštrukcia umožňuje obzvlášť jednoduchú údržbu a servis šrotu a jeho vynikajúca dostupnosť a stabilná a robustná konštrukcia ho robia obzvlášť odolným.

Vďaka vyspelej koncepcii a konštrukcii stroja pracuje drvič Hydro Power s obzvlášť nízkou úrovňou prachu; chladenie zabezpečuje voliteľný chladiaci systém so zabudovaným špirálovým ventilátorom.

Vďaka inovatívnej technológii strojov a riadenia dosahuje drvič Hydro Power vysoký výkon až 60 t/h pri extrémne nízkej spotrebe energie.

Vďaka efektívnemu riadeniu stroja dvojhriadeľový drvič šetrí naftu a vyznačuje sa vysokou účinnosťou pri používaní.

Vďaka novej architektúre hriadeľa dosahuje drvič Phoenix Hydro Power agresívne podávanie, je necitlivý na cudzie telesá a presvedčí nízkymi nákladmi na opotrebenie.

Vstavaná funkcia reverzácie chráni hriadele pred poškodením. Vďaka vhodnej konfigurácii hriadeľa je možné dosiahnuť presne definované výstupné veľkosti a pokryť širokú škálu rôznych aplikačných materiálov.`,
    detailedEn: `In various applications such as wood waste, biomass, stumps, waste, aluminum and electronic scrap and many others, the Hydro-Power shredder demonstrates its clear advantages and provides excellent performance with high throughput and convinces with high shredding quality, even in the toughest everyday conditions.

The advanced machine concept is based on modern and high-quality machine components that are characterized by a long service life.

The dual-shaft shredder is available in 2 chassis requirements depending on mobility needs. For easy movement at the recycling site or for transport by hook loader in the version with wheel axle and eye. Or with a rail system for maneuvering and movement in the area.

We install latest generation diesel engines in our dual-shaft shredder in accordance with current exhaust gas standards with low fuel consumption, particularly quiet and energy efficient.

The transmission uses hydrostatic drive with regulated double pump and hydraulic motors with reinforced gearbox with maximum torque up to 260,000 Nm.

The Hydro Power shredder has a modular design and is equipped for your individual requirements. The modular design allows particularly easy maintenance and service of the scrap and its excellent accessibility and stable and robust construction make it particularly durable.

Thanks to the advanced concept and design of the machine, the Hydro Power shredder works with particularly low dust levels; cooling is provided by an optional cooling system with built-in spiral fan.

Thanks to innovative machine and control technology, the Hydro Power shredder achieves high performance of up to 60 t/h with extremely low energy consumption.

Thanks to efficient machine control, the dual-shaft shredder saves diesel and is characterized by high efficiency in use.

Thanks to the new shaft architecture, the Phoenix Hydro Power shredder achieves aggressive feeding, is insensitive to foreign objects and convinces with low wear costs.

The built-in reversing function protects the shafts from damage. Thanks to suitable shaft configuration, precisely defined output sizes can be achieved and cover a wide range of different application materials.`,
    featuresSk: [
      'Univerzálne použiteľný v mobilných, polomobilných a stacionárnych aplikáciách',
      'Jeden z najvýkonnejších dvojhriadeľových drvičov vo svojej triede',
      'Vysoký výkon až 60 t/h pri nízkej spotrebe energie',
      'Maximálny krútiaci moment až 260 000 Nm',
      'Modulárna konštrukcia pre jednoduchú údržbu',
      'Dieselové motory najnovšej generácie s nízkou spotrebou paliva',
      'Hydrostatický pohon s regulovaným dvojitým čerpadlom',
      'Vstavaná funkcia reverzácie na ochranu hriadeľov',
      'Nová architektúra hriadeľa pre agresívne podávanie',
      'Necitlivý na cudzie telesá',
      'Nízke náklady na opotrebenie',
      'Obzvlášť nízka úroveň prachu',
    ],
    featuresEn: [
      'Universally applicable in mobile, semi-mobile and stationary applications',
      'One of the most powerful dual-shaft shredders in its class',
      'High performance up to 60 t/h with low energy consumption',
      'Maximum torque up to 260,000 Nm',
      'Modular design for easy maintenance',
      'Latest generation diesel engines with low fuel consumption',
      'Hydrostatic drive with regulated double pump',
      'Built-in reversing function to protect shafts',
      'New shaft architecture for aggressive feeding',
      'Insensitive to foreign objects',
      'Low wear costs',
      'Particularly low dust levels',
    ],
    optionsSk: [
      'Náprava kolesa - ľahké premiestňovanie na mieste recyklácie',
      'Ťažná tyč - na pohyb stroja v oblasti drvenia',
      'Podvozok - pásový systém, dostupný aj s pásovými podložkami',
      'Permanentný magnet nad pás - na výber materiálu FE',
      'Špeciálna farba',
      'Po strihaní hrebeňom - pre rovnomerné zrno',
      'Rozšírenie zásobníka - väčší objem zásobníka pre kŕmny materiál',
      'Systém postrekovania vodou - zníženie prašnosti',
      'Zimný balík - naftové a hydraulické kúrenie',
    ],
    optionsEn: [
      'Wheel axle - easy relocation at recycling site',
      'Drawbar - for moving the machine in the crushing area',
      'Chassis - track system, also available with track pads',
      'Permanent magnet over belt - for FE material selection',
      'Special paint',
      'After comb shearing - for uniform grain',
      'Hopper extension - larger hopper volume for feed material',
      'Water spray system - dust reduction',
      'Winter package - diesel and hydraulic heating',
    ],
  },
  'dual-shaft-2-2': {
    overviewSk: 'Univerzálny dvojhriadeľový drvič 2.2 je navrhnutý pre maximálnu flexibilitu a výkon. Jeho modulárna konštrukcia umožňuje prispôsobenie pre rôzne typy materiálov a požiadavky na výstupnú frakciu.',
    overviewEn: 'Universal Dual Shaft Shredder 2.2 is designed for maximum flexibility and performance. Its modular design allows customization for various types of materials and output fraction requirements.',
    detailedSk: `Požadovaný materiál:
Odpadové drevo, staré pneumatiky, železničné podvaly, biomasa, zelený odpad, plasty, palmy, objemný odpad, guľatina, korene, komunálny odpad, stavebný a demolačný odpad (C&D), šrot, hliníkové profily, kovy, matrace, koberce, atď.

Kapacita:
Variabilná, v závislosti od vstupného materiálu, typu drviacich hriadeľov a rovnomernosti podávania. Príklad: Drevo cca 32 – 68 t/h (++).

Veľkosť výstupu:
V závislosti od vstupného materiálu a zaťaženia hriadeľov, s podielom naddimenzovaného materiálu napr. pri rozbehu a chode naprázdno.

Základ stroja:
Uchytený na hákovom nosiči podľa normy EÚ. Robustná a stabilná drviaca jednotka zo špeciálnej ocele pre vyššiu stabilitu a dlhú životnosť. Polomobilné prevedenie.

Varianty pohonu:
Naftový motor: výkon 368 kW, emisná norma EÚ Stage 5 alebo Stage 2 (kde je povolená).
Elektrický motor: výkon 2 × 250 kW, možné rôzne značky motorov.

Nádrže:
Nafta: cca 840 l, AdBlue: cca 64 l

Vykladací dopravník:
Štandardná šírka 1,4 m, výsypná výška cca 4,7 m.

Technické parametre:
Krútiaci moment prevodovky: cca 460 000 Nm
Otáčky hriadeľov: 9 – 36 min⁻¹
Hlučnosť: cca 86 dBA, pri plnom zaťažení až 111 dBA
Objem násypky: cca 9 m³

Riadenie a ovládanie:
Ovládacia jednotka s dotykovým displejom, multifunkčný displej, GPS / FMS systém sledovania. Diaľkové ovládanie: 12-kanálové bezpečnostné rádiové ovládanie.

Nástroje a rezací systém:
Dvojhriadeľový systém, konštrukcia podľa požiadaviek materiálu, s bočnými hrebeňmi. Voliteľne: sekundárna drviaca lišta, sekundárne rezacie zariadenie.

Lakovanie:
Časti stroja: RAL 1016 – Sírovo žltá
Základný rám: RAL 7016 – Antracitová sivá
Špeciálne lakovanie: na želanie zákazníka (voliteľné).

Rozmery:
Pracovné rozmery (D × Š × V): 14,5 × 2,8 × 3,3 m
Transportné rozmery (D × Š × V): 7,1 × 2,8 × 3,3 m

Hmotnosť:
Bez magnetu: 28,5 t
S magnetom: 30,4 t
Plná výbava: 32,5 t`,
    detailedEn: `Required material:
Waste wood, old tires, railway sleepers, biomass, green waste, plastics, palms, bulky waste, logs, roots, municipal waste, construction and demolition waste (C&D), scrap, aluminum profiles, metals, mattresses, carpets, etc.

Capacity:
Variable, depending on input material, type of crushing shafts and feeding uniformity. Example: Wood approx. 32 – 68 t/h (++).

Output size:
Depending on input material and shaft load, with a proportion of oversized material, e.g. during start-up and idle running.

Machine base:
Mounted on hook carrier according to EU standard. Robust and stable crushing unit made of special steel for higher stability and long service life. Semi-mobile design.

Drive variants:
Diesel engine: power 368 kW, EU emission standard Stage 5 or Stage 2 (where permitted).
Electric motor: power 2 × 250 kW, various motor brands possible.

Tanks:
Diesel: approx. 840 l, AdBlue: approx. 64 l

Discharge conveyor:
Standard width 1.4 m, discharge height approx. 4.7 m.

Technical parameters:
Gearbox torque: approx. 460,000 Nm
Shaft speed: 9 – 36 min⁻¹
Noise level: approx. 86 dBA, up to 111 dBA at full load
Hopper volume: approx. 9 m³

Control and operation:
Control unit with touch display, multifunctional display, GPS / FMS tracking system. Remote control: 12-channel safety radio control.

Tools and cutting system:
Dual-shaft system, design according to material requirements, with side combs. Optional: secondary crushing bar, secondary cutting device.

Painting:
Machine parts: RAL 1016 – Sulfur yellow
Base frame: RAL 7016 – Anthracite grey
Special painting: according to customer requirements (optional).

Dimensions:
Working dimensions (L × W × H): 14.5 × 2.8 × 3.3 m
Transport dimensions (L × W × H): 7.1 × 2.8 × 3.3 m

Weight:
Without magnet: 28.5 t
With magnet: 30.4 t
Full equipment: 32.5 t`,
    featuresSk: [
      'Kapacita až 68 t/h (drevo)',
      'Krútiaci moment prevodovky: 460 000 Nm',
      'Výkon: 368 kW (nafta) alebo 2 × 250 kW (elektro)',
      'Emisná norma EÚ Stage 5',
      'Dotyková ovládacia jednotka s GPS/FMS',
      '12-kanálové rádiové diaľkové ovládanie',
      'Robustná konštrukcia zo špeciálnej ocele',
      'Polomobilné prevedenie',
      'Modulárny rezací systém',
      'Objem násypky 9 m³',
    ],
    featuresEn: [
      'Capacity up to 68 t/h (wood)',
      'Gearbox torque: 460,000 Nm',
      'Power: 368 kW (diesel) or 2 × 250 kW (electric)',
      'EU emission standard Stage 5',
      'Touch control unit with GPS/FMS',
      '12-channel radio remote control',
      'Robust special steel construction',
      'Semi-mobile design',
      'Modular cutting system',
      'Hopper volume 9 m³',
    ],
    optionsSk: [
      'Náprava kolies - jednoduchá manipulácia so strojom',
      'Ťažná oj - pre presun stroja na pracovisku',
      'Pásový podvozok - možnosť s pásmi s reťazovými podložkami',
      'Magnetický separátor - na oddelenie železných kovov',
      'Sekundárna drviaca lišta - pre rovnomernú frakciu výstupu',
      'Nadstavba násypky - zvýšená kapacita plnenia',
      'Vodný postrek - potlačenie prašnosti',
      'Zimný balík - predohrev nafty a hydrauliky',
    ],
    optionsEn: [
      'Wheel axle - easy machine handling',
      'Drawbar - for moving the machine at the workplace',
      'Track chassis - option with chain pad tracks',
      'Magnetic separator - for separating ferrous metals',
      'Secondary crushing bar - for uniform output fraction',
      'Hopper extension - increased filling capacity',
      'Water spray - dust suppression',
      'Winter package - preheating of diesel and hydraulics',
    ],
  },
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const product = products.find(p =>
    language === 'en' ? p.slugEn === slug : p.slugSk === slug
  );

  // Get gallery images for this product
  const galleryImages = product ? (productGalleries[product.id] || []) : [];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  
  if (!product) {
    return (
      <Layout>
        <div className="section-padding container-industrial text-center">
          <h1 className="headline-lg">
            {t('Produkt nenájdený', 'Product not found')}
          </h1>
        </div>
      </Layout>
    );
  }
  
  const homePath = language === 'en' ? '/en' : '/';
  const productsPath = language === 'en' ? '/en/products' : '/produkty';
  const contactPath = language === 'en' ? '/en/contact' : '/kontakt';
  
  const name = language === 'en' ? product.nameEn : product.nameSk;
  const tagline = language === 'en' ? product.taglineEn : product.taglineSk;
  const specs = productSpecs[product.id]?.specs || [];
  const descriptions = productDescriptions[product.id];
  const overview = language === 'en' ? descriptions?.overviewEn : descriptions?.overviewSk;
  const features = language === 'en' ? descriptions?.featuresEn : descriptions?.featuresSk;
  const detailed = language === 'en' ? descriptions?.detailedEn : descriptions?.detailedSk;
  const options = language === 'en' ? descriptions?.optionsEn : descriptions?.optionsSk;
  
  // Find suitable challenges
  const suitableChallenges = challenges.filter(c => 
    product.suitableFor.includes(c.id)
  );
  
  return (
    <Layout>
      <HeroBanner
        title={name}
        subtitle={tagline}
        image={productImages[product.id]}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Produkty', 'Products'), path: productsPath },
          { label: name },
        ]}
      />
      
      {/* Product Overview */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
                <img
                  src={productImages[product.id]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="headline-md text-foreground mb-6">
                {t('Prehľad', 'Overview')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {overview}
              </p>
              
              <h3 className="font-display font-semibold text-lg text-foreground uppercase tracking-wide mb-4">
                {t('Kľúčové vlastnosti', 'Key Features')}
              </h3>
              <ul className="space-y-3 mb-8">
                {features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`${contactPath}?product=${encodeURIComponent(name)}`}
                className="btn-accent inline-flex items-center gap-2"
              >
                {t('Poslať dopyt', 'Send Inquiry')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      {detailed && (
        <section className="section-padding bg-surface">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="headline-md text-foreground mb-6 text-center">
                {t('Podrobný popis', 'Detailed Description')}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {detailed.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {productVideos[product.id] && (
        <section className="section-padding bg-background">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Video', 'Video')}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video rounded-sm overflow-hidden shadow-card">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${productVideos[product.id]}`}
                  title={name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Gallery */}
      {galleryImages.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Galéria', 'Gallery')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(
                  'Pozrite si detailné fotografie produktu.',
                  'View detailed product photos.'
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              alt={`${name} ${selectedImage + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical Specifications */}
      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-md text-foreground mb-4">
              {t('Technické parametre', 'Technical Specifications')}
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? spec.labelEn : spec.labelSk}
                    </p>
                    <p className="font-display font-bold text-lg text-foreground">
                      {spec.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optional Equipment */}
      {options && options.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Voliteľné vybavenie', 'Optional Equipment')}
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 bg-background p-4 rounded-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{option}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Downloads - only show if product has PDFs */}
      {productPDFs[product.id] && productPDFs[product.id].length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Dokumenty na stiahnutie', 'Downloads')}
              </h2>
            </motion.div>

            <div className="max-w-md mx-auto space-y-4">
              {productPDFs[product.id].map((pdf, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={`/steel-solutions-hub/downloads/${pdf.filename}`}
                    download
                    className="flex items-center gap-4 bg-background p-4 rounded-sm shadow-card hover:shadow-hover transition-shadow"
                  >
                    <div className="w-12 h-12 bg-destructive/10 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Download className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {language === 'en' ? pdf.labelEn : pdf.labelSk}
                      </p>
                      <p className="text-sm text-muted-foreground">PDF</p>
                    </div>
                    <span className="text-accent font-semibold">
                      {t('Stiahnuť', 'Download')}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Suitable For */}
      {suitableChallenges.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="headline-md text-foreground mb-4">
                {t('Vhodné pre', 'Suitable for')}
              </h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {suitableChallenges.map((challenge, index) => {
                const challengePath = language === 'en' 
                  ? `/en/challenges/${challenge.slugEn}` 
                  : `/challenges/${challenge.slugSk}`;
                const challengeName = language === 'en' ? challenge.nameEn : challenge.nameSk;
                
                return (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={challengePath}
                      className="inline-block px-4 py-2 bg-surface text-foreground rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                    >
                      {challengeName}
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
              {t('Máte záujem o tento produkt?', 'Interested in this product?')}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {t(
                'Kontaktujte nás pre nezáväznú ponuku a konzultáciu.',
                'Contact us for a non-binding offer and consultation.'
              )}
            </p>
            <Link 
              to={`${contactPath}?product=${encodeURIComponent(name)}`}
              className="btn-accent inline-flex items-center gap-2"
            >
              {t('Poslať dopyt', 'Send Inquiry')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetailPage;
