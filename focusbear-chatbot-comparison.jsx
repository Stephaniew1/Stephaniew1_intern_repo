import { useState } from "react";

const platforms = [
  {
    name: "Botpress",
    tier: "Recommended",
    type: "No-code/Low-code Platform",
    ragSupport: { score: 4, note: "Built-in KB indexing, vector search" },
    apiActions: { score: 5, note: "Custom code, webhooks, 190+ connectors" },
    functionCalling: { score: 5, note: "Native tool execution, dynamic API calls" },
    conversationMemory: { score: 4, note: "Built-in session + long-term memory" },
    llmFlexibility: { score: 5, note: "OpenAI, Anthropic, Mistral, custom models" },
    easeOfSetup: { score: 4, note: "Visual builder + code for advanced flows" },
    multiChannel: { score: 5, note: "Web, WhatsApp, Slack, Teams, 10+ channels" },
    selfHosting: { score: 4, note: "Open-source, can self-host" },
    pricing: "Free tier + pay-as-you-go",
    pricingDetail: "$5 AI credit free, then usage-based",
    bestFor: "Best overall fit: RAG + API actions + multi-channel",
    limitations: "TypeScript/JS-based; steeper learning curve for advanced customisation",
    url: "https://botpress.com",
  },
  {
    name: "Voiceflow",
    tier: "Strong Alternative",
    type: "No-code Platform",
    ragSupport: { score: 4, note: "Knowledge base with document upload" },
    apiActions: { score: 3, note: "API steps in flows, limited custom code" },
    functionCalling: { score: 3, note: "Via API blocks, less flexible than Botpress" },
    conversationMemory: { score: 3, note: "Basic context retention, short-term" },
    llmFlexibility: { score: 3, note: "OpenAI, Anthropic (credit-based system)" },
    easeOfSetup: { score: 5, note: "Best drag-and-drop UX, fastest prototyping" },
    multiChannel: { score: 4, note: "Web, voice, Alexa, Google Assistant, telephony" },
    selfHosting: { score: 1, note: "Cloud-only, no self-hosting" },
    pricing: "Free tier, Pro $40/mo",
    pricingDetail: "100 free credits, then tiered plans",
    bestFor: "Rapid prototyping, voice-first, designer-friendly teams",
    limitations: "Advanced API workflows need workarounds; cloud-only",
    url: "https://www.voiceflow.com",
  },
  {
    name: "Dify",
    tier: "Strong Alternative",
    type: "Open-source Platform",
    ragSupport: { score: 5, note: "Built-in RAG engine, multiple index types" },
    apiActions: { score: 4, note: "Agentic workflow builder with tool nodes" },
    functionCalling: { score: 4, note: "Tool calling via workflow nodes, live debug" },
    conversationMemory: { score: 4, note: "Conversation history + variable persistence" },
    llmFlexibility: { score: 5, note: "Any LLM provider, swap without code changes" },
    easeOfSetup: { score: 4, note: "Visual builder, simpler than code-first" },
    multiChannel: { score: 2, note: "Primarily API/embed, limited native channels" },
    selfHosting: { score: 5, note: "Fully open-source, Docker deploy" },
    pricing: "Free (self-hosted), $59-159/mo managed",
    pricingDetail: "Open-source Apache 2.0",
    bestFor: "Full control, self-hosting, open-source RAG + agents",
    limitations: "Fewer native channel integrations; smaller community",
    url: "https://dify.ai",
  },
  {
    name: "OpenAI Assistants API",
    tier: "Build Your Own",
    type: "API / SDK",
    ragSupport: { score: 4, note: "File search, vector store built-in" },
    apiActions: { score: 5, note: "Function calling with JSON schema definitions" },
    functionCalling: { score: 5, note: "Best-in-class native function calling" },
    conversationMemory: { score: 4, note: "Thread-based memory, persistent" },
    llmFlexibility: { score: 1, note: "OpenAI models only (GPT-4o, 4.1, etc.)" },
    easeOfSetup: { score: 2, note: "Requires custom UI, backend, deployment" },
    multiChannel: { score: 1, note: "API only, you build all channels" },
    selfHosting: { score: 1, note: "Cloud API only, no self-hosting" },
    pricing: "Usage-based token pricing",
    pricingDetail: "GPT-4o-mini: $0.15/1M input, $0.60/1M output",
    bestFor: "Maximum flexibility if you already have a prototype",
    limitations: "You build everything: UI, state, channels, error handling",
    url: "https://platform.openai.com/docs/assistants",
  },
  {
    name: "LangGraph",
    tier: "Build Your Own",
    type: "Framework (Python)",
    ragSupport: { score: 4, note: "Via LangChain retrievers, any vector DB" },
    apiActions: { score: 5, note: "Custom tool definitions, unlimited flexibility" },
    functionCalling: { score: 5, note: "Agent tool calling with state management" },
    conversationMemory: { score: 5, note: "Stateful graph with checkpointing" },
    llmFlexibility: { score: 5, note: "Any LLM: OpenAI, Anthropic, Llama, etc." },
    easeOfSetup: { score: 1, note: "Code-heavy, steep learning curve" },
    multiChannel: { score: 1, note: "API only, you build all channels" },
    selfHosting: { score: 5, note: "Fully open-source, deploy anywhere" },
    pricing: "Free (open-source)",
    pricingDetail: "MIT license, pay only for LLM APIs",
    bestFor: "Complex multi-step agent logic, Python teams",
    limitations: "High engineering effort; no UI builder; you own everything",
    url: "https://langchain-ai.github.io/langgraph/",
  },
  {
    name: "Zoho Zia",
    tier: "Not Recommended",
    type: "Ecosystem-locked Platform",
    ragSupport: { score: 2, note: "KB articles only, min 30 articles required" },
    apiActions: { score: 3, note: "Actions within Zoho ecosystem only" },
    functionCalling: { score: 2, note: "Limited to Zoho app integrations" },
    conversationMemory: { score: 2, note: "Basic, no learning from past tickets" },
    llmFlexibility: { score: 2, note: "Zia native or ChatGPT (separate API key)" },
    easeOfSetup: { score: 3, note: "Easy if already on Zoho, hard migration otherwise" },
    multiChannel: { score: 3, note: "Website, messaging apps via Zoho Desk" },
    selfHosting: { score: 1, note: "Zoho cloud only" },
    pricing: "Zoho Desk Enterprise required",
    pricingDetail: "Per-user/month + optional OpenAI costs",
    bestFor: "Teams already fully committed to the Zoho ecosystem",
    limitations: "Locked to Zoho; can't call external APIs like FocusBear; KB-only intelligence",
    url: "https://www.zoho.com/zia/",
  },
];

