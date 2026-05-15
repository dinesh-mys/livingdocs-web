const scanOutput = `Scanning /your/repo ...
Files examined : 48
Stale docs     : 3

  [██████████]  100%  src/Auth.cs
               doc updated : 2024-09-01
               code changed: 2025-03-15

  [██████░░░░]   60%  src/Payment.cs
               doc updated : 2024-11-20
               code changed: 2025-04-02

  [████░░░░░░]   40%  src/Tax.cs
               doc updated : 2025-01-05
               code changed: 2025-04-28`;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white font-mono">

      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-white font-bold text-lg tracking-tight">LivingDocs</span>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#tools" className="hover:text-white transition">Tools</a>
          <a href="#setup" className="hover:text-white transition">Setup</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="https://github.com/dinesh-mys/livingdocs" target="_blank" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs text-white/60 mb-6">
          MCP Server · Claude Desktop · Claude Code · GitHub Copilot
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Your code evolves.<br />
          <span className="text-[#7ee787]">Your docs don&apos;t.</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          LivingDocs detects stale doc comments, answers questions about your codebase,
          and suggests updates using Claude AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="bg-[#161b22] border border-white/10 rounded-lg px-6 py-3 text-[#7ee787] text-sm">
            dotnet tool install -g LivingDocs.Mcp
          </div>
          <a
            href="#pricing"
            className="bg-[#238636] hover:bg-[#2ea043] transition text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Get Pro — $10/mo
          </a>
        </div>

        {/* Terminal demo */}
        <div className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden text-left max-w-2xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0d1117]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
            <span className="text-white/30 text-xs ml-2">terminal</span>
          </div>
          <pre className="p-6 text-sm text-[#e6edf3] overflow-x-auto leading-relaxed whitespace-pre">
            <span className="text-[#7ee787]">$ </span>{"livingdocs-mcp scan /your/repo\n"}
            {scanOutput}
          </pre>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-3">Tools</h2>
        <p className="text-white/50 text-center text-sm mb-12">Three free tools. Two Pro tools.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="text-left py-3 pr-6">Tool</th>
                <th className="text-left py-3 pr-6">Tier</th>
                <th className="text-left py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { tool: "scan_repo", tier: "Free", desc: "Scan a repo and list stale doc files with staleness % (0–100%)" },
                { tool: "query_docs", tier: "Free", desc: "Answer natural-language questions about your codebase using doc comments" },
                { tool: "suggest_doc_update", tier: "Free", desc: "Ask Claude to rewrite a stale doc comment in context" },
                { tool: "sync_confluence", tier: "Pro", desc: "Push Claude-generated doc updates directly to Confluence pages" },
                { tool: "scan_org", tier: "Pro", desc: "Scan every repo in a GitHub org and return an org-wide staleness report" },
              ].map(({ tool, tier, desc }) => (
                <tr key={tool} className="text-white/80">
                  <td className="py-4 pr-6 text-[#7ee787] font-medium whitespace-nowrap">{tool}</td>
                  <td className="py-4 pr-6">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${tier === "Pro" ? "bg-[#bb800020] text-[#e3b341] border border-[#e3b34130]" : "bg-[#23863620] text-[#7ee787] border border-[#7ee78730]"}`}>
                      {tier}
                    </span>
                  </td>
                  <td className="py-4 text-white/60">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Setup */}
      <section id="setup" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-3">Setup</h2>
        <p className="text-white/50 text-center text-sm mb-12">Works anywhere Claude does.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Claude Desktop",
              file: "claude_desktop_config.json",
              config: `{
  "mcpServers": {
    "livingdocs": {
      "command": "livingdocs-mcp",
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}`
            },
            {
              title: "Claude Code",
              file: ".mcp.json",
              config: `{
  "mcpServers": {
    "livingdocs": {
      "command": "livingdocs-mcp",
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}`
            },
            {
              title: "GitHub Copilot",
              file: ".vscode/mcp.json",
              config: `{
  "servers": {
    "livingdocs": {
      "type": "stdio",
      "command": "livingdocs-mcp",
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}`
            }
          ].map(({ title, file, config }) => (
            <div key={title} className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-white text-sm font-medium">{title}</span>
                <span className="text-white/30 text-xs">{file}</span>
              </div>
              <pre className="p-4 text-xs text-white/60 overflow-x-auto leading-relaxed">{config}</pre>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 text-xs mt-6">
          Requires <a href="https://dotnet.microsoft.com/download" className="text-[#7ee787] hover:underline">.NET 10 SDK</a> and an <a href="https://console.anthropic.com" className="text-[#7ee787] hover:underline">Anthropic API key</a>
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-3">Pricing</h2>
        <p className="text-white/50 text-center text-sm mb-12">Start free. Upgrade when you need Pro tools.</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
            <div className="text-white/50 text-sm mb-2">Free</div>
            <div className="text-3xl font-bold mb-1">$0</div>
            <div className="text-white/40 text-xs mb-6">forever</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> scan_repo</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> query_docs</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> suggest_doc_update</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> C#, TS, JS, Python, Go</li>
            </ul>
            <div className="mt-6 bg-[#0d1117] rounded-lg px-4 py-2 text-xs text-[#7ee787]">
              dotnet tool install -g LivingDocs.Mcp
            </div>
          </div>
          <div className="bg-[#161b22] border border-[#238636]/50 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#238636] text-white text-xs px-3 py-1 rounded-full">Most Popular</div>
            <div className="text-white/50 text-sm mb-2">Pro</div>
            <div className="text-3xl font-bold mb-1">$10</div>
            <div className="text-white/40 text-xs mb-6">per month</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> Everything in Free</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> sync_confluence</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> scan_org</li>
              <li className="flex gap-2"><span className="text-[#7ee787]">✓</span> License key via Polar.sh</li>
            </ul>
            <a
              href="https://polar.sh/novaders-llp/livingdocs"
              target="_blank"
              className="mt-6 block text-center bg-[#238636] hover:bg-[#2ea043] transition text-white text-sm py-2 rounded-lg font-medium"
            >
              Get Pro License
            </a>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-white/40 text-sm mb-4">Supported languages</p>
        <div className="flex flex-wrap justify-center gap-3">
          {["C#", "TypeScript", "JavaScript", "Python", "Go"].map(lang => (
            <span key={lang} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm text-white/70">
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white/40 text-sm">© 2026 Novaders LLP · MIT License</span>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <a href="https://github.com/dinesh-mys/livingdocs" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://www.nuget.org/packages/LivingDocs.Mcp" target="_blank" className="hover:text-white transition">NuGet</a>
          <a href="https://polar.sh/novaders-llp/livingdocs" target="_blank" className="hover:text-white transition">Polar</a>
          <a href="https://github.com/dinesh-mys/livingdocs/issues" target="_blank" className="hover:text-white transition">Support</a>
        </div>
      </footer>

    </main>
  );
}
