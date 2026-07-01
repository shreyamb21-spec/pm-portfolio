import { C } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import ExpCard from "./ExpCard";
import experience from "../../data/experience";

const ExperienceSection = () => (
  <section id="experience" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Experience" /><SectionTitle>Where I've built things</SectionTitle></FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {experience.map((exp, i) => (
          <FadeIn key={exp.id} delay={i * 0.08}><ExpCard exp={exp} /></FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
