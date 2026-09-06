function StackDiagram() {
  const slab = (cy: number, cls: string) => (
    <g className={cls} transform={`translate(480,${cy}) scale(1,0.5) rotate(45)`}>
      <rect x="-96" y="-96" width="192" height="192" rx="26" />
    </g>
  )
  return (
    <svg className="stack" viewBox="0 0 960 360" role="img" aria-label="Schemas run on the ata engine, everywhere">
      <g className="d-links">
        <line x1="272" y1="80" x2="410" y2="80" />
        <line x1="550" y1="180" x2="688" y2="180" />
        <line x1="272" y1="280" x2="410" y2="280" />
      </g>
      {slab(280, 'd-slab')}
      {slab(180, 'd-slab d-mid')}
      {slab(80, 'd-slab')}
      <g className="d-chip" transform="translate(104,80)">
        <rect x="0" y="-19" width="160" height="38" rx="19" />
        <text x="80" y="5">YOUR SCHEMAS</text>
      </g>
      <g className="d-chip d-chip-dark" transform="translate(696,180)">
        <rect x="0" y="-19" width="140" height="38" rx="19" />
        <text x="70" y="5">ATA ENGINE</text>
      </g>
      <g className="d-chip" transform="translate(104,280)">
        <rect x="0" y="-19" width="160" height="38" rx="19" />
        <text x="80" y="5">EVERYWHERE</text>
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
}

const PRODUCTS: Product[] = [
  {
    idx: '01',
    tag: 'ATA-VALIDATOR',
    name: 'ata-validator',
    headline: 'The JSON Schema engine',
    body:
      'Draft 2020-12, draft 7 and the v1 dialect at 100% of the official suite, compiled and interpreted alike, with compiler-grade error reports and an optional native accelerator.',
    meta: '★ 359 · 7 native builds · 0 required deps',
    href: 'https://github.com/ata-core/ata-validator',
    holo: true,
    panel: {
      title: 'npm test',
      lines: [
        { t: '$ npm run test:suite', c: 'dim' },
        { t: 'PASS  draft2020-12  1299/1299', c: 'ok' },
        { t: 'PASS  draft7          927/927', c: 'ok' },
        { t: 'PASS  v1            1133/1133', c: 'ok' },
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
      'Same answers as zod, differential-tested on 13,030 values. Verdicts in 21 ns, rejections in 5, and the speed survives a strict CSP where compiled zod loses its advantage.',
    meta: 'v0.1.0 · 13,030-value differential suite',
    href: 'https://github.com/ata-core/ata-zod',
    panel: {
      title: 'bridge.ts',
      lines: [
        { t: "import { compile } from '@ata-project/zod'", c: 'dim' },
        { t: 'const check = compile(userSchema)' },
        { t: 'check.isValid(data)   // 21 ns' },
        { t: 'check.safeParse(bad)  // 6.7 ns, lazy ZodError' },
      ],
    },
  },
  {
    idx: '03',
    tag: 'AHEAD OF TIME',
    name: 'ata build',
    headline: 'Validation that compiles away',
    body:
      'Schemas become standalone modules that import nothing, so the validator disappears into your bundle and the size argument ends.',
    meta: '~1 KB gzipped per schema · 0 runtime deps',
    href: 'https://github.com/ata-core/ata-validator#ahead-of-time-compilation',
    panel: {
      title: 'shell',
      lines: [
        { t: '$ npx ata compile schema.json', c: 'dim' },
        { t: 'validate.js  2.3 KB · 775 B gzip · 0 deps', c: 'ok' },
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
    headline: 'Checks JSON Schema cannot say',
    body:
      'instanceof and typeof, compiled into the hot path instead of bolted on around it, so custom keywords keep rejections at nanoseconds.',
    meta: 'v0.2.0 · compiled keyword checks',
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

export default function App() {
  return (
    <>
      <nav>
        <div className="wrap nav-in">
          <a className="mark" href="/">ata<span>_</span>project</a>
          <div className="nav-links">
            <a href="#open-source">Open source</a>
            <a href="#numbers">Numbers</a>
            <a href="https://ata-validator.com">Docs</a>
            <a href="https://github.com/ata-core">GitHub</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <p className="status"><i /> every figure / measured</p>
          <h1>
            The Validation <em>Layer</em>
            <br />
            for JavaScript
          </h1>
          <p className="lede">
            JSON Schema is the intermediate representation of validation: OpenAPI speaks it,
            LLMs emit it, schema libraries compile to it. ata executes it, everywhere.
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

      <section className="os" id="open-source">
        <div className="wrap">
          <p className="os-eyebrow">OPEN SOURCE</p>
          <h2>One engine, many doors</h2>
          <p className="os-lede">
            Everything below runs the same core: a compiled validator where code generation is
            allowed, an interpreter that passes the same suite where it is not.
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
                <div className={p.holo ? 'panel holo' : 'panel'}>
                  <div className="panel-bar">{p.panel.title}</div>
                  <pre>
                    {p.panel.lines.map((l, i) => (
                      <span key={i} className={l.c}>{l.t}{'\n'}</span>
                    ))}
                  </pre>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers" id="numbers">
        <div className="wrap">
          <h2>
            Small numbers, stated <em>plainly</em>
          </h2>
          <div className="num-grid">
            <div><div className="n">3,503</div><p>npm downloads last week</p></div>
            <div><div className="n">3,359<span>/3,359</span></div><p>official suite cases passing, three dialects</p></div>
            <div><div className="n">12</div><p>packages on npm, one engine underneath</p></div>
          </div>
          <p className="num-note">as of 2026-09-06 &middot; every figure re-runs in CI on each change, with code generation enabled and blocked</p>
        </div>
      </section>

      <section className="mission">
        <div className="wrap">
          <blockquote>
            A validator that wrongly rejects gets a bug report. One that wrongly accepts does
            not. So the order is fixed: <em>correct first, then fastest,</em> everywhere
            JavaScript runs.
          </blockquote>
          <a className="btn btn-primary" href="https://ata-validator.com/docs">Read the docs</a>
        </div>
      </section>

      <section className="resources">
        <div className="wrap">
          <h2>Go deeper</h2>
          <div className="res-grid">
            <a href="https://ata-validator.com/docs/benchmarks">
              <p className="res-tag">BENCHMARKS</p>
              <h3>The numbers behind the claims</h3>
              <p>Per-request cost, startup, bundle size, and what blocked codegen costs.</p>
            </a>
            <a href="https://ata-validator.com/docs/integrations">
              <p className="res-tag">INTEGRATIONS</p>
              <h3>zod, Fastify, Vite, forms</h3>
              <p>Every door into the engine, each with setup and the measured cost.</p>
            </a>
            <a href="https://ata-validator.com/playground">
              <p className="res-tag">PLAYGROUND</p>
              <h3>Try it in your browser</h3>
              <p>Schema in, verdict and compiler-grade errors out, with the compiled module.</p>
            </a>
          </div>
        </div>
      </section>

      <div className="banner">
        <span className="banner-mark">a<span>_</span></span>
      </div>

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
          <div className="foot-note">
            <p className="foot-h">MEASURED ON</p>
            <p>Node 25, Apple silicon<br />zod 4.5.4 &middot; ata-validator 1.13.1</p>
          </div>
        </div>
      </footer>
    </>
  )
}
