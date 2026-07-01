import { FONT, C } from "../../theme/tokens";

const Tag = ({ children }) => (
  <span style={{ fontFamily: FONT.mono, fontSize: "0.65rem", fontWeight: 600, color: C.ink, background: C.tagBg, padding: "0.3rem 0.7rem", borderRadius: 4, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
);

export default Tag;
