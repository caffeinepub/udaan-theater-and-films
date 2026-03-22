import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  Facebook,
  Film,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  Star,
  Target,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Smooth scroll helper
───────────────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   Intersection observer hook for reveal
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "About", id: "about" },
    { label: "Courses", id: "courses" },
    { label: "Transformation", id: "transformation" },
    { label: "Why Us", id: "why" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.08_0_0/0.96)] backdrop-blur-md border-b border-[oklch(0.75_0.12_85/0.22)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex flex-col leading-none"
          data-ocid="nav.link"
        >
          {/* FIX 1: logo cinzel with gradient text treatment */}
          <span className="font-cinzel text-2xl font-black tracking-[0.18em] text-gold-gradient uppercase">
            UDAAN
          </span>
          <span className="font-inter text-[9px] tracking-[0.45em] text-[oklch(0.52_0_0)] uppercase mt-[-1px]">
            Theater &amp; Films
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              type="button"
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-inter text-[11px] tracking-[0.2em] uppercase text-[oklch(0.65_0_0)] hover:text-gold transition-colors duration-200"
              data-ocid="nav.link"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="btn-gold px-6 py-2.5 rounded-sm text-[10px]"
            data-ocid="nav.primary_button"
          >
            Join Now
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[oklch(0.08_0_0/0.98)] border-b border-[oklch(0.75_0.12_85/0.25)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  type="button"
                  key={l.id}
                  onClick={() => {
                    scrollTo(l.id);
                    setMenuOpen(false);
                  }}
                  className="font-inter text-sm tracking-widest uppercase text-[oklch(0.75_0_0)] hover:text-gold text-left transition-colors"
                  data-ocid="nav.link"
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  scrollTo("contact");
                  setMenuOpen(false);
                }}
                className="btn-gold px-5 py-2 rounded-full text-xs w-fit"
                data-ocid="nav.primary_button"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-stage.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.04 0 0 / 0.97) 0%, oklch(0.05 0 0 / 0.82) 50%, oklch(0.05 0 0 / 0.30) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, oklch(0.02 0 0 / 0.75) 100%)",
        }}
      />
      {/* FIX 3: subtle horizontal gold rule at bottom of hero for drama */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.4), transparent)",
        }}
      />

      {/* FIX 3: more generous vertical padding for cinematic breathing */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-40 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          {/* Kicker */}
          <motion.p
            className="section-label mb-8 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className="inline-block w-10 h-px"
              style={{ background: "var(--gold-grad)" }}
            />
            UDAAN THEATER &amp; FILMS — NAVI MUMBAI
            <span
              className="inline-block w-10 h-px"
              style={{ background: "var(--gold-grad)" }}
            />
          </motion.p>

          {/* FIX 1: Hero H1 — larger clamp, wider tracking, shimmer on main word */}
          <motion.h1
            className="font-cinzel font-black uppercase leading-[1.06] mb-10"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 6rem)",
              letterSpacing: "0.06em",
              textShadow: "0 4px 60px oklch(0.75 0.12 85 / 0.25)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <span className="gold-shimmer">From Shy Personality</span>
            <br />
            <span className="text-[oklch(0.93_0_0)]">to Confident</span>
            <br />
            <span className="text-gold-gradient">Public Performer</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="font-inter text-xl text-[oklch(0.72_0_0)] max-w-xl leading-loose mb-12"
            style={{ letterSpacing: "0.01em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            Learn acting, communication skills, body language, stage confidence
            and personality transformation through theatre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-gold px-10 py-4 rounded-sm text-xs gold-glow"
              data-ocid="hero.primary_button"
            >
              Join the Next Batch
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-gold-outline px-10 py-4 rounded-sm text-xs"
              data-ocid="hero.secondary_button"
            >
              Book a Free Demo Class
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="font-inter text-[10px] tracking-[0.35em] uppercase text-[oklch(0.48_0_0)]">
          Scroll
        </span>
        <ChevronDown size={18} className="text-gold opacity-60" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const { ref, inView } = useInView();
  const stats = [
    { value: "500+", label: "Students Transformed" },
    { value: "10+", label: "Years of Experience" },
    { value: "50+", label: "Stage Performances" },
    { value: "100%", label: "Practical Training" },
  ];
  return (
    /* FIX 3: increased section padding for drama and breathing */
    <section id="about" className="py-36 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-5">Our Story</p>
          {/* FIX 1: increased H2 max size + wider tracking */}
          <h2
            className="font-cinzel font-black uppercase mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              color: "var(--gold)",
              letterSpacing: "0.07em",
              lineHeight: 1.15,
            }}
          >
            We Don't Teach Personality.
            <br />
            <span className="text-[oklch(0.92_0_0)]">We Transform It.</span>
          </h2>
          {/* FIX 3: gradient divider replaces plain line */}
          <div className="section-divider mb-10" />
          <p className="font-inter text-[oklch(0.75_0_0)] max-w-3xl mx-auto leading-loose text-lg">
            At Udaan Theater and Films, we believe that the stage is the most
            powerful classroom in the world. When you stand before an audience —
            voice trembling, heart racing — and you push through, something
            inside you changes forever. Our students don't just learn to act.
            They learn to be fearless.
          </p>
          <p className="font-inter text-[oklch(0.62_0_0)] max-w-3xl mx-auto leading-loose mt-6">
            Through real performance, expressive training, and emotional
            storytelling, ordinary people become extraordinary communicators. We
            don't lecture confidence into you — we pull it out through theatre.
            This is transformation, not training.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-gold p-7 text-center rounded-sm"
              data-ocid={`about.card.${i + 1}`}
            >
              {/* FIX 1: stat numbers use gradient text */}
              <div
                className="font-cinzel font-black text-4xl mb-2 text-gold-gradient"
                style={{ letterSpacing: "0.05em" }}
              >
                {s.value}
              </div>
              <div className="font-inter text-[11px] text-[oklch(0.55_0_0)] uppercase tracking-[0.2em]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COURSES
───────────────────────────────────────────── */
const courses = [
  {
    icon: <Star size={28} />,
    title: "Personality Development Through Theatre",
    learn: [
      "Stage presence & self-expression",
      "Emotional intelligence",
      "Body language mastery",
    ],
    who: "Students, beginners, shy individuals",
    benefits: [
      "Build unshakeable confidence",
      "Become bold and expressive",
      "Transform your presence",
    ],
  },
  {
    icon: <Film size={28} />,
    title: "Acting for Beginners",
    learn: [
      "Voice & movement techniques",
      "Character building",
      "Scene work & improvisation",
    ],
    who: "Aspiring actors, film enthusiasts",
    benefits: [
      "Master film & theatre skills",
      "Industry-ready training",
      "Real performance experience",
    ],
  },
  {
    icon: <Mic size={28} />,
    title: "Confidence & Communication Skills",
    learn: [
      "Public speaking fundamentals",
      "Body language & posture",
      "Voice modulation & clarity",
    ],
    who: "Professionals, students, job seekers",
    benefits: [
      "Career-defining presence",
      "Fearless communication",
      "Leadership through voice",
    ],
  },
  {
    icon: <Briefcase size={28} />,
    title: "Corporate Training & Public Speaking",
    learn: [
      "Leadership presence on stage",
      "Presentation excellence",
      "Group dynamics & influence",
    ],
    who: "Working professionals, managers",
    benefits: [
      "Corporate excellence",
      "Command any room",
      "Elevate your professional brand",
    ],
  },
];

function Courses() {
  const { ref, inView } = useInView();
  return (
    /* FIX 3: slightly reduced from about to create section rhythm alternation */
    <section id="courses" className="py-32 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5">Our Programs</p>
          {/* FIX 1: bigger H2 for hierarchy differentiation */}
          <h2
            className="font-cinzel font-black uppercase mb-4"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.07em",
            }}
          >
            Choose Your
            <span className="text-[oklch(0.92_0_0)]"> Transformation</span>
          </h2>
          <div className="section-divider mt-6 mb-14" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="card-gold p-9 rounded-sm group cursor-pointer"
              data-ocid={`courses.card.${i + 1}`}
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                {c.icon}
              </div>
              {/* FIX 1: course card titles bigger and wider tracking */}
              <h3
                className="font-cinzel font-bold uppercase mb-7 leading-snug"
                style={{
                  fontSize: "1.15rem",
                  color: "var(--gold-light)",
                  letterSpacing: "0.08em",
                }}
              >
                {c.title}
              </h3>
              <div className="grid grid-cols-1 gap-5 text-sm">
                <div>
                  <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[oklch(0.48_0_0)] mb-2">
                    You'll Learn
                  </p>
                  <ul className="space-y-1.5">
                    {c.learn.map((item) => (
                      <li
                        key={item}
                        className="font-inter text-[oklch(0.72_0_0)] flex items-start gap-2"
                      >
                        <span className="text-gold mt-0.5 text-base leading-none">
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[oklch(0.48_0_0)] mb-2">
                    Who Should Join
                  </p>
                  <p className="font-inter text-[oklch(0.62_0_0)] flex items-start gap-2">
                    <span className="text-gold mt-0.5 text-base leading-none">
                      ›
                    </span>
                    {c.who}
                  </p>
                </div>
                <div>
                  <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[oklch(0.48_0_0)] mb-2">
                    Benefits
                  </p>
                  <ul className="space-y-1.5">
                    {c.benefits.map((b) => (
                      <li
                        key={b}
                        className="font-inter text-[oklch(0.72_0_0)] flex items-start gap-2"
                      >
                        <span className="text-gold mt-0.5 text-base leading-none">
                          ›
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRANSFORMATION
───────────────────────────────────────────── */
const transformSteps = [
  { label: "SHY", icon: <Heart size={20} />, desc: "Where you start" },
  { label: "EXPRESSIVE", icon: <Zap size={20} />, desc: "Voice awakens" },
  { label: "BOLD", icon: <Target size={20} />, desc: "Fear dissolves" },
  { label: "CONFIDENT", icon: <Star size={20} />, desc: "Self emerges" },
  {
    label: "POWERFUL PERFORMER",
    icon: <Award size={20} />,
    desc: "You arrive",
  },
];

function Transformation() {
  const { ref, inView } = useInView();
  return (
    /* FIX 3: large section padding — the most important section deserves the most drama */
    <section
      id="transformation"
      className="py-44 relative overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
      ref={ref}
    >
      {/* Gold radial glow — larger and brighter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.75 0.12 85 / 0.07) 0%, transparent 65%)",
        }}
      />
      {/* FIX 3: subtle top/bottom horizontal gold rules for section framing */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.35), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.35), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="section-label mb-6">The Journey</p>
          {/* FIX 1: cinematic H2 size + tracking */}
          <h2
            className="font-cinzel font-black uppercase mx-auto max-w-4xl"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
            }}
          >
            This Is Not Just An Acting Class.
            <br />
            <span className="text-[oklch(0.92_0_0)]">
              This Is A Personality Transformation Journey.
            </span>
          </h2>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* FIX 2: gradient connector line using gold-grad */}
          <div
            className="hidden md:block absolute top-10 left-[8%] right-[8%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.5) 20%, oklch(0.90 0.14 90) 50%, oklch(0.75 0.12 85 / 0.5) 80%, transparent)",
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {transformSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.15 * i,
                  ease: "backOut",
                }}
                className="flex flex-col items-center text-center"
                data-ocid={`transformation.card.${i + 1}`}
              >
                {/* FIX 2: gradient border on circles */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 relative"
                  style={{
                    background: "oklch(0.11 0 0)",
                    boxShadow:
                      "0 0 0 2px oklch(0.75 0.12 85 / 0.7), 0 0 24px oklch(0.75 0.12 85 / 0.25)",
                  }}
                >
                  <div className="text-gold">{step.icon}</div>
                  {i < transformSteps.length - 1 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 text-gold opacity-50">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
                {/* FIX 1: wider tracking on step labels */}
                <h3
                  className="font-cinzel font-bold uppercase text-[10px] tracking-[0.2em] mb-1.5"
                  style={{ color: "var(--gold)" }}
                >
                  {step.label}
                </h3>
                <p className="font-inter text-xs text-[oklch(0.50_0_0)]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emotional copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-center mt-24 max-w-2xl mx-auto"
        >
          <p className="font-inter text-[oklch(0.62_0_0)] leading-loose text-lg">
            Every great performer was once terrified. Every confident speaker
            once had a trembling voice. The difference? They stepped on stage
            anyway. At Udaan, we create that stage for you — and walk with you
            every step of the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY CHOOSE UDAAN
───────────────────────────────────────────── */
const whyPoints = [
  {
    icon: <Target size={24} />,
    title: "Practical Training, Not Theory",
    desc: "Every session is a live performance. We believe you learn by doing, not by listening.",
  },
  {
    icon: <Award size={24} />,
    title: "Stage Performance Opportunities",
    desc: "Perform on real stages in front of real audiences. Build confidence that lasts a lifetime.",
  },
  {
    icon: <Heart size={24} />,
    title: "Real Confidence Building",
    desc: "Not surface-level confidence — deep, unshakeable belief in yourself that transforms how you live.",
  },
  {
    icon: <Zap size={24} />,
    title: "Personality Transformation",
    desc: "You will walk in as one person and walk out as someone bolder, brighter, and unstoppable.",
  },
  {
    icon: <Film size={24} />,
    title: "Film & Theatre Exposure",
    desc: "Industry insights, guest professionals, and real opportunities in film and theatre.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Perfect for Beginners",
    desc: "Zero experience needed. If you can breathe, we can help you perform. Everyone starts somewhere.",
  },
];

function WhyUs() {
  const { ref, inView } = useInView();
  return (
    <section id="why" className="py-36 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5">Why Udaan</p>
          <h2
            className="font-cinzel font-black uppercase"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.07em",
            }}
          >
            What Makes Us
            <span className="text-[oklch(0.92_0_0)]"> Different</span>
          </h2>
          <div className="section-divider mt-6 mb-14" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyPoints.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="card-gold p-7 rounded-sm"
              data-ocid={`why.card.${i + 1}`}
            >
              <div className="text-gold mb-4">{p.icon}</div>
              {/* FIX 1: why card titles wider tracking */}
              <h3
                className="font-cinzel font-bold uppercase text-sm mb-3"
                style={{
                  color: "var(--gold-light)",
                  letterSpacing: "0.1em",
                }}
              >
                {p.title}
              </h3>
              <p className="font-inter text-[oklch(0.62_0_0)] text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STUDENT EXPERIENCE
───────────────────────────────────────────── */
const pillars = [
  {
    icon: <Star size={28} />,
    title: "Confidence",
    desc: "Step into any room and own it. The confidence you build on stage travels with you everywhere.",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Communication",
    desc: "Express your thoughts clearly, powerfully, and with conviction in every conversation.",
  },
  {
    icon: <Users size={28} />,
    title: "Body Language",
    desc: "Your body speaks before your words do. Master the language of presence and command attention.",
  },
  {
    icon: <Mic size={28} />,
    title: "Public Speaking",
    desc: "Transform fear of the podium into your greatest strength. Speak to hundreds with ease.",
  },
  {
    icon: <Award size={28} />,
    title: "Leadership Presence",
    desc: "Lead with authority and authenticity. The stage teaches you to inspire, not just inform.",
  },
];

function StudentExperience() {
  const { ref, inView } = useInView();
  return (
    <section className="py-32 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5">Student Experience</p>
          <h2
            className="font-cinzel font-black uppercase max-w-3xl mx-auto"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              color: "var(--gold)",
              letterSpacing: "0.06em",
              lineHeight: 1.3,
            }}
          >
            Students Don't Just Learn Acting.{" "}
            <span className="text-[oklch(0.92_0_0)]">
              They Learn Confidence for Life.
            </span>
          </h2>
          <div className="section-divider mt-6 mb-14" />
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card-gold p-7 rounded-sm text-center"
              data-ocid={`experience.card.${i + 1}`}
            >
              <div className="text-gold mx-auto mb-4">{p.icon}</div>
              <h3
                className="font-cinzel font-bold uppercase text-sm mb-3"
                style={{
                  color: "var(--gold)",
                  letterSpacing: "0.12em",
                }}
              >
                {p.title}
              </h3>
              <p className="font-inter text-[oklch(0.58_0_0)] text-xs leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function CTA() {
  const { ref, inView } = useInView();
  return (
    /* FIX 3: maximum dramatic vertical padding for the high-stakes CTA */
    <section
      className="py-52 relative overflow-hidden"
      style={{ background: "oklch(0.05 0 0)" }}
      ref={ref}
    >
      {/* Gold radial glow — stronger for CTA impact */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 50% 50%, oklch(0.75 0.12 85 / 0.10) 0%, transparent 65%)",
        }}
      />
      {/* FIX 3: framing rules */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.5) 30%, oklch(0.90 0.14 90) 50%, oklch(0.75 0.12 85 / 0.5) 70%, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.5) 30%, oklch(0.90 0.14 90) 50%, oklch(0.75 0.12 85 / 0.5) 70%, transparent)",
        }}
      />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label mb-10">The Decision Moment</p>
          {/* FIX 1: largest CTA heading with shimmer on the command line */}
          <h2
            className="font-cinzel font-black uppercase mb-10 mx-auto"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
            }}
          >
            <span className="gold-shimmer">If You Want Confidence,</span>
            <br />
            <span className="text-[oklch(0.92_0_0)]">This Is Your Place.</span>
            <br />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.7em" }}>
              If You Want Excuses, This Is Not.
            </span>
          </h2>
          <p className="font-inter text-[oklch(0.55_0_0)] text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Your transformation starts the moment you decide to step on stage.
          </p>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="btn-gold px-14 py-5 rounded-sm text-sm gold-glow"
            data-ocid="cta.primary_button"
          >
            Join Udaan Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" className="py-36 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5">Get In Touch</p>
          <h2
            className="font-cinzel font-black uppercase"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.07em",
            }}
          >
            Begin Your
            <span className="text-[oklch(0.92_0_0)]"> Journey</span>
          </h2>
          <div className="section-divider mt-6 mb-14" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div
              className="p-8 rounded-sm"
              style={{
                background: "var(--surface)",
                border: "1px solid oklch(0.75 0.12 85 / 0.2)",
              }}
            >
              <h3
                className="font-cinzel font-bold uppercase text-sm tracking-[0.2em] mb-8"
                style={{ color: "var(--gold)" }}
              >
                Contact Information
              </h3>
              <div className="space-y-6">
                <a
                  href="tel:+919137911308"
                  className="flex items-start gap-4 group"
                  data-ocid="contact.link"
                >
                  <Phone size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-[oklch(0.48_0_0)] mb-1">
                      Phone
                    </p>
                    <p className="font-inter text-[oklch(0.80_0_0)] group-hover:text-gold transition-colors">
                      +91 91379 11308
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-[oklch(0.48_0_0)] mb-1">
                      Address
                    </p>
                    <p className="font-inter text-[oklch(0.80_0_0)]">
                      Plot no. A-183, Siddhi Sankalp Society, Near Kalash
                      Medical, Sector 19A, Kopar Khairne, 400709
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:udaantheaterandfilms18022026@gmail.com"
                  className="flex items-start gap-4 group"
                  data-ocid="contact.link"
                >
                  <Mail size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-[oklch(0.48_0_0)] mb-1">
                      Email
                    </p>
                    <p className="font-inter text-[oklch(0.80_0_0)] group-hover:text-gold transition-colors">
                      udaantheaterandfilms18022026@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div
                className="mt-8 pt-8"
                style={{ borderTop: "1px solid oklch(0.75 0.12 85 / 0.15)" }}
              >
                <a
                  href="https://wa.me/919137911308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-sm font-cinzel text-[11px] tracking-[0.18em] uppercase font-bold transition-all duration-300 hover:opacity-90 hover:scale-105"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                  }}
                  data-ocid="contact.primary_button"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="rounded-sm overflow-hidden h-full min-h-[350px]"
              style={{ border: "1px solid oklch(0.75 0.12 85 / 0.2)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120000!2d73.02!3d19.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce4f4a3b2e9b%3A0x7d5b0d3f5a8c3e1a!2sNavi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Udaan Theater Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "About", id: "about" },
    { label: "Courses", id: "courses" },
    { label: "Transformation", id: "transformation" },
    { label: "Why Us", id: "why" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: "oklch(0.06 0 0)",
        borderTop: "1px solid var(--gold)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="font-cinzel text-3xl font-black tracking-[0.18em] text-gold-gradient">
                UDAAN
              </div>
              <div className="font-inter text-[9px] tracking-[0.42em] text-[oklch(0.48_0_0)] uppercase">
                Theater &amp; Films
              </div>
            </div>
            <p className="font-inter text-sm text-[oklch(0.52_0_0)] leading-relaxed">
              Transforming personalities through performance.
              <br />
              Navi Mumbai, Maharashtra.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="font-inter text-sm text-[oklch(0.52_0_0)] hover:text-gold transition-colors tracking-wide"
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram size={18} />,
                  label: "Instagram",
                  href: "#",
                },
                { icon: <Youtube size={18} />, label: "YouTube", href: "#" },
                { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: "1px solid oklch(0.75 0.12 85 / 0.4)",
                    color: "var(--gold)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 15px oklch(0.75 0.12 85 / 0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "oklch(0.75 0.12 85 / 0.4)";
                  }}
                  data-ocid="footer.link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="font-inter text-xs text-[oklch(0.42_0_0)] mt-6 leading-relaxed">
              Join our community of bold, expressive performers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.75 0.12 85 / 0.15)" }}
        >
          <p className="font-inter text-xs text-[oklch(0.38_0_0)]">
            © {year} Udaan Theater and Films. All rights reserved.
          </p>
          <p className="font-inter text-xs text-[oklch(0.35_0_0)]">
            Built with <Heart size={10} className="inline text-gold" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-deep text-[oklch(0.92_0_0)]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Transformation />
        <WhyUs />
        <StudentExperience />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
