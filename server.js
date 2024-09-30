require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit'); // Importar express-rate-limit

const app = express();
const PORT = process.env.PORT || 3000;

// Definir o limitador de taxa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela de 15 minutos
    message: 'Muitas requisições criadas a partir deste IP, por favor tente novamente após 15 minutos.'
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos do diretório atual

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Aplicar o limitador globalmente em todas as rotas
app.use(limiter);  // Limita todas as rotas a 100 requisições por 15 minutos

// Servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para enviar e-mail com validação
app.post('/enviar_email', [
    body('nome').isString().notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('telefone').isString().notEmpty().withMessage('Telefone é obrigatório'),
    body('tipo_projeto').isString().notEmpty().withMessage('Tipo de projeto é obrigatório'),
    body('mensagem').isString().notEmpty().withMessage('Mensagem é obrigatória')
], (req, res) => {

    // Verificar se há erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Se não houver erros, continuar o processamento
    console.log('Dados recebidos:', req.body);
    const { nome, email, telefone, tipo_projeto, mensagem } = req.body;

    // Configuração do transportador
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // seu e-mail
            pass: process.env.EMAIL_PASS // sua senha de aplicativo
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // e-mail que receberá as mensagens
        subject: `Novo Orçamento de ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nTipo de Projeto: ${tipo_projeto}\nMensagem: ${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Falha ao enviar o e-mail.');
        }
        res.redirect('/?success=true');
        res.status(200).send('E-mail enviado com sucesso!');
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


