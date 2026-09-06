import { describe, expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'

describe('landing page', () => {
  const html = renderToStaticMarkup(<App />)

  test('renders the thesis and every product card', () => {
    for (const text of [
      'The Validation <em>Layer</em>',
      'ata-validator',
      '@ata-project/zod',
      'ata build',
      'ata-vite',
      'fastify-ata',
      '@ata-project/keywords',
      'Open source',
      '3,359',
      'correct first, then fast.',
    ]) {
      expect(html).toContain(text)
    }
  })

  test('the measured footer names the versions the figures came from', () => {
    expect(html).toContain('zod 4.5.4')
    expect(html).toContain('ata-validator 1.13.1')
  })
})
