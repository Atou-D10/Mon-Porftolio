import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: ReactNode;
  magnetic?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-300 ease-out-expo";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-on-accent shadow-[0_8px_30px_-8px_var(--glow)] hover:shadow-[0_12px_40px_-6px_var(--signal)]",
  secondary: "border border-line-strong bg-elev/60 text-fg backdrop-blur hover:border-fg",
  ghost: "px-2 text-fg underline-offset-8 hover:text-signal hover:underline",
};

/** Lien stylé comme un bouton, magnétique par défaut. */
export function ButtonLink({ variant = "primary", icon, magnetic = true, className = "", children, ...rest }: ButtonLinkProps) {
  const link = (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span className="relative">{children}</span>
      {icon && (
        <span aria-hidden="true" className="relative transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
