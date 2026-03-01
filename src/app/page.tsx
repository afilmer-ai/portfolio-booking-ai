"use client";
import './globals.css';
import { useEffect, useMemo, useRef, useState } from "react";

type AuditSnapshot = {
  modeLabel: string;
  loadValue: string;
  lcpValue: string;
  leadValue: string;
  runtimePct: string;
  voicePct: string;
  convPct: string;
};

const legacyAudit: AuditSnapshot = {
  modeLabel: "Viewing: Slow / Legacy",
  loadValue: "5.6s",
  lcpValue: "4.8s",
  leadValue: "2.1%",
  runtimePct: "34%",
  voicePct: "41%",
  convPct: "37%",
};

const optimizedAudit: AuditSnapshot = {
  modeLabel: "Viewing: Bookin-AI Optimized",
  loadValue: "0.9s",
  lcpValue: "1.1s",
  leadValue: "8.4%",
  runtimePct: "96%",
  voicePct: "93%",
  convPct: "91%",
};

export default function Page() {
  const [optimized, setOptimized] = useState(false);
  const [meterScore, setMeterScore] = useState(0);
  const meterRef = useRef<HTMLDivElement| null>(null);

  const audit = useMemo(() => (optimized ? optimizedAudit : legacyAudit), [optimized]);

  useEffect(() => {
    const meterEl = meterRef.current;
    if (!meterEl) return;

    let shown = false;
    let rafId = 0;

    const animateMeter = () => {
      let score = 0;
      const target = 99;
      const tick = () => {
        score += score < 88 ? 3 : 1;
        if (score > target) score = target;
        setMeterScore(score);
        if (score < target) {
          rafId = window.requestAnimationFrame(tick);
        }
      };
      rafId = window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const meterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !shown) {
              shown = true;
              animateMeter();
            }
          });
        },
        { threshold: 0.3 },
      );
      meterObserver.observe(meterEl);
      return () => {
        meterObserver.disconnect();
        window.cancelAnimationFrame(rafId);
      };
    }

    if (!shown) {
      shown = true;
      animateMeter();
    }

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_80%_100%,rgba(34,197,94,0.14),transparent_42%)]"></div>
      <header className="border-b border-zinc-800/80">
  <div className="mx-auto flex w-[92vw] max-w-6xl items-center justify-between py-5">
    <div className="flex items-center gap-4">
      {/* 1. mix-blend-screen: "Deletes" the dark parts of the logo so it floats on the zinc.
          2. opacity-60: Fades the logo into the background.
          3. hover:opacity-100: Makes it pop only when a user interacts with it.
      */}
      <div className="relative">
        <img 
          src="/logo.png" 
          alt="Bookin-AI Logo" 
          className="h-48 w-auto object-contain mix-blend-lighten opacity-60 transition-opacity duration-300 hover:opacity-100" 
        />
      </div>
    </div>
    
    <a
      href="#lead-form"
      className="inline-flex h-12 items-center rounded-xl border border-emerald-400/40 bg-emerald-400/12 px-5 text-sm font-semibold text-emerald-300 shadow-[0_0_32px_rgba(16,185,129,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-400/20"
    >
      Book 10-Min Walkthrough
    </a>
  </div>
