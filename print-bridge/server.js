const express = require('express');
const cors = require('cors');
const net = require('net');
const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Impressao TCP/IP (ZPL/EPL via porta 9100)
async function printTCP(ip, porta, dados) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('Timeout ao conectar na impressora'));
    }, 5000);
    socket.connect(parseInt(porta) || 9100, ip, () => {
      socket.write(Buffer.from(dados, 'binary'));
      socket.end();
    });
    socket.on('close', () => { clearTimeout(timeout); resolve({ ok: true }); });
    socket.on('error', (err) => { clearTimeout(timeout); reject(err); });
  });
}

// Impressao USB/COM via node-printer
function printUSB(nomePrinter, dados) {
  return new Promise((resolve, reject) => {
    try {
      const printer = require('node-printer');
      printer.printDirect({
        data: dados,
        printer: nomePrinter,
        type: 'RAW',
        success: (jobID) => resolve({ ok: true, jobID }),
        error: (err) => reject(new Error(String(err)))
      });
    } catch (e) {
      reject(new Error('node-printer nao instalado: ' + e.message));
    }
  });
}

// POST /print - Enviar para impressao
app.post('/print', async (req, res) => {
  const { tipo, ip, porta, comPort, dados } = req.body;
  if (!dados) return res.status(400).json({ error: 'Campo dados (ZPL/EPL) e obrigatorio' });
  try {
    if (tipo === 'tcp') {
      if (!ip) return res.status(400).json({ error: 'IP e obrigatorio para tipo tcp' });
      await printTCP(ip, porta || 9100, dados);
    } else if (tipo === 'usb') {
      if (!comPort) return res.status(400).json({ error: 'comPort e obrigatorio para tipo usb' });
      await printUSB(comPort, dados);
    } else {
      return res.status(400).json({ error: 'Tipo invalido. Use: tcp ou usb' });
    }
    res.json({ ok: true, message: 'Enviado para impressao com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /printers - Listar impressoras USB instaladas
app.get('/printers', (req, res) => {
  try {
    const printer = require('node-printer');
    res.json({ printers: printer.getPrinters() });
  } catch (e) {
    res.json({ printers: [], warning: 'node-printer nao disponivel' });
  }
});

// GET /status - Health check
app.get('/status', (req, res) => {
  res.json({ ok: true, version: '1.0.0', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 9200;
app.listen(PORT, '127.0.0.1', () => {
  console.log('\nLabelPrint Bridge rodando em http://localhost:' + PORT);
  console.log('  POST /print    -> Enviar para impressora');
  console.log('  GET  /printers -> Listar impressoras USB');
  console.log('  GET  /status   -> Status do agente\n');
});
