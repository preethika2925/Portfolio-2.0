import { ProfileData, Project, SkillCategory, JourneyMilestone, EyeConfig } from '@/types/portfolio';

export const eyeConfig: EyeConfig = {
  // Configured precisely from facial landmark detection on the 800x800 portrait
  eyeFocusX: 47.0, // Eye center focus percentage
  eyeFocusY: 44.0, // Eye elevation percentage
  eyeZoom: 4.8,    // Cinematic aperture zoom scale
  heroObjectPosition: '50% 36%',
  portraitPath: '/images/preethika-portrait.png',
};

export const profileData: ProfileData = {
  name: 'Preethika Suresh',
  preferredName: 'Preethika',
  title: 'Electronics & Communication Engineering Student',
  degree: 'B.E. Electronics and Communication Engineering',
  institution: 'Kalaignar Karunanidhi Institute of Technology',
  graduationYear: '2029',
  bioHeadline: 'Curious by nature.\nAn engineer in progress.\nA builder by choice.',
  bioParagraph1:
    'I am Preethika Suresh, an Electronics and Communication Engineering student at Kalaignar Karunanidhi Institute of Technology. I am driven by the urge to build practical digital experiences that bridge software systems, intelligent computation, and real-world engineering.',
  bioParagraph2:
    'My exploration spans web technologies, algorithm architecture, embedded controllers, IoT protocols, and location-aware agricultural solutions. I believe true engineering happens when deep hardware awareness empowers thoughtful software design.',
  email: 'preethikasuresh25@gmail.com',
  github: 'https://github.com/preethika2925',
  linkedin: 'https://linkedin.com/in/preethika-suresh-a13aab37b',
  location: 'Coimbatore, Tamil Nadu, India',
};

