import os

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
#from googletrans import Translator
import deepl

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get('DEEPL_API_KEY')
translator = deepl.Translator(API_KEY)
orig_lang = "JA"
int_lang = "EN-US"

@app.route("/", methods=['GET'])
def index():
    return "Text Paraphrase:)"

@app.route('/paraphrase', methods=['GET', 'POST'])
def paraphrase():
    
    # Get the input text
    data = request.get_json()
    input_text = data['input_text']

    # Translate the input text to another language
    translation = translator.translate_text(input_text, source_lang=orig_lang, target_lang=int_lang).text

    # Translate the translated text back to the original language
    paraphrased_text = translator.translate_text(translation, target_lang=orig_lang).text
    
    response = {'output_text': paraphrased_text}
    
    return make_response(jsonify(response))

if __name__ == '__main__':
    app.debug = True
    app.run(host='127.0.0.1', port=5000)