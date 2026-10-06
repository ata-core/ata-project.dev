import { useEffect, useRef, useState } from 'react'

const TACH_MAX = 220
const TACH_VALUE = 200
const ang = (v: number) => v - 110
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180
  return [280 + r * Math.sin(a), 280 - r * Math.cos(a)] as const
}
const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = pt(from, r)
  const [x2, y2] = pt(to, r)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

function Tach() {
  const ref = useRef<SVGSVGElement | null>(null)
  const [on, setOn] = useState(false)
  const [read, setRead] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return
        io.disconnect()
        setOn(true)
        if (still) { setRead(TACH_VALUE); return }
        const t0 = performance.now()
        const dur = 1900
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur)
          setRead(Math.round(TACH_VALUE * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const minors = []
  for (let v = 0; v <= TACH_MAX; v += 10) {
    const major = v % 20 === 0
    const red = v >= TACH_VALUE
    const [x1, y1] = pt(ang(v), major ? 214 : 222)
    const [x2, y2] = pt(ang(v), 232)
    minors.push(
      <line key={v} x1={x1} y1={y1} x2={x2} y2={y2}
        className={red ? 't-tick t-red' : major ? 't-tick t-major' : 't-tick'} />,
    )
  }
  const labels = []
  for (let v = 0; v <= TACH_VALUE; v += 40) {
    const [x, y] = pt(ang(v), 190)
    labels.push(<text key={v} x={x} y={y + 5} className="t-num">{v}</text>)
  }

  return (
    <svg ref={ref} className={on ? 'tach on' : 'tach'} viewBox="0 0 560 400" role="img"
      aria-label="Rejections per second through a zod schema: 200 million on one core">
      <path d={arc(ang(0), ang(TACH_MAX), 236)} className="t-track" />
      <path d={arc(ang(TACH_VALUE), ang(TACH_MAX), 236)} className="t-zone" />
      {minors}
      {labels}
      <g className="t-needle">
        <line x1="280" y1="304" x2="280" y2="106" />
      </g>
      <circle cx="280" cy="280" r="11" className="t-hub" />
      <text x="280" y="352" className="t-read">{read}<tspan className="t-unit"> M/s</tspan></text>
      <text x="280" y="382" className="t-cap">REJECTIONS PER SECOND, ONE CORE</text>
    </svg>
  )
}

function StackDiagram() {
  const slab = (cy: number, cls: string) => (
    <g className={cls} transform={`translate(340,${cy}) scale(1,0.5) rotate(45)`}>
      <rect x="-96" y="-96" width="192" height="192" rx="26" />
    </g>
  )
  return (
    <svg className="stack" viewBox="0 0 640 460" role="img" aria-label="Schemas run on the ata engine, everywhere">
      <g className="d-links">
        <line x1="150" y1="100" x2="212" y2="100" />
        <line x1="470" y1="230" x2="504" y2="230" />
        <line x1="150" y1="360" x2="212" y2="360" />
      </g>
      {slab(360, 'd-slab')}
      {slab(230, 'd-slab d-mid')}
      {slab(100, 'd-slab')}
      <g className="d-chip" transform="translate(0,100)">
        <rect x="0" y="-19" width="146" height="38" rx="19" />
        <text x="73" y="5">YOUR SCHEMAS</text>
      </g>
      <g className="d-chip d-chip-dark" transform="translate(510,230)">
        <rect x="0" y="-19" width="130" height="38" rx="19" />
        <text x="65" y="5">ATA ENGINE</text>
      </g>
      <g className="d-chip" transform="translate(0,360)">
        <rect x="0" y="-19" width="146" height="38" rx="19" />
        <text x="73" y="5">EVERYWHERE</text>
      </g>
    </svg>
  )
}

type Product = {
  idx: string
  tag: string
  name: string
  headline: string
  body: string
  meta: string
  href: string
  panel: { title: string; lines: Array<{ t: string; c?: string }> }
  holo?: boolean
  dial?: boolean
}

const PRODUCTS: Product[] = [
  {
    idx: '01',
    tag: 'ATA-VALIDATOR',
    name: 'ata-validator',
    headline: 'The JSON Schema engine',
    body:
      'Draft 2020-12, draft 7 and the v1 dialect at 100% of the official suite, compiled and interpreted alike, with compiler-grade error reports and an optional native accelerator.',
    meta: '★ 364 · 7 native builds · 0 required deps',
    href: 'https://github.com/ata-core/ata-validator',
    holo: true,
    panel: {
      title: 'npm test',
      lines: [
        { t: '$ npm run test:suite', c: 'dim' },
        { t: 'PASS  draft2020-12  1301/1301', c: 'ok' },
        { t: 'PASS  draft7          929/929', c: 'ok' },
        { t: 'PASS  v1            1135/1135', c: 'ok' },
        { t: '0 known failures, 0 regressions', c: 'dim' },
      ],
    },
  },
  {
    idx: '02',
    tag: 'ZOD BRIDGE',
    name: '@ata-project/zod',
    headline: 'zod schemas on the engine',
    body:
      'Same answers as zod, differential-tested on 15,068 values. Verdicts in 23 ns, rejections in 6, and isValidBytes answers straight from raw bytes with no JSON.parse, a path zod does not have.',
    meta: 'v0.3.0 · 15,068-value differential suite · raw-byte verdicts',
    href: 'https://github.com/ata-core/ata-zod',
    dial: true,
    panel: {
      title: 'bridge.ts',
      lines: [
        { t: "import { compile } from '@ata-project/zod'", c: 'dim' },
        { t: 'const check = compile(userSchema)' },
        { t: 'check.isValid(data)   // 23 ns' },
        { t: 'check.safeParse(bad)  // 8.5 ns, lazy ZodError' },
      ],
    },
  },
  {
    idx: '03',
    tag: 'AHEAD OF TIME',
    name: 'ata build',
    headline: 'Validation that compiles away',
    body:
      'Schemas become standalone modules that import nothing. The validator ships inside your bundle, from about one kilobyte gzipped for a simple schema to eight for a heavy one, full error detail included.',
    meta: '1.3 to 7.8 KB gzipped across the bench schemas · 0 runtime deps',
    href: 'https://github.com/ata-core/ata-validator#ahead-of-time-compilation',
    panel: {
      title: 'shell',
      lines: [
        { t: '$ npx ata compile schema.json', c: 'dim' },
        { t: 'schema.validator.mjs  5.8 KB · 1.5 KB gzip · 0 deps', c: 'ok' },
      ],
    },
  },
  {
    idx: '04',
    tag: 'BUNDLER',
    name: 'ata-vite',
    headline: 'The same output, at build time',
    body:
      'Import a schema, get a compiled validator, ship no compiler to the browser. JavaScript and TypeScript sources, path aliases respected.',
    meta: 'vite plugin · js + ts',
    href: 'https://github.com/ata-core/ata-vite',
    panel: {
      title: 'vite.config.js',
      lines: [
        { t: "import ata from 'ata-vite'", c: 'dim' },
        { t: 'export default { plugins: [ata()] }' },
      ],
    },
  },
  {
    idx: '05',
    tag: 'SERVER',
    name: 'fastify-ata',
    headline: 'Fastify wiring, defaults applied',
    body:
      "ata is listed in Fastify's documentation as an alternative validator; the plugin matches the framework's built-in behavior with nothing to tune.",
    meta: "listed in Fastify's docs",
    href: 'https://github.com/ata-core/fastify-ata',
    panel: {
      title: 'server.js',
      lines: [
        { t: "import ata from 'fastify-ata'", c: 'dim' },
        { t: 'app.register(ata)' },
      ],
    },
  },
  {
    idx: '06',
    tag: 'EXTEND',
    name: '@ata-project/keywords',
    headline: 'instanceof and typeof',
    body:
      'JavaScript-native checks that JSON Schema has no words for, compiled into the hot path instead of bolted on around it. Rejections stay at nanoseconds.',
    meta: 'v0.3.1 · compiled keyword checks',
    href: 'https://github.com/ata-core/ata-keywords',
    panel: {
      title: 'keywords.js',
      lines: [
        { t: "{ createdAt: { instanceof: 'Date' } }", c: 'dim' },
        { t: 'withKeywords(new Validator(schema))' },
      ],
    },
  },
]

// Projects whose code depends on ata, from GitHub's dependency graph, and the
// framework that lists the plugin. Each line is what the project does with it,
// checked against its own code, not an endorsement.
const USED_BY: { name: string; href: string; what: string; path: string; logo?: string; mono?: string }[] = [
  { name: 'Socket', href: 'https://github.com/SocketDev', logo: '/refs/socket.png', path: 'SocketDev', what: 'Uses ata, compiled ahead of time, in the shared build tooling of its repositories.' },
  { name: 'Fastify', href: 'https://fastify.dev/ecosystem/', logo: '/refs/fastify.png', path: 'fastify.dev/ecosystem', what: 'Lists the fastify-ata plugin in its ecosystem.' },
  { name: 'react-jsonschema-form', href: 'https://github.com/rjsf-team/react-jsonschema-form', logo: '/refs/rjsf.png', path: 'rjsf-team/react-jsonschema-form', what: 'Ships an ata validator in its main repository, runtime and precompiled.' },
  { name: 'JollyPixel', href: 'https://github.com/JollyPixel/editor', logo: '/refs/jollypixel.jpg', path: 'JollyPixel/editor', what: 'Parses and validates JSON on its back end with ata, compiled ahead of time.' },
  { name: 'better-drizzle', href: 'https://github.com/almeidazs/better-drizzle', mono: 'bd', path: 'almeidazs/better-drizzle', what: 'Ships an ata plugin for queries and rows.' },
  { name: 'svelte-jsonschema-form', href: 'https://github.com/x0k/svelte-jsonschema-form', mono: 'sj', path: 'x0k/svelte-jsonschema-form', what: 'Publishes an ata validator package, runtime and precompiled.' },
]

// The project's supply-chain standing, read live from the two OpenSSF services so
// the page never states a level or score the services no longer report. Until the
// answers arrive, or if a service does not answer, a card is a plain link.
function useLive<T>(url: string, pick: (j: any) => T | undefined): T | undefined {
  const [v, setV] = useState<T | undefined>(undefined)
  useEffect(() => {
    if (typeof fetch !== 'function') return
    let alive = true
    fetch(url).then((r) => (r.ok ? r.json() : null)).then((j) => { if (alive && j) setV(pick(j)) }).catch(() => {})
    return () => { alive = false }
  }, [url])
  return v
}

function Security() {
  const level = useLive<string>('https://www.bestpractices.dev/projects/15196.json', (j) => j && j.badge_level)
  const score = useLive<number>('https://api.scorecard.dev/projects/github.com/ata-core/ata-validator', (j) => j && j.score)
  return (
    <section className="security" id="security">
      <div className="wrap">
        <p className="sec-eyebrow">SUPPLY CHAIN</p>
        <h2>Security</h2>
        <div className="sec-grid">
          <a className="sec-card sec-badge" href="https://www.bestpractices.dev/projects/15196" target="_blank" rel="noopener noreferrer">
            <img src="/openssf-best-practices.svg" alt="" width={64} height={64} />
            <div>
              <div className="sec-v">{level ? level[0].toUpperCase() + level.slice(1) : 'Best Practices'}</div>
              <p>OpenSSF Best Practices badge</p>
            </div>
          </a>
          <a className="sec-card" href="https://scorecard.dev/viewer/?uri=github.com/ata-core/ata-validator" target="_blank" rel="noopener noreferrer">
            <div className="sec-v">{typeof score === 'number' ? <>{score.toFixed(1)}<span>/10</span></> : 'Scorecard'}</div>
            <p>OpenSSF Scorecard</p>
          </a>
          <a className="sec-card" href="https://www.npmjs.com/package/ata-validator#provenance" target="_blank" rel="noopener noreferrer">
            <div className="sec-v">SLSA</div>
            <p>npm provenance on every release, published from CI</p>
          </a>
          <a className="sec-card" href="https://github.com/ata-core/ata-validator/security" target="_blank" rel="noopener noreferrer">
            <div className="sec-v">CodeQL</div>
            <p>on every push, private vulnerability reports</p>
          </a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <nav>
        <div className="wrap nav-in">
          <a className="mark" href="/">ata project</a>
          <div className="nav-links">
            <a href="#open-source">Open source</a>
            <a href="#numbers">Numbers</a>
            <a href="https://ata-validator.com">Docs</a>
            <a href="https://github.com/ata-core">GitHub</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap hero-copy">
          <h1 className="hero-word">ata</h1>
          <p className="hero-sub">THE VALIDATION LAYER FOR JAVASCRIPT</p>
        </div>
        <div className="wrap hero-strip">
          <span><b>6 ns</b> reject</span>
          <span><b>23 ns</b> accept</span>
          <span><b>1.3 KB</b> compiled</span>
          <span><b>3</b> dialects at 100%</span>
        </div>
        <div className="wrap hero-stage">
          <p className="lede">
            Most of the ecosystem already describes data with JSON Schema, from OpenAPI to
            LLM structured outputs. ata is an engine for it that stays fast in every runtime.
          </p>
          <StackDiagram />
        </div>
      </header>

      <div className="trust">
        <div className="wrap">
          <p>Verified and shipped in public</p>
          <div className="trust-row">
            <span>FASTIFY DOCS</span>
            <span>REACT-JSONSCHEMA-FORM</span>
            <span>BOWTIE HARNESS</span>
            <span>STANDARD SCHEMA</span>
          </div>
        </div>
      </div>

      <section className="usedby" id="used-by">
        <div className="wrap">
          <p className="ub-eyebrow">IN THE WILD</p>
          <h2>Who uses <span className="ub-word">ata</span></h2>
          <p className="ub-lede">
            Projects whose code depends on ata, from GitHub&rsquo;s dependency graph, and what each
            does with it.
          </p>
          <ul className="ub-grid">
            {USED_BY.map((u) => (
              <li key={u.name}>
                <a href={u.href} target="_blank" rel="noopener noreferrer">
                  {u.logo
                    ? <img src={u.logo} alt="" width={36} height={36} loading="lazy" />
                    : <span className="ub-mono" aria-hidden="true">{u.mono}</span>}
                  <strong>{u.name}</strong>
                  <span className="ub-what">{u.what}</span>
                  <span className="ub-path">{u.path}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="perf" id="performance">
        <div className="wrap">
          <p className="perf-eyebrow">PERFORMANCE</p>
          <div className="perf-rows">
            <div className="perf-row">
              <div className="perf-num">6<span>ns</span></div>
              <div className="perf-label">
                <p>0 &rarr; VERDICT</p>
                <p>an invalid document, rejected, through a zod schema</p>
              </div>
            </div>
            <div className="perf-row">
              <div className="perf-num">23<span>ns</span></div>
              <div className="perf-label">
                <p>ACCEPT</p>
                <p>a valid document through the same schema</p>
              </div>
            </div>
            <div className="perf-row">
              <div className="perf-num">52<span>&micro;s</span></div>
              <div className="perf-label">
                <p>COLD START</p>
                <p>compile(schema), a zod definition to a ready validator</p>
              </div>
            </div>
            <div className="perf-row">
              <div className="perf-num">1.3<span>KB</span></div>
              <div className="perf-label">
                <p>CURB WEIGHT</p>
                <p>a simple schema compiled ahead of time, gzipped, zero dependencies</p>
              </div>
            </div>
          </div>
          <p className="perf-note">medians on Node 25, Apple silicon, zod 4.6.5, @ata-project/zod 0.3.0, ata-validator 1.33.1</p>
        </div>
      </section>

      <section className="os" id="open-source">
        <div className="wrap">
          <p className="os-eyebrow">GITHUB.COM/ATA-CORE</p>
          <h2>Open source</h2>
          <p className="os-lede">
            Every package below runs the same core: a compiled validator where code generation
            is allowed, and an interpreter that passes the same test suite where it is not.
          </p>

          <div className="os-list">
            {PRODUCTS.map((p) => (
              <article className="os-row" key={p.name}>
                <div className="os-text">
                  <p className="os-tag"><span>{p.idx}</span>{p.tag}</p>
                  <h3>{p.headline}</h3>
                  <p className="os-body">{p.body}</p>
                  <a className="os-btn" href={p.href}>Explore {p.name}</a>
                  <p className="os-meta">{p.meta}</p>
                </div>
                {p.dial ? (
                  <Tach />
                ) : (
                  <div className={p.holo ? 'panel holo' : 'panel'}>
                    <div className="panel-bar">{p.panel.title}</div>
                    <pre>
                      {p.panel.lines.map((l, i) => (
                        <span key={i} className={l.c}>{l.t}{'\n'}</span>
                      ))}
                    </pre>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers" id="numbers">
        <div className="wrap">
          <h2>The numbers</h2>
          <div className="num-grid">
            <div><div className="n">8,289</div><p>npm downloads last week</p></div>
            <div><div className="n">3,365<span>/3,365</span></div><p>official suite cases passing, three dialects</p></div>
            <div><div className="n">15</div><p>packages on npm, one engine underneath</p></div>
          </div>
          <p className="num-note">downloads for 2026-09-28 to 2026-10-04, ata-validator 1.46.0 &middot; suite figures re-run in CI on each change, with code generation enabled and blocked</p>
        </div>
      </section>

      <Security />

      <section className="mission" id="manifesto">
        <div className="wrap">
          <p className="perf-eyebrow">MANIFESTO</p>
          <div className="mani-body">
            <p>
              Software no longer talks only to software. Models write JSON now. Configs are
              generated. Payloads cross runtimes that forbid eval. Every one of those
              crossings is a boundary, and every boundary is a promise nobody checked.
            </p>
            <p>
              We think validation belongs at build time. A schema is not a runtime guest, it
              is code: compile it, ship the result, let it carry its own errors, its own file
              positions, its own hash. No dependency at the boundary. Nothing generated at
              runtime. Nothing accepted silently.
            </p>
            <p>ata is that compiler.</p>
          </div>
          <ul className="mani-proof">
            <li>
              <a href="https://ata-validator.com/docs/compliance">
                100% of the official JSON Schema test suite, three dialects, with eval blocked.
              </a>
            </li>
            <li>
              <a href="https://ata-validator.com/docs/integrations/cloudflare-workers">
                27,024,938 verdicts per second on the platform where most validators cannot start.
              </a>
            </li>
            <li>
              <a href="https://github.com/mertcanaltin/ata-workers-demo">
                A compiled module with zero imports: about 19 KB for the verdict, about 32 KB
                with full per-field error detail.
              </a>
            </li>
            <li>
              <a href="https://ata-validator.com/docs/benchmarks">
                Every number on this page has a harness you can run.
              </a>
            </li>
          </ul>
          <blockquote>
            A validator that wrongly rejects gets a bug report. One that wrongly accepts does
            not. ata is built in that order: <em>correct first, then fast.</em>
          </blockquote>
          <a className="btn btn-primary" href="https://ata-validator.com/docs">Read the docs</a>
        </div>
      </section>

      <section className="resources">
        <div className="wrap">
          <h2>Resources</h2>
          <div className="res-grid">
            <a href="https://ata-validator.com/docs/benchmarks">
              <p className="res-tag">BENCHMARKS</p>
              <h3>What validation costs</h3>
              <p>Per-request cost, startup, bundle size, and the price of blocked codegen.</p>
            </a>
            <a href="https://ata-validator.com/docs/integrations">
              <p className="res-tag">INTEGRATIONS</p>
              <h3>zod, Fastify, Vite, forms</h3>
              <p>Each integration on its own page, with setup and the measured cost.</p>
            </a>
            <a href="https://ata-validator.com/playground">
              <p className="res-tag">PLAYGROUND</p>
              <h3>Try it in your browser</h3>
              <p>Schema in, verdict and compiler-grade errors out, with the compiled module.</p>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-grid">
          <div>
            <p className="foot-h">PRODUCTS</p>
            <a href="https://github.com/ata-core/ata-validator">ata-validator</a>
            <a href="https://github.com/ata-core/ata-zod">@ata-project/zod</a>
            <a href="https://github.com/ata-core/ata-keywords">@ata-project/keywords</a>
            <a href="https://github.com/ata-core/ata-vite">ata-vite</a>
            <a href="https://github.com/ata-core/fastify-ata">fastify-ata</a>
          </div>
          <div>
            <p className="foot-h">DOCS</p>
            <a href="https://ata-validator.com/docs/quick-start">Quick start</a>
            <a href="https://ata-validator.com/docs/benchmarks">Benchmarks</a>
            <a href="https://ata-validator.com/docs/compliance">Compliance</a>
            <a href="https://ata-validator.com/docs/api">API reference</a>
          </div>
          <div>
            <p className="foot-h">ELSEWHERE</p>
            <a href="https://github.com/ata-core">GitHub</a>
            <a href="https://www.npmjs.com/package/ata-validator">npm</a>
            <a href="https://ata-validator.com/playground">Playground</a>
          </div>
        </div>
        <div className="foot-word" aria-hidden="true">ata</div>
      </footer>
    </>
  )
}
