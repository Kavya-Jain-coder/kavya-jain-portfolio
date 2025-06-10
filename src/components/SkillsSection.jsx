import { useState } from "react";
import { cn } from "../lib/utils";

const skills = [
  // all
  {
    name: "Python",
    level: "90",
    category: "all",
  },
  {
    name: "Data Structures and Algorithms",
    level: "80",
    category: "all",
  },
  {
    name: "Pandas",
    level: "75",
    category: "all",
  },

  // Frontend
  {
    name: "HTML/CSS",
    level: "90",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    level: "75",
    category: "Frontend",
  },
  {
    name: "React",
    level: "75",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    level: "75",
    category: "Frontend",
  },
  {
    name: "Three.js",
    level: "50",
    category: "Frontend",
  },
  {
    name: "Next.js",
    level: "75",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    level: "50",
    category: "Frontend",
  },

  // Backend
  {
    name: "Node.js",
    level: "0",
    category: "Backend",
  },
  {
    name: "Express.js",
    level: "0",
    category: "Backend",
  },
  {
    name: "MongoDB",
    level: "0",
    category: "Backend",
  },
  {
    name: "MySQL",
    level: "0",
    category: "Backend",
  },

  // Tools
  {
    name: "Git/GitHub",
    level: "80",
    category: "Tools",
  },
  {
    name: "Figma",
    level: "75",
    category: "Tools",
  },
  {
    name: "VS Code",
    level: "95",
    category: "Tools",
  },
  {
    name: "Cursor",
    level: "90",
    category: "Tools",
  },
  {
    name: "Vensim",
    level: "80",
    category: "Tools",
  },
  {
    name: "Blender",
    level: "30",
    category: "Tools",
  },
  {
    name: "Prismic",
    level: "70",
    category: "Tools",
  },
  {
    name: "Scratch",
    level: "90",
    category: "Tools",
  },
];

const categories = ["all", "Frontend", "Backend", "Tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/3-">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full bg-primary origin-left animate-[grow_1.5s_ease-in-out]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
