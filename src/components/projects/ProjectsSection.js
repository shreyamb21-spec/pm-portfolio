import { useRef } from "react";
import { C } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectTimeline from "./ProjectTimeline";
import useIsMobile from "../../hooks/useIsMobile";
import projects from "../../data/projects";

const ProjectsSection = () => {
  const cardRefs = useRef([]);
  const isMobile = useIsMobile();

  return (
    <section id="projects" style={{ padding: "6rem 2rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="Projects" />
          <SectionTitle>Things I've launched</SectionTitle>
        </FadeIn>

        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {!isMobile && <ProjectTimeline projects={projects} cardRefs={cardRefs} />}

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <div ref={(el) => (cardRefs.current[i] = el)}>
                  <ProjectCard p={p} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
