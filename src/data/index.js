import {
  algorithms,
  cncMountainRelief,
  cncWoodRelief,
  devnotes,
  gameModels,
  gamePropSet,
  oscs,
  printCollectibleFigure,
  printFunctionalParts,
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Home",
  },
  {
    id: "portfolio",
    title: "Work",
  },
  {
    id: "experience",
    title: "Services",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "3D Designer",
    company_name: "Ivan Lovo",
    date: "Current",
    icon: "model",
    label: "3D Designer",
    headline: "From concept to perfection.",
    summary:
      "I transform ideas into precise 3D models ready for real-world manufacturing, presentation, and production planning.",
    visual: algorithms,
    visualAlt: "Exploded technical 3D model with digital blueprint lines",
    annotationTop: "Tolerance +/- 0.02 mm",
    annotationBottom: "Ready for production",
    highlights: [
      {
        title: "Precise Modeling",
        body: "High-accuracy models for products, parts, prototypes, and custom projects.",
      },
      {
        title: "Clear & Functional",
        body: "Balanced form, function, and proportions with manufacturing constraints in mind.",
      },
      {
        title: "Production Ready",
        body: "Clean geometry, correct scale, and organized deliverables for fabrication.",
      },
    ],
    details: [
      "Create precise <span style='color: white;'>3D models</span> for products, parts, prototypes, and custom fabrication projects.",
      "Translate ideas, references, and measurements into clean digital geometry ready for review and production.",
      "Balance form, function, proportions, and fabrication constraints from the first concept to the final file.",
    ],
  },
  {
    title: "3D Print Design",
    company_name: "Print-Ready Files",
    date: "Current",
    icon: "print",
    label: "3D Print Design",
    headline: "Print-ready from the start.",
    summary:
      "I create watertight models with practical wall thickness, clean surfaces, and details prepared for FDM or resin workflows.",
    visual: oscs,
    visualAlt: "3D printed mechanical parts and enclosures",
    annotationTop: "Watertight mesh",
    annotationBottom: "Slicing ready",
    highlights: [
      {
        title: "Print-Ready Files",
        body: "Watertight models checked for scale, wall thickness, and clean surfaces.",
      },
      {
        title: "Functional Parts",
        body: "Practical tolerances for assemblies, prototypes, enclosures, and custom parts.",
      },
      {
        title: "Clean Handoff",
        body: "Organized files prepared for slicing, review, testing, or iteration.",
      },
    ],
    details: [
      "Prepare <span style='color: white;'>watertight, print-ready models</span> for FDM, resin, and prototype workflows.",
      "Optimize parts for wall thickness, orientation, tolerances, assembly, and clean surface quality.",
      "Deliver practical 3D files that are organized, checked, and ready for slicing or manufacturing review.",
    ],
  },
  {
    title: "CNC Design",
    company_name: "CNC-Ready Geometry",
    date: "Current",
    icon: "cnc",
    label: "CNC Design",
    headline: "Machining-aware geometry.",
    summary:
      "I design CNC-ready reliefs, panels, molds, signage, and custom geometry with material, tooling, and finishing in mind.",
    visual: devnotes,
    visualAlt: "CNC machining a carved wooden relief",
    annotationTop: "Toolpath aware",
    annotationBottom: "CNC-ready geometry",
    highlights: [
      {
        title: "CNC-Ready Forms",
        body: "Geometry shaped around tool access, material behavior, and machining limits.",
      },
      {
        title: "Reliefs & Panels",
        body: "Detailed surfaces for decorative panels, molds, signage, and custom fabrication.",
      },
      {
        title: "Production Handoff",
        body: "Clear models prepared for CNC review, CAM planning, and shop communication.",
      },
    ],
    details: [
      "Design <span style='color: white;'>CNC-friendly models</span>, reliefs, panels, molds, signage, and custom fabrication assets.",
      "Shape geometry with material behavior, machining limits, tool access, and clean finishing in mind.",
      "Prepare designs for a smoother handoff from visual concept to CNC production workflow.",
    ],
  },
  {
    title: "Character Design",
    company_name: "Game & Print Characters",
    date: "Current",
    icon: "character",
    label: "Character Design",
    headline: "Characters with style and purpose.",
    summary:
      "I design stylized characters, creatures, and mascot-style assets for games, collectible figures, 3D printing, and visual storytelling.",
    visual: algorithms,
    visualAlt: "Stylized technical 3D asset with game-ready details",
    annotationTop: "Stylized silhouette",
    annotationBottom: "Game and print ready",
    highlights: [
      {
        title: "Strong Silhouette",
        body: "Readable character shapes with personality, gesture, and memorable proportions.",
      },
      {
        title: "Stylized Detail",
        body: "Clean forms and expressive details suited for games, figures, and presentation.",
      },
      {
        title: "Production Minded",
        body: "Characters modeled with topology, scale, and fabrication needs in mind.",
      },
    ],
    details: [
      "Create <span style='color: white;'>stylized characters</span>, creatures, and mascot-style assets for games, figures, and visual projects.",
      "Focus on strong silhouettes, appealing proportions, expressive forms, and clear design language.",
      "Prepare character models for presentation, game asset workflows, 3D printing, or further production development.",
    ],
  },
];

