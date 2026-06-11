# Print Bridge — Agente Local de Impressão

Serviço Node.js que expõe API REST local para enviar ZPL/EPL para impressoras USB ou TCP/IP.

## Instalação

```bash
npm install
node server.js
```

Escuta em `http://localhost:9200`

## Endpoints

### POST /print

**TCP/IP:**
```json
{ "tipo": "tcp", "ip": "192.168.1.100", "porta": 9100, "dados": "^XA...^XZ" }
```

**USB:**
```json
{ "tipo": "usb", "comPort": "Zebra ZT230", "dados": "^XA...^XZ" }
```

### GET /printers — Listar impressoras instaladas
### GET /status — Health check

## Configuração

Em **Configurações** do LabelPrint:
```
URL do Bridge: http://localhost:9200
```

## Requisitos
- Node.js 18+
- Windows: impressoras no Painel de Controle
- Linux: CUPS (`sudo apt install cups`)
