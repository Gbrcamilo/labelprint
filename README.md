# 🖨️ LabelPrint — Sistema de Impressão de Etiquetas

Sistema web completo para impressão de etiquetas hospitalares com suporte a impressoras **ZPL**, **EPL**, **USB** e **TCP/IP**.

## ✨ Funcionalidades

- **Nova Etiqueta** — formulário completo com preview em tempo real
- **Templates salvos** — salve padrões e reutilize com 1 clique
- **Impressoras** — cadastro TCP/IP, USB/COM, ZPL II e EPL2
- **Histórico** — consulte e reimprima etiquetas anteriores
- **Editor ZPL/EPL** — edição manual com referência de comandos
- **Dark / Light mode** — toggle na sidebar
- **Print Bridge** — agente local USB (porta 9200)

## 🏥 Etiqueta Modelo

> **Etiqueta de Dieta Enteral** (NE Hipercal / Nutren 2.0)
> Campos: Paciente · Registro · Leito · Controle · Dieta · Volume · Velocidade · Via · Manipulação · Validade · Conservação · Code-128

## 🚀 Como usar

1. Abra `index.html` no navegador — **sem instalação**
2. Para impressão USB, instale o **Print Bridge** (`print-bridge/`)
3. Cadastre impressoras em **Impressoras** (IP + porta 9100 para ZPL)

## 🖨️ Compatibilidade

| Protocolo | Linguagem | Exemplo |
|---|---|---|
| TCP/IP | ZPL II | Zebra ZT230, ZD421 |
| TCP/IP | EPL2 | Argox OS-214 |
| USB/COM | ZPL II | Zebra USB |
| USB/COM | EPL2 | Argox USB/Serial |

## 📁 Estrutura

```
labelprint/
├── index.html            ← App completo
├── print-bridge/
│   ├── server.js         ← Agente Node.js (porta 9200)
│   ├── package.json
│   └── README.md
└── docs/
    └── ARQUITETURA.md    ← Arquitetura + prompt Lovable
```

## 🔧 Print Bridge

```bash
cd print-bridge
npm install
node server.js
```

---
**Serviço de Nutrição e Dietética — Sistema Hospitalar**