const criteria = [
  { key: "ragSupport", label: "RAG / Knowledge Retrieval", description: "Article indexing, semantic search, source linking", weight: "Critical" },
  { key: "apiActions", label: "API Action Execution", description: "Calling FocusBear API to create habits, update settings", weight: "Critical" },
  { key: "functionCalling", label: "Function / Tool Calling", description: "LLM deciding when to call which API endpoint", weight: "Critical" },
  { key: "conversationMemory", label: "Conversation Memory", description: "Multi-turn context, session persistence", weight: "High" },
  { key: "llmFlexibility", label: "LLM Provider Flexibility", description: "Ability to swap between OpenAI, Claude, Llama, etc.", weight: "Medium" },
  { key: "easeOfSetup", label: "Ease of Setup", description: "Time to working prototype, learning curve", weight: "High" },
  { key: "multiChannel", label: "Multi-channel Deploy", description: "Web widget, mobile, Slack, WhatsApp, etc.", weight: "Medium" },
  { key: "selfHosting", label: "Self-hosting / Control", description: "Data sovereignty, deployment flexibility", weight: "Low" },
];

const tierColors = {
  "Recommended": { bg: "#0d9488", text: "#ffffff" },
  "Strong Alternative": { bg: "#6366f1", text: "#ffffff" },
  "Build Your Own": { bg: "#d97706", text: "#ffffff" },
  "Not Recommended": { bg: "#94a3b8", text: "#ffffff" },
};

