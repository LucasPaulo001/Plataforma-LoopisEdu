import manager from "./manager.mjs"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const intents = [
    {
        intent: 'saudacao',
        utterances: [
            'oi',
            'olá',
            'bom dia',
            'boa tarde',
            'boa noite',
            'salve',
            'e ae',
            'e aí',
            'mano'
        ],
        answers: ['Oi! Como posso te ajudar?', 'Olá! Tudo bem?', 'Olá!', 'E aí :), tudo bem?']
    },
    {
        intent: 'nome',
        utterances: [
            'qual é o seu nome?',
            'quem é você?',
            'como você se chama?',
            'diga seu nome',
        ],
        answers: ['Eu sou o chat bot da Loopis Edu!'],
    },
    {
        intent: 'explicação',
        utterances: [
            'o que é a loopis edu?',
            'loopis edu',
            'como funciona a plataforma da loopis edu?',
            'qual o objetivo da loopis edu?'
        ],
        answers: [
            'A Loopis Edu é uma plataforma educacional voltada para capacitação profissional com foco em tecnologia.',
            'Você pode participar das aulas acessando sua conta e escolhendo o curso disponível na aba "Capacitações".',
            'O principal objetivo da Loopis Edu é promover a inclusão tecnológica por meio de capacitações práticas e acessíveis.',
            'A plataforma oferece cursos, materiais e suporte para alunos interessados em aprender mais sobre tecnologia e mercado de trabalho.',
        ],

    },
    {
        intent: 'dúvida',
        utterances: [
            "como posso postar uma aula?",
            "posso postar uma aula?",
            "como faço para publicar uma aula?",
            "quem pode postar aula?",
            "qual permissão precisa para postar aula?",
            "como virar lessonador?",
            "quero postar aula"
        ],
        answers: [
            "Para postar aulas, é necessário que o administrador(a) ou o presidente atribuam a permissão de 'lessonador' ao seu perfil. Após isso, você poderá publicar as aulas no YouTube e enviá-las para a plataforma."
        ]

    },
    {
        intent: 'cargo',
        utterances: [
            "como posso mudar de cargo?",
            "posso mudar de cargo?",
            "posso mudar de setor?",
            "cargo",
            "setor",
            "quero mudar de setor",
            "quero mudar de cargo"
        ],
        answers: [
            "Você pode mudar de cargo/setor apenas em período de eleição, ou em promoção por meio presidencial!"
        ]
    },
    {
        intent: 'banimento',
        utterances: [
            "posso ser banido?",
            "como ser banido?",
            "ban",
            "banido",
            "banida",
            "posso ser banida?",
            "como posso ser banido?",
            "como posso ser banida?",
            "banimento",
            "quem pode banir?"
        ],
        answers: [
            "Você pode ser banido(a) por falhas graves com a nossa política, os responsáveis pelo banimento serão (Presidente e admins) - Informe-se sobre as nossa políticas :)"
        ]
    }

]

intents.forEach(({ intent, utterances, answers }) => {
    utterances.forEach(utt => manager.addDocument('pt', utt, intent))
    answers.forEach(ans => manager.addAnswer('pt', intent, ans))
})

console.log("Treinando...")

await manager.train()
await manager.save(path.join(__dirname, '../models/model.nlp'))

console.log("Modelo salvo!")