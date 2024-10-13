// src/api/consumer.js

async function consumer(texto) {
    const url = 'http://localhost:5000/class'; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto }), 
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ' + response.statusText);
        }

        const data = await response.json(); 
        console.log('Respuesta de la API:', data);
        return data; 
    } catch (error) {
        console.error('Error al clasificar el texto:', error); 
        throw error; 
    }
}

module.exports = { consumer }; 
