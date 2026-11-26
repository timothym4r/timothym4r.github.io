import { Icons } from "@/components/icons";

// Portfolio content adapted from the extravagant_version site.
export const DATA = {
  name: "Timothy Pasaribu",
  initials: "TP",
  url: "https://timothym4r.github.io",
  location: "Toronto, Canada",
  locationLink: "https://www.google.com/maps/place/Toronto",
  description: "Data Scientist and AI Engineer working across LLM systems, experimentation, and applied machine learning.",
  summary: "I'm a Data Scientist and AI Engineer with research and industry experience in machine learning, NLP, analytics, and software engineering. At Plus Company, I work with marketing data and measurement. My research at the University of Toronto has explored language models, statistical methods, and how to evaluate them carefully. I have also built AI and ML workflows in education and financial services. I enjoy turning messy data and ambitious ideas into reliable, useful systems.",
  avatarUrl: "/images/main_profile_pic.jpg",
  ogImage: "/images/main_profile_pic.jpg",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Experience", presentLabel: "Present" },
    education: { order: 3, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 5, enabled: true, label: "Selected Work",
      heading: "Research, products, and data systems",
      text: "A selection of projects across NLP research, document intelligence, analytics, and software engineering.",
    },
    focus: { order: 6, enabled: true, heading: "Current Focus" },
    hackathons: { order: 7, enabled: false, label: "", heading: "", text: "" },
    photos: { order: 8, enabled: false, heading: "" },
  },
  focus: [
    { name: "LLM systems", description: "Designing retrieval, evaluation, and useful interfaces around language models." },
    { name: "Applied AI / ML", description: "Connecting research methods with practical tools and decisions in real workflows." },
    { name: "Data products", description: "Building dependable analytics and machine learning systems that people can use." },
  ],
  photos: [],
  skills: [
    { category: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "R"] },
    { category: "AI & machine learning", items: ["PyTorch", "scikit-learn", "Hugging Face Transformers", "Sentence Transformers", "XGBoost", "RAG"] },
    { category: "Data & analysis", items: ["pandas", "NumPy", "BigQuery", "Snowflake", "statsmodels", "SHAP"] },
    { category: "Software", items: ["React", "Next.js", "FastAPI", "Django REST Framework", "Prisma", "Docker"] },
    { category: "Cloud", items: ["AWS", "SageMaker", "ECS / EC2", "Google Cloud"] },
  ],
  navbar: [
    { href: "/#about", label: "About" },
    { href: "/#work", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#focus", label: "Focus" },
  ],
  contact: {
    email: "timothy.pasaribu@mail.utoronto.ca",
    social: {
      GitHub: { name: "GitHub", url: "https://github.com/timothym4r", icon: Icons.github, navbar: true },
      LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/timothy-pasaribu/", icon: Icons.linkedin, navbar: true },
      Email: { name: "Email", url: "mailto:timothy.pasaribu@mail.utoronto.ca", icon: Icons.email, navbar: true },
    },
  },
  work: [
    {
      company: "Plus Company", href: "https://pluscompany.com/en", badges: [],
      location: "Toronto, Canada", title: "Data Analyst", logoUrl: "/logos/plus-company.png",
      start: "Aug 2026", end: undefined,
      description: "Working in a marketing and advertising data environment with exposure to analytics workflows, data engineering practices, internal tooling, and AI-assisted productivity.",
    },
    {
      company: "University of Toronto", href: "https://www.utoronto.ca/", badges: [],
      location: "Toronto, Canada", title: "Data Science Researcher", logoUrl: "/logos/utoronto.ico",
      start: "May 2026", end: undefined,
      description: "Worked with Prof. Radu Craiu on statistical and data science research, strengthening statistical modeling and research workflows.",
    },
    {
      company: "University of Waterloo · AI Ed-platform", href: "https://uwaterloo.ca/", badges: [],
      location: "Waterloo, Canada", title: "Artificial Intelligence Engineer", logoUrl: "/logos/waterloo.svg",
      start: "Apr 2026", end: "Nov 2026",
      description: "Contributed to a user-facing AI education platform associated with Prof. Victor Cui's group, focused on answering student questions.",
    },
    {
      company: "University of Toronto · Moral Inference Project", href: "https://www.utoronto.ca/", badges: [],
      location: "Toronto, Canada", title: "NLP / Machine Learning Researcher", logoUrl: "/logos/utoronto.ico",
      start: "Jan 2025", end: "Apr 2026",
      description: "Researched computational moral character inference from dialogue with Aida Ramezani and Prof. Yang Xu. Explored transformer representations, sentence embeddings, dimensionality reduction, and evaluation across roughly 300,000 utterances.",
    },
    {
      company: "University of Toronto · STA130", href: "https://www.utoronto.ca/", badges: [],
      location: "Toronto, Canada", title: "Statistics Teaching Assistant", logoUrl: "/logos/utoronto.ico",
      start: "Sept 2024", end: "Dec 2025",
      description: "Led tutorials and office hours for introductory data science and statistical reasoning.",
    },
    {
      company: "Bank Negara Indonesia", href: "https://www.bni.co.id/", badges: [],
      location: "Indonesia", title: "Machine Learning Intern", logoUrl: "/logos/bni.svg",
      start: "May 2024", end: "Aug 2024",
      description: "Built applied NLP and ML workflows for transaction categorization, sentiment analysis, customer segmentation, and multilingual text processing using SQL, Streamlit, and AWS SageMaker.",
    },
  ],
  education: [
    {
      school: "University of Toronto", href: "https://www.utoronto.ca/",
      degree: "Data Science Specialist · Computer Science Major · Artificial Intelligence focus",
      logoUrl: "/logos/utoronto.ico", start: "2022", end: "2026",
    },
  ],
  projects: [
    {
      title: "MindMap", href: "https://github.com/UofT-CSC490-W2026/MindMap", dates: "Research platform", active: false,
      description: "An AI-assisted literature explorer that connects academic papers in an interactive graph, with semantic search, citation-aware retrieval, and RAG-powered questions.",
      technologies: ["Knowledge Graphs", "FastAPI", "Snowflake", "RAG"],
      links: [{ type: "Source", href: "https://github.com/UofT-CSC490-W2026/MindMap", icon: <Icons.github className="size-3" /> }],
      image: "/projects/mindmap.svg", video: "",
    },
    {
      title: "Indonesian ID Recognition", href: "https://github.com/timothym4r/Indonesian-ID-Recognition", dates: "Computer vision project", active: false,
      description: "Fine-tuned ResNet50 and VGG16 models to identify images of Indonesian government ID cards (KTP).",
      technologies: ["Computer Vision", "ResNet50", "VGG16"],
      links: [{ type: "Source", href: "https://github.com/timothym4r/Indonesian-ID-Recognition", icon: <Icons.github className="size-3" /> }],
      image: "/projects/id-recognition.svg", video: "",
    },
    {
      title: "Scriptorium", href: "https://github.com/elidle/scriptorium", dates: "Full-stack project", active: false,
      description: "A full-stack application exploring product architecture, authentication, databases, containerization, and cloud deployment.",
      technologies: ["Next.js", "Prisma", "Authentication", "Docker"],
      links: [{ type: "Source", href: "https://github.com/elidle/scriptorium", icon: <Icons.github className="size-3" /> }],
      image: "/projects/scriptorium.svg", video: "",
    },
    {
      title: "Politics, Corruption & FDI/GDP Growth",
      href: "https://timothym4r.github.io/Politics-and-Corruption-on-FDI-GDP-relation/",
      dates: "Economics and data science", active: false,
      description: "Studied how political stability and corruption affect the relationship between foreign investment and GDP growth across countries, using panel regression and interpretable machine learning.",
      technologies: ["Panel Regression", "XGBoost", "SHAP", "World Bank Data"],
      links: [
        { type: "Website", href: "https://timothym4r.github.io/Politics-and-Corruption-on-FDI-GDP-relation/", icon: <Icons.globe className="size-3" /> },
        { type: "Source", href: "https://github.com/timothym4r/Politics-and-Corruption-on-FDI-GDP-relation", icon: <Icons.github className="size-3" /> },
      ],
      image: "/projects/politics.svg", video: "",
    },
  ],
  hackathons: [],
} as const;
