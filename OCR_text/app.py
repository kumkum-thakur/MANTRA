from flask import Flask, request, render_template, jsonify
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import base64
import io
import os

app = Flask(__name__)

# Update this path to your Tesseract installation
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def upload_image():
    try:
        # Log the incoming data for debugging
        print("Request form data:", request.form)

        if 'image_data' not in request.form:
            return jsonify({'error': 'No image data provided'}), 400

        # Retrieve and decode the image data
        data = request.form['image_data']
        if not data.startswith('data:image/png;base64,'):
            return jsonify({'error': 'Invalid image format'}), 400
        
        encoded = data.split(',')[1]
        binary_data = base64.b64decode(encoded)

        # Define paths for the image and text file
        image_path = os.path.join(UPLOAD_FOLDER, 'captured_image.png')
        text_path = os.path.join(UPLOAD_FOLDER, 'captured_text.txt')

        # Save the uploaded image, replacing if it already exists
        with open(image_path, 'wb') as f:
            f.write(binary_data)

        # Open and preprocess the image
        image = Image.open(image_path)
        image = image.convert('L')  # Convert to grayscale
        image = image.filter(ImageFilter.SHARPEN)  # Sharpen the image
        image = ImageEnhance.Contrast(image).enhance(2)  # Increase contrast

        # Save the preprocessed image (optional)
        preprocessed_image_path = os.path.join(UPLOAD_FOLDER, 'preprocessed_image.png')
        image.save(preprocessed_image_path)

        # Perform OCR
        text = pytesseract.image_to_string(image)

        # Save the extracted text, replacing if it already exists
        with open(text_path, 'w') as f:
            f.write(text)

        # Process the text to extract medicine details
        medicines = process_text(text)

        return jsonify({'medicines': medicines})

    except Exception as e:
        # Log the error and return a response
        print(f"Error: {str(e)}")
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

def process_text(text):
    medicines = []
    lines = text.strip().split('\n')

    # Initialize variables
    current_medicine = None
    times_of_day = {'morning': 0, 'afternoon': 0, 'evening': 0, 'night': 0}
    before_after = {'before': 0, 'after': 0}
    take = None
    duration = None

    # Process each line
    for line in lines:
        line = line.lower().strip()  # Convert to lower case for easier matching

        if line.startswith("medicine:"):
            # Save previous medicine if exists
            if current_medicine:
                medicines.append({
                    'name': current_medicine,
                    'time_of_day': times_of_day,
                    'before_after': before_after,
                    'days': duration or 'Not specified'
                })
            
            # Start a new medicine entry
            current_medicine = line.split("medicine:")[1].strip()
            times_of_day = {'morning': 0, 'afternoon': 0, 'evening': 0, 'night': 0}
            before_after = {'before': 0, 'after': 0}
            take = None
            duration = None
        
        elif line.startswith("time:"):
            time = line.split("time:")[1].strip().lower()
            if time in times_of_day:
                times_of_day[time] = 1
        
        elif line.startswith("take:"):
            take = line.split("take:")[1].strip().lower()
            if 'before' in take:
                before_after['before'] = 1
            elif 'after' in take:
                before_after['after'] = 1
        
        elif line.startswith("duration:"):
            duration = line.split("duration:")[1].strip()

    # Append the last medicine entry
    if current_medicine:
        medicines.append({
            'name': current_medicine,
            'time_of_day': times_of_day,
            'before_after': before_after,
            'days': duration or 'Not specified'
        })

    return medicines

if __name__ == '__main__':
    app.run(debug=True,port=8000)
