import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Côte Royale Paris",
    description:
      "A refined, modern fragrance brand site showcasing three signature perfumes—Ignis (fiery and bold), Aqua (fresh and aquatic), and Terra (earthy and grounded), with sleek visuals and elegant layouts.",
    image: "/projects/cote-royale.png",
    tags: ["React", "TailwindCss", "TypeScript", "Prismic", "HTML", "CSS"],
    demoUrl: "https://cote-royale-website.vercel.app",
    githubUrl: "https://github.com/Kavya-Jain-coder/cote-royale-website.git",
  },
  {
    id: 2,
    title: "GTA-VI",
    description:
      "A sleek, official-style landing page for Grand Theft Auto VI, featuring a dramatic hero banner, sections for the game’s story, latest trailer, gameplay reveals, and release date details. ",
    image: "/projects/gta-vi.png",
    tags: ["React", "TailwindCss", "JavaScript", "HTML", "CSS"],
    demoUrl: "https://gta-vi-website-nu.vercel.app",
    githubUrl: "https://github.com/Kavya-Jain-coder/GTA-VI-Website.git",
  },
  {
    id: 3,
    title: "Kavya Jain | Portfolio",
    description:
      "Welcome to my dynamic portfolio website — thoughtfully designed to reflect both creativity and professionalism. With support for light and dark modes, the experience is as adaptable as it is elegant.",
    image: "/projects/KavyaJain-Portfolio.png",
    tags: ["React", "TailwindCss", "JavaScript", "HTML", "CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/Kavya-Jain-coder/kavya-jain-portfolio.git",
  },
  {
    id: 4,
    title: "Solar System",
    description:
      "Step into the cosmos with our immersive 3D Solar System website, powered by Three.js. This interactive experience lets users journey through a fully-rendered solar system featuring realistic textures of the Sun, planets, and moons. Rotate, zoom, and explore the planets in real-time.",
    image: "/projects/solar-system.png",
    tags: ["Three.js", "JavaScript", "HTML", "CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/Kavya-Jain-coder/solar-system.git",
  },
  {
    id: 5,
    title: "Popcorn Pilot",
    description:
      "Whether you're hunting for your next movie night pick or just browsing what’s hot, PopcornPilot makes it effortless. Instantly view the Top 5 trending movies based on what's buzzing right now, and explore a massive library of thousands of titles using our smart and lightning-fast search feature.",
    image: "/projects/popcorn-pilot.png",
    tags: ["React", "TailwindCss", "JavaScript", "HTML", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Squid Game",
    description:
      "This Squid Game-themed website is a fan-made landing page inspired by the popular Netflix series. It features bold visuals, character highlights, and dramatic styling that capture the dark and suspenseful tone of the show. The layout is clean and responsive, making it ideal for showcasing themed content.",
    image: "/projects/SquidGame.png",
    tags: ["HTML", "CSS"],
    demoUrl: "https://squid-game-lovat.vercel.app",
    githubUrl: "https://github.com/Kavya-Jain-coder/squid-game.git",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here's a collection of my recent work—each project represents not just
          my skills, but also my creativity, attention to detail, and passion
          for building meaningful digital experiences that are both visually
          appealing and technically strong.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg shadow-xs overflow-hidden card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={key}
                      className="px-2 py-1 font-medium rounded-full bg-primary border text-primary-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 ">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


          <div className="text-center mt-12">
            <a href="https://github.com/Kavya-Jain-coder" target="_blank" className="cosmic-button w-fit flex items-center mx-auto gap-2">
                Check My Github <ArrowRight size={16}/>
            </a>
          </div>

      </div>
    </section>
  );
};
