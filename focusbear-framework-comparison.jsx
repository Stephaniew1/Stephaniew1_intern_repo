import { useState } from "react";

const frameworks = [
  {
    name: "LlamaIndex",
    type: "RAG-first Framework",
    tier: "Recommended",
    ragQuality: { score: 5, note: "Purpose-built for RAG: hybrid search, reranking, query routing, hierarchical chunking" },
    agentToolCalling: { score: 3, note: "Supports agents with tool calling, but not the primary focus of the framework" },
    chunkingControl: { score: 5, note: "Semantic, sentence-window, hierarchical chunking; full control over strategy" },
    hybridSearch: { score: 5, note: "Native dense + sparse retrieval, BM25 + vector, cross-encoder reranking" },
    evaluation: { score: 5, note: "Built-in faithfulness, relevancy, context recall metrics; RAGAS integration" },
    platformCompat: { score: 4, note: "Dify plugin support, LangChain interop, standalone API; no Botpress integration" },
    learningCurve: { score: 4, note: "Good docs, 5-line quickstart, but advanced features need Python knowledge" },
    selfHosting: { score: 5, note: "Fully open-source Apache 2.0, runs anywhere Python runs" },
    license: "Apache 2.0 (free)",
    language: "Python / TypeScript",
    bestFor: "Best retrieval quality: article indexing, hybrid search, source citation, evaluation",
    limitations: "Agent/action logic is secondary; needs Dify or LangGraph for the FocusBear API orchestration layer",
    monthlyCost: "$0 (OSS) + LLM API costs",
  },
  {
    name: "LangGraph",
    type: "Agent Orchestration Framework",
    tier: "Strong Alternative",
    ragQuality: { score: 3, note: "Uses LangChain retrievers; good but not as refined as LlamaIndex's native RAG" },
    agentToolCalling: { score: 5, note: "Purpose-built for stateful multi-step agents with tool calling and branching logic" },
    chunkingControl: { score: 3, note: "Via LangChain text splitters; recursive, character-based, markdown-aware" },
    hybridSearch: { score: 3, note: "Possible via LangChain retrievers + Qdrant/Weaviate hybrid, but manual wiring" },
    evaluation: { score: 3, note: "LangSmith for tracing/eval, but less RAG-specific than LlamaIndex's built-in metrics" },
    platformCompat: { score: 3, note: "Standalone framework; no native Botpress/Dify/Voiceflow integration" },
    learningCurve: { score: 2, note: "Steep: graph-based state machines, requires strong Python skills" },
    selfHosting: { score: 5, note: "Fully open-source MIT license, deploy anywhere" },
    license: "MIT (free)",
    language: "Python / TypeScript",
    bestFor: "Best agent logic: complex multi-step FocusBear API actions with branching and state",
    limitations: "Steep learning curve; you build everything (UI, channels, RAG pipeline); overkill for simple article retrieval",
    monthlyCost: "$0 (OSS) + LLM API costs",
  },
  {
    name: "LangChain",
    type: "General LLM Orchestration",
    tier: "Strong Alternative",
    ragQuality: { score: 4, note: "Flexible retriever system, pluggable vector stores, good but requires manual optimisation" },
    agentToolCalling: { score: 4, note: "Mature agent and tool ecosystem, function calling, multi-tool chains" },
    chunkingControl: { score: 4, note: "RecursiveCharacterTextSplitter, markdown, HTML-aware splitters" },
    hybridSearch: { score: 3, note: "Supports hybrid via Qdrant/Weaviate integrations, but not built-in natively" },
    evaluation: { score: 3, note: "LangSmith provides tracing, but evaluation is more general-purpose than RAG-specific" },
    platformCompat: { score: 4, note: "Widely supported: Dify inspired by it, many platforms integrate LangChain components" },
    learningCurve: { score: 3, note: "Large API surface, lots of abstractions; moderate learning curve" },
    selfHosting: { score: 5, note: "Fully open-source MIT license" },
    license: "MIT (free)",
    language: "Python / TypeScript",
    bestFor: "Jack of all trades: flexible for both retrieval and agent workflows",
    limitations: "Higher token usage than LlamaIndex in benchmarks; large dependency surface; can feel over-abstracted",
    monthlyCost: "$0 (OSS) + LLM API costs",
  },
  {
    name: "Haystack",
    type: "Production RAG Framework",
    tier: "Niche Option",
    ragQuality: { score: 4, note: "Strong modular pipelines: retrievers, generators, rankers with clean composition" },
    agentToolCalling: { score: 3, note: "Agent support added, but less mature than LangGraph or LangChain agents" },
    chunkingControl: { score: 4, note: "DocumentSplitter with configurable strategies, sentence/passage level" },
    hybridSearch: { score: 4, note: "Native hybrid retrieval combining BM25 + dense, built-in reranking support" },
    evaluation: { score: 4, note: "Built-in evaluation pipelines with faithfulness and answer relevancy metrics" },
    platformCompat: { score: 2, note: "Standalone; no Botpress/Dify integration; deepset Cloud for managed hosting" },
    learningCurve: { score: 3, note: "Pipeline-based mental model; good docs but different paradigm from LangChain" },
    selfHosting: { score: 5, note: "Fully open-source Apache 2.0" },
    license: "Apache 2.0 (free)",
    language: "Python",
    bestFor: "Clean, modular RAG pipelines with strong evaluation; good for search-heavy use cases",
    limitations: "Smaller community than LangChain/LlamaIndex; less agent capability; limited platform integrations",
    monthlyCost: "$0 (OSS) + LLM API costs",
  },
  {
    name: "Botpress Built-in",
    type: "Proprietary RAG Engine",
    tier: "Simplest Option",
    ragQuality: { score: 3, note: "Basic vector search over knowledge base; no hybrid, reranking, or routing" },
    agentToolCalling: { score: 5, note: "Native Autonomous Engine with tool execution, API calls, workflow branching" },
    chunkingControl: { score: 1, note: "Black box: no control over chunk size, strategy, or embedding model" },
    hybridSearch: { score: 1, note: "Dense vector search only; no sparse/keyword hybrid, no reranking" },
    evaluation: { score: 1, note: "No built-in RAG evaluation metrics; only conversation logs for debugging" },
    platformCompat: { score: 5, note: "Fully integrated: KB + agents + channels + deployment in one platform" },
    learningCurve: { score: 5, note: "Visual builder, no code required for basic setup, fastest to production" },
    selfHosting: { score: 3, note: "Open-source v12 available for self-hosting; cloud version is primary" },
    license: "$89–489/mo (platform fee)",
    language: "Visual / TypeScript",
    bestFor: "Fastest to ship: zero-code RAG + agent actions in one place, no framework needed",
    limitations: "No retrieval customisation; can't swap embedding model, chunking, or add reranking; 5K vector limit on free tier",
    monthlyCost: "$89–489/mo + LLM API",
  },
  {
    name: "Dify Built-in",
    type: "Open-source RAG Engine",
    tier: "Simplest Option",
    ragQuality: { score: 4, note: "Good RAG engine with multiple index types: keyword, embedding, LLM-assisted snippet search" },
    agentToolCalling: { score: 4, note: "Agentic workflow builder with tool nodes, HTTP API calls, live debug" },
    chunkingControl: { score: 3, note: "Configurable chunk size, some strategy options, but less granular than LlamaIndex" },
    hybridSearch: { score: 3, note: "Supports keyword + vector search modes; less sophisticated fusion than LlamaIndex" },
    evaluation: { score: 2, note: "Execution logs and annotations; no built-in faithfulness/relevancy metrics" },
    platformCompat: { score: 5, note: "All-in-one: RAG + agents + deployment; LlamaIndex plugin for external KB" },
    learningCurve: { score: 4, note: "Visual workflow builder, accessible to non-developers, good documentation" },
    selfHosting: { score: 5, note: "Fully open-source, Docker deploy, $0 platform cost" },
    license: "Free (self-hosted) / $59–159/mo cloud",
    language: "Visual / Python API",
    bestFor: "Best middle ground: visual builder with LlamaIndex plugin option for advanced retrieval",
    limitations: "RAG engine less sophisticated than LlamaIndex natively; fewer native channel integrations than Botpress",
    monthlyCost: "$0–159/mo + LLM API",
  },
];

