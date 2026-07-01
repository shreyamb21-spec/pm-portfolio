import { FONT, C } from "../../theme/tokens";

const SectionLabel = ({ text }) => (
  <p style={{ fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 500, color: C.ink, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>{text}</p>
);

export default SectionLabel;