export const projectsData: Project[] = [
  {
    id: 'agriguide',
    number: '01',
    title: 'AgriGuide',
    category: 'Agriculture Technology',
    status: 'Concept & Architecture',
    tagline: 'Location-aware agricultural advisory platform for grassroots farming communities.',
    description:
      'A location-aware agriculture information concept designed to help farmers access actionable crop guidance, hyper-local meteorological feeds, and spatial farm services in their native context.',
    features: [
      'Interactive geospatial farm mapping and GPS coordinates tracking',
      'Hyper-local weather telemetry and atmospheric forecast modeling',
      'Crop season advisory system with soil-specific recommendations',
      'Voice-assisted hands-free advisory interface for field conditions',
      'Farmer knowledge submission and localized crop ailment reporting',
    ],
    technologies: ['React', 'Next.js', 'PostGIS', 'OpenWeather API', 'Web Speech API', 'Tailwind CSS'],
    problemStatement:
      'Smallholder farmers frequently face crop yield reduction due to generic, non-localized advisory data and complex digital interfaces unsuitable for field conditions.',
    solutionArchitecture:
      'Combines geolocation telemetry with open weather feeds and spatial querying to deliver instant, voice-enabled agronomic advisories directly to rural devices.',
    visualTheme: 'green',
  },
  {
    id: 'agrigate',
    number: '02',
    title: 'AgriGate',
    category: 'Agriculture Technology',
    status: 'Concept & Architecture',
    tagline: 'Ecosystem connecting sustainable crop selection with verified buyer networks.',
    description:
      'An agriculture-focused concept exploring crop selection, market opportunities, cultivation guidance, and transparent connections between farmers and commercial buyers.',
    features: [
      'Harvest and rainfall-related yield estimation models',
      'Catalog of high-demand, organic, and medicinal crop opportunities',
      'Step-by-step ecological cultivation guidelines and pest remedies',
      'Direct farm-to-buyer transaction channels eliminating intermediary friction',
      'Soil nutrient preservation and certified organic practices guidance',
    ],
    technologies: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
    problemStatement:
      'Farmers lack transparency into crop market demand cycles before planting, forcing reliance on middlemen who extract the majority of supply-chain value.',
    solutionArchitecture:
      'A transparent market-intelligence matrix matching regional cultivation viability with current buyer contracts, backed by verified agricultural taxonomies.',
    visualTheme: 'emerald',
  },
  {
    id: 'dynamic-contact-book',
    number: '03',
    title: 'Dynamic Contact Book',
    category: 'Software Development',
    status: 'Implemented Software',
    tagline: 'High-performance contact management utility with dynamic data indexing.',
    description:
      'A contact-management software project focused on organizing, filtering, and persisting complex contact records with instantaneous search and relationship categorization.',
    features: [
      'Dynamic hash-indexed contact search and multi-parameter filtering',
      'Custom tagging, company grouping, and hierarchy relationships',
      'Persistent data structures with export and backup capabilities',
      'Clean keyboard-driven UI designed for high-efficiency data entry',
    ],
    technologies: ['C++', 'Data Structures', 'File I/O Streams', 'Object-Oriented Design'],
    githubUrl: 'https://github.com/preethika2925',
    problemStatement:
      'Traditional contact storage scripts suffer from linear search overhead and clumsy manual serialization when managing hundreds of hierarchical entries.',
    solutionArchitecture:
      'Built around associative memory structures with optimized record hashing and structured file persistence, achieving O(1) lookups.',
    visualTheme: 'blue',
  },
  {
    id: 'corporate-hierarchy-manager',
    number: '04',
    title: 'Corporate Employee Hierarchy System',
    category: 'Software Development',
    status: 'Implemented Software',
    tagline: 'Tree-based organizational model for enterprise reporting structures.',
    description:
      'A software engineering project focused on representing, traversing, and dynamically restructuring multi-tier enterprise personnel hierarchies.',
    features: [
      'N-ary hierarchical tree representation of departmental organizations',
      'Dynamic role reassignment, promotions, and subtree rebalancing',
      'Fast depth-first and breadth-first organizational reporting chain queries',
      'Compensation roll-up and departmental head count calculation',
    ],
    technologies: ['C++', 'Tree Data Structures', 'Recursion Algorithms', 'CLI Interface'],
    githubUrl: 'https://github.com/preethika2925',
    problemStatement:
      'Modeling enterprise organizations with relational flat tables requires expensive recursive joins; tree structures provide natural modeling of reporting chains.',
    solutionArchitecture:
      'Employs node-pointer tree representations with parent-child back-links, enabling instant LCA (Lowest Common Ancestor) manager queries.',
    visualTheme: 'purple',
  },
  {
    id: 'plant-watering-iot',
    number: '05',
    title: 'Automatic Plant Watering System',
    category: 'Embedded Systems / IoT',
    status: 'Hardware Engineering Concept',
    tagline: 'Autonomous closed-loop soil moisture regulation and hydration controller.',
    description:
      'An engineering project concept involving automated plant watering via analog sensor feedback loops, duty-cycle pump control, and threshold hysteresis.',
    features: [
      'Capacitive soil moisture sensing to prevent sensor oxidation',
      'Analog-to-Digital sensor telemetry conversion and calibration curves',
      'Hysteresis-protected micro-pump actuation to eliminate short-cycling',
      'Power-efficient sleep duty cycles for solar-backed operation',
    ],
    technologies: ['Embedded C', 'Microcontroller Logic', 'Sensor Telemetry', 'MOSFET Switching'],
    problemStatement:
      'Timer-based irrigation either floods or parches soil; true water conservation requires closed-loop feedback from direct soil moisture metrics.',
    solutionArchitecture:
      'Microcontroller senses capacitive impedance thresholds, commanding a low-resistance N-channel MOSFET gate to drive irrigation pumps only when required.',
    visualTheme: 'amber',
  },
  {
    id: 'fault-isolation-assistant',
    number: '06',
    title: 'Autonomous Fault Isolation Assistant',
    category: 'Electronics / Automation',
    status: 'Concept & Architecture',
    tagline: 'Diagnostic automation model for rapid electrical continuity and signal fault isolation.',
    description:
      'An electronics and automation concept focused on scanning interconnected circuit topologies, detecting unexpected impedances, and pinpointing isolation boundaries.',
    features: [
      'Automated netlist continuity verification and short-circuit isolation',
      'Dynamic threshold comparison across multi-node test points',
      'Structured error tree output localizing component-level abnormalities',
      'Fail-safe testing protocols to prevent secondary component damage',
    ],
    technologies: ['Digital Electronics', 'Circuit Theory', 'Logic Gates', 'Automation Flowcharts'],
    problemStatement:
      'Manual multi-layer PCB debug consumes hours of engineering time with probes; automated nodal comparison rapidly isolates ground shorts and open traces.',
    solutionArchitecture:
      'Algorithmic decision tree traversing high-impedance test points in sequence, comparing real values against reference netlist baselines.',
    visualTheme: 'purple',
  },
  {
    id: 'course-prerequisite-graph',
    number: '07',
    title: 'Course Prerequisite System',
    category: 'Programming / Data Structures',
    status: 'Data Structure Implementation',
    tagline: 'Directed acyclic graph engine for curriculum sequencing and validation.',
    description:
      'A software concept representing academic course prerequisites as a Directed Acyclic Graph (DAG) with topological sorting to ensure valid graduation pathways.',
    features: [
      'Topological sort algorithms generating conflict-free semester schedules',
      'Cycle detection preventing contradictory prerequisite loops',
      'Transitive dependency calculation for academic requirement audits',
      'Credit weight and semester capacity constraint validation',
    ],
    technologies: ['C++', 'Graph Theory', 'Topological Sort', 'Cycle Detection (DFS)'],
    problemStatement:
      'Degree requirements have complex multi-level prerequisites; cyclic dependencies or misordered enrollment leads to delayed graduation.',
    solutionArchitecture:
      'Represents academic catalog as adjacency lists; uses Kahn’s algorithm and Depth-First Search for cycle detection and semester schedule ordering.',
    visualTheme: 'blue',
  },
  {
    id: 'expression-tree-calculator',
    number: '08',
    title: 'Expression Tree Calculator',
    category: 'Programming / Data Structures',
    status: 'Data Structure Implementation',
    tagline: 'Syntax parser and binary expression tree evaluator with operator precedence.',
    description:
      'A computer science programming project converting infix mathematical expressions into binary syntax trees for recursive arithmetic evaluation.',
    features: [
      'Infix to Postfix conversion via Dijkstra’s Shunting-yard algorithm',
      'Binary syntax tree construction with operator precedence rules',
      'Recursive tree traversal (Inorder, Preorder, Postorder output)',
      'Sub-expression simplification and division-by-zero error handling',
    ],
    technologies: ['C++', 'Binary Expression Trees', 'Stacks', 'Recursion'],
    problemStatement:
      'Standard string evaluation fails to preserve mathematical operator precedence; binary syntax trees cleanly isolate operands and operators.',
    solutionArchitecture:
      'Parses tokens with a stack-based shunting yard engine, constructing a binary tree where leaf nodes store operands and internal nodes hold operators.',
    visualTheme: 'emerald',
  },
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming',
    description: 'Core languages powering algorithms, systems programming, and high-performance computation.',
    skills: [
      { name: 'C', description: 'Systems programming, memory management, pointers, and embedded foundations.', category: 'Programming', highlight: true },
      { name: 'C++', description: 'Object-oriented architecture, STL containers, and complex data structures.', category: 'Programming', highlight: true },
      { name: 'Python', description: 'Scripting, algorithmic exploration, and data processing automation.', category: 'Programming', highlight: true },
      { name: 'Java', description: 'Object-oriented programming, class design, and enterprise foundations.', category: 'Programming' },
    ],
  },
  {
    title: 'Web Development',
    description: 'Modern frontend interfaces, component frameworks, and responsive web systems.',
    skills: [
      { name: 'HTML5', description: 'Semantic document structure, web standards, and accessibility markup.', category: 'Web Development' },
      { name: 'CSS3', description: 'Modern layout systems (Flexbox, Grid), CSS variables, and keyframe motion.', category: 'Web Development' },
      { name: 'JavaScript (ES6+)', description: 'Asynchronous event loops, DOM APIs, and dynamic interactive logic.', category: 'Web Development', highlight: true },
      { name: 'React', description: 'Component lifecycle, hooks, state management, and virtual DOM paradigms.', category: 'Web Development', highlight: true },
      { name: 'Next.js', description: 'Server-side rendering, App Router, asset optimization, and full-stack API routes.', category: 'Web Development', highlight: true },
      { name: 'Tailwind CSS', description: 'Utility-first styling, responsive tokens, and bespoke design systems.', category: 'Web Development', highlight: true },
    ],
  },
  {
    title: 'Database & Backend',
    description: 'Relational data modeling, spatial queries, and backend communication.',
    skills: [
      { name: 'Supabase', description: 'Backend-as-a-Service, real-time database subscriptions, and auth management.', category: 'Database & Backend', highlight: true },
      { name: 'PostgreSQL', description: 'Relational database schema design, indexing, and complex SQL querying.', category: 'Database & Backend', highlight: true },
      { name: 'PostGIS', description: 'Spatial data types, geographic distance queries, and location telemetry.', category: 'Database & Backend' },
      { name: 'API Integration', description: 'RESTful architectures, fetch pipelines, JSON handling, and asynchronous data sync.', category: 'Database & Backend' },
    ],
  },
  {
    title: 'Electronics & Engineering',
    description: 'Hardware foundations, circuit analysis, and embedded automation systems.',
    skills: [
      { name: 'Digital Electronics', description: 'Boolean algebra, logic gates, flip-flops, registers, and timing diagrams.', category: 'Electronics & Engineering', highlight: true },
      { name: 'Data Structures', description: 'Graphs, trees, heaps, hash tables, and algorithm complexity analysis.', category: 'Electronics & Engineering', highlight: true },
      { name: 'MOSFETs & Amplifiers', description: 'Small-signal analysis, switching characteristics, and analog circuits.', category: 'Electronics & Engineering' },
      { name: 'Embedded Systems', description: 'Microcontroller architecture, GPIO interrupts, I2C/SPI, and firmware loops.', category: 'Electronics & Engineering', highlight: true },
      { name: 'IoT Concepts', description: 'Sensor telemetry, telemetry pipelines, and edge device coordination.', category: 'Electronics & Engineering' },
      { name: 'ANSYS', description: 'Engineering simulation software for electromagnetic and physical analysis.', category: 'Electronics & Engineering' },
    ],
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    period: '2025 — 2029',
    title: 'B.E. Electronics & Communication Engineering',
    institution: 'Kalaignar Karunanidhi Institute of Technology',
    type: 'Education',
    status: 'In Progress',
    details:
      'Pursuing comprehensive undergraduate training covering digital signal processing, embedded systems, analog communications, integrated circuits, and computational logic.',
  },
  {
    period: 'May 2026',
    title: 'Data Structures in C++',
    institution: 'Technical Certification Track',
    type: 'Certification',
    status: 'Completed',
    verifiedDate: 'May 2026',
    details:
      'Rigorous mastery of linear and non-linear data structures, algorithmic complexity (Big-O), tree traversals, and dynamic memory architectures in C++.',
  },
  {
    period: 'Professional Activity',
    title: 'Master Data Management in TCS',
    institution: 'Tata Consultancy Services Program',
    type: 'Professional Learning',
    status: 'Completed',
    details:
      'Deep dive into corporate data governance, master data consolidation, validation rules, and enterprise data hygiene standards.',
  },
  {
    period: 'Technical Training',
    title: 'Microsoft 365 Copilot AI',
    institution: 'Microsoft Learning Pathway',
    type: 'Professional Learning',
    status: 'Completed',
    details:
      'Exploration of generative AI integration, enterprise productivity pipelines, and intelligent assistant workflows.',
  },
  {
    period: 'Technical Qualification',
    title: 'Field Technician – Computing & Peripherals',
    institution: 'Electronics Sector Skills Council',
    type: 'Technical Training',
    status: 'In Progress',
    details:
      'Hands-on diagnostic hardware skills, peripheral interfacing, hardware maintenance, circuit board inspection, and troubleshooting.',
  },
];
