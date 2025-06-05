import { NlpManager } from 'node-nlp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const modelPath = path.join(__dirname, '../models/model.nlp')

const manager = new NlpManager({ languages: ['pt'] })
await manager.load(modelPath)

export async function processMessage(message) {
  const response = await manager.process('pt', message)
  return response.answer || `Desculpe, não entendi. Você pode tentar uma das opções?\n` + 
  `- O que é a Loopis Edu?\n` + `- Como me torno um lessonador?\n` + `- Posso ser banido?\n`
}
