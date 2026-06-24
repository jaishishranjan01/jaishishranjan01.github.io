import React, { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Briefcase,
  GraduationCap,
  MapPin,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const companyLogo = (domain) => `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem('theme')) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return [theme, toggleTheme];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function GlassBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/40 dark:bg-indigo-600/25 blur-3xl animate-blob" />
      <div className="absolute top-[15%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-violet-400/40 dark:bg-fuchsia-600/15 blur-3xl animate-blob delay-2000" />
      <div className="absolute bottom-[-15%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-cyan-300/40 dark:bg-cyan-500/15 blur-3xl animate-blob delay-4000" />
    </div>
  );
}

export default function Portfolio() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExp, setActiveExp] = useState(null);
  const [bubbleTop, setBubbleTop] = useState(0);
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const titleRef = useRef(null);
  const heroRowRef = useRef(null);

  useEffect(() => {
    if (!activeExp) return;
    const handler = (e) => e.key === 'Escape' && setActiveExp(null);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeExp]);

  useEffect(() => {
    const updateBubbleTop = () => {
      const titleEl = titleRef.current;
      const rowEl = heroRowRef.current;
      if (!titleEl || !rowEl) return;
      const titleRect = titleEl.getBoundingClientRect();
      const rowRect = rowEl.getBoundingClientRect();
      setBubbleTop(titleRect.top - rowRect.top);
    };
    updateBubbleTop();
    window.addEventListener('resize', updateBubbleTop);
    return () => window.removeEventListener('resize', updateBubbleTop);
  }, []);

  const profile = {
    name: "Jaishish Ranjan",
    title: "Lead Software Engineer @ SymphonyAI",
    location: "Bengaluru, India",
    bio: "7+ years building high-performance, enterprise-grade backend systems — currently engineering fraud detection systems in fintech at SymphonyAI, previously delivered oncology platforms for McKesson (USA). Java microservices, Kafka, cloud-native deployments on AWS, and securing enterprise APIs with OAuth2 & Okta.",
    relocation: "Actively seeking Senior Backend / Java Engineer roles abroad with visa sponsorship — open to Germany, the Netherlands, Dubai, and the UK.",
    email: "jaishish.ranjan01@gmail.com",
    github: "https://github.com/jaishishranjan01/",
    linkedin: "https://www.linkedin.com/in/jaishishranjan01/",
    leetcode: "https://leetcode.com/u/jaishish/",
  };

  const leetcodeStats = { solved: 94, easy: 71, medium: 18, hard: 5 };

  const projects = [
    {
      title: "SafeHarbor — Job Security Insurance Platform",
      description: "Production-grade enterprise architecture design for a job-loss insurance platform - cell-based multi-region deployment, Kafka event backbone, saga orchestration, and PCI isolation.",
      tags: ["Architecture", "Java", "Spring Boot", "Kafka", "Kubernetes", "AWS"],
      link: "https://github.com/jaishishranjan01/SafeHarbor",
    },
    {
      title: "Etrain — Scalable Microservices Platform",
      description: "Train-booking platform split into four independent microservices (auth, payment, train service, e-train) with Kubernetes manifests and an automated deploy pipeline.",
      tags: ["Java", "Spring Boot", "JavaScript", "Kubernetes", "Microservices"],
      link: "https://github.com/jaishishranjan01/Scalable-Assignment",
    },
    {
      title: "FSI — Equipment Management Platform",
      description: "Financial services equipment management system with a documented microservice architecture, relational schema design, and a TypeScript front end backed by Java services.",
      tags: ["TypeScript", "Java", "Microservices", "System Design"],
      link: "https://github.com/jaishishranjan01/FSI-Assignment",
    },
  ];

  const skills = {
    "Backend": ["Java 21", "Spring Boot", "Spring Batch", "Spring MVC", "Apache Kafka", "REST APIs", "Hibernate", "JPA"],
    "Databases": ["Oracle", "PostgreSQL", "MongoDB", "MySQL", "Elasticsearch"],
    "Cloud & DevOps": ["AWS (EC2, S3)", "Docker", "Kubernetes", "Nginx"],
    "Security & Frontend": ["OAuth2", "JWT", "Okta", "Angular", "React"],
  };

  const experiences = [
    {
      role: "Lead Software Engineer – Fraud Detection & Risk",
      company: "SymphonyAI",
      logoDomain: "symphonyai.com",
      period: "Jan 2026 – Present",
      location: "Bengaluru, India · On-site",
      summary: "Building high-performance fraud detection and risk management systems for enterprise fintech clients at SymphonyAI, an AI-driven industrial intelligence company.",
      highlights: [
        "Engineered backend microservices for real-time fraud detection pipelines using Java, Spring Boot, and Kafka",
        "Improved system performance and reduced processing latency significantly across high-throughput transaction workflows",
        "Designed and deployed scalable, event-driven architectures on AWS using containerized services (Docker + Kubernetes)",
      ],
      stack: ["Java", "Spring Boot", "Apache Kafka", "AWS (EC2, S3)", "Docker", "Kubernetes", "REST APIs", "Microservices"],
    },
    {
      role: "Senior Backend Engineer – Healthcare (McKesson/Ontada)",
      company: "Tekizma Inc.",
      logoDomain: "tekizma.com",
      period: "Aug 2022 – Jan 2026 · 3 yrs 6 mos",
      location: "Bengaluru, India · On-site",
      summary: "Embedded Senior Backend Engineer on McKesson's Ontada oncology platform — one of the largest healthcare data and technology companies in the US.",
      highlights: [
        "Led migration of monolithic systems to cloud-native RESTful microservices, improving scalability and long-term maintainability",
        "Built a complete FHIR-compliant healthcare application from scratch in under 4 weeks, integrating Appointment and Care Plan FHIR resources",
        "Improved database query performance by ~30% across Oracle, PostgreSQL, and MongoDB through schema optimization and indexing",
        "Implemented enterprise-grade API security using OAuth2, JWT, and Okta for authentication & authorization",
        "Built real-time event streaming pipelines with Apache Kafka and improved search with Elasticsearch",
        "Deployed and orchestrated microservices using Docker, Kubernetes, and AWS in production environments",
      ],
      stack: ["Spring Boot", "FHIR", "Oracle", "PostgreSQL", "MongoDB", "Elasticsearch", "OAuth2/JWT", "Okta", "Kafka", "Docker", "Kubernetes", "AWS"],
    },
    {
      role: "Backend Developer – Insurance · Enterprise Software",
      company: "Sapiens",
      logoDomain: "sapiens.com",
      period: "Aug 2021 – Aug 2022 · 1 yr 1 mo",
      location: "Bengaluru, India · On-site",
      summary: "Designed and implemented large-scale batch processing pipelines for insurance backend systems.",
      highlights: [
        "Designed and implemented large-scale batch processing pipelines using Spring Batch and Hibernate",
        "Contributed to architecture discussions on scalability, feasibility, and engineering best practices",
        "Mentored junior developers, reducing team onboarding time and improving overall delivery velocity",
      ],
      stack: ["Java", "Spring Batch", "Hibernate", "MySQL"],
    },
    {
      role: "Senior System Engineer – Fintech · Tax Solutions (GST, Govt. of India)",
      company: "Infosys",
      logoDomain: "infosys.com",
      period: "Sep 2018 – Aug 2021 · 3 yrs",
      location: "Bengaluru, India · On-site",
      summary: "Built end-to-end enterprise solutions for global clients on India's Goods and Services Tax platform.",
      highlights: [
        "Built end-to-end enterprise solutions with Java 8, Spring Boot, Angular, and REST APIs for global clients",
        "Reduced pending task backlog by ~40%, earning direct client appreciation for delivery under tight deadlines",
        "Implemented caching strategies and Nginx configurations for system performance optimisation",
        "Worked across full SDLC in Agile/Scrum environments",
      ],
      stack: ["Java 8", "Spring Boot", "Spring MVC", "Angular", "REST APIs", "MySQL", "Hibernate", "JPA", "Nginx"],
    },
  ];

  const education = [
    {
      degree: "Master of Technology (MTech), Computer Software Engineering",
      institution: "Birla Institute of Technology and Science, Pilani",
      period: "Jul 2024 – Jul 2026",
      grade: "7.84 / 10",
      note: "Pursuing advanced coursework in Computer Architecture and Cloud Computing alongside full-time work.",
    },
    {
      degree: "Bachelor of Engineering (B.E.), Information Technology",
      institution: "University Institute of Technology, The University of Burdwan",
      period: "2014 – 2018",
      grade: "74.8 / 100",
    },
  ];

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full text-slate-900 dark:text-slate-100">
      <GlassBlobs />

      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="glass-pill flex items-center gap-1 px-3 py-2">
          <button
            onClick={() => scrollToSection('home')}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0"
          >
            JR
          </button>

          <div className="hidden md:flex items-center gap-1 px-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === item.id
                    ? 'bg-white/70 dark:bg-white/15 text-blue-600 dark:text-blue-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed top-20 inset-x-4 z-40 md:hidden glass-card p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                active === item.id
                  ? 'bg-white/60 dark:bg-white/10 text-blue-600 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="relative z-10">
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
          <div
            ref={heroRowRef}
            className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 xl:gap-12"
          >
          <div className="hidden lg:block shrink-0 w-64" aria-hidden="true" />

          <div className="w-full max-w-4xl text-center space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">{profile.name}</h1>
              <h2 ref={titleRef} className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                {profile.title}
              </h2>
              <div className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <MapPin size={15} /> {profile.location}
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {profile.bio}
              </p>
            </div>

            <div className="glass-pill inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto text-left">
              <span className="text-base shrink-0">🌍</span>
              <span>{profile.relocation}</span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {[
                { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={20} />, external: false },
                { href: profile.github, label: 'GitHub', icon: <GithubIcon className="w-5 h-5" />, external: true },
                { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon className="w-5 h-5" />, external: true },
              ].map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  aria-label={link.label}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{ animationDelay: `${i * 0.12}s` }}
                  className="animate-drop-in liquid-bubble glass-pill w-14 h-14 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:scale-110 hover:-translate-y-1 transition-transform"
                >
                  {link.icon}
                </a>
              ))}

              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                title="LeetCode"
                aria-label="LeetCode"
                style={{ animationDelay: '0.36s' }}
                className="animate-drop-in liquid-bubble glass-pill w-14 rounded-[28px] flex flex-col items-center gap-1.5 px-2 py-3 hover:scale-110 hover:-translate-y-1 transition-transform"
              >
                <Code2 size={18} className="text-amber-600 dark:text-amber-400" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  {leetcodeStats.solved}
                </span>
                <span className="w-6 border-t border-slate-400/30 dark:border-slate-500/30" />
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  {leetcodeStats.easy}E
                </span>
                <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">
                  {leetcodeStats.medium}M
                </span>
                <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400">
                  {leetcodeStats.hard}H
                </span>
              </a>
            </div>

            <div className="lg:hidden glass-card p-8 sm:p-10 text-left">
              <h3 className="text-2xl font-bold mb-8 text-center">Core Competencies</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold mb-4 text-lg">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="glass-pill px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 w-64">
            <div
              className="animate-drop-in liquid-bubble glass-card w-60 p-5"
              style={{ marginTop: bubbleTop }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4">
                Core Competencies
              </h3>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-500/10 dark:bg-blue-300/10 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-24 sm:py-32 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <Code2 size={20} />
                <span className="text-sm font-semibold uppercase tracking-wide">Featured Work</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className="glass-card p-8 hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                      className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors shrink-0"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-900/5 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="px-4 py-24 sm:py-32 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <Briefcase size={20} />
                <span className="text-sm font-semibold uppercase tracking-wide">Journey</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">Experience</h2>
            </div>
            <div>
              {experiences.map((exp, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={companyLogo(exp.logoDomain)}
                        alt={`${exp.company} logo`}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    {idx < experiences.length - 1 && (
                      <div className="flex flex-col items-center py-1.5">
                        <div className="w-px h-6 bg-gradient-to-b from-blue-400/50 to-blue-400/10 dark:from-blue-300/40 dark:to-blue-300/10" />
                        <ChevronDown size={16} className="text-blue-400 dark:text-blue-300 -mt-0.5" />
                      </div>
                    )}
                  </div>

                  <div className="glass-card p-6 sm:p-8 flex-1 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold">{exp.role}</h3>
                    <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 mt-1">
                      <p className="text-blue-600 dark:text-blue-300 font-medium">{exp.company}</p>
                      <div className="text-right">
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-sm whitespace-nowrap block">
                          {exp.period}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs whitespace-nowrap">
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 text-sm">{exp.summary}</p>
                    <button
                      onClick={() => setActiveExp(exp)}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-300 hover:gap-2.5 transition-all"
                    >
                      View details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="px-4 py-24 sm:py-32 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <GraduationCap size={20} />
                <span className="text-sm font-semibold uppercase tracking-wide">Academics</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="glass-card p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-blue-600 dark:text-blue-300 font-medium mt-1">{edu.institution}</p>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-4">Grade: {edu.grade}</p>
                  {edu.note && (
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3 text-sm">{edu.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activeExp && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveExp(null)}
        >
          <div
            className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 sm:p-10 bg-white/80 dark:bg-slate-900/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={companyLogo(activeExp.logoDomain)}
                    alt={`${activeExp.company} logo`}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">{activeExp.role}</h3>
                  <p className="text-blue-600 dark:text-blue-300 font-medium mt-1">{activeExp.company}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveExp(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <span>{activeExp.period}</span>
              <span>·</span>
              <span>{activeExp.location}</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{activeExp.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {activeExp.highlights.map((point, i) => (
                <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  <span className="text-blue-500 dark:text-blue-400 shrink-0">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-6">
              {activeExp.stack.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-900/5 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        © 2024 {profile.name}. Built with React + Tailwind CSS · Hosted on GitHub Pages.
      </footer>
    </div>
  );
}
