from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

# Load and prepare the model
def load_model():
    # Load and combine datasets
    df1 = pd.read_csv('C:\\Anish-Coding\\MANTRA\\CareIntel\\Blood_samples_dataset_balanced_2(f).csv')
    df2 = pd.read_csv('C:\\Anish-Coding\\MANTRA\\CareIntel\\blood_samples_dataset_test.csv')
    df = pd.concat([df1, df2], ignore_index=True)
    
    fields_to_keep = [
        'Glucose',
        'Cholesterol',
        'Hemoglobin',
        'Platelets',
        'White Blood Cells',
        'Red Blood Cells',
        'Insulin',
        'BMI',
        'Heart Rate',
        'Systolic Blood Pressure',
        'Disease'
    ]
    
    df = df[fields_to_keep]
    df['Disease'] = df['Disease'].astype('category')
    
    X = df.drop('Disease', axis=1)
    y = df['Disease']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)
    
    # Optionally save the model for later use
    joblib.dump(model, 'disease_prediction_model.pkl')
    
    # Model evaluation (optional)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    print(f"Model accuracy: {accuracy}")
    print(f"Classification report:\n{report}")
    
    return model

# Load model (ensure the model is loaded only once)
try:
    model = joblib.load('disease_prediction_model.pkl')
except FileNotFoundError:
    model = load_model()

@app.route('/')
def home():
    return "Welcome to the Disease Prediction API!"

FIELD_MAPPING = {
    'Glucose': 'Glucose',
    'Cholesterol': 'Cholesterol',
    'Hemoglobin': 'Hemoglobin',
    'WhiteBloodCells': 'White Blood Cells',
    'Platelets': 'Platelets',
    'RedBloodCells': 'Red Blood Cells',
    'Insulin': 'Insulin',
    'BMI': 'BMI',
    'BloodPressure': 'Systolic Blood Pressure',
    'HeartRate': 'Heart Rate',
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        print("Data received:", data)
        
        # Map and filter the data
        key_mapping = {
            'Glucose': 'Glucose',
            'Cholesterol': 'Cholesterol',
            'Hemoglobin': 'Hemoglobin',
            'Platelets': 'Platelets',
            'WhiteBloodCells': 'White Blood Cells',
            'RedBloodCells': 'Red Blood Cells',
            'Insulin': 'Insulin',
            'BMI': 'BMI',
            'BloodPressure': 'Systolic Blood Pressure',
            'HeartRate': 'Heart Rate',
        }
        
        # Create a new dictionary with the desired keys and values
        filtered_data = {new_key: data[old_key] for old_key, new_key in key_mapping.items() if old_key in data}
        print("Filtered data:", filtered_data)
        
        # Create a DataFrame with the correct column order and format
        input_data = pd.DataFrame([filtered_data], columns=[
            'Glucose',
            'Cholesterol',
            'Hemoglobin',
            'Platelets',
            'White Blood Cells',
            'Red Blood Cells',
            'Insulin',
            'BMI',
            'Heart Rate',
            'Systolic Blood Pressure'
        ])
        
        # Predict using the loaded model
        prediction = model.predict(input_data)
        
        # Map prediction to a human-readable label if necessary
        predicted_disease = prediction[0]
        
        # Return the prediction result
        return jsonify({"message": "Prediction completed", "predicted_disease": predicted_disease}), 200

    except Exception as e:
        # Handle exceptions and return an error response
        print("Error:", e)
        return jsonify({"error": "An error occurred during prediction", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
