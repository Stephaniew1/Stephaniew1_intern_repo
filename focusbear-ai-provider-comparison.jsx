import { useState } from "react";

const providers = [
  {
    name: "GPT-4o-mini",
    vendor: "OpenAI",
    tier: "Recommended",
    ragAccuracy: { score: 4, note: "Strong comprehension of retrieved context, good at synthesising answers from chunks" },
    functionCalling: { score: 5, note: "Industry-leading structured JSON function calling, most mature tool-use API" },
    instructionFollowing: { score: 4, note: "Reliable at following system prompts, occasionally verbose" },
    costEfficiency: { score: 5, note: "$0.15/1M input, $0.60/1M output — best price-to-quality ratio" },
    latency: { score: 5, note: "~300-500ms first token, fastest in class for its tier" },
    contextWindow: { score: 4, note: "128K tokens — handles large article chunks comfortably" },
    multilingualSupport: { score: 4, note: "Strong English, good across major languages" },
    ecosystem: { score: 5, note: "Largest SDK ecosystem, Assistants API, file search, broadest integrations" },
    inputCost: "$0.15 / 1M tokens",
    outputCost: "$0.60 / 1M tokens",
    contextSize: "128K",
    monthlyEstimate: "$30–80",
    monthlyNote: "at ~5K conversations/month",
    bestFor: "Best overall for FocusBear: fast, cheap, excellent function calling for API actions",
    limitations: "OpenAI-only ecosystem; no self-hosting; slightly less nuanced than larger models on ambiguous queries",
  },
  {
    name: "Claude Haiku 4.5",
    vendor: "Anthropic",
    tier: "Strong Alternative",
    ragAccuracy: { score: 4, note: "Good grounding in retrieved context, concise answers" },
    functionCalling: { score: 4, note: "Solid tool use via JSON schema, slightly less mature than OpenAI's" },
    instructionFollowing: { score: 5, note: "Excellent at following detailed system prompts, low hallucination" },
    costEfficiency: { score: 5, note: "$0.80/1M input, $4/1M output — very cheap for its capability" },
    latency: { score: 4, note: "~400-600ms first token, competitive speed" },
    contextWindow: { score: 4, note: "200K tokens — larger than GPT-4o-mini" },
    multilingualSupport: { score: 3, note: "Good English, decent multilingual but weaker than GPT on some languages" },
    ecosystem: { score: 3, note: "Growing SDK, works with Botpress/Dify, smaller third-party ecosystem" },
    inputCost: "$0.80 / 1M tokens",
    outputCost: "$4.00 / 1M tokens",
    contextSize: "200K",
    monthlyEstimate: "$15–60",
    monthlyNote: "at ~5K conversations/month",
    bestFor: "Cheapest quality option: strong instruction-following at very low cost",
    limitations: "Smaller ecosystem than OpenAI; output pricing is higher ratio to input; fewer third-party integrations",
  },
  {
    name: "Claude Sonnet 4",
    vendor: "Anthropic",
    tier: "Strong Alternative",
    ragAccuracy: { score: 5, note: "Excellent comprehension, nuanced answers, strong source attribution" },
    functionCalling: { score: 5, note: "Mature tool use, handles complex multi-step action chains well" },
    instructionFollowing: { score: 5, note: "Best-in-class instruction following, very low hallucination rate" },
    costEfficiency: { score: 3, note: "$3/1M input, $15/1M output — 5x more than GPT-4o-mini" },
    latency: { score: 3, note: "~600-900ms first token, noticeably slower than mini models" },
    contextWindow: { score: 5, note: "200K tokens (1M beta) — largest production context window" },
    multilingualSupport: { score: 4, note: "Strong across major languages, good with nuanced phrasing" },
    ecosystem: { score: 3, note: "Prompt caching (90% savings on repeated context), growing integrations" },
    inputCost: "$3.00 / 1M tokens",
    outputCost: "$15.00 / 1M tokens",
    contextSize: "200K (1M beta)",
    monthlyEstimate: "$150–500",
    monthlyNote: "at ~5K conversations/month",
    bestFor: "Premium quality: complex reasoning, multi-step habit actions, nuanced article answers",
    limitations: "Expensive at scale; slower latency; prompt caching essential to control costs",
  },
  {
    name: "GPT-4o",
    vendor: "OpenAI",
    tier: "Premium Option",
    ragAccuracy: { score: 5, note: "Top-tier comprehension and synthesis from retrieved documents" },
    functionCalling: { score: 5, note: "Best-in-class, parallel function calls, structured outputs" },
    instructionFollowing: { score: 4, note: "Very good but occasionally more creative/verbose than Claude" },
    costEfficiency: { score: 2, note: "$2.50/1M input, $10/1M output — premium pricing" },
    latency: { score: 3, note: "~500-800ms first token, slower than mini variant" },
    contextWindow: { score: 4, note: "128K tokens — same as 4o-mini" },
    multilingualSupport: { score: 5, note: "Best multilingual coverage across all providers" },
    ecosystem: { score: 5, note: "Full OpenAI ecosystem: vision, audio, assistants, file search" },
    inputCost: "$2.50 / 1M tokens",
    outputCost: "$10.00 / 1M tokens",
    contextSize: "128K",
    monthlyEstimate: "$100–350",
    monthlyNote: "at ~5K conversations/month",
    bestFor: "Full multimodal capability: if FocusBear needs image understanding or audio",
    limitations: "Expensive for a text-only chatbot; 4o-mini covers most FocusBear needs at 1/10th the cost",
  },
  {
    name: "Gemini 2.5 Flash",
    vendor: "Google",
    tier: "Budget Option",
    ragAccuracy: { score: 3, note: "Good for straightforward retrieval, weaker on nuanced multi-source synthesis" },
    functionCalling: { score: 3, note: "Supports function calling but less mature tooling than OpenAI/Anthropic" },
    instructionFollowing: { score: 3, note: "Adequate, but more prone to drift from system prompts on longer conversations" },
    costEfficiency: { score: 5, note: "$0.15/1M input, $0.60/1M output (under 200K) — matches GPT-4o-mini" },
    latency: { score: 5, note: "Extremely fast, optimised for speed" },
    contextWindow: { score: 5, note: "1M tokens — largest context window available" },
    multilingualSupport: { score: 4, note: "Strong multilingual from Google's training data" },
    ecosystem: { score: 2, note: "Vertex AI integration, but smaller third-party/chatbot platform support" },
    inputCost: "$0.15 / 1M tokens",
    outputCost: "$0.60 / 1M tokens",
    contextSize: "1M",
    monthlyEstimate: "$20–60",
    monthlyNote: "at ~5K conversations/month",
    bestFor: "Maximum context window at minimum cost: useful if stuffing many articles into context",
    limitations: "Weaker function calling; less reliable instruction-following; limited Botpress/Dify integration",
  },
  {
    name: "Llama 3.3 70B",
    vendor: "Meta (self-hosted)",
    tier: "Self-hosted Option",
    ragAccuracy: { score: 3, note: "Decent RAG grounding, but behind GPT-4o-mini and Claude on synthesis quality" },
    functionCalling: { score: 2, note: "Basic tool use, requires custom implementation, no native structured output" },
    instructionFollowing: { score: 3, note: "Good with careful prompting, more variable than commercial models" },
    costEfficiency: { score: 4, note: "$0 API cost if self-hosted; GPU hosting ~$50-200/month" },
    latency: { score: 2, note: "Depends on hardware; typically slower than hosted APIs without GPU optimisation" },
    contextWindow: { score: 3, note: "128K tokens — matches GPT-4o but practically limited by hardware" },
    multilingualSupport: { score: 3, note: "Reasonable multilingual, weaker than commercial options" },
    ecosystem: { score: 2, note: "Open-source, Ollama/vLLM hosting, community-driven integrations" },
    inputCost: "$0 (self-hosted)",
    outputCost: "GPU cost: $50–200/mo",
    contextSize: "128K",
    monthlyEstimate: "$50–200",
    monthlyNote: "GPU hosting cost only",
    bestFor: "Full data sovereignty: no data leaves your infrastructure",
    limitations: "Weak function calling; requires GPU infrastructure; more engineering overhead; less reliable than commercial APIs",
  },
];

