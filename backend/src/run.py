import time
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/data")
def data():
    time.sleep(1.5)
    return {"message": "Hello World!"}

if __name__ == "__main__":
    app.run()
