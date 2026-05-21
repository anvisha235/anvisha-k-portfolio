import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Download,
  GraduationCap,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Award,
  ArrowRight,
  Figma,
  Code2,
  BarChart3,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const RESUME_URL =
  "https://drive.google.com/file/d/1M84hi98DW-jfY1xZdgIESfPhupZJcfD0/view?usp=sharing";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Nav() {
  const links = [
    ["About", "#about"],
    ["Education", "#education"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Case Study", "#case-study"],
    ["Certs", "#certs"],
    ["Contact", "#contact"],
  ] as const;
  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("site-nav");
      if (!nav) return;
      if (window.scrollY > 8) nav.classList.add("nav-scrolled");
      else nav.classList.remove("nav-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      id="site-nav"
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 [&.nav-scrolled]:bg-background/70 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-b [&.nav-scrolled]:border-border"
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-lg">
          Anvisha<span className="text-primary">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-foreground transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Let's talk <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </nav>
    </header>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-28 px-6 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/3"
      />
      <div className="relative mx-auto max-w-6xl text-left">
        <div className="reveal">
          <Pill>Available for opportunities</Pill>
        </div>
        <h1 className="reveal mt-8 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight">
          Anvisha <span className="text-primary">Kadhao</span>
        </h1>
        <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Aspiring Data Analyst, UI/UX enthusiast, and AI/ML student — turning
          curiosity into thoughtful, useful products.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 reveal">
      <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Intro" title="About" />
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3 reveal">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an aspiring Data Analyst and UI/UX enthusiast currently
              studying Computer Science with a specialization in AI &amp; ML.
              I work at the intersection of <span className="text-foreground">data, design, and technology</span> — using data to ask better
              questions, design to make answers usable, and code to bring them
              to life.
            </p>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              I value clarity, structured thinking, and continuous learning.
              I'm happiest when I'm shipping small, well-considered things that
              make a real difference.
            </p>
          </div>
          <div className="md:col-span-2 grid gap-4">
            <div className="reveal rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Focus
              </div>
              <div className="mt-2 font-medium">Data · Design · ML</div>
            </div>
            <div className="reveal rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Currently
              </div>
              <div className="mt-2 font-medium">Learning &amp; building</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    {
      period: "Aug 2023 — Present",
      school: "Karnavati University",
      location: "Gandhinagar",
      degree: "B.Tech in CSE — AI & Machine Learning",
      highlight: "CGPA: 8.2",
    },
    {
      period: "Completed",
      school: "New Look Sr. Sec. School",
      location: "",
      degree: "12th Grade (Senior Secondary)",
      highlight: "79.9%",
    },
  ];
  return (
    <section id="education" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Background" title="Education" />
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-border -translate-x-1/2" />
          <div className="space-y-12 md:space-y-16">
            {items.map((it, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={it.school}
                  className="reveal relative md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-primary/15 border border-primary/40 items-center justify-center glow-red z-10">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div
                    className={`${
                      isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_oklch(0.62_0.22_25/0.35)]">
                      <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                        {it.period}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold">{it.school}</h3>
                      {it.location && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {it.location}
                        </p>
                      )}
                      <p className="mt-4 text-muted-foreground">{it.degree}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {it.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const items = [
    {
      title: "Product Recommendation System",
      tags: ["Python", "ML", "Web"],
      desc: "Personalized product recommendations driven by collaborative filtering and a clean browsing experience.",
      live: "https://product-recommendation-system-chi.vercel.app",
      code: "https://github.com/anvisha235/product-recommendation-system",
    },
    {
      title: "Recipe Recommendation System",
      tags: ["Python", "Recommender", "UI"],
      desc: "Suggests recipes based on ingredients and preferences, with a focused, friendly interface.",
      live: "https://recipe-recommendation-system-hazel.vercel.app",
      code: "https://github.com/anvisha235/recipe_recommendation_system",
    },
    {
      title: "Inventory Management System",
      tags: ["Database", "CRUD"],
      desc: "End-to-end CRUD app for managing stock, suppliers, and orders with a relational schema.",
      code: "https://github.com/anvisha235/Inventory_management",
    },
  ];
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Work" title="Projects" />
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((p) => (
            <article
              key={p.title}
              className="reveal group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_oklch(0.62_0.22_25/0.35)]"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
                <a
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-study" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="UI/UX Case Study" title="A deeper look at my design process." />
        <a
          href="https://drive.google.com/file/d/19OZ-o9vlUb3erpspbAgvlJFL4IbaU5yb/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group block rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 md:p-14 transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_oklch(0.62_0.22_25/0.35)]"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold">
                End-to-end UI/UX walkthrough
              </h3>
              <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
                A detailed UI/UX walkthrough — research, wireframes, decisions,
                and final design — documented end to end.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground group-hover:bg-primary/90">
                Read case study <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { icon: BarChart3, title: "Data Analysis", items: ["Pandas", "NumPy"] },
    {
      icon: Sparkles,
      title: "Machine Learning",
      items: ["Basic ML Concepts", "Google Colab"],
    },
    {
      icon: Figma,
      title: "UI/UX Design",
      items: ["Figma", "Wireframing", "Prototyping"],
    },
    { icon: Code2, title: "Tools", items: ["GitHub", "VS Code", "Google Colab"] },
  ];
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Skills" title="What I work with." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="reveal rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <g.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="mt-5 font-semibold">{g.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certs() {
  const items = [
    {
      title: "Data Visualisation: Empowering Business with Effective Insights",
      issuer: "Forage · Accenture",
      url: "https://drive.google.com/file/d/1OQyKfIqzYAgKN6WPUbtn8p8sMreRO1k_/view",
    },
    {
      title: "Data Visualization: Best Practices",
      issuer: "LinkedIn Learning",
      url: "https://drive.google.com/file/d/1NyLZwHwc9FRGikGfF9tPQW4xrdqrZinO/view",
    },
    {
      title: "Data Analytics Job Simulation",
      issuer: "Forage · Deloitte",
      url: "https://drive.google.com/file/d/1IyHfQk_ckbK2Sw4nSfocEmbPznFvzp76/view",
    },
  ];
  return (
    <section id="certs" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certifications" title="Continued learning." />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((c) => (
            <a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <h3 className="mt-5 font-semibold leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.issuer}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                View certificate <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 md:p-16">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none"
          />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Contact
            </div>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              Let's build <span className="text-primary">something.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Open to internships, collaborations, and interesting
              conversations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://github.com/anvisha235"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anvisha-kadhao-124670306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-card"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <a
                href="mailto:anvishakadhao7@gmail.com"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                anvishakadhao7@gmail.com
              </a>
              <a
                href="tel:+919256966218"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +91 9256966218
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="mx-auto max-w-6xl text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} Anvisha Kadhao
      </div>
    </footer>
  );
}

function Index() {
  const ref = useReveal();
  return (
    <div ref={ref} className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <CaseStudy />
        <Skills />
        <Certs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
