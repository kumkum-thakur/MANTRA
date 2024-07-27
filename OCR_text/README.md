# OCR Medicine Schedule

This project uses Optical Character Recognition (OCR) to extract medicine schedules from images. The application allows users to capture images using a camera or upload images from their system. It extracts details about medicines, including the time of day to take them, whether they should be taken before or after a meal, and the duration of the medication.

## Features

- **Capture Image**: Capture an image using your device's camera.
- **Upload Image**: Upload an image file directly from your system.
- **Extract Information**: Extract and process medicine-related information from the image.
- **Detailed Extraction**: Recognize multiple medicines, their timings, before/after meal instructions, and duration.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ocr-medicine-schedule.git
    cd ocr-medicine-schedule
    ```

2. **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Download and install Tesseract-OCR:**
   - [Tesseract Installation Guide](https://github.com/tesseract-ocr/tesseract)
   - Update `pytesseract.pytesseract.tesseract_cmd` in `app.py` with your Tesseract installation path.

## Usage

1. **Run the Flask application:**
    ```bash
    python app.py
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:5000/
    ```

3. **Use the provided interface to:**
   - Capture an image using the camera.
   - Upload an image from your file system.
   - Submit the image for processing.

4. **The application will return:**
   - Extracted medicine names.
   - Time of day for each medicine (morning, afternoon, evening, night).
   - Before or after meal instructions.
   - Duration of the medication.

## Sample JSON Response

```json
{
    "medicines": [
        {
            "name": "Aspirin",
            "time_of_day": {"morning": 1, "afternoon": 0, "evening": 0, "night": 0},
            "before_after": {"before": 1, "after": 0},
            "days": "For 7 days"
        },
        {
            "name": "Metformin",
            "time_of_day": {"morning": 0, "afternoon": 1, "evening": 0, "night": 0},
            "before_after": {"before": 0, "after": 1},
            "days": "For 30 days"
        },
        {
            "name": "Loratadine",
            "time_of_day": {"morning": 0, "afternoon": 0, "evening": 0, "night": 1},
            "before_after": {"before": 1, "after": 0},
            "days": "For 14 days"
        },
        {
            "name": "Ibuprofen",
            "time_of_day": {"morning": 1, "afternoon": 0, "evening": 0, "night": 0},
            "before_after": {"before": 1, "after": 0},
            "days": "For 5 days"
        }
    ]
}