const criteria = [
  { key: "ragAccuracy", label: "RAG Answer Quality", desc: "How well it synthesises answers from retrieved article chunks", weight: "Critical" },
  { key: "functionCalling", label: "Function / Tool Calling", desc: "Ability to call FocusBear API (create habits, update settings)", weight: "Critical" },
  { key: "instructionFollowing", label: "Instruction Following", desc: "Adherence to system prompts, low hallucination", weight: "Critical" },
  { key: "costEfficiency", label: "Cost Efficiency", desc: "Price per token relative to output quality", weight: "High" },
  { key: "latency", label: "Response Speed", desc: "Time to first token, overall responsiveness", weight: "High" },
  { key: "contextWindow", label: "Context Window", desc: "How much article context + conversation history fits", weight: "Medium" },
  { key: "multilingualSupport", label: "Multilingual Support", desc: "Quality across languages beyond English", weight: "Low" },
  { key: "ecosystem", label: "Platform Ecosystem", desc: "SDK maturity, Botpress/Dify compatibility, integrations", weight: "Medium" },
];

const tierConfig = {
  "Recommended": { bg: "#0d9488", text: "#fff" },
  "Strong Alternative": { bg: "#6366f1", text: "#fff" },
  "Premium Option": { bg: "#8b5cf6", text: "#fff" },
  "Budget Option": { bg: "#059669", text: "#fff" },
  "Self-hosted Option": { bg: "#d97706", text: "#fff" },
};

