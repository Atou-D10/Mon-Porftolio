import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { useContent } from "../content";

const THEME_COLORS = { dark: "#0B0D12", light: "#F6F4EF" } as const;

/**
 * Bascule clair / sombre. Le thème est stocké dans localStorage et appliqué
 * sur <html data-theme>. Les icônes s'affichent en CSS (variante `dark:`),
 * ce qui évite tout décalage entre le HTML prérendu et l'hydratation.
 */
export function ThemeToggle() {
  const t = useContent();

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";

    const apply = () => {
      root.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[next]);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* stockage indisponible (navigation privée) : le thème reste valable pour la session */
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      apply();
      return;
    }

    // Révélation circulaire du nouveau thème depuis le bouton
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.theme}
      title={t.nav.theme}
      className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-line-strong hover:bg-soft"
    >
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}
