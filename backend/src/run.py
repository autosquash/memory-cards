import time
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

names: list[str] = ["Peter", "Joan", "Lukas"]


@app.route("/names", methods=["GET"])
def get_names():
    time.sleep(1.5)  # check frontend behaviour on delays
    return jsonify(names)


if __name__ == "__main__":
    app.run()
