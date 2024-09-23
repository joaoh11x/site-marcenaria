const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vagnhojr2@gmail.com',
        pass: 'tbglfrofmswgnzlx'
    }
});

const mailOptions = {
    from: 'vagnhojr2@gmail.com',
    to: 'vagnhojr2@gmail.com',
    subject: 'Teste de envio',
    text: 'Este é um e-mail de teste.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Erro ao enviar e-mail:', error.message);
    }
    console.log('E-mail enviado: ' + info.response);
});