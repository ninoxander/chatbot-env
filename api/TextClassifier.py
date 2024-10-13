import tensorflow as tf
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification

class TextClassifier:
    def __init__(self, model_path):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = TFAutoModelForSequenceClassification.from_pretrained(model_path)
        self.model.trainable = False

    def clasificar_texto(self, texto):
        inputs = self.tokenizer(texto, padding=True, truncation=True, return_tensors="tf")
        outputs = self.model(inputs)

        predicciones = tf.nn.softmax(outputs.logits, axis=-1)
        clase_predicha = tf.argmax(predicciones, axis=-1).numpy()[0]
        
        return clase_predicha
