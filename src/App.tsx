export default function App() {
  return (
    <>
      
      <nav>
        <div className="wrap nav-in">
          <a className="mark" href="/">ata<span>_</span>project</a>
          <div className="nav-links">
            <a href="#products">Products</a>
            <a href="#vision">Vision</a>
            <a href="https://ata-validator.com">Docs</a>
            <a href="https://github.com/ata-core">GitHub</a>
          </div>
        </div>
      </nav>
      
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">ata project</p>
          <h1>The <em>validation layer</em><br />for JavaScript</h1>
          <p className="lede">
            JSON Schema is the intermediate representation of validation: OpenAPI speaks it,
            LLMs emit it, and schema libraries compile to it. ata executes it, everywhere,
            and stays fast where nothing else does.
          </p>
          <div className="cta">
            <a className="btn btn-primary" href="https://ata-validator.com/docs/quick-start">Get started</a>
            <a className="btn btn-ghost" href="https://www.npmjs.com/package/ata-validator">$ npm i ata-validator</a>
          </div>
        </div>
      </header>
      
      <div className="proof">
        <div className="wrap proof-in">
          <div><div className="p-num">100<small>%</small></div><div className="p-cap">official test suite, three dialects,<br />compiled and interpreted alike</div></div>
          <div><div className="p-num">21<small>ns</small></div><div className="p-cap">to accept a document<br />through a zod schema</div></div>
          <div><div className="p-num">5<small>ns</small></div><div className="p-cap">to reject one, the path<br />attackers actually exercise</div></div>
          <div><div className="p-num">~1<small>KB</small></div><div className="p-cap">a schema compiled ahead of time,<br />gzipped, importing nothing</div></div>
        </div>
      </div>
      
      <section id="products">
        <div className="wrap">
          <p className="sec-eyebrow">PRODUCTS</p>
          <h2>One engine, many doors</h2>
          <p className="sec-lede">
            Everything below runs the same core: a compiled validator where code generation is
            allowed, an interpreter that passes the same suite where it is not, and an optional
            native accelerator.
          </p>
          <div className="grid">
            <a className="card" href="https://github.com/ata-core/ata-validator">
              <span className="tag">ENGINE</span>
              <h3>ata-validator</h3>
              <p>The JSON Schema engine. Draft 2020-12, draft 7 and the v1 dialect at 100% of the
                 official suite, with compiler-grade error reports.</p>
              <div className="stat">3 engines &middot; 0 required deps</div>
            </a>
            <a className="card" href="https://github.com/ata-core/ata-zod">
              <span className="tag">BRIDGE</span>
              <h3>@ata-project/zod</h3>
              <p>zod 4 schemas on the ata engine. Same answers as zod, differential-tested;
                 verdicts in nanoseconds, speed that survives a strict CSP.</p>
              <div className="stat">13,030 values &middot; zero disagreements</div>
            </a>
            <a className="card" href="https://github.com/ata-core/ata-validator#ahead-of-time-compilation">
              <span className="tag">BUILD</span>
              <h3>ata build</h3>
              <p>Schemas compiled ahead of time into standalone modules that import nothing.
                 The validator disappears into your bundle.</p>
              <div className="stat">~1 KB gzipped per schema</div>
            </a>
            <a className="card" href="https://github.com/ata-core/ata-vite">
              <span className="tag">BUNDLER</span>
              <h3>ata-vite</h3>
              <p>The same ahead-of-time compilation as a Vite plugin: import a schema, get a
                 compiled validator, ship no compiler to the browser.</p>
              <div className="stat">js + ts &middot; path aliases</div>
            </a>
            <a className="card" href="https://github.com/ata-core/fastify-ata">
              <span className="tag">SERVER</span>
              <h3>fastify-ata</h3>
              <p>Fastify wiring with the framework's own defaults applied. ata is listed in
                 Fastify's documentation as an alternative validator.</p>
              <div className="stat">drop-in validator compiler</div>
            </a>
            <a className="card" href="https://github.com/ata-core/ata-keywords">
              <span className="tag">EXTEND</span>
              <h3>@ata-project/keywords</h3>
              <p>JavaScript-native checks JSON Schema cannot express, instanceof and typeof,
                 compiled into the hot path instead of bolted on around it.</p>
              <div className="stat">rejections stay nanoseconds</div>
            </a>
          </div>
        </div>
      </section>
      
      <section id="vision" className="pillars">
        <div className="wrap">
          <p className="sec-eyebrow">VISION</p>
          <h2>Where the layer goes</h2>
          <p className="sec-lede">
            Infrastructure is judged by who builds on it. The work is making ata the engine other
            things embed, three fronts at a time.
          </p>
          <div className="cols">
            <div className="col">
              <h3><span>01</span>Runtimes</h3>
              <p>A dependency-free, eval-free interpreter that passes the official suite in full,
                 small enough to vendor. Verified in public through Bowtie, the
                 cross-implementation JSON Schema harness, so a runtime never has to take our
                 word for it.</p>
            </div>
            <div className="col">
              <h3><span>02</span>Build time</h3>
              <p>Validation that compiles away. Ahead-of-time output has no runtime dependency and
                 costs about a kilobyte per schema, so the bundle argument ends; the plugin layer
                 brings the same output to every bundler.</p>
            </div>
            <div className="col">
              <h3><span>03</span>Behind your DSL</h3>
              <p>Nobody should migrate schemas to get engine speed. Standard Schema V1 in and out,
                 zod running on the engine today, and the same door open to every library that can
                 emit JSON Schema.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="thesis">
        <div className="wrap">
          <blockquote>
            &ldquo;A validator that wrongly rejects gets a bug report.<br />
            One that wrongly accepts does not.<br />
            <em>Correct first, then fastest.</em>&rdquo;
          </blockquote>
          <p>
            Every figure on this page is measured, not estimated, and every claim runs in CI:
            the full official suite on three dialects, with code generation enabled and blocked,
            on every change.
          </p>
        </div>
      </section>
      
      <footer>
        <div className="wrap foot-in">
          <div className="measured">measured on Node 25, Apple silicon &middot; zod 4.5.4 &middot; ata-validator 1.13.1</div>
          <div className="foot-links">
            <a href="https://github.com/ata-core">GitHub</a>
            <a href="https://www.npmjs.com/package/ata-validator">npm</a>
            <a href="https://ata-validator.com">Docs</a>
            <a href="https://ata-validator.com/playground">Playground</a>
          </div>
        </div>
      </footer>
      
    </>
  )
}
