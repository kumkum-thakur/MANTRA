from flask import Flask, request, jsonify
from flask_cors import CORS
from symptoms_mapping import symptom_disease_mapping
from flask_cors import CORS
app = Flask(__name__)
CORS(app=app)  # Enable CORS if needed

def provide_diagnosis(symptoms_list):
    diagnoses = []
    for symptom in symptoms_list:
        symptom = symptom.lower().strip()  # Normalize the input
        if symptom in symptom_disease_mapping:
            info = symptom_disease_mapping[symptom]
            diagnoses.append({
                "symptom": symptom,
                "disease": info['disease'],
                "precautions": info['precautions']
            })
    
    if diagnoses:
        return diagnoses
    else:
        return {"error": "I don't have enough information about your symptoms. Please consult a doctor for a proper diagnosis."}

@app.route('/diagnosis', methods=['POST'])
def diagnose():
    data = request.json
    
    symptom=data['disease']
   
    symptom= symptom.lower()
    print(symptom)
    if symptom in symptom_disease_mapping:
        prec=symptom_disease_mapping[symptom]["precautions"]
    if not prec:
        return jsonify({"error": "No symptoms provided"}), 400
    
    return jsonify(prec), 200

if __name__ == '__main__':
    app.run(debug=True,port=7000)