const portfolio = [
  {
    slides: [
      {
        name: "Game Character Model",
        accentWord: "Character",
        description:
          "I create stylized character assets for video games with readable silhouettes, clean surfaces, and production-minded forms ready for interactive worlds.",
        tags: ["Game-ready character", "Stylized 3D design", "Readable silhouette"],
        category: "CHARACTER MODEL",
        type: "GAME ASSET",
        stats: [
          { value: "50+", label: "3D Assets Delivered" },
          { value: "100%", label: "Game-ready Workflow" },
          { value: "PBR", label: "Optimized for Real-time" },
        ],
        specs: [
          { label: "Polycount", value: "128,450" },
          { label: "Triangles", value: "256,900" },
          { label: "Texture Sets", value: "4K PBR" },
        ],
        src: gameModels,
        alt: "Stylized game-ready 3D character model showcase",
      },
      {
        name: "Sci-Fi Device Prop",
        accentWord: "Prop",
        description:
          "I model hard-surface props with clean paneling, bevels, and material separation for real-time game presentation and technical review.",
        tags: ["Hard-surface prop", "Clean topology", "Realtime materials"],
        category: "SCIFI DEVICE",
        type: "PROP ASSET",
        stats: [
          { value: "Modular", label: "Asset Workflow" },
          { value: "4K", label: "Texture-ready" },
          { value: "Low-poly", label: "Optimized Mesh" },
        ],
        specs: [
          { label: "Mesh Type", value: "Game-ready" },
          { label: "Detail Level", value: "High" },
          { label: "Output", value: "FBX/OBJ" },
        ],
        src: algorithms,
        alt: "Exploded sci-fi hard-surface game prop model",
      },
      {
        name: "Modular Game Prop Set",
        accentWord: "Game",
        description:
          "I build modular props and environment assets designed to feel cohesive, readable, and ready for game art pipelines.",
        tags: ["Modular props", "Environment assets", "Neon sci-fi style"],
        category: "MODULAR PROPS",
        type: "ENVIRONMENT SET",
        stats: [
          { value: "Set", label: "Cohesive Assets" },
          { value: "PBR", label: "Material Pass" },
          { value: "Game", label: "Engine-ready" },
        ],
        specs: [
          { label: "Pieces", value: "6" },
          { label: "Style", value: "Sci-fi" },
          { label: "Workflow", value: "Realtime" },
        ],
        src: gamePropSet,
        alt: "Modular sci-fi game prop set showcase",
      },
      {
        name: "Functional Print Parts",
        accentWord: "Print",
        description:
          "I design functional 3D printed parts with tolerances, wall thickness, and geometry prepared for real-world testing.",
        tags: ["Functional prototypes", "Toleranced parts", "FDM ready"],
        category: "FUNCTIONAL PARTS",
        type: "3D PRINT",
        stats: [
          { value: "1:1", label: "Scale Control" },
          { value: "FDM", label: "Filament Ready" },
          { value: "Clean", label: "Watertight Files" },
        ],
        specs: [
          { label: "Wall Checks", value: "Ready" },
          { label: "Scale", value: "1:1" },
          { label: "Output", value: "STL/OBJ" },
        ],
        src: printFunctionalParts,
        alt: "Functional 3D printed prototype parts",
      },
      {
        name: "Print-Ready Enclosures",
        accentWord: "Enclosures",
        description:
          "I prepare enclosures, brackets, and mechanical components as clean printable files with practical assembly details.",
        tags: ["Product enclosures", "Assembly details", "Print-ready files"],
        category: "ENCLOSURES",
        type: "PROTOTYPE",
        stats: [
          { value: "Watertight", label: "Mesh Checks" },
          { value: "FDM+Resin", label: "Print Workflow" },
          { value: "Assembly", label: "Fit Planning" },
        ],
        specs: [
          { label: "Process", value: "FDM/Resin" },
          { label: "Detail", value: "Functional" },
          { label: "Output", value: "STL" },
        ],
        src: oscs,
        alt: "3D printed enclosures and mechanical parts",
      },
      {
        name: "Collectible Figure Model",
        accentWord: "Figure",
        description:
          "I sculpt stylized collectible figures with separated parts, keyed joints, and surface details prepared for resin printing.",
        tags: ["Collectible sculpt", "Keyed parts", "Resin ready"],
        category: "COLLECTIBLE",
        type: "FIGURE MODEL",
        stats: [
          { value: "Parts", label: "Keyed Assembly" },
          { value: "Resin", label: "Fine Detail" },
          { value: "Ready", label: "Support Planning" },
        ],
        specs: [
          { label: "Surface", value: "Smooth" },
          { label: "Assembly", value: "Keyed" },
          { label: "Output", value: "STL" },
        ],
        src: printCollectibleFigure,
        alt: "3D print-ready collectible creature figure parts",
      },
      {
        name: "CNC Wood Relief Panel",
        accentWord: "Relief",
        description:
          "I design CNC relief geometry with smooth toolpath-friendly surfaces, clean bevels, and production-aware depth transitions.",
        tags: ["CNC-ready geometry", "Relief panel", "Toolpath aware"],
        category: "CNC RELIEF",
        type: "MACHINING",
        stats: [
          { value: "CAM", label: "Toolpath Aware" },
          { value: "2.5D", label: "Relief Design" },
          { value: "CNC", label: "Production Handoff" },
        ],
        specs: [
          { label: "Tool Access", value: "Checked" },
          { label: "Material", value: "Wood" },
          { label: "Output", value: "CNC-ready" },
        ],
        src: cncWoodRelief,
        alt: "Finished carved wooden CNC relief panel",
      },
      {
        name: "CNC Mountain Wall Art",
        accentWord: "Mountain",
        description:
          "I create carved wall panels and dimensional artwork with layered depths, smooth transitions, and material-conscious finishing.",
        tags: ["Wood wall art", "Layered relief", "CNC finishing"],
        category: "WOOD PANEL",
        type: "WALL ART",
        stats: [
          { value: "Walnut", label: "Material Finish" },
          { value: "Layered", label: "Depth Control" },
          { value: "CNC", label: "Clean Contours" },
        ],
        specs: [
          { label: "Finish", value: "Satin" },
          { label: "Depth", value: "Layered" },
          { label: "Material", value: "Walnut" },
        ],
        src: cncMountainRelief,
        alt: "CNC carved mountain relief wall art",
      },
      {
        name: "CNC Machining Setup",
        accentWord: "Machining",
        description:
          "I prepare CNC-ready models for machining workflows with material limits, cutter access, and production handoff in mind.",
        tags: ["Machining workflow", "Material constraints", "Production review"],
        category: "CNC MACHINING",
        type: "WORKFLOW",
        stats: [
          { value: "CAM", label: "Review-ready" },
          { value: "Tooling", label: "Access Checked" },
          { value: "Files", label: "Shop Handoff" },
        ],
        specs: [
          { label: "Setup", value: "CNC" },
          { label: "Material", value: "Wood/Plastic" },
          { label: "Output", value: "CAM review" },
        ],
        src: devnotes,
        alt: "CNC machining a carved wooden relief",
      },
    ],
  },
];

export { experiences, portfolio };

