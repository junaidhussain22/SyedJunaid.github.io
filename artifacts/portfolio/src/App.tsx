import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code2, Database, BrainCircuit, LineChart } from "lucide-react";
import { useRef } from "react";

const queryClient = new QueryClient();

const projects = [
  {
    title: "LLM from Scratch",
    description: "Built a large language model from scratch, implementing attention mechanisms, transformer architecture, and training pipeline end-to-end.",
    link: "https://github.com/junaidhussain22/LLM_from_scratch/blob/main/LLM_From_scratch_v2.ipynb",
    tags: ["Deep Learning", "Transformers", "NLP"],
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    title: "Target SQL Business Analysis",
    description: "Analyzed an extensive dataset using SQL and provided valuable insights into Target's operations in Brazil. Delivered actionable business recommendations.",
    link: "https://github.com/junaidhussain22/Target_using_SQL/blob/main/Business_Case_Target_SQL.pdf",
    tags: ["SQL", "Business Intelligence", "Data Analysis"],
    icon: <Database className="w-6 h-6" />
  },
  {
    title: "Netflix EDA & Recommendations",
    description: "Performed exploratory data analysis on the Netflix dataset using Python and its libraries to extract meaningful insights and provide implementable, profitable recommendations.",
    link: "https://github.com/junaidhussain22/Netflix_EDA/blob/main/Netflix_Case_Study.ipynb",
    tags: ["Python", "EDA", "Pandas", "Visualization"],
    icon: <LineChart className="w-6 h-6" />
  },
  {
    title: "Sentiment Analysis — Neural Networks",
    description: "Participated in an online coding competition to train a neural network on a sentiment analysis problem. Ranked in the top 10 by F1 Score among 80+ students.",
    link: "https://github.com/junaidhussain22/Sentiment_analysis_Neural_networks",
    tags: ["NLP", "Neural Networks", "Classification", "Competition"],
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    title: "Aerofit Descriptive Statistics",
    description: "Statistical analysis for Aerofit, a leading fitness equipment brand. Profiled customer segments for treadmill products to inform targeted marketing strategies.",
    link: "https://github.com/junaidhussain22/Aerofit_Descriptive_Statistics",
    tags: ["Statistics", "Python", "Customer Segmentation"],
    icon: <LineChart className="w-6 h-6" />
  },
  {
    title: "Walmart — Confidence Intervals & CLT",
    description: "Statistical analysis of Walmart's retail data applying Confidence Intervals and Central Limit Theorem to extract purchasing behavior insights across 100M+ customers.",
    link: "https://github.com/junaidhussain22/Walmart-_CI-and-CLT",
    tags: ["Statistics", "Hypothesis Testing", "Python"],
    icon: <Database className="w-6 h-6" />
  },
  {
    title: "Zee Recommender System",
    description: "Built a personalized movie recommendation system using collaborative filtering to show recommendations based on ratings from similar users, improving user experience.",
    link: "https://github.com/junaidhussain22/Zee_Recommender_Systems",
    tags: ["Recommender Systems", "Collabor filtering", "ML"],
    icon: <Code2 className="w-6 h-6" />
  }
];

const skills = [
  "Python", "SQL", "Machine Learning", "Deep Learning", "Neural Networks", 
  "NLP", "EDA", "Statistics", "Pandas", "NumPy", "Scikit-learn", 
  "TensorFlow/PyTorch", "Recommender Systems", "Data Visualization"
];

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary font-sans relative">
      
      {/* Decorative gradient orb */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Abstract neural network" 
            className="w-full h-full object-cover opacity-20 mask-image:linear-gradient(to_bottom,black,transparent)"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
        </div>
        
        <div className="z-10 w-full max-w-4xl mx-auto space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary border border-border text-sm font-mono text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Available for DS/ML Roles</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground glitch-effect" data-text="Syed Junaid Hussain">
              Syed Junaid Hussain
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mt-4 font-light">
              Data Scientist & <span className="text-primary font-medium">Machine Learning Engineer</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light border-l-2 border-primary/50 pl-4"
          >
            "From Data to Decisions: Crafting Intelligent Solutions with AI & ML"
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex items-center gap-4 pt-4"
          >
            <a href="https://github.com/junaidhussain22" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-md bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/syed-junaid-787427136" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-[1fr_2fr] gap-12 items-start"
          >
            <h3 className="text-3xl font-bold text-foreground font-mono">/ About</h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                I am a Data Scientist and Machine Learning Engineer driven by a singular focus: transforming complex, messy data into rigorous, actionable intelligence. I believe that the best models are not just accurate—they are interpretable, scalable, and deeply aligned with business objectives.
              </p>
              <p>
                My expertise spans the full machine learning lifecycle. From exploratory data analysis and statistical testing to designing neural networks and training large language models from scratch. I build systems that uncover hidden patterns and drive strategic decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-card/30 border-y border-border relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-foreground font-mono mb-12">/ Technical Arsenal</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="px-4 py-2 rounded-md bg-secondary border border-border text-sm font-mono text-primary/90 hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground font-mono mb-16 text-center"
          >
            / Selected Work
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative block p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-secondary rounded-lg text-primary">
                      {project.icon}
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-2 py-1 bg-secondary rounded text-muted-foreground group-hover:text-primary/80 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Background / Education Section */}
      <section className="py-24 px-6 bg-card/30 border-y border-border relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-foreground font-mono mb-12">/ Background</h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/50 bg-secondary text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Database className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-border bg-card shadow">
                  <div className="flex flex-col mb-2">
                    <span className="text-primary font-mono text-sm">Present</span>
                    <h4 className="text-lg font-bold text-foreground">Data Scientist & ML Engineer</h4>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    Continuously building out complex machine learning models, experimenting with LLMs from scratch, and refining data analytics techniques to extract actionable insights.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-secondary text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-border bg-card shadow">
                  <div className="flex flex-col mb-2">
                    <span className="text-muted-foreground font-mono text-sm">Foundation</span>
                    <h4 className="text-lg font-bold text-foreground">Academic & Technical Growth</h4>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    Developed a robust foundation in statistics, hypothesis testing, exploratory data analysis, and advanced neural networks through rigorous academic and competitive programming challenges.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-24 px-6 bg-card border-t border-border relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-6">Let's build the future together.</h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg font-light">
              I am actively seeking roles as a Data Scientist or Machine Learning Engineer. If you're building systems that require rigorous thinking and precise execution, let's talk.
            </p>
            
            <div className="flex justify-center items-center gap-6">
              <a href="https://www.linkedin.com/in/syed-junaid-787427136" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-secondary border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/junaidhussain22" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-secondary border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:syedjunaidhussain22@gmail.com" className="p-4 rounded-full bg-secondary border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <div className="mt-16 text-sm font-mono text-muted-foreground">
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
