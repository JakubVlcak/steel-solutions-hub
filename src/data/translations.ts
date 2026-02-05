export const challenges = [
  {
    id: 'commercial-waste',
    slugSk: 'komercny-odpad',
    slugEn: 'commercial-waste',
    nameSk: 'Komerčný odpad',
    nameEn: 'Commercial Waste',
    descriptionSk: 'Efektívne riešenia pre spracovanie komerčného a priemyselného odpadu.',
    descriptionEn: 'Efficient solutions for processing commercial and industrial waste.',
    youtubeVideoId: 'KjlTJQ7GpCQ', 
  },
  {
    id: 'rubber-tires',
    slugSk: 'gumove-pneumatiky',
    slugEn: 'rubber-tires',
    nameSk: 'Gumové a odpadové pneumatiky',
    nameEn: 'Rubber and Waste Tires',
    descriptionSk: 'Špecializované drviče pre recykláciu pneumatík a gumových materiálov.',
    descriptionEn: 'Specialized shredders for recycling tires and rubber materials.',
    youtubeVideoId: '12PEBJKfOn0', 
  },
  {
    id: 'automotive-scrap',
    slugSk: 'automobilovy-srot',
    slugEn: 'automotive-scrap',
    nameSk: 'Automobilový a ľahký šrot',
    nameEn: 'Automotive and Light Scrap',
    descriptionSk: 'Výkonné stroje pre spracovanie automobilového odpadu a ľahkého šrotu.',
    descriptionEn: 'Powerful machines for processing automotive waste and light scrap.',
    youtubeVideoId: '', 
  },
  {
    id: 'wood-waste',
    slugSk: 'odpadove-drevo',
    slugEn: 'wood-waste',
    nameSk: 'Prírodné a odpadové drevo',
    nameEn: 'Natural and Waste Wood',
    descriptionSk: 'Drvenie dreva pre biomasu, štiepky a ďalšie využitie.',
    descriptionEn: 'Wood shredding for biomass, chips, and further processing.',
    youtubeVideoId: 'gkE1xW8HuK0'
  },
  {
    id: 'paper-cardboard',
    slugSk: 'papier-karton',
    slugEn: 'paper-cardboard',
    nameSk: 'Papier a kartón',
    nameEn: 'Paper and Cardboard',
    descriptionSk: 'Optimalizované riešenia pre recykláciu papiera a lepenky.',
    descriptionEn: 'Optimized solutions for paper and cardboard recycling.',
    youtubeVideoId: '', 
  },
  {
    id: 'construction-waste',
    slugSk: 'stavebny-odpad',
    slugEn: 'construction-waste',
    nameSk: 'Stavebný a demolačný odpad',
    nameEn: 'Construction and Demolition Waste',
    descriptionSk: 'Robustné stroje pre spracovanie stavebného odpadu a sutiny.',
    descriptionEn: 'Robust machines for processing construction waste and debris.',
    youtubeVideoId: '3Ick4CdubiU', 
  },
];

export const products = [
  {
    id: 'hps-1-5',
    slugSk: 'phoenix-hydro-power-schredder',
    slugEn: 'phoenix-hydro-power-shredder',
    nameSk: 'Phoenix Hydro Power Schredder – HPS 1.5',
    nameEn: 'Phoenix Hydro Power Shredder – HPS 1.5',
    shortDescSk: 'Výkonný hydraulický drvič pre náročné aplikácie.',
    shortDescEn: 'Powerful hydraulic shredder for demanding applications.',
    taglineSk: 'Maximálny výkon pre maximálne výzvy',
    taglineEn: 'Maximum power for maximum challenges',
    suitableFor: ['commercial-waste', 'rubber-tires', 'automotive-scrap', 'wood-waste', 'construction-waste'],
  },
  {
    id: 'dual-shaft-2-2',
    slugSk: 'dvojhriadelovy-drvic',
    slugEn: 'dual-shaft-shredder',
    nameSk: 'Univerzálny drvič / Dvojhriadeľový drvič 2.2',
    nameEn: 'Universal / Dual Shaft Shredder 2.2',
    shortDescSk: 'Univerzálny dvojhriadeľový drvič pre široké spektrum materiálov.',
    shortDescEn: 'Universal dual-shaft shredder for a wide range of materials.',
    taglineSk: 'Univerzálnosť bez kompromisov',
    taglineEn: 'Versatility without compromise',
    suitableFor: ['commercial-waste', 'cfrp-gfrp', 'wood-waste', 'paper-cardboard', 'construction-waste'],
  },
];

export const companyInfo = {
  name: 'WORKSTEEL, s.r.o.',
  ico: '53109953',
  dic: '2121282174',
  icDph: 'SK2121282174',
  address: 'Nádražná 79/28',
  city: '972 13 Nitrianske Pravno',
  phone: '+421 949 413 320',
  email: 'info@worksteel.eu',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nádražná+79%2F28%2C+972+13+Nitrianske+Pravno',
  social: {
    facebook: 'https://www.facebook.com/p/WorkSteel-100063638932516/',
    linkedin: 'https://www.linkedin.com/in/worksteel-worksteel-160955393/',
    instagram: 'https://www.instagram.com/worksteel_s.r.o/',
    youtube: '#',
  },
};

export const navigation = {
  challenges: {
    sk: 'Výzvy',
    en: 'Challenges',
  },
  products: {
    sk: 'Produkty',
    en: 'Products',
  },
  shafts: {
    sk: 'Hriadele',
    en: 'Shafts',
  },
  gallery: {
    sk: 'Galéria',
    en: 'Gallery',
  },
  contact: {
    sk: 'Kontakt',
    en: 'Contact',
  },
};
