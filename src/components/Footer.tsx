import { ArrowUp, Download, Mail } from "lucide-react";
import { profile, useContent } from "../content";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Monogram } from "./Header";

/** Pied de page : identité, navigation, liens sociaux, CV et retour en haut. */
export function Footer() {
  const t = useContent();
  const year = new Date().getFullYear();

  const socials = [
    { href: profile.github, label: `GitHub, ${t.contact.openInNewTab}`, icon: <GitHubIcon width={18} height={18} />, external: true },
    { href: profile.linkedin, label: `LinkedIn, ${t.contact.openInNewTab}`, icon: <LinkedInIcon width={18} height={18} />, external: true },
    { href: `mailto:${profile.email}`, label: `E-mail : ${profile.email}`, icon: <Mail size={18} aria-hidden="true" />, external: false },
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12 md:py-16">
        {/* Identité */}
        <div className="md:col-span-5">
          <a href="#accueil" aria-label={t.nav.home} className="inline-flex items-center gap-3 rounded-lg">
            <Monogram />
            <span className="font-display text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted">{t.footer.tagline}</p>
        </div>

        {/* Navigation */}
        <nav aria-label={t.footer.navLabel} className="md:col-span-3">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
            {t.nav.links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Réseaux et CV */}
        <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv.href}
            download={profile.cv.downloadName}
            className="inline-flex items-center gap-2 text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            <Download size={16} aria-hidden="true" />
            {t.hero.ctaCv}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.firstName} {profile.lastName}. {t.footer.rights}
          </p>
          <p className="sm:text-center">{t.footer.built}</p>
          <a href="#accueil" className="group inline-flex items-center gap-2 font-medium text-fg">
            {t.footer.backToTop}
            <span className="grid size-7 place-items-center rounded-full border border-line transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
