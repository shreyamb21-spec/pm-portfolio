import { FONT, C } from "../../theme/tokens";

const SectionTitle = ({ children }) => (
  <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.ink, fontWeight: 400, lineHeight: 1.15, marginBottom: "2.5rem", letterSpacing: "-0.02em", fontStyle: "italic" }}>{children}</h2>
);

export default SectionTitle;
