import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons";
import { Magnetic } from "../components/Magnetic";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { profile, useContent, type Content } from "../content";

type ContactContent = Content["contact"];
type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

/** Nom du formulaire déclaré à Netlify Forms (doit correspondre au champ caché « form-name »). */
const FORM_NAME = "contact";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { contact } = useContent();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={5} title={contact.title} lead={contact.lead} id="contact-title" />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Channels contact={contact} />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm contact={contact} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Coordonnées ------------------------------ */

function Channels({ contact }: { contact: ContactContent }) {
  const github = profile.github.replace("https://", "");
  const linkedin = "Atou Diagne";

  return (
    <div className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-elev/50 p-6 md:p-8">
      <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
        {contact.pitch.replace(/\.$/, "")}
        <span className="text-signal">.</span>
      </p>

      <div>
        <h3 className="sr-only">{contact.channelsTitle}</h3>
        <ul className="divide-y divide-line border-y border-line">
          <ChannelRow icon={<Mail size={18} />} label={contact.labels.email}>
            <a href={`mailto:${profile.email}`} className="min-w-0 break-all font-medium hover:text-signal">
              {profile.email}
            </a>
            <CopyButton value={profile.email} copy={contact.copy} />
          </ChannelRow>
          <ChannelRow icon={<GitHubIcon width={18} height={18} />} label={contact.labels.github}>
            <ExternalLink href={profile.github} label={`${contact.labels.github} : ${github}, ${contact.openInNewTab}`}>
              {github}
            </ExternalLink>
          </ChannelRow>
          <ChannelRow icon={<LinkedInIcon width={18} height={18} />} label={contact.labels.linkedin}>
            <ExternalLink href={profile.linkedin} label={`${contact.labels.linkedin} : ${linkedin}, ${contact.openInNewTab}`}>
              {linkedin}
            </ExternalLink>
          </ChannelRow>
          <ChannelRow icon={<MapPin size={18} />} label={contact.labels.location}>
            <span className="text-muted">{contact.location}</span>
          </ChannelRow>
        </ul>
      </div>
    </div>
  );
}

function ChannelRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 py-4">
      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{label}</p>
        <div className="mt-0.5 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">{children}</div>
      </div>
    </li>
  );
}

function ExternalLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group/ext flex min-w-0 flex-1 items-center justify-between gap-3 font-medium hover:text-signal"
    >
      <span className="truncate">{children}</span>
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="shrink-0 text-muted transition-transform duration-300 group-hover/ext:-translate-y-0.5 group-hover/ext:translate-x-0.5 group-hover/ext:text-signal"
      />
    </a>
  );
}

function CopyButton({ value, copy }: { value: string; copy: ContactContent["copy"] }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* presse-papiers indisponible : le lien mailto reste utilisable */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copy.aria}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
          copied ? "border-data/50 bg-data/10 text-data" : "border-line-strong text-muted hover:border-fg hover:text-fg"
        }`}
      >
        {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
        {copied ? copy.done : copy.idle}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copy.announce : ""}
      </span>
    </>
  );
}

/* ------------------------------ Formulaire ------------------------------ */

function validate(data: FormData, t: ContactContent["form"]): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = t.errors.name;
  if (!email) errors.email = t.errors.email;
  else if (!EMAIL_PATTERN.test(email)) errors.email = t.errors.emailInvalid;
  if (!message) errors.message = t.errors.message;
  return errors;
}

/**
 * Formulaire compatible Netlify Forms :
 * - présent dans le HTML prérendu (data-netlify, netlify-honeypot, champ caché form-name),
 *   ce qui permet à Netlify de le détecter au déploiement ;
 * - envoyé en AJAX (POST encodé en x-www-form-urlencoded vers « / ») pour afficher
 *   la confirmation sans rechargement ;
 * - champ « bot-field » invisible : s'il est rempli, Netlify ignore l'envoi (anti-spam).
 */
function ContactForm({ contact }: { contact: ContactContent }) {
  const t = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data, t);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const body = new URLSearchParams(data as unknown as Record<string, string>).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Retire l'erreur d'un champ dès qu'il est corrigé
  const clearError = (field: Field) => errors[field] && setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-elev/50 p-6 md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-[22rem] flex-col items-start justify-center gap-5"
          >
            <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-data/15 text-data">
              <Check size={28} />
            </span>
            {/* Le focus est placé sur la confirmation dès son apparition, pour qu'elle soit lue immédiatement */}
            <h3 ref={(el) => el?.focus()} tabIndex={-1} className="text-3xl font-semibold outline-none">
              {t.successTitle}
            </h3>
            <p className="text-muted">{t.successText}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              {t.sendAnother}
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            name={FORM_NAME}
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            aria-label={t.label}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col gap-5"
          >
            {/* Champs techniques Netlify : nom du formulaire et piège à robots (masqué à tous) */}
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <p hidden>
              <label>
                {t.honeypot}
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                name="name"
                label={t.name}
                required={t.required}
                autoComplete="name"
                error={errors.name}
                onInput={() => clearError("name")}
              />
              <TextField
                name="email"
                type="email"
                label={t.email}
                required={t.required}
                autoComplete="email"
                error={errors.email}
                onInput={() => clearError("email")}
              />
            </div>
            <TextField
              name="message"
              label={t.message}
              required={t.required}
              multiline
              error={errors.message}
              onInput={() => clearError("message")}
            />

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-on-accent shadow-[0_8px_30px_-8px_var(--glow)] transition-[box-shadow,opacity] hover:shadow-[0_12px_40px_-6px_var(--signal)] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? t.sending : t.submit}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
            </div>

            {/* Erreur d'envoi, annoncée immédiatement */}
            <div role="alert" className="empty:hidden">
              {status === "error" && (
                <p className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
                  {t.errorBefore}
                  <a href={`mailto:${profile.email}`} className="font-semibold underline underline-offset-4 hover:text-signal">
                    {t.errorLink}
                  </a>
                  {t.errorAfter}
                </p>
              )}
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TextFieldProps {
  name: Field;
  label: string;
  required: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  onInput: () => void;
}

/** Champ avec libellé visible, état d'erreur relié par aria-describedby. */
function TextField({ name, label, required, type = "text", autoComplete, multiline, error, onInput }: TextFieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const base = `w-full rounded-xl border bg-bg px-4 py-3 text-fg transition-[border-color,box-shadow] duration-300 placeholder:text-muted/60 focus:outline-none focus:ring-4 ${
    error ? "border-danger focus:ring-danger/20" : "border-line-strong hover:border-muted focus:border-data focus:ring-data/15"
  }`;
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onInput,
  };

  return (
    <div className={`flex flex-col gap-2 ${multiline ? "flex-1" : ""}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        <span aria-hidden="true" className="text-signal"> *</span>
        <span className="sr-only"> ({required})</span>
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} className={`${base} min-h-40 flex-1 resize-y`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={base} />
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
