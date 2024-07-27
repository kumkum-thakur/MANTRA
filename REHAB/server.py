from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app=app)
@app.route('/post-data', methods=['POST'])
def handle_post():
    # Get JSON data from the request
    data = request.get_json()
    
    # Print the data to the console
    print(data)
    
    # Return a response to the client
    return {'message': 'Data received'}, 200

if __name__ == '__main__':
    app.run(debug=True)
