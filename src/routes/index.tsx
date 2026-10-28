import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ADDRESS, copy, MAPS_URL, mapsEmbed, type Lang } from "@/lib/site-copy";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [lang, setLang] = useState<Lang>("nl");
  const [copied, setCopied] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const stored = window.localStorage.getItem("ltp-lang");
    if (stored === "pl" || stored === "nl") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("ltp-lang", lang);
  }, [lang]);

  async function copyAddress() {
    const text = `${ADDRESS.street}\n${ADDRESS.postal}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <a href="#top" className="shrink-0" aria-label="LtpService">
            <img
              src="/logo.png"
              alt="LtpService"
              className="h-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
            />
          </a>
          <div className="flex items-center gap-5 sm:gap-8">
            <nav className="flex items-center gap-4 text-sm sm:gap-6">
              <a href="#werk" className="hover:text-muted">
                {t.navWork}
              </a>
              <a href="#adres" className="hover:text-muted">
                {t.navAddress}
              </a>
            </nav>
            <div
              className="flex border border-line"
              role="group"
              aria-label={lang === "nl" ? "Taal" : "Język"}
            >
              <LangButton active={lang === "nl"} onClick={() => setLang("nl")}>
                NL
              </LangButton>
              <LangButton active={lang === "pl"} onClick={() => setLang("pl")}>
                PL
              </LangButton>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-32">
          <div className="lg:col-span-8">
            <p className="text-xs font-medium tracking-brand text-muted uppercase">
              {t.place}
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-2xl leading-snug font-normal tracking-tight sm:text-3xl">
              {t.tagline}
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">{t.lead}</p>
          </div>
          <ol className="flex flex-col gap-3 lg:col-span-4 lg:pb-2">
            {t.services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="group flex items-baseline gap-4 border-t border-line py-3"
                >
                  <span className="font-serif text-sm text-faint tabular-nums">
                    {service.n}
                  </span>
                  <span className="text-base group-hover:text-muted">{service.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="werk" className="mx-auto max-w-6xl px-5 pb-8">
          <p className="border-t border-ink pt-4 text-xs font-medium tracking-brand text-muted uppercase">
            {t.workLabel}
          </p>
          <div className="mt-4">
            {t.services.map((service, index) => (
              <article
                id={service.id}
                key={service.id}
                className="grid scroll-mt-56 items-center gap-8 border-b border-line py-12 md:grid-cols-2 md:gap-16 md:py-16"
              >
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <div className="group overflow-hidden border border-line bg-panel">
                    <img
                      src={service.image}
                      alt={service.alt}
                      width={1400}
                      height={933}
                      className="media-zoom h-auto w-full"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : undefined}>
                  <p className="font-serif text-sm text-faint tabular-nums">{service.n}</p>
                  <h2 className="mt-3 font-serif text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-sm text-lg text-muted">{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="adres" className="scroll-mt-56 border-t border-ink">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium tracking-brand text-muted uppercase">
                {t.seat}
              </p>
              <address className="mt-5 font-serif text-3xl leading-snug not-italic sm:text-4xl">
                {ADDRESS.street}
                <br />
                {ADDRESS.postal}
              </address>
              <div className="mt-8 flex flex-col gap-4">
                <a href={ADDRESS.phoneHref} className="w-fit text-lg hover:text-muted">
                  <span className="mb-1 block text-xs font-medium tracking-brand text-muted uppercase">
                    {t.phone}
                  </span>
                  <span className="font-serif text-2xl tabular-nums">{ADDRESS.phone}</span>
                </a>
                <a
                  href={`mailto:${ADDRESS.email}`}
                  className="w-fit text-lg break-all hover:text-muted"
                >
                  <span className="mb-1 block text-xs font-medium tracking-brand text-muted uppercase">
                    {t.email}
                  </span>
                  <span className="font-serif text-2xl">{ADDRESS.email}</span>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-sm font-medium text-paper"
                >
                  {t.route}
                </a>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex min-h-11 items-center border border-line bg-panel px-5 text-sm font-medium"
                >
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            </div>
            <dl className="grid content-end gap-8 sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <dt className="text-xs font-medium tracking-brand text-muted uppercase">
                  {t.kvk}
                </dt>
                <dd className="mt-2 font-serif text-2xl tabular-nums">{ADDRESS.kvk}</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-xs font-medium tracking-brand text-muted uppercase">
                  {t.btw}
                </dt>
                <dd className="mt-2 font-serif text-2xl break-all tabular-nums">
                  {ADDRESS.btw}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
            <div className="aspect-square overflow-hidden border border-line bg-panel md:aspect-video">
              <iframe
                title={t.map}
                src={mapsEmbed(lang)}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 text-sm text-faint">
          <span>LtpService</span>
          <span>Zoetermeer</span>
        </div>
      </footer>
    </div>
  );
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 min-w-11 px-3 text-xs font-medium tracking-wide ${
        active ? "bg-ink text-paper" : "bg-paper text-muted"
      }`}
    >
      {children}
    </button>
  );
}
