import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { companyInfo } from '@/data/translations';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/sections/HeroBanner';

const PrivacyPolicyPage = () => {
  const { language, t } = useLanguage();

  const homePath = language === 'en' ? '/en' : '/';

  return (
    <Layout>
      <HeroBanner
        title={t('Ochrana osobných údajov', 'Privacy Policy')}
        subtitle={t(
          'Informácie o spracovaní a ochrane vašich osobných údajov',
          'Information about processing and protection of your personal data'
        )}
        small
        breadcrumbs={[
          { label: t('Domov', 'Home'), path: homePath },
          { label: t('Ochrana osobných údajov', 'Privacy Policy') },
        ]}
      />

      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto prose prose-lg"
          >
            {language === 'sk' ? (
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="headline-sm text-foreground mb-4">1. Prevádzkovateľ</h2>
                  <p>
                    Prevádzkovateľom osobných údajov je spoločnosť <strong>{companyInfo.name}</strong>,
                    so sídlom {companyInfo.address}, {companyInfo.city},
                    IČO: {companyInfo.ico}, DIČ: {companyInfo.dic}.
                  </p>
                  <p>Kontaktný email: <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a></p>
                  <p>Telefón: <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="text-accent hover:underline">{companyInfo.phone}</a></p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">2. Účel spracovania osobných údajov</h2>
                  <p>Vaše osobné údaje spracovávame na nasledujúce účely:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Vybavenie vášho dopytu zaslaného prostredníctvom kontaktného formulára</li>
                    <li>Komunikácia s vami v súvislosti s vašou požiadavkou</li>
                    <li>Príprava a zasielanie cenových ponúk</li>
                    <li>Plnenie zmluvných povinností</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">3. Rozsah spracovávaných údajov</h2>
                  <p>Spracovávame nasledujúce osobné údaje:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Meno a priezvisko</li>
                    <li>Emailová adresa</li>
                    <li>Telefónne číslo (ak ho poskytnete)</li>
                    <li>Obsah správy</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">4. Právny základ spracovania</h2>
                  <p>
                    Právnym základom spracovania vašich osobných údajov je váš súhlas udelený
                    prostredníctvom kontaktného formulára v súlade s čl. 6 ods. 1 písm. a) Nariadenia
                    Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR).
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">5. Doba uchovávania údajov</h2>
                  <p>
                    Vaše osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu spracovania,
                    maximálne však po dobu 3 rokov od udelenia súhlasu, pokiaľ súhlas neodvoláte skôr.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">6. Poskytovanie údajov tretím stranám</h2>
                  <p>
                    Vaše osobné údaje neposkytujeme žiadnym tretím stranám, s výnimkou prípadov,
                    keď nám to ukladá zákon alebo je to nevyhnutné na plnenie zmluvných povinností.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">7. Vaše práva</h2>
                  <p>V súvislosti so spracovaním vašich osobných údajov máte nasledujúce práva:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong>Právo na prístup</strong> – máte právo získať potvrdenie o tom, či sa spracovávajú vaše osobné údaje</li>
                    <li><strong>Právo na opravu</strong> – máte právo na opravu nesprávnych osobných údajov</li>
                    <li><strong>Právo na vymazanie</strong> – máte právo na vymazanie vašich osobných údajov</li>
                    <li><strong>Právo na obmedzenie spracovania</strong> – máte právo požiadať o obmedzenie spracovania vašich údajov</li>
                    <li><strong>Právo na prenosnosť údajov</strong> – máte právo získať svoje osobné údaje v štruktúrovanom formáte</li>
                    <li><strong>Právo odvolať súhlas</strong> – máte právo kedykoľvek odvolať svoj súhlas so spracovaním osobných údajov</li>
                    <li><strong>Právo podať sťažnosť</strong> – máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">8. Bezpečnosť údajov</h2>
                  <p>
                    Prijali sme primerané technické a organizačné opatrenia na ochranu vašich osobných
                    údajov pred neoprávneným prístupom, zmenou, zverejnením alebo zničením.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">9. Kontakt</h2>
                  <p>
                    V prípade akýchkoľvek otázok týkajúcich sa spracovania vašich osobných údajov
                    nás kontaktujte na emailovej adrese{' '}
                    <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="headline-sm text-foreground mb-4">1. Data Controller</h2>
                  <p>
                    The data controller is <strong>{companyInfo.name}</strong>,
                    with registered office at {companyInfo.address}, {companyInfo.city},
                    ID: {companyInfo.ico}, Tax ID: {companyInfo.dic}.
                  </p>
                  <p>Contact email: <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a></p>
                  <p>Phone: <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="text-accent hover:underline">{companyInfo.phone}</a></p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">2. Purpose of Personal Data Processing</h2>
                  <p>We process your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Handling your inquiry submitted through the contact form</li>
                    <li>Communication with you regarding your request</li>
                    <li>Preparation and sending of price quotations</li>
                    <li>Fulfillment of contractual obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">3. Scope of Processed Data</h2>
                  <p>We process the following personal data:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>First and last name</li>
                    <li>Email address</li>
                    <li>Phone number (if provided)</li>
                    <li>Message content</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">4. Legal Basis for Processing</h2>
                  <p>
                    The legal basis for processing your personal data is your consent given
                    through the contact form in accordance with Article 6(1)(a) of Regulation
                    (EU) 2016/679 (GDPR).
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">5. Data Retention Period</h2>
                  <p>
                    We retain your personal data for the period necessary to fulfill the processing
                    purpose, but no longer than 3 years from the date of consent, unless you
                    withdraw your consent earlier.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">6. Data Sharing with Third Parties</h2>
                  <p>
                    We do not share your personal data with any third parties, except in cases
                    where required by law or necessary for the fulfillment of contractual obligations.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">7. Your Rights</h2>
                  <p>In connection with the processing of your personal data, you have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong>Right of access</strong> – you have the right to obtain confirmation as to whether your personal data is being processed</li>
                    <li><strong>Right to rectification</strong> – you have the right to rectify inaccurate personal data</li>
                    <li><strong>Right to erasure</strong> – you have the right to erase your personal data</li>
                    <li><strong>Right to restriction of processing</strong> – you have the right to request restriction of processing of your data</li>
                    <li><strong>Right to data portability</strong> – you have the right to receive your personal data in a structured format</li>
                    <li><strong>Right to withdraw consent</strong> – you have the right to withdraw your consent to data processing at any time</li>
                    <li><strong>Right to lodge a complaint</strong> – you have the right to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic</li>
                  </ul>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">8. Data Security</h2>
                  <p>
                    We have implemented appropriate technical and organizational measures to protect
                    your personal data against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h2 className="headline-sm text-foreground mb-4">9. Contact</h2>
                  <p>
                    If you have any questions regarding the processing of your personal data,
                    please contact us at{' '}
                    <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a>.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