const criteria = [
  { key: "ragQuality", label: "RAG Retrieval Quality", desc: "Accuracy of article retrieval, semantic understanding, source grounding", weight: "Critical" },
  { key: "agentToolCalling", label: "Agent / Tool Calling", desc: "Ability to orchestrate FocusBear API calls (create habit, update settings)", weight: "Critical" },
  { key: "chunkingControl", label: "Chunking Control", desc: "Control over how articles are split into retrievable segments", weight: "High" },
  { key: "hybridSearch", label: "Hybrid Search", desc: "Combining vector similarity + keyword matching for better recall", weight: "High" },
  { key: "evaluation", label: "RAG Evaluation", desc: "Built-in metrics to measure retrieval accuracy and hallucination", weight: "Medium" },
  { key: "platformCompat", label: "Platform Compatibility", desc: "Integration with Botpress, Dify, or standalone deployment", weight: "High" },
  { key: "learningCurve", label: "Ease of Use", desc: "Time to productive, documentation quality, learning curve", weight: "Medium" },
  { key: "selfHosting", label: "Self-hosting / Control", desc: "Open-source availability, data sovereignty, deployment flexibility", weight: "Low" },
];

const tierConfig = {
  "Recommended": { bg: "#0d9488", text: "#fff" },
  "Strong Alternative": { bg: "#6366f1", text: "#fff" },
  "Niche Option": { bg: "#8b5cf6", text: "#fff" },
  "Simplest Option": { bg: "#d97706", text: "#fff" },
};

