const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { consumer } = require('./src/api/consumer');
// Answers
const greetings = require('./src/answers/greetings');
const farewells = require('./src/answers/farewells');
const information = require('./src/answers/information');
const help = require('./src/answers/help');
const products = require('./src/answers/products');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log("Client is ready");
});

client.on('message', async (msg) => {
    const prompt = msg.body;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyODg2MjgyNiwianRpIjoiM2JkN2Y4ZjktZmNmZC00MTUzLWJhNjEtODY4ZWVhZmZiMWU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjAwMDAiLCJuYmYiOjE3Mjg4NjI4MjYsImNzcmYiOiI0Mjc4NWJhZi04Mzc4LTQ0YzYtYTViMy1iYzIwOWM2ZjZkY2YiLCJleHAiOjE3MzE0NTQ4MjZ9.U5RW18iOZj6z60XQIN3JPYBDen0kwOboUctZj5_mm9U";
    if (prompt) {
        try {
            const data = await consumer(prompt, token); 
            const clase = data.clase; 
            if(clase === "Saludos") {
                const index = Math.floor(Math.random() * greetings.length);
                response = greetings[index];
            }else if(clase === "Despedida") {
                const index = Math.floor(Math.random() * farewells.length);
                response = farewells[index];
            }else if(clase == "Informacion") {
                const index = Math.floor(Math.random() * information.length);
                response = information[index];
            }else if(clase == "Ayuda"){
                const index = Math.floor(Math.random() * help.length);
                response = help[index];
            }else if(clase == "Productos"){
                const index = Math.floor(Math.random() * products.length);
                response = products[index];
            }else{
                response = "Lo siento no entendí tu mensaje :(";
            }
            await msg.reply(response);
        } catch (error) {
            console.error("Error al clasificar el texto:", error);
            await msg.reply("Hubo un error al procesar tu solicitud."); 
        }
    }
});

client.initialize();