const ScoreBar = ({ score, color }) => (
  <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          width: "18px",
          height: "8px",
          borderRadius: "2px",
          backgroundColor: i <= score ? color : "var(--border-muted)",
          transition: "all 0.3s ease",
        }}
      />
    ))}
  </div>
);

const weightColors = {
  Critical: "#ef4444",
  High: "#f59e0b",
  Medium: "#6366f1",
  Low: "#94a3b8",
};

export default function ComparisonMatrix() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [view, setView] = useState("matrix");

  const styles = {
    container: {
      fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
      maxWidth: "100%",
      margin: "0 auto",
      padding: "24px 16px",
      color: "var(--text-primary, #1a1a2e)",
      backgroundColor: "transparent",
      minHeight: "100vh",
    },
    header: {
      marginBottom: "28px",
    },
    title: {
      fontSize: "22px",
      fontWeight: 700,
      letterSpacing: "-0.5px",
      margin: "0 0 6px 0",
      color: "var(--text-primary, #1a1a2e)",
    },
    subtitle: {
      fontSize: "13px",
      color: "var(--text-secondary, #64748b)",
      margin: 0,
      lineHeight: 1.5,
    },
    tabs: {
      display: "flex",
      gap: "4px",
      marginBottom: "20px",
      backgroundColor: "var(--bg-secondary, #f1f5f9)",
      borderRadius: "10px",
      padding: "4px",
      width: "fit-content",
    },
    tab: (active) => ({
      padding: "8px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: active ? 600 : 400,
      backgroundColor: active ? "var(--bg-primary, #ffffff)" : "transparent",
      color: active ? "var(--text-primary, #1a1a2e)" : "var(--text-secondary, #64748b)",
      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      transition: "all 0.2s ease",
    }),
    tableWrapper: {
      overflowX: "auto",
      borderRadius: "12px",
      border: "1px solid var(--border-primary, #e2e8f0)",
      backgroundColor: "var(--bg-primary, #ffffff)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "13px",
      minWidth: "900px",
    },
    th: {
      padding: "14px 12px",
      textAlign: "left",
      fontWeight: 600,
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      color: "var(--text-secondary, #64748b)",
      backgroundColor: "var(--bg-secondary, #f8fafc)",
      borderBottom: "2px solid var(--border-primary, #e2e8f0)",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    td: (isHovered) => ({
      padding: "12px",
      borderBottom: "1px solid var(--border-primary, #e2e8f0)",
      verticalAlign: "top",
      backgroundColor: isHovered ? "var(--bg-secondary, #f8fafc)" : "transparent",
      transition: "background-color 0.15s ease",
    }),
    tierBadge: (tier) => ({
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "100px",
      fontSize: "11px",
      fontWeight: 600,
      backgroundColor: tierColors[tier]?.bg || "#94a3b8",
      color: tierColors[tier]?.text || "#fff",
      letterSpacing: "0.3px",
    }),
    weightBadge: (weight) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "100px",
      fontSize: "10px",
      fontWeight: 600,
      backgroundColor: weightColors[weight] + "18",
      color: weightColors[weight],
      letterSpacing: "0.3px",
    }),
    tooltip: {
      fontSize: "11px",
      color: "var(--text-secondary, #64748b)",
      marginTop: "4px",
      lineHeight: 1.4,
    },
    card: (isSelected) => ({
      border: `2px solid ${isSelected ? "#6366f1" : "var(--border-primary, #e2e8f0)"}`,
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      backgroundColor: "var(--bg-primary, #ffffff)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: isSelected ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
    }),
    cardTitle: {
      fontSize: "17px",
      fontWeight: 700,
      margin: "0 0 4px 0",
    },
    cardType: {
      fontSize: "12px",
      color: "var(--text-secondary, #64748b)",
      margin: "0 0 12px 0",
    },
    scoreRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 0",
      borderBottom: "1px solid var(--border-primary, #f1f5f9)",
    },
    platformName: {
      fontWeight: 700,
      fontSize: "14px",
      color: "var(--text-primary, #1a1a2e)",
    },
    legend: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "16px",
      fontSize: "12px",
      color: "var(--text-secondary, #64748b)",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  };

  const getTierColor = (tier) => tierColors[tier]?.bg || "#94a3b8";

  const renderMatrix = () => (
    <>
      <div style={styles.legend}>
        <span style={{ fontWeight: 600, color: "var(--text-primary, #1a1a2e)" }}>Tiers:</span>
        {Object.entries(tierColors).map(([tier, colors]) => (
          <span key={tier} style={styles.legendItem}>
            <span style={{ ...styles.tierBadge(tier), fontSize: "10px" }}>{tier}</span>
          </span>
        ))}
        <span style={{ marginLeft: "12px", fontWeight: 600, color: "var(--text-primary, #1a1a2e)" }}>Priority:</span>
        {Object.entries(weightColors).map(([w, c]) => (
          <span key={w} style={styles.legendItem}>
            <span style={styles.weightBadge(w)}>{w}</span>
          </span>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, minWidth: "160px" }}>Criteria</th>
              {platforms.map((p) => (
                <th key={p.name} style={{ ...styles.th, minWidth: "130px", textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "13px", textTransform: "none", letterSpacing: "0" }}>{p.name}</span>
                    <span style={styles.tierBadge(p.tier)}>{p.tier}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c) => (
              <tr key={c.key}>
                <td style={styles.td(false)}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600, fontSize: "13px" }}>{c.label}</span>
                      <span style={styles.weightBadge(c.weight)}>{c.weight}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary, #64748b)" }}>{c.description}</span>
                  </div>
                </td>
                {platforms.map((p) => {
                  const cellId = `${p.name}-${c.key}`;
                  const data = p[c.key];
                  return (
                    <td
                      key={cellId}
                      style={styles.td(hoveredCell === cellId)}
                      onMouseEnter={() => setHoveredCell(cellId)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <ScoreBar score={data.score} color={getTierColor(p.tier)} />
                        <span style={{ fontSize: "18px", fontWeight: 700, color: getTierColor(p.tier) }}>{data.score}/5</span>
                        {hoveredCell === cellId && (
                          <span style={styles.tooltip}>{data.note}</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td style={{ ...styles.td(false), fontWeight: 600 }}>Pricing</td>
              {platforms.map((p) => (
                <td key={p.name} style={{ ...styles.td(false), textAlign: "center" }}>
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>{p.pricing}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary, #64748b)", marginTop: "2px" }}>{p.pricingDetail}</div>
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ ...styles.td(false), fontWeight: 600 }}>Key Limitation</td>
              {platforms.map((p) => (
                <td key={p.name} style={{ ...styles.td(false), textAlign: "center", fontSize: "12px", color: "var(--text-secondary, #64748b)" }}>
                  {p.limitations}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  const renderCards = () => (
    <div>
      {platforms.map((p) => {
        const isSelected = selectedPlatform === p.name;
        const totalScore = criteria.reduce((sum, c) => sum + p[c.key].score, 0);
        const criticalScore = criteria
          .filter((c) => c.weight === "Critical")
          .reduce((sum, c) => sum + p[c.key].score, 0);

        return (
          <div
            key={p.name}
            style={styles.card(isSelected)}
            onClick={() => setSelectedPlatform(isSelected ? null : p.name)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={styles.cardTitle}>{p.name}</h3>
                  <span style={styles.tierBadge(p.tier)}>{p.tier}</span>
                </div>
                <p style={styles.cardType}>{p.type}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary, #64748b)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Critical Score</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: getTierColor(p.tier) }}>
                  {criticalScore}/15
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary, #64748b)" }}>
                  Total: {totalScore}/40
                </div>
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "var(--text-primary, #1a1a2e)", margin: "8px 0 12px", fontWeight: 500 }}>
              {p.bestFor}
            </div>

            {isSelected && (
              <div style={{ marginTop: "8px" }}>
                {criteria.map((c) => {
                  const data = p[c.key];
                  return (
                    <div key={c.key} style={styles.scoreRow}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                        <span style={{ fontSize: "12px", fontWeight: 500, minWidth: "140px" }}>{c.label}</span>
                        <span style={styles.weightBadge(c.weight)}>{c.weight}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <ScoreBar score={data.score} color={getTierColor(p.tier)} />
                        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "24px", textAlign: "right" }}>{data.score}/5</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{ marginTop: "12px", padding: "10px", backgroundColor: "var(--bg-secondary, #f8fafc)", borderRadius: "8px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>Pricing</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)" }}>{p.pricing} — {p.pricingDetail}</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "8px", marginBottom: "4px", color: "#ef4444" }}>Limitation</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)" }}>{p.limitations}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderVerdict = () => (
    <div>
      <div style={{
        border: "2px solid #0d9488",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "var(--bg-primary, #ffffff)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "20px" }}>★</span>
          <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>Verdict for FocusBear</h3>
        </div>
        <div style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-primary, #1a1a2e)" }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Botpress</strong> is the strongest fit. It scores 15/15 on the three critical criteria (RAG, API actions, function calling) while also providing a visual builder, multi-channel deployment, and LLM flexibility. Your team can define FocusBear API endpoints as custom integrations and index knowledge articles as the RAG source.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>If you want open-source control:</strong> Dify is the best alternative. Fully self-hostable, built-in RAG engine, and agentic workflow builder with tool nodes. Slightly fewer native channel integrations.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>If you want to extend your existing prototype:</strong> OpenAI Assistants API with function calling gives maximum flexibility, but you build and maintain everything (UI, state, channels, error handling).
          </p>
          <p style={{ margin: 0 }}>
            <strong>Avoid Zoho Zia</strong> for this use case. It's locked to the Zoho ecosystem, can't call external APIs like FocusBear's, and its knowledge retrieval is limited to manually curated articles only.
          </p>
        </div>
      </div>

      <div style={{
        border: "1px solid var(--border-primary, #e2e8f0)",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "var(--bg-primary, #ffffff)",
      }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: 700 }}>Suggested FocusBear Stack</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { layer: "Platform", pick: "Botpress", alt: "or Dify (self-hosted)" },
            { layer: "LLM", pick: "Claude Sonnet 4", alt: "or GPT-4o-mini" },
            { layer: "Embeddings", pick: "BGE-M3", alt: "or e5-base-instruct" },
            { layer: "Vector DB", pick: "Qdrant or ChromaDB", alt: "or Pinecone (managed)" },
          ].map((s) => (
            <div key={s.layer} style={{
              padding: "14px",
              borderRadius: "8px",
              backgroundColor: "var(--bg-secondary, #f8fafc)",
              border: "1px solid var(--border-primary, #e2e8f0)",
            }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-secondary, #64748b)", marginBottom: "4px" }}>{s.layer}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary, #1a1a2e)" }}>{s.pick}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary, #64748b)", marginTop: "2px" }}>{s.alt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>FocusBear Agentic Chatbot: Platform Comparison</h1>
        <p style={styles.subtitle}>RAG knowledge retrieval + API action execution (create habits, update settings) via FocusBear API</p>
      </div>

      <div style={styles.tabs}>
        {[
          { id: "matrix", label: "Score Matrix" },
          { id: "cards", label: "Platform Cards" },
          { id: "verdict", label: "Verdict" },
        ].map((t) => (
          <button key={t.id} style={styles.tab(view === t.id)} onClick={() => setView(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {view === "matrix" && renderMatrix()}
      {view === "cards" && renderCards()}
      {view === "verdict" && renderVerdict()}
    </div>
  );
}