</header>
      <main>
        <section className="mx-auto grid w-[92vw] max-w-6xl gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
              2026 Growth Systems
            </p>
            <h1 id="hero-title" className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Bookin-AI Leads The Market In AIOps, Green-Tech, and Voice SEO Revenue Engineering.
            </h1>
            <p id="hero-subtitle" className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              We architect autonomous revenue engines that monitor themselves, recover in real time, and capture high-intent traffic
              across search and voice. The result is enterprise-grade speed, lower operating waste, and stronger conversion velocity.
            </p>
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-2xl font-semibold text-emerald-300">3.4x</p>
                <p className="mt-1 text-sm text-zinc-400">Qualified pipeline growth</p>
              </article>
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-2xl font-semibold text-emerald-300">97+</p>
                <p className="mt-1 text-sm text-zinc-400">Lighthouse performance</p>
              </article>
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-2xl font-semibold text-emerald-300">58%</p>
                <p className="mt-1 text-sm text-zinc-400">Average resource reduction</p>
              </article>
            </div>
          </div>

          <aside className="h-full rounded-3xl border border-zinc-800 bg-zinc-900/75 p-7 shadow-[0_14px_45px_rgba(0,0,0,0.45)]">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Authority Stack</h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/65 p-4">
                <h3 className="text-base font-semibold text-emerald-300">AIOps Command Layer</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Predictive monitoring, autonomous remediation, and resilient service orchestration for always-on revenue delivery.
                </p>
              </article>
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/65 p-4">
                <h3 className="text-base font-semibold text-emerald-300">Green-Tech Performance</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Carbon-aware frontends and lean infrastructure patterns that improve Core Web Vitals while reducing operational waste.
                </p>
              </article>
              <article id="voice-seo-proof" className="rounded-xl border border-zinc-800 bg-zinc-950/65 p-4">
                <h3 className="text-base font-semibold text-emerald-300">Voice SEO Intent Capture</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Structured conversational architecture that wins spoken and typed intent at the decision stage, not the awareness stage.
                </p>
              </article>
            </div>
          </aside>
        </section>

        <section id="health-check" className="border-y border-zinc-800/70 bg-zinc-900/55 py-16">
          <div className="mx-auto w-[92vw] max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">The Health Check Interactive Audit</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              Toggle between a legacy stack and Bookin-AI optimized architecture to preview load speed, Core Web Vitals, and lead-capture
              conversion delta.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
                <label htmlFor="modeSwitch" className="mb-5 flex items-center gap-3 text-sm font-semibold text-zinc-300">
                  <input id="modeSwitch" type="checkbox" checked={optimized} onChange={(e) => setOptimized(e.target.checked)} />
                  <span>{audit.modeLabel}</span>
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                    <p className="text-2xl font-semibold text-emerald-300">{audit.loadValue}</p>
                    <p className="mt-1 text-sm text-zinc-400">Time to Interactive</p>
                  </article>
                  <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                    <p className="text-2xl font-semibold text-emerald-300">{audit.lcpValue}</p>
                    <p className="mt-1 text-sm text-zinc-400">Largest Contentful Paint</p>
                  </article>
                  <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                    <p className="text-2xl font-semibold text-emerald-300">{audit.leadValue}</p>
                    <p className="mt-1 text-sm text-zinc-400">Lead Capture Rate</p>
                  </article>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm text-zinc-400">
                    <span>Runtime Efficiency</span>
                    <span>{audit.runtimePct}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-zinc-800">
                    <div className="h-3 rounded-full bg-emerald-400 transition-all" style={{ width: audit.runtimePct }}></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm text-zinc-400">
                    <span>Voice Query Match</span>
                    <span>{audit.voicePct}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-zinc-800">
                    <div className="h-3 rounded-full bg-emerald-400 transition-all" style={{ width: audit.voicePct }}></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm text-zinc-400">
                    <span>Conversion Readiness</span>
                    <span>{audit.convPct}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-zinc-800">
                    <div className="h-3 rounded-full bg-emerald-400 transition-all" style={{ width: audit.convPct }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="mx-auto w-[92vw] max-w-6xl py-16">
          <div className="grid gap-8 rounded-3xl border border-zinc-800 bg-zinc-900/75 p-8 md:grid-cols-[160px_1fr] md:items-center">
            <div
              ref={meterRef}
              className="grid h-36 w-36 place-items-center rounded-full border border-zinc-700 bg-zinc-950"
              style={{ background: `radial-gradient(circle at center, #09090b 58%, transparent 59%), conic-gradient(#34d399 ${meterScore}%, #27272a 0)` }}
            >
              <div className="text-center">
                <p className="text-4xl font-semibold text-zinc-50">{meterScore}</p>
                <p className="text-xs text-zinc-400">PageSpeed</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Proof of Concept: Live Performance Meter</h2>
              <p className="mt-3 max-w-3xl text-zinc-300">
                Current benchmark: <strong>99/100 Google PageSpeed score</strong> with ultra-lean architecture and conversion-centered UX logic.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800/70 bg-zinc-900/55 py-16">
          <div className="mx-auto w-[92vw] max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">The 10-Minute Strategic Walkthrough</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              Share your growth bottleneck and Bookin-AI will return a precision-first plan covering automation, performance, and voice visibility opportunities.
            </p>

            <div className="mt-10">
              <form
                id="lead-form"
                action="https://formspree.io/f/mgolqlbz"
                method="POST"
                className="mx-auto grid w-full max-w-3xl gap-5 rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 sm:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="lead_name" className="mb-2 block text-sm font-medium text-zinc-300">Your Name</label>
                    <input id="lead_name" name="lead_name" type="text" required placeholder="Enter your name" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 placeholder:text-zinc-500 outline-none ring-emerald-400/60 transition focus:ring-2" />
                  </div>
                  <div>
                    <label htmlFor="lead_email" className="mb-2 block text-sm font-medium text-zinc-300">Work Email</label>
                    <input id="lead_email" name="lead_email" type="email" required placeholder="you@business.com" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 placeholder:text-zinc-500 outline-none ring-emerald-400/60 transition focus:ring-2" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="lead_business_type" className="mb-2 block text-sm font-medium text-zinc-300">Business Type</label>
                    <select id="lead_business_type" name="lead_business_type" required className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 outline-none ring-emerald-400/60 transition focus:ring-2">
                      <option value="">Select business type</option>
                      <option value="local_service">Local Service</option>
                      <option value="ecommerce">Ecommerce</option>
                      <option value="saas">SaaS</option>
                      <option value="agency">Agency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lead_primary_goal" className="mb-2 block text-sm font-medium text-zinc-300">Primary Goal</label>
                    <select id="lead_primary_goal" name="lead_primary_goal" required className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 outline-none ring-emerald-400/60 transition focus:ring-2">
                      <option value="">Select primary goal</option>
                      <option value="aiops_automation">AIOps automation</option>
                      <option value="green_tech_performance">Green-Tech performance</option>
                      <option value="voice_seo_visibility">Voice SEO visibility</option>
                      <option value="pipeline_conversion">Pipeline conversion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lead_message" className="mb-2 block text-sm font-medium text-zinc-300">What should Bookin-AI optimize first?</label>
                  <textarea id="lead_message" name="lead_message" required rows={5} placeholder="Describe your current challenge, goals, and timeline." className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none ring-emerald-400/60 transition focus:ring-2"></textarea>
                </div>

                <input id="lead_redirect" name="_next" type="hidden" value="https://bookin-ai.com/thanks" />

                <button
                  id="lead_submit"
                  type="submit"
                  className="inline-flex min-h-[88px] items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-400 px-6 py-6 text-lg font-semibold text-emerald-950 shadow-[0_14px_34px_rgba(16,185,129,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-[0_18px_42px_rgba(16,185,129,0.45)]"
                >
                  Unlock My 10-Minute Walkthrough
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8">
        <div className="mx-auto w-[92vw] max-w-6xl text-sm text-zinc-500">
          Bookin-AI · AIOps Automation · Green-Tech Performance · Voice SEO Systems
        </div>
      </footer>
    </div>
  );
}
