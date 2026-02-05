import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { challenges, products } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';
import CTASection from '@/components/sections/CTASection';
import YouTubeModal from '@/components/ui/YouTubeModal';

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
    challengeSk: `Recyklácia komerčného odpadu
Drvenie priemyselného a komerčného odpadu

Správna likvidácia a spracovanie komerčného odpadu je nevyhnutné na zachovanie cenných zdrojov a podporu udržateľnosti. Priemyselný odpad zahŕňa širokú škálu materiálov vrátane papiera, plastov, drevného odpadu, kovov a obalových materiálov. Extrémna rozmanitosť však predstavuje veľké výzvy v recyklačných závodoch. Všetok tento odpad produkujú spoločnosti v širokej škále odvetví a vyžaduje si profesionálne spracovanie, aby sa získali cenné suroviny a znížil objem skládok.`,

    challengeEn: `Commercial Waste Recycling
Shredding Industrial and Commercial Waste

Proper disposal and processing of commercial waste is essential to preserve valuable resources and promote sustainability. Industrial waste includes a wide range of materials including paper, plastics, wood waste, metals and packaging materials. However, extreme diversity poses major challenges in recycling plants. All this waste is produced by companies in a wide range of industries and requires professional processing to obtain valuable raw materials and reduce landfill volume.`,

    solutionSk: `Naše priemyselné drviče sú ideálne na spracovanie domového a komerčného odpadu. Vďaka vysokému drviacemu výkonu a štandardne dodávanému magnetickému separátoru je možné rôzne materiály efektívne preddrviť a následne oddeliť, čo umožňuje ich zmysluplnú recykláciu. Výroba náhradných palív (energetické využitie odpadu) tiež znižuje spotrebu fosílnych palív a chráni životné prostredie.

SPRACOVANIE KOMERČNÉHO ODPADU

• Recyklácia materiálu – zhodnocovanie recyklovateľných materiálov na výrobu nových produktov
• Tepelná recyklácia – spaľovanie nerecyklovateľného odpadu na výrobu tepla alebo elektriny`,

    solutionEn: `Our industrial shredders are ideal for processing household and commercial waste. Thanks to the high shredding power and the standard magnetic separator, various materials can be effectively pre-shredded and then separated, enabling meaningful recycling. The production of alternative fuels (energy recovery from waste) also reduces the consumption of fossil fuels and protects the environment.

COMMERCIAL WASTE PROCESSING

• Material recycling – processing recyclable materials for the production of new products
• Thermal recycling – incineration of non-recyclable waste for heat or electricity production`
  },

  'rubber-tires': {
    challengeSk: `Recyklácia pneumatík
Drvenie gumy a použitých pneumatík

Približne 70 – 80 % použitých pneumatík na celom svete sa v súčasnosti repasuje a z veľkej časti recykluje. Použité pneumatiky často pochádzajú z autoservisov, predajní automobilov alebo zberných miest a musia sa likvidovať ekologickým spôsobom. Zvyčajne pozostávajú zo syntetického kaučuku, textilných kordových vložiek, oceľových drôtov a iných materiálov, ktoré sa triedia a spracovávajú v špecializovaných recyklačných závodoch.`,

    challengeEn: `Tire Recycling
Shredding Rubber and Used Tires

Approximately 70-80% of used tires worldwide are currently retreaded and largely recycled. Used tires often come from auto repair shops, car dealerships or collection points and must be disposed of in an environmentally friendly manner. They typically consist of synthetic rubber, textile cord inserts, steel wires and other materials that are sorted and processed in specialized recycling plants.`,

    solutionSk: `Dvojhriadeľové drviče ARJES sa používajú na preddrvenie pneumatík z automobilov, nákladných vozidiel, zemných a poľnohospodárskych pneumatík (pneumatiky EM a AS) a iného gumového odpadu za účelom oddelenia rôznych zložiek. Magnetické separátory oddeľujú železné cudzie látky, ako sú oceľové drôty, čo je nevyhnutné pre následné spracovanie.

SPRACOVANIE GUMOVÉHO ODPADU

• Recyklácia materiálu – spracovanie na granuláty na výrobu nových pneumatík, gumových výrobkov, športových a detských povrchov
• Tepelná recyklácia – spaľovanie v špeciálnych zariadeniach na výrobu tepla alebo elektriny

Použité pneumatiky nehnijú, a preto sa nemôžu likvidovať na skládkach. Správne nakladanie s odpadom je kľúčové pre rozumné využívanie týchto cenných zdrojov a minimalizáciu znečistenia životného prostredia. Recykláciou gumového odpadu nielen pomáhame chrániť prírodné zdroje, ale aj znižujeme znečistenie životného prostredia a podporujeme obehové hospodárstvo.`,

    solutionEn: `ARJES twin-shaft shredders are used for pre-shredding tires from cars, trucks, earthmoving and agricultural tires (EM and AS tires) and other rubber waste to separate various components. Magnetic separators remove ferrous foreign matter such as steel wires, which is essential for subsequent processing.

RUBBER WASTE PROCESSING

• Material recycling – processing into granules for the production of new tires, rubber products, sports and children's surfaces
• Thermal recycling – incineration in special facilities for heat or electricity production

Used tires do not rot and therefore cannot be disposed of in landfills. Proper waste management is crucial for the sensible use of these valuable resources and minimizing environmental pollution. By recycling rubber waste, we not only help protect natural resources, but also reduce environmental pollution and promote the circular economy.`
  },

  'automotive-scrap': {
    challengeSk: `Recyklácia šrotu
Drvenie automobilového a ľahkého šrotu

Profesionálna likvidácia a spracovanie kovového šrotu je veľmi dôležité pre oceliarsky priemysel a spoločnosti zaoberajúce sa spracovaním kovov. Recyklácia kovového šrotu nielen šetrí cenné zdroje, ale aj značné množstvo energie. Najväčší podiel recyklovaného kovu tvoria nehrdzavejúca oceľ a hliník. Do tohto prúdu odpadu však patria aj materiály ako meď, mosadz, zinok a dokonca aj elektrošrot, ktorý sa zvyčajne musí likvidovať a spracovávať samostatne.`,

    challengeEn: `Scrap Recycling
Shredding Automotive and Light Scrap

Professional disposal and processing of metal scrap is very important for the steel industry and companies involved in metal processing. Recycling metal scrap not only saves valuable resources but also a significant amount of energy. The largest share of recycled metal is stainless steel and aluminum. However, this waste stream also includes materials such as copper, brass, zinc and even electronic scrap, which usually has to be disposed of and processed separately.`,

    solutionSk: `Naše drviče od spoločnosti ARJES sú perfektným riešením na drvenie ľahkého šrotu, pretože pracujú efektívne a triedia cudzie materiály, ako sú plasty a iné nekovové komponenty. Vďaka štandardne inštalovaným magnetickým separátorom sa železné a neželezné kovy spoľahlivo oddeľujú. Tento proces tvorí základ pre vysoko kvalitnú recykláciu a ochranu zdrojov pri spracovaní kovov.

SPRACOVANIE AUTOMOBILOVÉHO A ĽAHKÉHO ŠROTU

• Recyklácia materiálu – výroba nových odliatkov pre automobilový, letecký, stavebný a elektronický priemysel
• Tepelná recyklácia – spaľovanie nekovových komponentov na výrobu energie

Od malých áut až po SUV – naše dvojhriadeľové drviče už rozdrvili širokú škálu starých vozidiel a spracovali mnoho ďalších ľahkých kovov, ako je hliník alebo plechový odpad. Okrem cieleného znižovania objemu je obzvlášť dôležité oddelenie obsiahnutých kovov, aby sa predišlo následným stratám kvality počas recyklácie.`,

    solutionEn: `Our shredders from ARJES are the perfect solution for shredding light scrap because they work efficiently and sort out foreign materials such as plastics and other non-metallic components. Thanks to the standard magnetic separators, ferrous and non-ferrous metals are reliably separated. This process forms the basis for high-quality recycling and resource conservation in metal processing.

AUTOMOTIVE AND LIGHT SCRAP PROCESSING

• Material recycling – production of new castings for the automotive, aerospace, construction and electronics industries
• Thermal recycling – incineration of non-metallic components for energy production

From small cars to SUVs – our twin-shaft shredders have already shredded a wide range of old vehicles and processed many other light metals such as aluminum or sheet metal waste. In addition to targeted volume reduction, the separation of the contained metals is particularly important to avoid subsequent quality losses during recycling.`
  },

  'cfrp-gfrp': {
    challengeSk: `Kompozitné materiály z uhlíkových a sklenených vlákien vyžadujú špeciálny prístup kvôli ich vlastnostiam a potenciálnym zdravotným rizikám pri nesprávnom spracovaní.`,
    challengeEn: `Composite materials from carbon and glass fibers require a special approach due to their properties and potential health risks if improperly processed.`,
    solutionSk: `Ponúkame riešenia s uzavretým systémom a odsávaním prachu pre bezpečné spracovanie kompozitov. Špeciálne nože minimalizujú opotrebenie a zabezpečujú čistý rez.`,
    solutionEn: `We offer solutions with a closed system and dust extraction for safe composite processing. Special knives minimize wear and ensure a clean cut.`,
  },

  'wood-waste': {
    challengeSk: `Recyklácia dreva
Drvenie prírodného a odpadového dreva

Drevo ako regeneratívny zdroj sa považuje za klimaticky neutrálny zdroj energie. Pre rozumné využitie potenciálu tohto zdroja je nevyhnutné profesionálne spracovanie prírodného a odpadového dreva. Drevný odpad sa často zbiera zo záhrad, parkov, stavenísk a iných zdrojov a musí sa recyklovať.`,

    challengeEn: `Wood Recycling
Shredding Natural and Waste Wood

Wood as a regenerative resource is considered a climate-neutral energy source. For sensible use of the potential of this resource, professional processing of natural and waste wood is essential. Wood waste is often collected from gardens, parks, construction sites and other sources and must be recycled.`,

    solutionSk: `Naše dvojhriadeľové drviče sa v praxi používajú na preddrvenie drevného odpadu. Výkonné drviče od spoločnosti ARJES umožňujú efektívne zmenšovanie objemu rôznych druhov dreva vrátane paliet, zeleného odpadu a koreňov. Vstavané magnetické separátory dokážu spoľahlivo vytriediť a odstrániť cudzie telesá, ako sú klince a iné kovy. Tento proces tvorí základ pre ďalšie spracovanie v certifikovaných recyklačných závodoch.

SPRACOVANIE DREVNÉHO ODPADU

• Recyklácia materiálu – výroba drevotriesky, paliet, papiera atď.
• Tepelná recyklácia – drevo sa drví a používa ako palivo na výrobu energie
• Kompostovanie – drvenie zeleného odpadu a koreňov na biomasu v kompostárňach

Profesionálnym spracovaním a recykláciou prírodného a odpadového dreva významne prispievame k ochrane životného prostredia a trvalo udržateľnému využívaniu dreva ako zdroja. Naše technológie drvenia a triedenia umožňujú efektívne a ekologické spracovanie drevného odpadu, čím sa recyklujú cenné materiály a posilňuje sa obehové hospodárstvo.`,

    solutionEn: `Our twin-shaft shredders are used in practice for pre-shredding wood waste. Powerful shredders from ARJES enable efficient volume reduction of various types of wood including pallets, green waste and roots. Built-in magnetic separators can reliably sort out and remove foreign bodies such as nails and other metals. This process forms the basis for further processing in certified recycling plants.

WOOD WASTE PROCESSING

• Material recycling – production of chipboard, pallets, paper, etc.
• Thermal recycling – wood is shredded and used as fuel for energy production
• Composting – shredding green waste and roots into biomass in composting plants

Through professional processing and recycling of natural and waste wood, we make a significant contribution to environmental protection and the sustainable use of wood as a resource. Our shredding and sorting technologies enable efficient and ecological processing of wood waste, recycling valuable materials and strengthening the circular economy.`
  },

  'paper-cardboard': {
    challengeSk: `Recyklácia papiera
Drvenie papiera, kartónu a obalov

Papier ako surovina je tradične nielen najstarším recyklovaným produktom, ale stále je aj neoddeliteľnou súčasťou nášho moderného obehového hospodárstva. S mierou recyklácie okolo 80 % prispieva opätovné použitie odpadového papiera rozhodujúcim spôsobom k šetreniu zdrojov a minimalizácii znečistenia životného prostredia. Papier, kartón a kartónové obaly sú cenné suroviny, ktoré sa dajú vďaka recyklačným procesom niekoľkokrát opätovne použiť.`,

    challengeEn: `Paper Recycling
Shredding Paper, Cardboard and Packaging

Paper as a raw material is traditionally not only the oldest recycled product, but is still an integral part of our modern circular economy. With a recycling rate of around 80%, the reuse of waste paper contributes decisively to saving resources and minimizing environmental pollution. Paper, cardboard and cardboard packaging are valuable raw materials that can be reused several times thanks to recycling processes.`,

    solutionSk: `Naše drviče sú ideálnym riešením pre efektívnu recykláciu odpadového papiera, ako sú noviny, brožúry, knihy, kancelárske potreby, papierové obaly a podobne. Všetky tieto materiály, ktoré sa hromadia v kanceláriách, administratívnych centrách alebo maloobchodných predajniach, je možné optimálne rozdrviť pomocou drvičov ARJES a pripraviť ich na recyklačný cyklus. Či už ide o papierové kotúče, balíky papiera alebo kartón – naše recyklačné systémy umožňujú efektívne a nákladovo efektívne preddrvenie.

SPRACOVANIE PAPIERA A KARTÓNU

• Recyklácia materiálu – výroba nových papierových výrobkov, ako sú noviny, obaly, papierenské výrobky atď.
• Tepelná recyklácia – náhradné palivo v cementárňach šetrí spotrebu fosílnych palív

Proces recyklácie odpadového papiera zahŕňa niekoľko krokov: od triedenia, preosievania, drvenia a lisovania až po bielenie, sušenie a vyhladzovanie hotového papierového výrobku. Papierové vlákna je možné recyklovať päť až šesťkrát, kým stratia kvalitu. Naše pomaly bežiace dvojhriadeľové drviče umožňujú presné a efektívne znižovanie objemu, a to aj pri náročných materiáloch, ako sú husto stlačené balíky papiera.`,

    solutionEn: `Our shredders are the ideal solution for efficient recycling of waste paper such as newspapers, brochures, books, office supplies, paper packaging and the like. All these materials that accumulate in offices, administrative centers or retail stores can be optimally shredded using ARJES shredders and prepared for the recycling cycle. Whether paper rolls, bales of paper or cardboard – our recycling systems enable efficient and cost-effective pre-shredding.

PAPER AND CARDBOARD PROCESSING

• Material recycling – production of new paper products such as newspapers, packaging, paper products, etc.
• Thermal recycling – alternative fuel in cement plants saves fossil fuel consumption

The waste paper recycling process involves several steps: from sorting, sieving, shredding and pressing to bleaching, drying and smoothing the finished paper product. Paper fibers can be recycled five to six times before they lose quality. Our slow-running twin-shaft shredders enable precise and efficient volume reduction, even with demanding materials such as densely compressed bales of paper.`
  },

  'construction-waste': {
    challengeSk: `Recyklácia stavebného odpadu
Drvenie demolačného odpadu

Stavebný priemysel využíva širokú škálu materiálov, ako je betón, tehly, drevo, kovy, sadra, asfalt, sklo, plasty a ďalšie. Počas stavebného procesu a pri demolácii budov, ciest a iných stavieb vzniká veľké množstvo minerálneho odpadu, ako aj rôzneho zmiešaného stavebného odpadu. Prostredníctvom profesionálneho triedenia a drvenia je možné niektoré stavebné materiály opätovne použiť na výrobu nových produktov alebo na renováciu existujúcich stavieb.`,

    challengeEn: `Construction Waste Recycling
Shredding Demolition Waste

The construction industry uses a wide range of materials such as concrete, bricks, wood, metals, plaster, asphalt, glass, plastics and others. During the construction process and when demolishing buildings, roads and other structures, large amounts of mineral waste as well as various mixed construction waste are generated. Through professional sorting and shredding, some construction materials can be reused for the production of new products or for the renovation of existing structures.`,

    solutionSk: `Naše výkonné dvojhriadeľové drviče, známe aj ako drviče, sú určené na náročné zníženie objemu stavebného a demolačného odpadu. Pomocou magnetických separátorov sa po primárnom drvení oddeľujú železné zložky, čo výrazne uľahčuje ďalšie spracovanie.

SPRACOVANIE STAVEBNÉHO ODPADU

• Recyklácia materiálu – recyklácia ako štrk, dlažobné kocky, betónové kamenivo alebo plniaci materiál
• Tepelná recyklácia – spaľovanie nerecyklovateľného odpadu na výrobu tepla alebo elektriny

Profesionálne spracovanie stavebného a demolačného odpadu nielenže znižuje objem odpadu, ale tiež podporuje ochranu zdrojov a obehové hospodárstvo v stavebníctve. Vďaka svojim materiálovým vlastnostiam sa minerálny stavebný odpad často recykluje alebo opätovne používa, čo z neho robí cennú surovinu.`,

    solutionEn: `Our powerful twin-shaft shredders, also known as crushers, are designed for demanding volume reduction of construction and demolition waste. Using magnetic separators, ferrous components are separated after primary crushing, which significantly facilitates further processing.

CONSTRUCTION WASTE PROCESSING

• Material recycling – recycling as gravel, paving stones, concrete aggregate or filler material
• Thermal recycling – incineration of non-recyclable waste for heat or electricity production

Professional processing of construction and demolition waste not only reduces waste volume, but also promotes resource conservation and the circular economy in construction. Due to their material properties, mineral construction waste is often recycled or reused, making it a valuable raw material.`
  },
};

const ChallengeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
          { label: t('Výzvy', 'Challenges'), path: challengesPath },
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
              <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {challengeText}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {challenge.youtubeVideoId && (
        <section className="section-padding bg-surface">
          <div className="container-industrial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl"
            >
              <div
                className="relative aspect-video bg-primary/10 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${challenge.youtubeVideoId}/maxresdefault.jpg`}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  aria-label={t('Prehrať video', 'Play video')}
                >
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-accent-foreground fill-current ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              <div className="text-lg text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                {solutionText}
              </div>
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
                    <Link
                      to={productPath}
                      className="card-industrial flex gap-4 p-4 group"
                    >
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
              {t(
                `Máte otázky k spracovaniu ${name.toLowerCase()}?`,
                `Do you have questions about processing ${name.toLowerCase()}?`
              )}
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

      {challenge.youtubeVideoId && (
        <YouTubeModal
          videoId={challenge.youtubeVideoId}
          title={name}
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
      )}
    </Layout>
  );
};

export default ChallengeDetailPage;