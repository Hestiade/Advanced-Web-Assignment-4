// İrem AYRANPINAR
// 2300005623
import { readFileSync, writeFileSync } from 'node:fs'

const markdown = readFileSync('README.md', 'utf8')
// Preserve the complete guide; remove only code-language labels for portable listings.
const latexInput = markdown.replace(/^```[a-zA-Z][^\r\n]*$/gm, '```')
writeFileSync('guide-input.md', latexInput, 'utf8')
console.log('Prepared the complete README as guide-input.md')
