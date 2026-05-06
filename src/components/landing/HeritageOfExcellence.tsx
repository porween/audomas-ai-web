"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Building2, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const DATACENTER_IMAGE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80";

const AIRGAPX_URL = "https://airgapx.com";

function ProsystemsWordmark() {
  return (
    <p
      className="relative z-[1] bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400/90 bg-clip-text text-2xl font-bold tracking-[0.22em] text-transparent sm:text-[1.65rem]"
      lang="en"
    >
      PROSYSTEMS
    </p>
  );
}

export function HeritageOfExcellence() {
  const t = useTranslations("SecurityPage");

  const badges = [
    { key: "heritage_badge_iso27001" as const, descKey: "heritage_iso27001_desc" as const, icon: ShieldCheck },
    { key: "heritage_badge_iso9001" as const, descKey: "heritage_iso9001_desc" as const, icon: Award },
    { key: "heritage_badge_pdpa" as const, descKey: "heritage_pdpa_desc" as const, icon: Building2 },
  ] as const;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="relative mt-20 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.55)] lg:mt-28"
      style={{ fontFamily: "var(--font-urbanist), ui-sans-serif, system-ui, sans-serif" }}
      aria-labelledby="heritage-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={DATACENTER_IMAGE}
          alt=""
          fill
          className="object-cover object-center opacity-[0.22] saturate-[0.75]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/96 via-[#0a1628]/94 to-[#020617]/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(0,212,255,0.06),transparent_65%)]" />
      </div>

      <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/18 bg-[#0a0f18]/85 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
            {t("heritage_eyebrow")}
          </span>
          <h2
            id="heritage-heading"
            className="mt-5 max-w-4xl text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-[2.1rem] lg:text-[2.35rem]"
          >
            {t("heritage_group_line")}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
            {t("heritage_title")}
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-white/[0.14] px-8 py-6 shadow-[0_28px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_0_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:px-10 sm:py-7"
            aria-label="Prosystems"
            style={{
              background:
                "linear-gradient(155deg, #4a5568 0%, #2d333b 18%, #1a1f26 45%, #12161c 72%, #0c0f14 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.85]"
              style={{
                background:
                  "linear-gradient(118deg, rgba(255,255,255,0.2) 0%, transparent 38%, rgba(255,255,255,0.05) 52%, transparent 68%, rgba(180,190,200,0.08) 100%)",
              }}
            />
            <div className="pointer-events-none absolute -left-[20%] top-0 h-[1px] w-[140%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/50 to-transparent" />

            <div className="relative z-[1] flex flex-col items-center">
              <ProsystemsWordmark />
              <p className="mt-4 max-w-md text-sm font-semibold leading-snug text-slate-200/95 sm:text-base">
                {t("heritage_tagline")}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm font-medium leading-relaxed text-slate-300 sm:text-[15px]">
            {t("heritage_caption")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
          {badges.map(({ key, descKey, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#050a14]/80 px-5 py-5 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md sm:items-center"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D4FF]/35 bg-[#00D4FF]/[0.08] shadow-[0_0_24px_rgba(0,212,255,0.35),inset_0_0_20px_rgba(0,212,255,0.08)]"
                aria-hidden
              >
                <Icon
                  className="h-7 w-7 text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.85)]"
                  strokeWidth={2}
                />
              </div>
              <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
                {t(key)}
              </span>
              <p className="mt-2 text-[12px] font-medium leading-snug text-slate-400 sm:text-[13px]">{t(descKey)}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[13px] font-semibold leading-relaxed text-slate-300 sm:text-sm">
          {t("heritage_airgapx_line")}{" "}
          <Link
            href={AIRGAPX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline font-bold text-[#00D4FF] underline decoration-[#00D4FF]/40 underline-offset-4 transition-[color,text-shadow] duration-300 hover:text-[#5cefff] hover:decoration-[#5cefff] hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.55)]"
          >
            {t("heritage_airgapx_cta")}
          </Link>
        </p>
      </div>
    </motion.section>
  );
}
