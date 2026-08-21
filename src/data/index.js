import {
  algorithms,
  devnotes,
  oscs,
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
    details: [
      "Design <span style='color: white;'>CNC-friendly models</span>, reliefs, panels, molds, signage, and custom fabrication assets.",
      "Shape geometry with material behavior, machining limits, tool access, and clean finishing in mind.",
      "Prepare designs for a smoother handoff from visual concept to CNC production workflow.",
    ],
  },
  {
    title: "Digital Fabrication",
    company_name: "3D Print & CNC",
    date: "Current",
    details: [
      "Support projects from <span style='color: white;'>concept to fabrication-ready output</span> with clear file structure and practical deliverables.",
      "Work with references, dimensions, physical constraints, and end-use requirements to make useful 3D assets.",
      "Provide final files for prototyping, presentation, print preparation, or CNC production depending on the project.",
    ],
  },
];

const portfolio = [
  {
    name: "3D Print Ready Models",
    description:
      "Custom parts, product concepts, prototypes, and functional objects prepared as clean 3D files for additive manufacturing.",
    image: oscs,
  },
  {
    name: "CNC Design Files",
    description:
      "CNC-ready forms, reliefs, panels, molds, and decorative or functional geometry designed with fabrication constraints in mind.",
    image: devnotes,
  },
  {
    name: "Prototype Visualization",
    description:
      "Clear 3D concepts and presentation-ready visuals that help evaluate shape, scale, assembly, and manufacturing direction.",
    image: algorithms,
  },
];

export { experiences, portfolio };

