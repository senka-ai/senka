import { readFileSync, writeFileSync } from 'fs'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'

const css = readFileSync('src/styles/index.css', 'utf8')

// Process CSS with Tailwind
postcss([tailwindcss()])
  .process(css, { from: 'src/styles/index.css', to: 'dist/styles.css' })
  .then(result => {
    writeFileSync('dist/styles.css', result.css)
    console.log('CSS processed successfully!')
  })
  .catch(err => {
    console.error('Error processing CSS:', err)
    process.exit(1)
  })