const weightColor = { Critical: "#ef4444", High: "#f59e0b", Medium: "#6366f1", Low: "#94a3b8" };

const Bar = ({ score, color }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} style={{ width: 16, height: 7, borderRadius: 2, backgroundColor: i <= score ? color : "var(--border-muted, #e2e8f0)", transition: "all .2s" }} />
    ))}
  </div>
);

export default function FrameworkMatrix() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("matrix");

  const s = {
    wrap: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", maxWidth: "100%", padding: "24px 16px", color: "var(--text-primary, #1a1a2e)" },
    h1: { fontSize: 22, fontWeight: 700, letterSpacing: "-.5px", margin: "0 0 4px" },
    sub: { fontSize: 13, color: "var(--text-secondary, #64748b)", margin: "0 0 20px", lineHeight: 1.5 },
    tabs: { display: "flex", gap: 4, marginBottom: 20, backgroundColor: "var(--bg-secondary, #f1f5f9)", borderRadius: 10, padding: 4, width: "fit-content" },
    tab: a => ({ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: a ? 600 : 400, backgroundColor: a ? "var(--bg-primary, #fff)" : "transparent", color: a ? "var(--text-primary, #1a1a2e)" : "var(--text-secondary, #64748b)", boxShadow: a ? "0 1px 3px rgba(0,0,0,.08)" : "none", transition: "all .2s" }),
    tbl: { width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 950 },
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
            {frameworks.map(f => (
              <th key={f.name} style={{ ...s.th, minWidth: 115, textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 12, textTransform: "none", letterSpacing: 0 }}>{f.name}</span>
                  <span style={{ fontSize: 10, opacity: .7, textTransform: "none", letterSpacing: 0 }}>{f.type}</span>
                  <span style={s.badge(f.tier)}>{f.tier}</span>
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
                {frameworks.map(f => {
                  const id = `${f.name}-${c.key}`;
                  const d = f[c.key];
                  return (
                    <td key={id} style={s.td(hovered === id)} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <Bar score={d.score} color={gc(f.tier)} />
                        <span style={{ fontSize: 16, fontWeight: 700, color: gc(f.tier) }}>{d.score}/5</span>
                        {hovered === id && <span style={s.tip}>{d.note}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td style={{ ...s.td(false), fontWeight: 600 }}>Cost</td>
              {frameworks.map(f => (
                <td key={f.name} style={{ ...s.td(false), textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{f.monthlyCost}</div>
                  <div style={{ fontSize: 10, color: "var(--text-secondary, #64748b)", marginTop: 2 }}>{f.license}</div>
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ ...s.td(false), fontWeight: 600 }}>Language</td>
              {frameworks.map(f => (
                <td key={f.name} style={{ ...s.td(false), textAlign: "center", fontSize: 12 }}>{f.language}</td>
              ))}
            </tr>
            <tr>
              <td style={{ ...s.td(false), fontWeight: 600 }}>Key Limitation</td>
              {frameworks.map(f => (
                <td key={f.name} style={{ ...s.td(false), textAlign: "center", fontSize: 11, color: "var(--text-secondary, #64748b)" }}>{f.limitations}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  const cards = () => (
    <div>
      {frameworks.map(f => {
        const isSel = selected === f.name;
        const critical = criteria.filter(c => c.weight === "Critical").reduce((acc, c) => acc + f[c.key].score, 0);
        const total = criteria.reduce((acc, c) => acc + f[c.key].score, 0);
        return (
          <div key={f.name} style={s.card(isSel)} onClick={() => setSelected(isSel ? null : f.name)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{f.name}</h3>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{f.type}</span>
                  <span style={s.badge(f.tier)}>{f.tier}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "6px 0 0" }}>{f.bestFor}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px" }}>Critical Score</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: gc(f.tier) }}>{critical}/10</div>
                <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>Total: {total}/40 | {f.monthlyCost}</div>
              </div>
            </div>
            {isSel && (
              <div style={{ marginTop: 10 }}>
                {criteria.map(c => (
                  <div key={c.key} style={s.row}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, minWidth: 140 }}>{c.label}</span>
                      <span style={s.wBadge(c.weight)}>{c.weight}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Bar score={f[c.key].score} color={gc(f.tier)} />
                      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 22, textAlign: "right" }}>{f[c.key].score}/5</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: 10, backgroundColor: "var(--bg-secondary, #f8fafc)", borderRadius: 8, fontSize: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div><strong>License:</strong> {f.license}</div>
                    <div><strong>Language:</strong> {f.language}</div>
                  </div>
                  <div style={{ marginTop: 8, color: "#ef4444" }}><strong>Limitation:</strong> {f.limitations}</div>
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
            <strong>LlamaIndex</strong> is the recommended framework for retrieval quality. It dominates on the criteria that directly impact whether users get the right article: hybrid search, chunking control, reranking, and evaluation. It integrates with Dify as a plugin, giving FocusBear the best RAG accuracy without building everything from scratch.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>LangGraph</strong> is the best choice if the agent/action side becomes very complex (multi-step habit creation workflows with branching logic, user confirmation loops, error recovery). It scores highest on agent orchestration but lowest on ease of use.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Botpress Built-in</strong> is the fastest path to production if retrieval quality is "good enough." No framework to learn, no code to write for basic RAG. But you sacrifice all retrieval customisation, and you can't improve accuracy without switching platforms.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Practical path:</strong> Start with <strong>Botpress Built-in</strong> or <strong>Dify Built-in</strong> to validate the chatbot concept with real users. If retrieval accuracy becomes a problem (users aren't getting the right articles), plug <strong>LlamaIndex</strong> into Dify as the retrieval backend. If agent logic becomes complex, consider <strong>LangGraph</strong> for the orchestration layer. Don't over-engineer the framework choice before you have user data showing where the bottleneck is.
          </p>
        </div>
      </div>

      <div style={{ border: "1px solid var(--border-primary, #e2e8f0)", borderRadius: 12, padding: 20, backgroundColor: "var(--bg-primary, #fff)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Framework Decision Tree</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { q: "Priority is shipping fast with minimal engineering?", a: "Botpress Built-in or Dify Built-in", color: "#d97706" },
            { q: "Need better retrieval accuracy than built-in RAG?", a: "Add LlamaIndex (via Dify plugin)", color: "#0d9488" },
            { q: "Agent logic is simple (retrieve article OR call one API)?", a: "Dify Built-in agent nodes are sufficient", color: "#d97706" },
            { q: "Agent logic is complex (multi-step, branching, retries)?", a: "LangGraph for orchestration + LlamaIndex for retrieval", color: "#6366f1" },
            { q: "Want one framework that does both adequately?", a: "LangChain (jack of all trades, master of neither)", color: "#6366f1" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ minWidth: 24, height: 24, borderRadius: "50%", backgroundColor: item.color + "18", color: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{item.q}</div>
                <div style={{ fontSize: 13, color: item.color, fontWeight: 500, marginTop: 2 }}>{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>FocusBear Chatbot: Framework Comparison</h1>
      <p style={s.sub}>RAG retrieval frameworks + agent orchestration for article search and FocusBear API actions</p>
      <div style={s.tabs}>
        {[{ id: "matrix", label: "Score Matrix" }, { id: "cards", label: "Framework Cards" }, { id: "verdict", label: "Verdict" }].map(t => (
          <button key={t.id} style={s.tab(view === t.id)} onClick={() => setView(t.id)}>{t.label}</button>
        ))}
      </div>
      {view === "matrix" && matrix()}
      {view === "cards" && cards()}
      {view === "verdict" && verdict()}
    </div>
  );
}
