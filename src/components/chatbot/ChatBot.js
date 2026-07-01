import { useState, useRef, useEffect } from "react";
import { C, FONT } from "../../theme/tokens";

export const SUGGESTED_CHIPS = [
  "What makes him different?",
  "Tell me about CompetitorPulse",
  "Has he shipped real products?",
  "What's his AI experience?",
  "What are his key projects?",
  "What sets him apart from other PMs?",
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const inputRef = useRef(null);
  const answerRef = useRef(null);

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [answer]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const assistantText = data.text || "I couldn't process that. Try asking something else about Shreyam's experience.";
      const assistantMsg = { role: "assistant", content: assistantText };
      setMessages(prev => [...prev, assistantMsg]);
      setAnswer(assistantText);
    } catch {
      const errText = "Something went wrong. You can reach Shreyam directly at shreyamb21@gmail.com.";
      setMessages(prev => [...prev, { role: "assistant", content: errText }]);
      setAnswer(errText);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Input row */}
      <div style={{
        display: "flex", gap: "0", border: `1px solid ${C.ink}`, borderRadius: 6,
        overflow: "hidden", background: C.card,
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What makes him different from other PMs?"
          disabled={loading}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: FONT.body, fontSize: "0.9rem", color: C.ink,
            padding: "0.9rem 1.25rem",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading ? C.ink : "transparent",
            border: "none", borderLeft: `1px solid ${C.border}`,
            color: input.trim() && !loading ? C.bg : C.dim,
            fontFamily: FONT.mono, fontSize: "0.75rem", fontWeight: 600,
            padding: "0.9rem 1.25rem", cursor: input.trim() && !loading ? "pointer" : "default",
            transition: "background 0.2s, color 0.2s", whiteSpace: "nowrap",
          }}
        >
          {loading ? "..." : "Ask →"}
        </button>
      </div>

      {/* Suggested chips */}
      {messages.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
          {SUGGESTED_CHIPS.map((chip, i) => (
            <button
              key={i}
              onClick={() => sendMessage(chip)}
              style={{
                background: "none", border: `1px solid ${C.borderStrong}`,
                borderRadius: 4, padding: "0.35rem 0.75rem",
                fontFamily: FONT.body, fontSize: "0.75rem", color: C.muted,
                cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.muted; }}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Answer card */}
      {loading && (
        <div style={{ marginTop: "1rem", border: `1px solid ${C.border}`, borderRadius: 6, padding: "1rem 1.25rem", background: C.card }}>
          <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
            {[0, 1, 2].map((n) => (
              <div key={n} style={{
                width: 6, height: 6, borderRadius: "50%", background: C.ink,
                animation: "dotPulse 1.2s infinite", animationDelay: `${n * 0.15}s`,
              }} />
            ))}
          </div>
        </div>
      )}

      {answer && !loading && (
        <div ref={answerRef} style={{ marginTop: "1rem", border: `1px solid ${C.border}`, borderRadius: 6, padding: "1.25rem", background: C.card }}>
          <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.text, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", marginBottom: messages.length > 2 ? "0.75rem" : 0 }}>
            {answer}
          </p>
          {messages.length > 1 && (
            <button
              onClick={() => { setMessages([]); setAnswer(null); setInput(""); }}
              style={{
                marginTop: "0.75rem", background: "none", border: `1px solid ${C.border}`,
                borderRadius: 4, padding: "0.3rem 0.75rem",
                fontFamily: FONT.mono, fontSize: "0.65rem", color: C.muted,
                cursor: "pointer", letterSpacing: "0.04em",
              }}
            >
              Ask another →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
