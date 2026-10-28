export type Lang = "nl" | "pl";

export const ADDRESS = {
  street: "Van Leeuwenhoeklaan 386",
  postal: "2713 RK Zoetermeer",
  kvk: "86604945",
  btw: "NL004277273B36",
  email: "lpbedrijf@gmail.com",
  phone: "06 1642 2063",
  phoneHref: "tel:+31616422063",
};

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Van+Leeuwenhoeklaan+386,+2713+RK+Zoetermeer";

export function mapsEmbed(lang: Lang) {
  const hl = lang === "pl" ? "pl" : "nl";
  return `https://maps.google.com/maps?q=Van+Leeuwenhoeklaan+386,+2713+RK+Zoetermeer&z=16&hl=${hl}&output=embed`;
}

const services = {
  nl: [
    {
      id: "kas",
      n: "01",
      title: "Glastuinbouw",
      text: "Komkommers in de kas. Productie, logistiek en verzorging.",
      image: "/art/kas.jpg",
      alt: "Lijntekening van een komkommerkas",
    },
    {
      id: "bouw",
      n: "02",
      title: "Bouw",
      text: "Bouwen, van voorbereiding tot oplevering.",
      image: "/art/bouw.jpg",
      alt: "Lijntekening van een bouwplaats",
    },
    {
      id: "web",
      n: "03",
      title: "Websites",
      text: "Websites, helder en doeltreffend.",
      image: "/art/web.jpg",
      alt: "Lijntekening van het maken van een website",
    },
  ],
  pl: [
    {
      id: "kas",
      n: "01",
      title: "Ogrodnictwo szklarniowe",
      text: "Ogórki szklarniowe. Produkcja, logistyka i pielęgnacja.",
      image: "/art/kas.jpg",
      alt: "Rysunek szklarni z ogórkami",
    },
    {
      id: "bouw",
      n: "02",
      title: "Budownictwo",
      text: "Budowa, od przygotowania po odbiór.",
      image: "/art/bouw.jpg",
      alt: "Rysunek budowy",
    },
    {
      id: "web",
      n: "03",
      title: "Strony internetowe",
      text: "Strony, czytelne i skuteczne.",
      image: "/art/web.jpg",
      alt: "Rysunek tworzenia strony internetowej",
    },
  ],
} as const;

export const copy = {
  nl: {
    navWork: "Diensten",
    navAddress: "Adres",
    place: "Zoetermeer",
    tagline: "Efficientie en precisie",
    lead: "Drie vakgebieden. Eén manier van werken.",
    workLabel: "Werkzaamheden",
    seat: "Vestiging",
    route: "Route",
    copy: "Kopieer adres",
    copied: "Gekopieerd",
    kvk: "KvK",
    btw: "BTW",
    phone: "Telefoon",
    email: "E-mail",
    map: "LtpService op Google Maps",
    services: services.nl,
  },
  pl: {
    navWork: "Usługi",
    navAddress: "Adres",
    place: "Zoetermeer",
    tagline: "Efficientie en precisie",
    lead: "Trzy dziedziny. Jeden sposób pracy.",
    workLabel: "Działalność",
    seat: "Siedziba",
    route: "Dojazd",
    copy: "Kopiuj adres",
    copied: "Skopiowano",
    kvk: "KvK",
    btw: "BTW",
    phone: "Telefon",
    email: "E-mail",
    map: "LtpService w Google Maps",
    services: services.pl,
  },
} as const;
