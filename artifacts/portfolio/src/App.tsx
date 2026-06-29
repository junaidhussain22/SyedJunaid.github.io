import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Code2,
  Database,
  BrainCircuit,
  LineChart,
  Menu,
  X,
  TrendingUp,
  Activity,
  Layers,
  GitBranch,
  BarChart2,
  Cpu,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

const queryClient = new QueryClient();

/* ─── DATA ─────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 14, suffix: "+", label: "ML Projects" },
  { value: 10, suffix: "", label: "Top-10 Competition Rank" },
  { value: 5, suffix: "+", label: "Algorithms Mastered" },
  { value: 100, suffix: "M+", label: "Data Points Analyzed" },
];

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const projects: Project[] = [
  {
    title: "LLM from Scratch",
    description:
      "Built a large language model from scratch, implementing attention mechanisms, transformer architecture, and training pipeline end-to-end.",
    link: "https://github.com/junaidhussain22/LLM_from_scratch/blob/main/LLM_From_scratch_v2.ipynb",
    tags: ["Deep Learning", "Transformers", "NLP"],
    category: "Deep Learning",
    icon: <BrainCircuit className="w-5 h-5" />,
    highlight: true,
  },
  {
    title: "Weight Training Exercise Classifier",
    description:
      "Built a machine learning model to predict the type of weight training exercise being performed, using sensor data from handle movements (accelerometer & gyroscope signals) to classify exercises in real time.",
    link: "https://github.com/junaidhussain22",
    tags: ["Classification", "Sensor Data", "Signal Processing", "ML"],
    category: "Machine Learning",
    icon: <Activity className="w-5 h-5" />,
    highlight: true,
  },
  {
    title: "Sentiment Analysis — Neural Networks",
    description:
      "Participated in an online coding competition to train a neural network on a sentiment analysis problem. Ranked in the top 10 by F1 Score among 80+ students.",
    link: "https://github.com/junaidhussain22/Sentiment_analysis_Neural_networks",
    tags: ["NLP", "Neural Networks", "Classification", "Competition"],
    category: "Deep Learning",
    icon: <BrainCircuit className="w-5 h-5" />,
  },
  {
    title: "Zee Recommender System",
    description:
      "Built a personalized movie recommendation system using collaborative filtering to show recommendations based on ratings from similar users, improving user experience.",
    link: "https://github.com/junaidhussain22/Zee_Recommender_Systems",
    tags: ["Recommender Systems", "Collaborative Filtering", "ML"],
    category: "Machine Learning",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: "Ola — Ensemble Learning",
    description:
      "Analyzed driver churn for Ola using ensemble learning methods. Built a model to identify at-risk drivers and provide actionable retention strategies in a highly competitive ride-hailing market.",
    link: "https://github.com/junaidhussain22",
    tags: ["Ensemble Learning", "Random Forest", "Churn Prediction"],
    category: "Machine Learning",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    title: "LoanTap — Logistic Regression",
    description:
      "Built a logistic regression model for LoanTap to assess creditworthiness and predict loan default risk, enabling the platform to deliver instant, flexible loans to salaried professionals.",
    link: "https://github.com/junaidhussain22",
    tags: ["Logistic Regression", "Credit Risk", "Classification"],
    category: "Machine Learning",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "Jamboree — Linear Regression",
    description:
      "Developed a linear regression model to predict GMAT scores and graduate school admission chances for Jamboree students, enabling data-driven counselling and target setting.",
    link: "https://github.com/junaidhussain22",
    tags: ["Linear Regression", "Prediction", "Education"],
    category: "Machine Learning",
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    title: "AdEase — Time Series Forecasting",
    description:
      "Conducted time series analysis for AdEase, an ad & marketing company, to forecast click-through performance and help businesses maximize clicks at minimum cost.",
    link: "https://github.com/junaidhussain22",
    tags: ["Time Series", "Forecasting", "Python"],
    category: "Data Analysis",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    title: "Scaler — Clustering Algorithm",
    description:
      "Applied clustering algorithms to segment Scaler's learner base, identifying distinct learner profiles from online Data Science course data to improve personalized learning outcomes.",
    link: "https://github.com/junaidhussain22",
    tags: ["Clustering", "K-Means", "Unsupervised ML"],
    category: "Machine Learning",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Yulu — Hypothesis Testing",
    description:
      "Applied statistical hypothesis testing to Yulu's micro-mobility dataset to uncover demand drivers for their shared commute vehicles across India, supporting operational decisions.",
    link: "https://github.com/junaidhussain22/Walmart-_CI-and-CLT",
    tags: ["Hypothesis Testing", "Statistics", "Python"],
    category: "Data Analysis",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    title: "Netflix EDA & Recommendations",
    description:
      "Performed exploratory data analysis on the Netflix dataset using Python to extract meaningful insights and provide implementable, profitable content recommendations.",
    link: "https://github.com/junaidhussain22/Netflix_EDA/blob/main/Netflix_Case_Study.ipynb",
    tags: ["Python", "EDA", "Pandas", "Visualization"],
    category: "Data Analysis",
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    title: "Target SQL Business Analysis",
    description:
      "Analyzed an extensive dataset using SQL and provided valuable insights into Target's operations in Brazil. Delivered actionable business recommendations for logistics and sales.",
    link: "https://github.com/junaidhussain22/Target_using_SQL/blob/main/Business_Case_Target_SQL.pdf",
    tags: ["SQL", "Business Intelligence", "Data Analysis"],
    category: "Data Analysis",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Aerofit — Descriptive Statistics",
    description:
      "Statistical analysis for Aerofit, a leading fitness equipment brand. Profiled customer segments for treadmill products to inform targeted marketing strategies.",
    link: "https://github.com/junaidhussain22/Aerofit_Descriptive_Statistics",
    tags: ["Statistics", "Python", "Customer Segmentation"],
    category: "Data Analysis",
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    title: "Walmart — Confidence Intervals & CLT",
    description:
      "Statistical analysis of Walmart's retail data applying Confidence Intervals and Central Limit Theorem to extract purchasing behavior insights across 100M+ customers.",
    link: "https://github.com/junaidhussain22/Walmart-_CI-and-CLT",
    tags: ["Statistics", "Hypothesis Testing", "Python"],
    category: "Data Analysis",
    icon: <Database className="w-5 h-5" />,
  },
];

const CATEGORIES = ["All", "Deep Learning", "Machine Learning", "Data Analysis"];

const skills = [
  { name: "Python", level: 95 },
  { name: "SQL", level: 88 },
  { name: "Machine Learning", level: 90 },
  { name: "Deep Learning", level: 82 },
  { name: "Neural Networks", level: 80 },
  { name: "NLP", level: 78 },
  { name: "Pandas / NumPy", level: 92 },
  { name: "Scikit-learn", level: 88 },
  { name: "TensorFlow / PyTorch", level: 75 },
  { name: "Statistics", level: 90 },
  { name: "EDA", level: 93 },
  { name: "Data Visualization", level: 85 },
  { name: "Recommender Systems", level: 78 },
  { name: "Time Series", level: 76 },
];

/* ─── HOOKS ─────────────────────────────────────────────── */

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── COMPONENTS ────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 transition-all duration-300`}
    >
      <div
        className={`flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border/80 shadow-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <span className="font-mono text-primary text-sm tracking-widest">SJH</span>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                active === href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-xl p-3 space-y-1"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary font-mono tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2 font-light">{label}</div>
    </div>
  );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="space-y-1"
    >
      <div className="flex justify-between text-sm">
        <span className="font-mono text-foreground/90">{name}</span>
        <span className="font-mono text-primary/70">{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col p-6 rounded-xl border transition-all duration-300 overflow-hidden ${
        project.highlight
          ? "bg-card border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.05)]"
          : "bg-card border-border hover:border-primary/40"
      }`}
    >
      {/* Dynamic glow following mouse */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mouse.x}% ${mouse.y}%, rgba(0,240,255,0.07), transparent 70%)`,
          }}
        />
      )}

      {project.highlight && (
        <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          Featured
        </span>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 p-2.5 bg-secondary rounded-lg text-primary group-hover:bg-primary/10 transition-colors">
          {project.icon}
        </div>
      </div>

      <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
        {project.title}
      </h4>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2 py-0.5 bg-secondary/80 rounded text-muted-foreground group-hover:text-primary/80 transition-colors"
          >
            {tag}
          </span>
        ))}
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors ml-auto self-center" />
      </div>
    </motion.a>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const typewriterText = useTypewriter([
    "Data Scientist",
    "Machine Learning Engineer",
    "NLP Practitioner",
    "Statistical Analyst",
  ]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans relative">
      <ScrollProgress />
      <Navbar />

      {/* Fixed ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/4 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="z-10 w-full max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-mono text-primary mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for DS/ML Roles
            </motion.div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground glitch-effect"
              data-text="Syed Junaid Hussain"
            >
              Syed Junaid Hussain
            </h1>

            <h2 className="text-2xl md:text-3xl text-muted-foreground mt-5 font-light min-h-[2rem]">
              <span className="text-primary font-medium">{typewriterText}</span>
              <span className="inline-block w-0.5 h-7 bg-primary ml-1 animate-pulse align-middle" />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light border-l-2 border-primary/50 pl-5 italic"
          >
            "From Data to Decisions: Crafting Intelligent Solutions with AI & ML"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-4 pt-2"
          >
            <a
              href="https://github.com/junaidhussain22"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/60 border border-border text-foreground transition-all hover:border-primary/30 hover:shadow-[0_0_16px_rgba(0,240,255,0.08)]"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/syed-junaid-787427136"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/85 font-medium transition-all shadow-[0_0_24px_rgba(0,240,255,0.25)]"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 border-y border-border bg-card/20 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-[180px_1fr] gap-12 items-start"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground font-mono sticky top-24">
                <span className="text-primary">/</span> About
              </h3>
            </div>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                I am a Data Scientist and Machine Learning Engineer driven by a singular focus:
                transforming complex, messy data into rigorous, actionable intelligence. I believe
                the best models are not just accurate — they are interpretable, scalable, and deeply
                aligned with business objectives.
              </p>
              <p>
                My expertise spans the full machine learning lifecycle — from exploratory data
                analysis and statistical testing, to building neural networks, training large
                language models from scratch, and classifying real-world physical activity from
                sensor signals. I build systems that uncover hidden patterns and drive strategic
                decisions.
              </p>
              <p>
                I thrive at the intersection of statistical rigor and engineering precision, and I
                am actively seeking roles where I can apply this to high-impact problems in DS/ML.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 px-6 bg-card/20 border-y border-border relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-foreground font-mono mb-12">
              <span className="text-primary">/</span> Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-bold text-foreground font-mono mb-4">
              <span className="text-primary">/</span> Selected Work
            </h3>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">
              {projects.length} projects spanning deep learning, classical ML, statistics, and data analysis.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_rgba(0,240,255,0.25)]"
                    : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── BACKGROUND ── */}
      <section id="background" className="py-28 px-6 bg-card/20 border-y border-border relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-foreground font-mono mb-14">
              <span className="text-primary">/</span> Background
            </h3>

            <div className="space-y-0 relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

              {[
                {
                  period: "Present",
                  title: "Data Scientist & ML Engineer",
                  body: "Continuously building complex machine learning models, experimenting with LLMs from scratch, classifying physical activities from sensor data, and refining analytics pipelines to extract actionable insights.",
                  icon: <BrainCircuit className="w-4 h-4" />,
                  active: true,
                },
                {
                  period: "Advanced Projects",
                  title: "Industry Case Studies",
                  body: "Applied ML across 12+ industry case studies spanning ride-hailing, fintech, e-commerce, streaming, and micro-mobility — building end-to-end solutions from data wrangling to model deployment.",
                  icon: <Layers className="w-4 h-4" />,
                  active: false,
                },
                {
                  period: "Foundation",
                  title: "Academic & Statistical Grounding",
                  body: "Developed a strong base in statistics, hypothesis testing, EDA, and neural network design through rigorous coursework and competitive programming — including a top-10 finish in a neural network competition.",
                  icon: <Database className="w-4 h-4" />,
                  active: false,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-8 pb-12 last:pb-0"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center z-10 bg-background ${
                      item.active
                        ? "border-primary text-primary shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="pt-2 pb-0">
                    <span
                      className={`font-mono text-xs ${
                        item.active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.period}
                    </span>
                    <h4 className="text-lg font-bold text-foreground mt-1 mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact" className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block font-mono text-primary text-sm mb-6 tracking-widest">
              — OPEN TO WORK —
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Let's build the future<br />
              <span className="text-primary">together.</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed">
              I'm actively seeking roles as a Data Scientist or Machine Learning Engineer. If
              you're building systems that require rigorous thinking and precise execution — let's
              talk.
            </p>

            <div className="flex justify-center items-center gap-4 mb-16">
              <motion.a
                href="https://www.linkedin.com/in/syed-junaid-787427136"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-[0_0_24px_rgba(0,240,255,0.2)] hover:shadow-[0_0_32px_rgba(0,240,255,0.35)] transition-all"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/junaidhussain22"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/40 transition-all"
              >
                <Github className="w-5 h-5" />
                View GitHub
              </motion.a>
            </div>

            <div className="flex justify-center gap-5 mb-12">
              {[
                { href: "https://www.linkedin.com/in/syed-junaid-787427136", icon: <Linkedin className="w-5 h-5" /> },
                { href: "https://github.com/junaidhussain22", icon: <Github className="w-5 h-5" /> },
                { href: "mailto:syedjunaidhussain22@gmail.com", icon: <Mail className="w-5 h-5" /> },
              ].map(({ href, icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-3 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            <div className="text-xs font-mono text-muted-foreground/50">
              © {new Date().getFullYear()} Syed Junaid Hussain. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
