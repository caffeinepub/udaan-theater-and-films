import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Camera,
  ChevronDown,
  Facebook,
  Film,
  GraduationCap,
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
    { label: "Awards", id: "awards" },
    { label: "Gallery", id: "gallery" },
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
      <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex flex-col leading-none items-start"
          data-ocid="nav.link"
        >
          <span className="font-cinzel text-2xl font-black tracking-[0.18em] text-gold-gradient uppercase">
            UDAAN
          </span>
          <span className="font-inter text-[9px] tracking-[0.45em] text-[oklch(0.52_0_0)] uppercase mt-[-1px]">
            Theater &amp; Films
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 ml-auto">
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, oklch(0.02 0 0 / 0.75) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.4), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-40 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            className="section-label mb-8 flex items-center justify-center gap-4"
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

          <motion.h1
            className="font-cinzel font-black uppercase leading-[1.06] mb-10"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.9rem)",
              letterSpacing: "0.28em",
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

          <motion.p
            className="font-inter text-xl text-[oklch(0.72_0_0)] max-w-xl leading-loose mb-12 mx-auto"
            style={{ letterSpacing: "0.01em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            Learn acting, communication skills, body language, stage confidence
            and personality transformation through theatre.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-5 justify-center"
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
    <section id="about" className="py-36 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-5">Our Story</p>
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
          <p className="font-inter text-[oklch(0.62_0_0)] max-w-3xl mx-auto leading-loose mt-6">
            Udaan Theater and Films is a vibrant creative hub where aspiring
            performers and storytellers take flight. At Udaan, students don't
            just learn to act — they experience the art of performance from the
            inside out. With expert guidance in camera acting, stage acting, and
            the timeless principles of Nāṭyaśāstra, Udaan blends contemporary
            practice with classical foundations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-gold p-7 text-center rounded-sm"
              data-ocid={`about.card.${i + 1}`}
            >
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
  {
    icon: <GraduationCap size={28} />,
    title: "School Annual Day Drama & Stage Play Design",
    learn: [
      "Script selection & adaptation for age groups",
      "Stage direction, blocking & choreography",
      "Costume, props & production design",
      "Voice modulation & dialogue delivery coaching",
      "Building confidence & overcoming stage fear",
    ],
    who: "Schools, educational institutions",
    benefits: [
      "Done in association with Swtantra Theater",
      "10+ successful annual days delivered",
      "Focus: child development, not just performance",
      "Builds personality, speech & life skills",
      "Trusted by VPMS Pune, HDFC School & more",
    ],
  },
];

function Courses() {
  const { ref, inView } = useInView();
  return (
    <section id="courses" className="py-32 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5">Our Programs</p>
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

          {/* School Partnerships Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 border border-[var(--gold)] rounded-sm p-8 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.10 0 0) 0%, oklch(0.14 0.02 60) 100%)",
            }}
            data-ocid="courses.schools.panel"
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px",
              }}
            />
            <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-[oklch(0.48_0_0)] mb-4">
              In Association with Swtantra Theater
            </p>
            <h3
              className="font-cinzel font-black uppercase mb-3"
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                color: "var(--gold)",
                letterSpacing: "0.06em",
              }}
            >
              Annual Day — Beyond the Stage
            </h3>
            <p className="font-inter text-[oklch(0.60_0_0)] text-sm mb-7 tracking-wide">
              Our annual day programs are not designed for applause alone. Every
              performance is a journey of transformation — children develop
              personality, speech clarity, self-confidence, fearlessness on
              stage, and essential life skills. Done in proud association with
              Swtantra Theater — 10 Annual Day Performances delivered across
              leading schools.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {[
                "VPMS Pune",
                "HDFC School, Pune",
                "Chandrakant Darode School, Pune",
              ].map((school) => (
                <span
                  key={school}
                  className="font-cinzel text-xs uppercase tracking-[0.2em] px-5 py-2.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-sm"
                  style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                >
                  {school}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {[
                "Personality Development",
                "Speech & Voice",
                "Confidence Building",
                "Overcoming Stage Fear",
                "Life Skills",
                "Teamwork & Discipline",
                "Emotional Intelligence",
                "Body Language & Expression",
                "Creative Thinking",
                "Leadership on Stage",
                "Memory & Concentration",
                "Cultural Awareness",
              ].map((pillar) => (
                <span
                  key={pillar}
                  className="font-cinzel text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border border-[var(--gold)] text-[var(--gold)] rounded-full"
                  style={{ background: "oklch(0.06 0.02 60 / 0.5)" }}
                >
                  {pillar}
                </span>
              ))}
            </div>

            {/* Why Annual Day Matters */}
            <div className="mt-8 pt-8 border-t border-[oklch(0.25_0.04_60)]">
              <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-[oklch(0.48_0_0)] mb-3">
                The Real Impact
              </p>
              <h4
                className="font-cinzel font-bold uppercase mb-6"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  color: "var(--gold)",
                  letterSpacing: "0.06em",
                }}
              >
                Why Annual Day Matters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left mb-8">
                {[
                  {
                    num: "01",
                    heading: "It Builds Confidence for Life",
                    desc: "A child who stands on stage before 500 people never fears a classroom, an interview, or a crowd again.",
                  },
                  {
                    num: "02",
                    heading: "Speech Becomes a Superpower",
                    desc: "We train voice, diction, and modulation so every word lands with clarity and power.",
                  },
                  {
                    num: "03",
                    heading: "Stage Fear is Conquered Forever",
                    desc: "Our structured rehearsal process turns anxiety into excitement — one step at a time.",
                  },
                  {
                    num: "04",
                    heading: "Teamwork is Lived, Not Taught",
                    desc: "Working together toward one performance teaches cooperation better than any textbook.",
                  },
                  {
                    num: "05",
                    heading: "Indian Culture is Celebrated",
                    desc: "Children don't just read about India's heritage — they live it, breathe it, and perform it.",
                  },
                  {
                    num: "06",
                    heading: "Memories That Last a Lifetime",
                    desc: "For parents, teachers, and children alike, a great annual day becomes the story told for years.",
                  },
                ].map((point) => (
                  <div key={point.num} className="flex gap-4 items-start">
                    <span
                      className="font-cinzel font-black text-lg leading-none shrink-0 mt-0.5"
                      style={{ color: "var(--gold)", opacity: 0.7 }}
                    >
                      {point.num}
                    </span>
                    <div>
                      <h6
                        className="font-cinzel font-bold text-xs uppercase tracking-wider mb-1"
                        style={{ color: "oklch(0.88 0.06 80)" }}
                      >
                        {point.heading}
                      </h6>
                      <p className="font-inter text-[oklch(0.58_0_0)] text-xs leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian Literature Promotion */}
            <div className="mt-8 pt-8 border-t border-[oklch(0.25_0.04_60)]">
              <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-[oklch(0.48_0_0)] mb-3">
                Also In Our School Programs
              </p>
              <h4
                className="font-cinzel font-bold uppercase mb-4"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  color: "var(--gold)",
                  letterSpacing: "0.06em",
                }}
              >
                Celebrating Indian Literature
              </h4>
              <p className="font-inter text-[oklch(0.60_0_0)] text-sm mb-5 tracking-wide max-w-2xl mx-auto">
                We believe the soul of India lives in its stories. Our school
                programs actively promote Indian literature — bringing the works
                of legendary poets, playwrights, and storytellers to life on
                stage. Students experience the power and beauty of India's
                literary heritage firsthand.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Stories from Indian Classics",
                  "Poems by Kabir, Tukaram & Mirabai",
                  "Folk Tales & Mythology",
                  "Regional Language Plays",
                  "Nāṭyaśāstra-Based Stagecraft",
                  "Freedom Movement Narratives",
                  "Sanskrit Shloka Recitation",
                  "Modern Indian Playwrights",
                  "Stories of Tenali Rama",
                  "Exploring Indian Dynasties",
                  "Freedom Fighter Stories",
                  "Stories by P.L. Deshpande",
                  "Epics — Ramayana & Mahabharata",
                  "Panchatantra Tales",
                  "Akbar & Birbal Stories",
                  "Sufi & Bhakti Traditions",
                  "Rani Lakshmibai — The Warrior Queen",
                  "Chhatrapati Shivaji — The Great King",
                  "Lives of Indian Scientists",
                  "Birsa Munda — Tribal Courage",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-cinzel text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-full"
                    style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Signature Story Dramas */}
              <div className="mt-10 pt-8 border-t border-[oklch(0.25_0.04_60)]">
                <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-[oklch(0.48_0_0)] mb-3">
                  Signature Stage Dramas
                </p>
                <h4
                  className="font-cinzel font-bold uppercase mb-2"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    color: "var(--gold)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Our Signature Story Dramas
                </h4>
                <p className="font-inter text-[oklch(0.55_0_0)] text-sm mb-8 tracking-wide max-w-2xl mx-auto">
                  From ancient dynasties to freedom fighters — we bring India's
                  greatest stories alive on stage for children to experience,
                  embody, and carry forward.
                </p>

                {/* Category 1: Tenali Rama */}
                <div className="mb-10">
                  <div className="mb-4">
                    <h5
                      className="font-cinzel font-bold uppercase"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Tenali Rama & the Great Dynasties
                    </h5>
                    <p className="font-inter text-[oklch(0.52_0_0)] text-xs tracking-widest mt-1 uppercase">
                      Wit, Wisdom & the Kingdoms of Bharat
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        dynasty: "Maurya Dynasty",
                        title: "The Lion's Court",
                        story:
                          "Tenali Rama visits the grand court of Emperor Chandragupta Maurya. With his sharp wit he exposes a corrupt minister using a simple riddle, earning the admiration of Chanakya himself.",
                        themes: ["Justice", "Wisdom", "Statecraft"],
                      },
                      {
                        dynasty: "Gupta Dynasty",
                        title: "The Golden Age",
                        story:
                          "In the court of Chandragupta II, during India's golden age of art and science, Tenali impresses scholars with a poem that answers three questions at once.",
                        themes: ["Knowledge", "Poetry", "Culture"],
                      },
                      {
                        dynasty: "Chola Dynasty",
                        title: "The Temple & the Trickster",
                        story:
                          "Tenali travels south to the magnificent Chola kingdom. He helps a poor sculptor reclaim his stolen artwork from a greedy landlord — using only his clever tongue.",
                        themes: ["Art", "Courage", "Justice"],
                      },
                      {
                        dynasty: "Maratha Dynasty",
                        title: "Chhatrapati's Challenge",
                        story:
                          "In Shivaji Maharaj's court, Tenali faces his greatest test. He must solve a riddle that even the bravest warriors could not — and in doing so, teaches that a sharp mind is mightier than a sharp sword.",
                        themes: [
                          "Bravery",
                          "Intelligence",
                          "Maharashtra Pride",
                        ],
                      },
                    ].map((card) => (
                      <div
                        key={card.dynasty}
                        className="rounded-sm border border-[oklch(0.32_0.06_60)] p-4 text-left"
                        style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                      >
                        <p
                          className="font-cinzel text-[10px] uppercase tracking-[0.2em] mb-1"
                          style={{ color: "var(--gold)" }}
                        >
                          {card.dynasty}
                        </p>
                        <h6
                          className="font-cinzel font-bold text-sm mb-2"
                          style={{ color: "oklch(0.88 0.06 80)" }}
                        >
                          {card.title}
                        </h6>
                        <p className="font-inter text-[oklch(0.60_0_0)] text-xs leading-relaxed mb-3">
                          {card.story}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {card.themes.map((t) => (
                            <span
                              key={t}
                              className="font-cinzel text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-full"
                              style={{
                                background: "oklch(0.06 0.01 60 / 0.5)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2: Freedom Fighters */}
                <div className="mb-10 pt-8 border-t border-[oklch(0.20_0.03_60)]">
                  <div className="mb-4">
                    <h5
                      className="font-cinzel font-bold uppercase"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Echoes of Courage — Freedom Fighter Stories
                    </h5>
                    <p className="font-inter text-[oklch(0.52_0_0)] text-xs tracking-widest mt-1 uppercase">
                      Bringing India's Heroes to Life on Stage
                    </p>
                  </div>
                  <div
                    className="rounded-sm border border-[oklch(0.32_0.06_60)] p-5 text-left mb-4"
                    style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                  >
                    <p
                      className="font-cinzel text-[10px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: "var(--gold)" }}
                    >
                      Featured Story
                    </p>
                    <h6
                      className="font-cinzel font-bold text-sm mb-2"
                      style={{ color: "oklch(0.88 0.06 80)" }}
                    >
                      Bhagat Singh — The Fearless Flame
                    </h6>
                    <p className="font-inter text-[oklch(0.62_0_0)] text-xs leading-relaxed mb-3">
                      At just 23, Bhagat Singh walked to the gallows singing.
                      His story on our stage is not just about sacrifice — it is
                      about a young man who chose to fight injustice with ideas,
                      courage, and an unshakeable fire in his heart. Students
                      who portray him learn what it means to stand for something
                      greater than themselves.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Courage",
                        "Sacrifice",
                        "Patriotism",
                        "Youth Power",
                      ].map((t) => (
                        <span
                          key={t}
                          className="font-cinzel text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-full"
                          style={{ background: "oklch(0.06 0.01 60 / 0.5)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      {
                        label: "Featured Story",
                        title: "Rani Lakshmibai — The Warrior Queen",
                        story:
                          "The Queen of Jhansi who refused to surrender to the British Empire. Her story teaches children that courage has no gender — that a mother, a ruler, and a warrior can all live in one person. Students who embody her strength carry her fire into every corner of their lives.",
                        themes: [
                          "Courage",
                          "Womanhood",
                          "Sacrifice",
                          "Pride of India",
                        ],
                      },
                      {
                        label: "Featured Story",
                        title: "Subhas Chandra Bose — The Fearless Commander",
                        story:
                          "Netaji gave up luxury, safety, and comfort to build an army of the free. His story on our stage shows children what it means to dream beyond limits — that a free India was not given to us, it was fought for, with every heartbeat and every breath.",
                        themes: [
                          "Leadership",
                          "Patriotism",
                          "Vision",
                          "Fearlessness",
                        ],
                      },
                      {
                        label: "Featured Story",
                        title: "Savitribai Phule — The First Teacher",
                        story:
                          "She walked to school with stones and dung thrown at her — and she kept walking. India's first female teacher, Savitribai Phule's story reminds every child that education is the most powerful act of rebellion. Her life is a lesson that no stone can stop a determined heart.",
                        themes: [
                          "Education",
                          "Women's Rights",
                          "Perseverance",
                          "Revolution",
                        ],
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="rounded-sm border border-[oklch(0.32_0.06_60)] p-4 text-left"
                        style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                      >
                        <p
                          className="font-cinzel text-[10px] uppercase tracking-[0.2em] mb-1"
                          style={{ color: "var(--gold)" }}
                        >
                          {card.label}
                        </p>
                        <h6
                          className="font-cinzel font-bold text-sm mb-2"
                          style={{ color: "oklch(0.88 0.06 80)" }}
                        >
                          {card.title}
                        </h6>
                        <p className="font-inter text-[oklch(0.60_0_0)] text-xs leading-relaxed mb-3">
                          {card.story}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {card.themes.map((t) => (
                            <span
                              key={t}
                              className="font-cinzel text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-full"
                              style={{
                                background: "oklch(0.06 0.01 60 / 0.5)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-inter text-[oklch(0.45_0_0)] text-xs italic tracking-wide mt-4">
                    More freedom fighter stories added each year — growing our
                    living gallery of India's bravest hearts.
                  </p>
                </div>

                {/* Category 3: P.L. Deshpande */}
                <div className="pt-8 border-t border-[oklch(0.20_0.03_60)]">
                  <div className="mb-4">
                    <h5
                      className="font-cinzel font-bold uppercase"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      P.L. Deshpande — Maharashtra's Eternal Storyteller
                    </h5>
                    <p className="font-inter text-[oklch(0.52_0_0)] text-xs tracking-widest mt-1 uppercase">
                      Celebrating the Soul of Marathi Culture
                    </p>
                  </div>
                  <p className="font-inter text-[oklch(0.60_0_0)] text-sm leading-relaxed mb-5 max-w-2xl mx-auto">
                    Purushottam Laxman Deshpande — lovingly called &apos;Pu
                    La&apos; — was more than a writer. He was Maharashtra's
                    laughter, its tears, its heartbeat. Through his stories,
                    characters like Antoo Barua, Namya, and Sakharam Gatne come
                    alive, teaching children the richness of Marathi culture,
                    the joy of simple life, and the art of storytelling with a
                    smile.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {[
                      "Antoo Barua — The Lovable Misfit",
                      "Batatyachi Chaal — Life in the Chawl",
                      "Vyakti Ani Valli — Portraits of Maharashtra",
                    ].map((story) => (
                      <span
                        key={story}
                        className="font-cinzel text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 border border-[oklch(0.38_0.06_60)] text-[var(--gold-light)] rounded-full"
                        style={{ background: "oklch(0.08 0.01 60 / 0.6)" }}
                      >
                        {story}
                      </span>
                    ))}
                  </div>
                  <blockquote
                    className="border-l-2 pl-5 py-2 mx-auto max-w-xl text-left"
                    style={{ borderColor: "var(--gold)" }}
                  >
                    <p
                      className="font-inter italic text-base leading-relaxed mb-2"
                      style={{ color: "var(--gold)" }}
                    >
                      "आयुष्यात दोन गोष्टी सोडू नका — हसणं आणि शिकणं."
                    </p>
                    <footer className="font-cinzel text-[9px] uppercase tracking-[0.18em] text-[oklch(0.52_0_0)]">
                      — Pu La Deshpande &nbsp;·&nbsp;{" "}
                      <span className="not-italic normal-case tracking-normal text-[oklch(0.48_0_0)]">
                        "Never give up two things in life — laughter and
                        learning."
                      </span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
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
    <section
      id="transformation"
      className="py-44 relative overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.75 0.12 85 / 0.07) 0%, transparent 65%)",
        }}
      />
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
          <h2
            className="font-cinzel font-black uppercase mx-auto max-w-4xl"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.28em",
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

        <div className="relative">
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
              letterSpacing: "0.28em",
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
   AWARDS & RECOGNITION
───────────────────────────────────────────── */
function AwardsRecognition() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="awards"
      className="py-36 relative overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
      ref={ref}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.75 0.12 85 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.5), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.5), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            Excellence &amp; Recognition
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
          </p>
          <h2
            className="font-cinzel text-4xl md:text-5xl font-bold mb-5"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            Honoured on the{" "}
            <span style={{ color: "var(--gold)" }}>International Stage</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto italic"
            style={{ color: "oklch(0.70 0.08 85)" }}
          >
            A testament to artistic brilliance and pedagogical distinction
          </p>
        </motion.div>

        {/* Award card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.09 0 0)",
            border: "1px solid oklch(0.75 0.12 85 / 0.35)",
            boxShadow:
              "0 0 60px oklch(0.75 0.12 85 / 0.1), 0 20px 60px oklch(0 0 0 / 0.5)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-0">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="lg:w-5/12 flex-shrink-0"
            >
              <div
                className="relative h-72 lg:h-full min-h-[340px]"
                style={{
                  borderRight: "1px solid oklch(0.75 0.12 85 / 0.25)",
                }}
              >
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-1--1.jpeg"
                  alt="Appreciation Award — South Asian Category — 10th International Colombo Theatre Festival"
                  className="w-full h-full object-cover"
                />
                {/* Gold frame overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 3px oklch(0.75 0.12 85 / 0.45)",
                  }}
                />
                {/* Gradient overlay for blending */}
                <div
                  className="absolute inset-0 pointer-events-none hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 80%, oklch(0.09 0 0) 100%)",
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:w-7/12 p-8 md:p-12 flex flex-col justify-center">
              {/* Trophy icon + award title */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: "oklch(0.75 0.12 85 / 0.12)",
                    border: "1px solid oklch(0.75 0.12 85 / 0.4)",
                  }}
                >
                  🏆
                </div>
                <div>
                  <h3
                    className="font-cinzel text-xl md:text-2xl font-bold leading-tight"
                    style={{ color: "var(--gold)" }}
                  >
                    Appreciation Award
                  </h3>
                  <p
                    className="font-cinzel text-base md:text-lg mt-1"
                    style={{ color: "oklch(0.75 0.12 85 / 0.85)" }}
                  >
                    South Asian Category
                  </p>
                </div>
              </div>

              {/* Event name */}
              <div
                className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full w-fit"
                style={{
                  background: "oklch(0.75 0.12 85 / 0.08)",
                  border: "1px solid oklch(0.75 0.12 85 / 0.3)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--gold)" }}
                />
                <span
                  className="font-cinzel text-sm md:text-base font-semibold tracking-wide"
                  style={{ color: "oklch(0.88 0.06 85)" }}
                >
                  10th International Colombo Theatre Festival
                </span>
              </div>

              {/* Description */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "oklch(0.72 0 0)" }}
              >
                Udaan Theater and Films proudly celebrates this distinguished
                honour, conferred upon our faculty at the 10th International
                Colombo Theatre Festival — one of South Asia&apos;s most
                prestigious platforms for theatrical excellence. Recognised in
                the South Asian Category, this accolade affirms our unwavering
                commitment to nurturing transformative artistry and advancing
                the cultural legacy of Indian theatre on the global stage.
              </p>

              {/* Gold divider */}
              <div
                className="h-px w-24"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PERFORMANCE GALLERY
───────────────────────────────────────────── */
function PerformanceGallery() {
  const { ref, inView } = useInView(0.08);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  const photos = [
    {
      src: "/assets/uploads/STP02052-2-1.JPG",
      alt: "Live Stage Performance — Udaan Theater and Films",
      caption: "Live Stage Performance",
    },
    {
      src: "/assets/uploads/IMG_4732-2-1.jpg",
      alt: "Ensemble Cast On Stage — Udaan Theater and Films",
      caption: "Ensemble Cast — On Stage",
    },
    {
      src: "/assets/uploads/PHOTO-3-1.jpeg",
      alt: "Workshop In Action — Udaan Theater and Films",
      caption: "Workshop In Action",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-1--1.jpeg",
      alt: "Appreciation Award — South Asian Category — 10th International Colombo Theatre Festival",
      caption: "Appreciation Award — Colombo Theatre Festival 2026",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-2--1.jpeg",
      alt: "Theatre Workshop with School Students — Udaan Theater and Films",
      caption: "Theatre Workshop with School Students",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-1.jpeg",
      alt: "Powerful Stage Performance — Udaan Theater and Films",
      caption: "Live Stage Performance",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-4--1.jpeg",
      alt: "Deccan Literature Festival 2024 — Udaan Theater and Films",
      caption: "Deccan Literature Festival 2024",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.02-PM-1.jpeg",
      alt: "Vizag Junior Festival 2024 — Udaan Theater and Films",
      caption: "Vizag Junior Festival 2024",
    },
    {
      src: "/assets/uploads/WhatsApp-Image-2026-02-15-at-6.14.01-PM-1-1.jpeg",
      alt: "Students Training in Gohpur, Assam with Jungle Theater — Udaan Theater and Films",
      caption: "Students Training — Gohpur, Assam with Jungle Theater",
    },
  ];

  const openLightbox = (photo: { src: string; caption: string }) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <section
      id="gallery"
      className="py-36 relative overflow-hidden"
      style={{ background: "oklch(0.05 0 0)" }}
      ref={ref}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.75 0.12 85 / 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.4), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 85 / 0.4), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="section-label mb-5 flex items-center justify-center gap-3">
            <Camera size={14} className="text-gold" />
            Stage Moments
          </p>
          <h2
            className="font-cinzel font-black uppercase"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              color: "var(--gold)",
              letterSpacing: "0.07em",
            }}
          >
            Real Performances.
            <span className="text-[oklch(0.92_0_0)]">
              {" "}
              Real Transformation.
            </span>
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p className="font-inter text-[oklch(0.55_0_0)] text-base max-w-xl mx-auto leading-relaxed">
            Every photograph captures a moment when our students stepped beyond
            fear and into their power. This is what transformation looks like.
          </p>
        </motion.div>

        {/* 2-photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 0.2 + idx * 0.18,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              data-ocid={`gallery.card.${idx + 1}`}
            >
              {/* Outer gold-frame wrapper */}
              <button
                type="button"
                className="relative group cursor-pointer w-full text-left"
                style={{
                  padding: "3px",
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.12 85 / 0.8) 0%, oklch(0.60 0.10 80 / 0.4) 40%, oklch(0.90 0.14 90 / 0.9) 60%, oklch(0.65 0.11 80 / 0.5) 100%)",
                  borderRadius: "2px",
                  boxShadow:
                    "0 0 60px oklch(0.75 0.12 85 / 0.15), 0 25px 50px oklch(0 0 0 / 0.6)",
                  border: "none",
                }}
                onClick={() =>
                  openLightbox({ src: photo.src, caption: photo.caption })
                }
                aria-label={`View ${photo.caption} full screen`}
              >
                {/* Inner dark frame */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: "oklch(0.04 0 0)",
                    padding: "12px",
                    borderRadius: "1px",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full block object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      height: "340px",
                      objectPosition: "center top",
                    }}
                  />

                  {/* Subtle overlay on hover */}
                  <div
                    className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.04 0 0 / 0.85) 0%, transparent 50%)",
                    }}
                  >
                    <div className="p-6">
                      <p className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-gold">
                        Click to view full screen
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gold corner accents */}
                {[
                  "top-0 left-0",
                  "top-0 right-0",
                  "bottom-0 left-0",
                  "bottom-0 right-0",
                ].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-6 h-6`}
                    style={{
                      borderColor: "oklch(0.90 0.14 90)",
                      borderStyle: "solid",
                      borderWidth:
                        pos.includes("top") && pos.includes("left")
                          ? "2px 0 0 2px"
                          : pos.includes("top") && pos.includes("right")
                            ? "2px 2px 0 0"
                            : pos.includes("bottom") && pos.includes("left")
                              ? "0 0 2px 2px"
                              : "0 2px 2px 0",
                    }}
                  />
                ))}
              </button>

              {/* Caption panel */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55 + idx * 0.18 }}
                className="mt-6 flex items-start justify-between gap-4"
              >
                <div>
                  <h3
                    className="font-cinzel font-bold uppercase tracking-[0.15em] mb-1"
                    style={{ color: "var(--gold)", fontSize: "0.85rem" }}
                  >
                    {photo.caption}
                  </h3>
                  <p className="font-inter text-[oklch(0.52_0_0)] text-sm">
                    Udaan Theater and Films · Navi Mumbai
                  </p>
                </div>
                <div
                  className="flex-shrink-0 px-3 py-1.5 rounded-sm text-[10px] font-cinzel tracking-[0.2em] uppercase"
                  style={{
                    border: "1px solid oklch(0.75 0.12 85 / 0.35)",
                    color: "var(--gold-dim)",
                  }}
                >
                  On Stage
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA below gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="font-inter text-[oklch(0.50_0_0)] text-sm mb-6">
            Want to be in the next performance? Your story starts here.
          </p>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="btn-gold px-10 py-3 rounded-sm text-xs gold-glow"
            data-ocid="gallery.primary_button"
          >
            Join Udaan & Perform Live
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "oklch(0.02 0 0 / 0.96)" }}
            onClick={closeLightbox}
            data-ocid="gallery.modal"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: "3px",
                background:
                  "linear-gradient(135deg, oklch(0.75 0.12 85 / 0.8) 0%, oklch(0.60 0.10 80 / 0.4) 40%, oklch(0.90 0.14 90 / 0.9) 60%, oklch(0.65 0.11 80 / 0.5) 100%)",
                borderRadius: "2px",
                boxShadow: "0 0 120px oklch(0.75 0.12 85 / 0.2)",
              }}
            >
              <div
                style={{
                  background: "oklch(0.04 0 0)",
                  padding: "16px",
                  borderRadius: "1px",
                }}
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full block object-contain"
                  style={{ maxHeight: "80vh" }}
                />
                <div className="mt-4 pb-2 flex items-center justify-between">
                  <p
                    className="font-cinzel text-xs tracking-[0.25em] uppercase"
                    style={{ color: "var(--gold)" }}
                  >
                    {selectedPhoto.caption} · Live Stage Performance · Udaan
                    Theater and Films
                  </p>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-sm"
                    style={{
                      border: "1px solid oklch(0.75 0.12 85 / 0.4)",
                      color: "var(--gold-dim)",
                    }}
                    data-ocid="gallery.close_button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function CTA() {
  const { ref, inView } = useInView();
  return (
    <section
      className="py-52 relative overflow-hidden"
      style={{ background: "oklch(0.05 0 0)" }}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 50% 50%, oklch(0.75 0.12 85 / 0.10) 0%, transparent 65%)",
        }}
      />
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
          <h2
            className="font-cinzel font-black uppercase mb-10 mx-auto"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
              letterSpacing: "0.28em",
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
                src="https://maps.google.com/maps?q=19.107056,73.000306&z=17&output=embed"
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
    { label: "Awards", id: "awards" },
    { label: "Gallery", id: "gallery" },
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
        <AwardsRecognition />
        <PerformanceGallery />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
