import { describe, expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'

describe('landing page', () => {
  const html = renderToStaticMarkup(<App />)

  test('renders the thesis and every product card', () => {
    for (const text of [
      '>ata</h1>',
      'ata-validator',
      '@ata-project/zod',
      'ata build',
      'ata-vite',
      'fastify-ata',
      '@ata-project/keywords',
      'Open source',
      '3,365',
      'ata is that compiler.',
      'correct first, then fast.',
    ]) {
      expect(html).toContain(text)
    }
  })

  test('the figures name the versions they were measured on', () => {
    expect(html).toContain('zod 4.6.5')
    // The performance strip and the numbers section each name their own version.
    expect(html).toContain('ata-validator 1.33.1')
    expect(html).toContain('ata-validator 1.48.0')
  })
})
