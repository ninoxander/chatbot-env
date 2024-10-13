from flask import Flask, request, jsonify
from TextClassifier import TextClassifier
app = Flask(__name__)


classifier = TextClassifier('./modelo_1000_epoch')

@app.route('/class', methods=['POST'])
def clasificar():
    data = request.json
    texto = data.get("texto")

    if not texto:
        return jsonify({"error": "No se proporcionó texto para clasificar"}), 400

    clase = classifier.clasificar_texto(texto)

    intencion_map = {
        0: "Saludos",
        1: "Despedida",
        2: "Información",
        3: "Productos",
        4: "Ayuda"
    }

    respuesta = {
        "texto": texto,
        "clase": intencion_map.get(clase, "Desconocido"),
    }

    return jsonify(respuesta)

if __name__ == '__main__':
    app.run(debug=True)
