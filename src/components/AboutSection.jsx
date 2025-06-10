import { Briefcase, Code, User } from "lucide-react";
export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative ">
      <div className="container mx-auto max-w-5xl ">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Passionate Web Developer</h3>

            <p className="text-muted-foreground text-balance">
              I'm a college student exploring web development with a strong
              interest in front-end technologies. I love creating modern,
              performance-oriented websites and constantly improving my skills.
            </p>

            <p className="text-muted-foreground text-balance">
              With a strong interest in front-end development, I focus on
              building clean and responsive designs while actively learning new
              tools and frameworks to enhance my skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="/projects/kavyajain-resume.pdf" target="_blank"
                className="py-2 px-6 border border-primary rounded-full text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4 ">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Develpment</h4>
                  <p className="text-muted-foreground  text-balance">
                    Creating responsive websites and web applications with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4 ">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground  text-balance">
                    Designing intiutive user interfaces and seamless
                    experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4 ">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Learning Agile Practices
                  </h4>
                  <p className="text-muted-foreground text-balance">
                    Exploring agile methodologies through personal and academic projects to improve team collaboration and productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
