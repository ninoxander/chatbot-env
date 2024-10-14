import os
from datetime import timedelta
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from TextClassifier import TextClassifier
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)


classifier = TextClassifier('./modelo_muse_epoch')

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if username == "0000" and password == "0000":
        # Establecer la duración del token en 30 días
        expires = timedelta(days=30)
        access_token = create_access_token(identity=username, expires_delta=expires)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401
    
    
@app.route('/class', methods=['POST'])
@jwt_required()
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
