const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { consumer } = require('./src/api/consumer');
// Answers
const greetings = require('./src/answers/greetings');
const farewells = require('./src/answers/farewells');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log("Client is ready");
});

client.on('message', async (msg) => {
    const prompt = msg.body;

    if (prompt) {
        try {
            const data = await consumer(prompt); 
            const clase = data.clase; 
            if(clase === "Saludos") {
                const index = Math.floor(Math.random() * greetings.length);
                response = greetings[index];
            }else if(clase === "Despedida") {
                const index = Math.floor(Math.random() * farewells.length);
                response = farewells[index];
            }
            await msg.reply(response);
        } catch (error) {
            console.error("Error al clasificar el texto:", error);
            await msg.reply("Hubo un error al procesar tu solicitud."); 
        }
    }
});

client.initialize();