const weightColor = { Critical: "#ef4444", High: "#f59e0b", Medium: "#6366f1", Low: "#94a3b8" };

const Bar = ({ score, color }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} style={{ width: 16, height: 7, borderRadius: 2, backgroundColor: i <= score ? color : "var(--border-muted, #e2e8f0)", transition: "all .2s" }} />
    ))}
  </div>
);

export default function AIProviderMatrix() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("matrix");

  const s = {
    wrap: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", maxWidth: "100%", padding: "24px 16px", color: "var(--text-primary, #1a1a2e)" },
    h1: { fontSize: 22, fontWeight: 700, letterSpacing: "-.5px", margin: "0 0 4px" },
    sub: { fontSize: 13, color: "var(--text-secondary, #64748b)", margin: "0 0 20px", lineHeight: 1.5 },
    tabs: { display: "flex", gap: 4, marginBottom: 20, backgroundColor: "var(--bg-secondary, #f1f5f9)", borderRadius: 10, padding: 4, width: "fit-content" },
    tab: a => ({ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: a ? 600 : 400, backgroundColor: a ? "var(--bg-primary, #fff)" : "transparent", color: a ? "var(--text-primary, #1a1a2e)" : "var(--text-secondary, #64748b)", boxShadow: a ? "0 1px 3px rgba(0,0,0,.08)" : "none", transition: "all .2s" }),
    tbl: { width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 1000 },
    th: { padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: ".5px", color: "var(--text-secondary, #64748b)", backgroundColor: "var(--bg-secondary, #f8fafc)", borderBottom: "2px solid var(--border-primary, #e2e8f0)", position: "sticky", top: 0, zIndex: 1 },
    td: h => ({ padding: "10px", borderBottom: "1px solid var(--border-primary, #e2e8f0)", verticalAlign: "top", backgroundColor: h ? "var(--bg-secondary, #f8fafc)" : "transparent", transition: "background .15s" }),
    badge: t => ({ display: "inline-block", padding: "2px 9px", borderRadius: 100, fontSize: 10, fontWeight: 600, backgroundColor: tierConfig[t]?.bg || "#94a3b8", color: tierConfig[t]?.text || "#fff" }),
    wBadge: w => ({ display: "inline-block", padding: "2px 7px", borderRadius: 100, fontSize: 9, fontWeight: 600, backgroundColor: (weightColor[w] || "#94a3b8") + "18", color: weightColor[w] || "#94a3b8" }),
    tip: { fontSize: 11, color: "var(--text-secondary, #64748b)", marginTop: 4, lineHeight: 1.4 },
    card: sel => ({ border: `2px solid ${sel ? "#6366f1" : "var(--border-primary, #e2e8f0)"}`, borderRadius: 12, padding: 18, marginBottom: 14, backgroundColor: "var(--bg-primary, #fff)", cursor: "pointer", transition: "all .2s", boxShadow: sel ? "0 0 0 3px rgba(99,102,241,.12)" : "none" }),
    row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid var(--border-primary, #f1f5f9)" },
  };

  const gc = t => tierConfig[t]?.bg || "#94a3b8";

  const matrix = () => (
    <>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14, fontSize: 12, color: "var(--text-secondary, #64748b)" }}>
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Tiers:</span>
        {Object.keys(tierConfig).map(t => <span key={t} style={s.badge(t)}>{t}</span>)}
        <span style={{ marginLeft: 10, fontWeight: 600, color: "var(--text-primary)" }}>Priority:</span>
        {Object.keys(weightColor).map(w => <span key={w} style={s.wBadge(w)}>{w}</span>)}
      </div>
      <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--border-primary, #e2e8f0)", backgroundColor: "var(--bg-primary, #fff)" }}>
        <table style={s.tbl}>
          <thead><tr>
            <th style={{ ...s.th, minWidth: 155 }}>Criteria</th>
            {providers.map(p => (
              <th key={p.name} style={{ ...s.th, minWidth: 120, textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 12, textTransform: "none", letterSpacing: 0 }}>{p.name}</span>
                  <span style={{ fontSize: 10, opacity: .7, textTransform: "none", letterSpacing: 0 }}>{p.vendor}</span>
                  <span style={s.badge(p.tier)}>{p.tier}</span>
                </div>
              </th>
            ))}
          </tr></thead>
          <tbody>
            {criteria.map(c => (
              <tr key={c.key}>
                <td style={s.td(false)}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 12 }}>{c.label}</span>
                      <span style={s.wBadge(c.weight)}>{c.weight}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "var(--text-secondary, #64748b)" }}>{c.desc}</span>
                  </div>
                </td>
                {providers.map(p => {
                  const id = `${p.name}-${c.key}`;
                  const d = p[c.key];
                  return (
                    <td key={id} style={s.td(hovered === id)} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <Bar score={d.score} color={gc(p.tier)} />
                        <span style={{ fontSize: 16, fontWeight: 700, color: gc(p.tier) }}>{d.score}/5</span>
                        {hovered === id && <span style={s.tip}>{d.note}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td style={{ ...s.td(false), fontWeight: 600 }}>Pricing</td>
              {providers.map(p => (
                <td key={p.name} style={{ ...s.td(false), textAlign: "center" }}>
                  <div style={{ fontSize: 11 }}><strong>In:</strong> {p.inputCost}</div>
                  <div style={{ fontSize: 11 }}><strong>Out:</strong> {p.outputCost}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}><strong>Context:</strong> {p.contextSize}</div>
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ ...s.td(false), fontWeight: 600 }}>Est. Monthly Cost</td>
              {providers.map(p => (
                <td key={p.name} style={{ ...s.td(false), textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: gc(p.tier) }}>{p.monthlyEstimate}</div>
                  <div style={{ fontSize: 10, color: "var(--text-secondary, #64748b)" }}>{p.monthlyNote}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  const cards = () => (
    <div>
      {providers.map(p => {
        const isSel = selected === p.name;
        const critical = criteria.filter(c => c.weight === "Critical").reduce((s, c) => s + p[c.key].score, 0);
        const total = criteria.reduce((s, c) => s + p[c.key].score, 0);
        return (
          <div key={p.name} style={s.card(isSel)} onClick={() => setSelected(isSel ? null : p.name)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{p.name}</h3>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{p.vendor}</span>
                  <span style={s.badge(p.tier)}>{p.tier}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "6px 0 0" }}>{p.bestFor}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px" }}>Critical Score</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: gc(p.tier) }}>{critical}/15</div>
                <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>Total: {total}/40 | Est: {p.monthlyEstimate}/mo</div>
              </div>
            </div>
            {isSel && (
              <div style={{ marginTop: 10 }}>
                {criteria.map(c => (
                  <div key={c.key} style={s.row}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, minWidth: 130 }}>{c.label}</span>
                      <span style={s.wBadge(c.weight)}>{c.weight}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Bar score={p[c.key].score} color={gc(p.tier)} />
                      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 22, textAlign: "right" }}>{p[c.key].score}/5</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: 10, backgroundColor: "var(--bg-secondary, #f8fafc)", borderRadius: 8, fontSize: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <div><strong>Input:</strong> {p.inputCost}</div>
                    <div><strong>Output:</strong> {p.outputCost}</div>
                    <div><strong>Context:</strong> {p.contextSize}</div>
                  </div>
                  <div style={{ marginTop: 8, color: "#ef4444" }}><strong>Limitation:</strong> {p.limitations}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const verdict = () => (
    <div>
      <div style={{ border: "2px solid #0d9488", borderRadius: 12, padding: 20, marginBottom: 18, backgroundColor: "var(--bg-primary, #fff)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>★</span>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Verdict for FocusBear</h3>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong>GPT-4o-mini</strong> is the best starting point. It has the strongest function calling (essential for the habit-creation API actions), the lowest cost at its quality tier, the fastest response times, and the broadest platform compatibility with both Botpress and Dify.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Claude Haiku 4.5</strong> is the best alternative if you prioritise instruction-following and low hallucination over ecosystem breadth. It's slightly cheaper on input tokens and has a larger context window (200K vs 128K).
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Claude Sonnet 4</strong> is worth the premium only if FocusBear's chatbot handles genuinely complex multi-step reasoning (e.g. "reorganise my entire morning routine based on my sleep data"). For simple article retrieval and habit creation, it's overkill.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Hybrid approach:</strong> Use GPT-4o-mini or Claude Haiku for 90% of queries (article lookups, simple habit actions), and route complex queries to Claude Sonnet 4 only when needed. This keeps average cost low while maintaining quality on hard questions.
          </p>
        </div>
      </div>
      <div style={{ border: "1px solid var(--border-primary, #e2e8f0)", borderRadius: 12, padding: 20, backgroundColor: "var(--bg-primary, #fff)" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Recommended FocusBear AI Stack</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { layer: "Primary LLM", pick: "GPT-4o-mini", detail: "~$30-80/mo at 5K convos" },
            { layer: "Fallback LLM", pick: "Claude Sonnet 4", detail: "Complex queries only" },
            { layer: "Embedding Model", pick: "BGE-M3 (free)", detail: "or text-embedding-3-small" },
            { layer: "Platform", pick: "Botpress or Dify", detail: "$59-89/mo" },
            { layer: "Vector DB", pick: "Built-in or ChromaDB", detail: "$0 at FocusBear's scale" },
            { layer: "Retrieval (optional)", pick: "LlamaIndex", detail: "Free, via Dify plugin" },
          ].map(s => (
            <div key={s.layer} style={{ padding: 12, borderRadius: 8, backgroundColor: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-primary, #e2e8f0)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".5px", color: "var(--text-secondary, #64748b)", marginBottom: 3 }}>{s.layer}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{s.pick}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary, #64748b)", marginTop: 2 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>FocusBear Chatbot: AI Provider Comparison</h1>
      <p style={s.sub}>LLM models for RAG article retrieval + FocusBear API function calling (habit creation, settings updates)</p>
      <div style={s.tabs}>
        {[{ id: "matrix", label: "Score Matrix" }, { id: "cards", label: "Provider Cards" }, { id: "verdict", label: "Verdict" }].map(t => (
          <button key={t.id} style={s.tab(view === t.id)} onClick={() => setView(t.id)}>{t.label}</button>
        ))}
      </div>
      {view === "matrix" && matrix()}
      {view === "cards" && cards()}
      {view === "verdict" && verdict()}
    </div>
  );
}
