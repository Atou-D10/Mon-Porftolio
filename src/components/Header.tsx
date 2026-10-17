import { AnimatePresence, m } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, useContent } from "../content";
import { useActiveSection } from "../lib/hooks";
import { ThemeToggle } from "./ThemeToggle";

/** Monogramme « AD » utilisé comme logo. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-text="AD"
      className={`grid size-9 place-items-center rounded-lg bg-fg font-display text-sm font-bold tracking-tight text-bg before:content-[attr(data-text)] ${className}`}
    />
  );
}

export function Header() {
  const t = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const ids = useMemo(() => t.nav.links.map((l) => l.id), [t]);
  const active = useActiveSection(ids);

  // Fond flouté dès que la page défile
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : bloque le scroll, gère Échap et le focus
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const button = menuButton.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  // Referme le menu si l'écran repasse en format bureau
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 48rem)");
    const close = () => mql.matches && setOpen(false);
    mql.addEventListener("change", close);
    return () => mql.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#accueil" className="flex items-center gap-3 rounded-lg">
          <Monogram />
          <span className="sr-only font-display text-base font-semibold tracking-tight sm:not-sr-only">
            {profile.firstName} {profile.lastName}
          </span>
          <span className="sr-only">{t.nav.homeSuffix}</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-elev/80 p-1">
            {t.nav.links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`block rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                      isActive ? "bg-soft text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.cv.href}
            download={profile.cv.downloadName}
            className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            <Download size={16} aria-hidden="true" />
            {t.nav.cv}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Navigation mobile"
            className="fixed inset-x-0 top-16 bottom-0 bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="container-page flex flex-col gap-1 pt-8">
              {t.nav.links.map((link, i) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-semibold"
                  >
                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="container-page mt-8">
              <a
                href={profile.cv.href}
                download={profile.cv.downloadName}
                className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-on-accent"
              >
                <Download size={16} aria-hidden="true" />
                {t.hero.ctaCv}
              </a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
